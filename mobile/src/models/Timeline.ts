/**
 * Timeline and Deadline Models
 * For tracking immigration deadlines and action items
 */

import { ImmigrationStatus } from './ImmigrationStatus';

/**
 * Types of deadlines in the immigration process
 */
export enum DeadlineType {
  // OPT Phase
  OPT_APPLICATION_WINDOW_START = 'OPT_APPLICATION_WINDOW_START', // 90 days before graduation
  OPT_APPLICATION_DEADLINE = 'OPT_APPLICATION_DEADLINE', // 60 days after program end
  OPT_GRACE_PERIOD_END = 'OPT_GRACE_PERIOD_END', // 60 days after program end
  
  // Employment Phase
  EMPLOYMENT_START_DATE = 'EMPLOYMENT_START_DATE',
  UNEMPLOYMENT_90_DAY_LIMIT = 'UNEMPLOYMENT_90_DAY_LIMIT', // Must find job within 90 days
  
  // STEM OPT Phase
  STEM_OPT_APPLICATION_DEADLINE = 'STEM_OPT_APPLICATION_DEADLINE', // Before current OPT expires
  STEM_REPORTING_REQUIREMENT = 'STEM_REPORTING_REQUIREMENT', // Every 6 months
  
  // H1B Phase
  H1B_REGISTRATION_PERIOD = 'H1B_REGISTRATION_PERIOD', // March window
  H1B_LOTTERY_RESULTS = 'H1B_LOTTERY_RESULTS', // Late March/April
  H1B_PETITION_FILING = 'H1B_PETITION_FILING', // April 1st
  H1B_START_DATE = 'H1B_START_DATE', // October 1st
  CAP_GAP_EXTENSION = 'CAP_GAP_EXTENSION', // If needed between OPT end and H1B start
  
  // Compliance Deadlines
  ADDRESS_CHANGE_REPORT = 'ADDRESS_CHANGE_REPORT', // 10 days after moving
  DSO_EMPLOYMENT_REPORT = 'DSO_EMPLOYMENT_REPORT', // Report employment to DSO
  
  // Document Expiry
  PASSPORT_EXPIRY = 'PASSPORT_EXPIRY',
  VISA_EXPIRY = 'VISA_EXPIRY',
  I20_EXPIRY = 'I20_EXPIRY',
  EAD_EXPIRY = 'EAD_EXPIRY',
  H1B_EXPIRY = 'H1B_EXPIRY',
  
  // Custom/Other
  CUSTOM = 'CUSTOM',
}

/**
 * Priority levels for deadlines
 */
export enum DeadlinePriority {
  CRITICAL = 'CRITICAL',   // Miss this = status violation
  HIGH = 'HIGH',           // Important but some flexibility
  MEDIUM = 'MEDIUM',       // Should complete on time
  LOW = 'LOW',             // Informational/reminder
}

/**
 * Deadline status
 */
export enum DeadlineStatus {
  UPCOMING = 'UPCOMING',       // Future deadline
  DUE_SOON = 'DUE_SOON',       // Within warning period
  OVERDUE = 'OVERDUE',         // Past deadline
  COMPLETED = 'COMPLETED',     // Action taken
  CANCELLED = 'CANCELLED',     // No longer relevant
}

/**
 * Deadline interface
 */
export interface Deadline {
  readonly id: string;
  readonly type: DeadlineType;
  readonly title: string;
  readonly description: string;
  readonly dueDate: Date | string;
  readonly priority: DeadlinePriority;
  readonly status: DeadlineStatus;
  readonly relatedStatus?: ImmigrationStatus;
  readonly actionRequired: string;
  readonly notificationEnabled: boolean;
  readonly notificationDaysBefore: number[]; // e.g., [30, 14, 7, 1] days before
  readonly createdAt: Date | string;
  readonly completedAt?: Date | string;
}

/**
 * Action item for users to complete
 */
export interface ActionItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly category: ActionCategory;
  readonly relatedStatus: ImmigrationStatus;
  readonly isRequired: boolean;
  readonly isCompleted: boolean;
  readonly dueDate?: Date | string;
  readonly estimatedDuration?: string; // e.g., "30 minutes", "2 hours"
  readonly resources: ResourceLink[];
  readonly order: number; // For sorting/prioritization
}

/**
 * Category of action items
 */
export enum ActionCategory {
  APPLICATION = 'APPLICATION',     // Fill forms, submit applications
  DOCUMENT = 'DOCUMENT',           // Gather documents, take photos
  INFORMATION = 'INFORMATION',     // Read guides, understand process
  NOTIFICATION = 'NOTIFICATION',   // Report to DSO, notify USCIS
  PLANNING = 'PLANNING',           // Prepare for next steps
}

/**
 * Resource links for guidance
 */
export interface ResourceLink {
  readonly title: string;
  readonly url: string;
  readonly type: ResourceType;
}

export enum ResourceType {
  USCIS_FORM = 'USCIS_FORM',
  USCIS_GUIDE = 'USCIS_GUIDE',
  DSO_CONTACT = 'DSO_CONTACT',
  EXTERNAL_GUIDE = 'EXTERNAL_GUIDE',
  VIDEO_TUTORIAL = 'VIDEO_TUTORIAL',
}

/**
 * Timeline event - represents a milestone in immigration journey
 */
export interface TimelineEvent {
  readonly id: string;
  readonly status: ImmigrationStatus;
  readonly title: string;
  readonly description: string;
  readonly date: Date | string;
  readonly isCompleted: boolean;
  readonly isCurrent: boolean;
  readonly order: number;
}

/**
 * Complete timeline for user's immigration journey
 */
export interface ImmigrationTimeline {
  readonly userId: string;
  readonly events: TimelineEvent[];
  readonly deadlines: Deadline[];
  readonly actionItems: ActionItem[];
  readonly currentStatus: ImmigrationStatus;
  readonly nextMilestone?: TimelineEvent;
  readonly upcomingDeadlines: Deadline[]; // Next 3-5 deadlines
  readonly createdAt: Date | string;
  readonly updatedAt: Date | string;
}

/**
 * Helper to create a deadline
 */
export const createDeadline = (params: {
  type: DeadlineType;
  title: string;
  description: string;
  dueDate: Date;
  priority: DeadlinePriority;
  actionRequired: string;
  relatedStatus?: ImmigrationStatus;
  notificationDaysBefore?: number[];
}): Deadline => {
  return {
    id: `deadline_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: params.type,
    title: params.title,
    description: params.description,
    dueDate: params.dueDate.toISOString(),
    priority: params.priority,
    status: DeadlineStatus.UPCOMING,
    relatedStatus: params.relatedStatus,
    actionRequired: params.actionRequired,
    notificationEnabled: true,
    notificationDaysBefore: params.notificationDaysBefore || [30, 14, 7, 3, 1],
    createdAt: new Date().toISOString(),
  };
};

/**
 * Helper to create an action item
 */
export const createActionItem = (params: {
  title: string;
  description: string;
  category: ActionCategory;
  relatedStatus: ImmigrationStatus;
  isRequired: boolean;
  dueDate?: Date;
  estimatedDuration?: string;
  resources?: ResourceLink[];
  order?: number;
}): ActionItem => {
  return {
    id: `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    title: params.title,
    description: params.description,
    category: params.category,
    relatedStatus: params.relatedStatus,
    isRequired: params.isRequired,
    isCompleted: false,
    dueDate: params.dueDate?.toISOString(),
    estimatedDuration: params.estimatedDuration,
    resources: params.resources || [],
    order: params.order || 0,
  };
};

/**
 * Helper to create a timeline event
 */
export const createTimelineEvent = (params: {
  status: ImmigrationStatus;
  title: string;
  description: string;
  date: Date;
  isCompleted: boolean;
  isCurrent: boolean;
  order: number;
}): TimelineEvent => {
  return {
    id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ...params,
    date: params.date.toISOString(),
  };
};

/**
 * Check if deadline is due soon (within X days)
 */
export const isDeadlineDueSoon = (deadline: Deadline, daysThreshold: number = 14): boolean => {
  const dueDate = new Date(deadline.dueDate);
  const now = new Date();
  const daysUntilDue = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return daysUntilDue <= daysThreshold && daysUntilDue > 0;
};

/**
 * Check if deadline is overdue
 */
export const isDeadlineOverdue = (deadline: Deadline): boolean => {
  const dueDate = new Date(deadline.dueDate);
  const now = new Date();
  return now > dueDate && deadline.status !== DeadlineStatus.COMPLETED;
};

/**
 * Sort deadlines by due date (soonest first)
 */
export const sortDeadlinesByDate = (deadlines: Deadline[]): Deadline[] => {
  return [...deadlines].sort((a, b) => {
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });
};

/**
 * Filter active deadlines (not completed or cancelled)
 */
export const getActiveDeadlines = (deadlines: Deadline[]): Deadline[] => {
  return deadlines.filter(
    d => d.status !== DeadlineStatus.COMPLETED && d.status !== DeadlineStatus.CANCELLED
  );
};

/**
 * Get upcoming deadlines (future, not overdue)
 */
export const getUpcomingDeadlines = (deadlines: Deadline[], limit?: number): Deadline[] => {
  const active = getActiveDeadlines(deadlines);
  const upcoming = active.filter(d => !isDeadlineOverdue(d));
  const sorted = sortDeadlinesByDate(upcoming);
  return limit ? sorted.slice(0, limit) : sorted;
};

