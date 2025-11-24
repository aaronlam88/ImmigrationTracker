/**
 * Timeline Service
 * Calculate immigration deadlines and generate action items based on user status
 */

import { UserProfile } from '../models/UserProfile';
import { ImmigrationStatus } from '../models/ImmigrationStatus';
import {
  Deadline,
  ActionItem,
  TimelineEvent,
  ImmigrationTimeline,
  DeadlineType,
  DeadlinePriority,
  DeadlineStatus,
  ActionCategory,
  ResourceType,
  createDeadline,
  createActionItem,
  createTimelineEvent,
} from '../models/Timeline';
import {
  calculateOptApplicationStart,
  calculateOptApplicationDeadline,
  calculateGracePeriodEnd,
  calculateUnemploymentLimit,
  calculateStemOptDeadline,
  calculateH1bRegistrationPeriod,
  calculateH1bStartDate,
  calculateCapGapPeriod,
  calculateOptProcessingEstimate,
  calculateH1bProcessingEstimate,
  parseDate,
} from '../utils/dateCalculations';
import { USCIS_URLS, getTopicResources } from '../constants/formResources';

/**
 * Generate complete timeline for user based on their profile
 */
export function generateUserTimeline(profile: UserProfile): ImmigrationTimeline {
  const deadlines = generateDeadlines(profile);
  const actionItems = generateActionItems(profile);
  const events = generateTimelineEvents(profile);

  // Sort deadlines and get upcoming ones
  const sortedDeadlines = deadlines.sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );
  const upcomingDeadlines = sortedDeadlines
    .filter(d => d.status === DeadlineStatus.UPCOMING || d.status === DeadlineStatus.DUE_SOON)
    .slice(0, 5);

  // Find next milestone
  const futureEvents = events
    .filter(e => !e.isCompleted)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const nextMilestone = futureEvents[0];

  const now = new Date().toISOString();

  return {
    userId: profile.id,
    events,
    deadlines: sortedDeadlines,
    actionItems,
    currentStatus: profile.currentStatus,
    nextMilestone,
    upcomingDeadlines,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Generate all relevant deadlines based on user's immigration status
 */
function generateDeadlines(profile: UserProfile): Deadline[] {
  const deadlines: Deadline[] = [];

  // OPT Phase Deadlines
  if (profile.graduationDate) {
    const gradDate = parseDate(profile.graduationDate);
    if (gradDate) {
      // OPT application window start
      if (
        profile.currentStatus === ImmigrationStatus.F1_STUDENT ||
        profile.currentStatus === ImmigrationStatus.GRADUATED
      ) {
        deadlines.push(
          createDeadline({
            type: DeadlineType.OPT_APPLICATION_WINDOW_START,
            title: 'OPT Application Window Opens',
            description: 'You can start applying for OPT 90 days before graduation',
            dueDate: calculateOptApplicationStart(gradDate),
            priority: DeadlinePriority.HIGH,
            actionRequired: 'Prepare OPT application documents (I-765 form)',
            relatedStatus: ImmigrationStatus.OPT_PENDING,
            notificationDaysBefore: [30, 14, 7],
          })
        );
      }
    }
  }

  if (profile.programEndDate) {
    const programEnd = parseDate(profile.programEndDate);
    if (programEnd) {
      // OPT application deadline
      if (profile.currentStatus === ImmigrationStatus.OPT_NOT_APPLIED) {
        deadlines.push(
          createDeadline({
            type: DeadlineType.OPT_APPLICATION_DEADLINE,
            title: 'OPT Application Deadline',
            description: 'Last day to submit OPT application (60 days after program end)',
            dueDate: calculateOptApplicationDeadline(programEnd),
            priority: DeadlinePriority.CRITICAL,
            actionRequired: 'Submit Form I-765 to USCIS immediately',
            relatedStatus: ImmigrationStatus.OPT_PENDING,
            notificationDaysBefore: [30, 14, 7, 3, 1],
          })
        );
      }

      // Grace period end
      deadlines.push(
        createDeadline({
          type: DeadlineType.OPT_GRACE_PERIOD_END,
          title: 'Grace Period Ends',
          description: 'Must have valid status or leave the US',
          dueDate: calculateGracePeriodEnd(programEnd),
          priority: DeadlinePriority.CRITICAL,
          actionRequired: 'Ensure you have valid immigration status',
          notificationDaysBefore: [30, 14, 7, 1],
        })
      );
    }
  }

  // EAD and Employment Deadlines
  if (profile.eadReceivedDate) {
    const eadReceived = parseDate(profile.eadReceivedDate);
    if (eadReceived) {
      // Unemployment 90-day limit
      deadlines.push(
        createDeadline({
          type: DeadlineType.UNEMPLOYMENT_90_DAY_LIMIT,
          title: '90-Day Unemployment Limit',
          description: 'Must find employment within 90 days of OPT start',
          dueDate: calculateUnemploymentLimit(eadReceived),
          priority: DeadlinePriority.CRITICAL,
          actionRequired: 'Secure job offer and start employment',
          relatedStatus: ImmigrationStatus.EMPLOYED,
          notificationDaysBefore: [60, 30, 14, 7],
        })
      );
    }
  }

  // STEM OPT Deadlines
  if (profile.hasStemDegree && profile.eadExpiryDate) {
    const eadExpiry = parseDate(profile.eadExpiryDate);
    if (eadExpiry && profile.currentStatus === ImmigrationStatus.OPT_APPROVED) {
      deadlines.push(
        createDeadline({
          type: DeadlineType.STEM_OPT_APPLICATION_DEADLINE,
          title: 'STEM OPT Extension Deadline',
          description: 'Apply for STEM OPT extension before current OPT expires',
          dueDate: calculateStemOptDeadline(eadExpiry),
          priority: DeadlinePriority.HIGH,
          actionRequired: 'Submit I-765 with I-983 Training Plan',
          relatedStatus: ImmigrationStatus.STEM_OPT_PENDING,
          notificationDaysBefore: [60, 30, 14],
        })
      );
    }
  }

  // H1B Deadlines
  if (
    profile.currentStatus === ImmigrationStatus.EMPLOYED ||
    profile.currentStatus === ImmigrationStatus.H1B_PREPARING
  ) {
    const currentYear = new Date().getFullYear();
    const h1bPeriod = calculateH1bRegistrationPeriod(currentYear);

    deadlines.push(
      createDeadline({
        type: DeadlineType.H1B_REGISTRATION_PERIOD,
        title: 'H1B Registration Period',
        description: 'H1B lottery registration window (typically March 1-18)',
        dueDate: h1bPeriod.start,
        priority: DeadlinePriority.CRITICAL,
        actionRequired: 'Ensure employer submits H1B registration',
        relatedStatus: ImmigrationStatus.H1B_REGISTERED,
        notificationDaysBefore: [60, 30, 14, 7],
      })
    );
  }

  // H1B Start Date
  if (profile.currentStatus === ImmigrationStatus.H1B_APPROVED) {
    const h1bYear = profile.h1bStartDate
      ? parseDate(profile.h1bStartDate)?.getFullYear() || new Date().getFullYear()
      : new Date().getFullYear();

    deadlines.push(
      createDeadline({
        type: DeadlineType.H1B_START_DATE,
        title: 'H1B Status Begins',
        description: 'H1B work authorization becomes effective (October 1st)',
        dueDate: calculateH1bStartDate(h1bYear),
        priority: DeadlinePriority.HIGH,
        actionRequired: 'Coordinate with employer for status change',
        relatedStatus: ImmigrationStatus.H1B_ACTIVE,
        notificationDaysBefore: [30, 14, 7],
      })
    );
  }

  // Document Expiry Deadlines
  if (profile.passportExpiryDate) {
    const passportExpiry = parseDate(profile.passportExpiryDate);
    if (passportExpiry) {
      deadlines.push(
        createDeadline({
          type: DeadlineType.PASSPORT_EXPIRY,
          title: 'Passport Expiration',
          description: 'Renew passport before expiration',
          dueDate: passportExpiry,
          priority: DeadlinePriority.HIGH,
          actionRequired: 'Contact your country\'s embassy to renew passport',
          notificationDaysBefore: [180, 90, 60, 30],
        })
      );
    }
  }

  if (profile.eadExpiryDate) {
    const eadExpiry = parseDate(profile.eadExpiryDate);
    if (eadExpiry) {
      deadlines.push(
        createDeadline({
          type: DeadlineType.EAD_EXPIRY,
          title: 'EAD Card Expiration',
          description: 'Work authorization expires - apply for extension if needed',
          dueDate: eadExpiry,
          priority: DeadlinePriority.CRITICAL,
          actionRequired: 'Apply for extension or transition to H1B',
          notificationDaysBefore: [90, 60, 30, 14],
        })
      );
    }
  }

  return deadlines;
}

/**
 * Generate action items based on current status
 */
function generateActionItems(profile: UserProfile): ActionItem[] {
  const actions: ActionItem[] = [];

  switch (profile.currentStatus) {
    case ImmigrationStatus.F1_STUDENT:
      if (profile.graduationDate) {
        actions.push(
          createActionItem({
            title: 'Understand OPT Requirements',
            description: 'Learn about Optional Practical Training eligibility and process',
            category: ActionCategory.INFORMATION,
            relatedStatus: ImmigrationStatus.F1_STUDENT,
            isRequired: true,
            estimatedDuration: '30 minutes',
            resources: [...getTopicResources('OPT')],
            order: 1,
          })
        );
      }
      break;

    case ImmigrationStatus.GRADUATED:
    case ImmigrationStatus.OPT_NOT_APPLIED:
      actions.push(
        createActionItem({
          title: 'Prepare OPT Application',
          description: 'Gather required documents and complete Form I-765',
          category: ActionCategory.APPLICATION,
          relatedStatus: ImmigrationStatus.OPT_PENDING,
          isRequired: true,
          estimatedDuration: '2-3 hours',
          resources: [
            {
              title: 'Form I-765',
              url: USCIS_URLS.FORM_I765,
              type: ResourceType.USCIS_FORM,
            },
          ],
          order: 1,
        })
      );
      break;

    case ImmigrationStatus.EAD_RECEIVED:
      actions.push(
        createActionItem({
          title: 'Apply for Social Security Number',
          description: 'Visit SSA office with EAD card and required documents',
          category: ActionCategory.APPLICATION,
          relatedStatus: ImmigrationStatus.EAD_RECEIVED,
          isRequired: true,
          estimatedDuration: '1-2 hours',
          order: 1,
        }),
        createActionItem({
          title: 'Report Employment to DSO',
          description: 'Inform your Designated School Official about your employment',
          category: ActionCategory.NOTIFICATION,
          relatedStatus: ImmigrationStatus.EMPLOYED,
          isRequired: true,
          estimatedDuration: '15 minutes',
          order: 2,
        })
      );
      break;

    case ImmigrationStatus.EMPLOYED:
      if (profile.hasStemDegree) {
        actions.push(
          createActionItem({
            title: 'Consider STEM OPT Extension',
            description: 'Evaluate eligibility for 24-month STEM OPT extension',
            category: ActionCategory.PLANNING,
            relatedStatus: ImmigrationStatus.STEM_OPT_ELIGIBLE,
            isRequired: false,
            estimatedDuration: '1 hour',
            order: 1,
          })
        );
      }
      actions.push(
        createActionItem({
          title: 'Discuss H1B Sponsorship with Employer',
          description: 'Talk to your employer about H1B visa sponsorship',
          category: ActionCategory.PLANNING,
          relatedStatus: ImmigrationStatus.H1B_PREPARING,
          isRequired: false,
          estimatedDuration: '30 minutes',
          order: 2,
        })
      );
      break;

    case ImmigrationStatus.H1B_PREPARING:
      actions.push(
        createActionItem({
          title: 'Prepare H1B Registration',
          description: 'Work with employer to prepare H1B lottery registration',
          category: ActionCategory.APPLICATION,
          relatedStatus: ImmigrationStatus.H1B_REGISTERED,
          isRequired: true,
          estimatedDuration: '2 hours',
          order: 1,
        })
      );
      break;
  }

  return actions;
}

/**
 * Generate timeline events showing immigration journey milestones
 */
function generateTimelineEvents(profile: UserProfile): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  let order = 0;

  // F-1 Student
  if (profile.graduationDate) {
    const gradDate = parseDate(profile.graduationDate);
    if (gradDate) {
      events.push(
        createTimelineEvent({
          status: ImmigrationStatus.GRADUATED,
          title: 'Graduate from University',
          description: 'Complete your degree program',
          date: gradDate,
          isCompleted: profile.currentStatus !== ImmigrationStatus.F1_STUDENT,
          isCurrent: profile.currentStatus === ImmigrationStatus.GRADUATED,
          order: order++,
        })
      );
    }
  }

  // OPT Application
  if (profile.optApplicationDate) {
    const optAppDate = parseDate(profile.optApplicationDate);
    if (optAppDate) {
      events.push(
        createTimelineEvent({
          status: ImmigrationStatus.OPT_PENDING,
          title: 'Apply for OPT',
          description: 'Submit Form I-765 to USCIS',
          date: optAppDate,
          isCompleted: profile.currentStatus !== ImmigrationStatus.OPT_NOT_APPLIED,
          isCurrent: profile.currentStatus === ImmigrationStatus.OPT_PENDING,
          order: order++,
        })
      );
    }
  }

  // EAD Received
  if (profile.eadReceivedDate) {
    const eadDate = parseDate(profile.eadReceivedDate);
    if (eadDate) {
      events.push(
        createTimelineEvent({
          status: ImmigrationStatus.EAD_RECEIVED,
          title: 'Receive EAD Card',
          description: 'Employment Authorization Document arrived',
          date: eadDate,
          isCompleted: true,
          isCurrent: profile.currentStatus === ImmigrationStatus.EAD_RECEIVED,
          order: order++,
        })
      );
    }
  }

  // Employment
  if (profile.employmentStartDate) {
    const empDate = parseDate(profile.employmentStartDate);
    if (empDate) {
      events.push(
        createTimelineEvent({
          status: ImmigrationStatus.EMPLOYED,
          title: 'Start Employment',
          description: `Begin work at ${profile.currentEmployer || 'employer'}`,
          date: empDate,
          isCompleted: true,
          isCurrent: profile.currentStatus === ImmigrationStatus.EMPLOYED,
          order: order++,
        })
      );
    }
  }

  // H1B Registration
  if (profile.h1bRegistrationDate) {
    const h1bRegDate = parseDate(profile.h1bRegistrationDate);
    if (h1bRegDate) {
      events.push(
        createTimelineEvent({
          status: ImmigrationStatus.H1B_REGISTERED,
          title: 'H1B Registration Submitted',
          description: 'Entered H1B lottery',
          date: h1bRegDate,
          isCompleted: profile.h1bLotterySelected !== undefined,
          isCurrent: profile.currentStatus === ImmigrationStatus.H1B_REGISTERED,
          order: order++,
        })
      );
    }
  }

  // H1B Start Date
  if (profile.h1bStartDate) {
    const h1bStart = parseDate(profile.h1bStartDate);
    if (h1bStart) {
      events.push(
        createTimelineEvent({
          status: ImmigrationStatus.H1B_ACTIVE,
          title: 'H1B Work Authorization Begins',
          description: 'H1B status becomes effective',
          date: h1bStart,
          isCompleted: profile.currentStatus === ImmigrationStatus.H1B_ACTIVE,
          isCurrent: profile.currentStatus === ImmigrationStatus.H1B_ACTIVE,
          order: order++,
        })
      );
    }
  }

  return events.sort((a, b) => a.order - b.order);
}

/**
 * Export the timeline service
 */
export const TimelineService = {
  generateUserTimeline,
  generateDeadlines,
  generateActionItems,
  generateTimelineEvents,
};

export default TimelineService;

