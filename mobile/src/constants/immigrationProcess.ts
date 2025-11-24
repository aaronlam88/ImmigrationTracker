/**
 * Immigration Process Constants
 * Processing times, deadlines, and rules based on diagram.svg and USCIS data
 */

import { FormType } from '../models/Forms';
import { DeadlineType } from '../models/Timeline';

/**
 * Processing time ranges (in months)
 * Based on USCIS average processing times
 */
export const PROCESSING_TIMES = {
  // OPT Processing
  OPT_APPLICATION: {
    min: 3,
    max: 5,
    average: 4,
    notes: 'Apply 90 days before graduation to 60 days after program end',
  },
  
  // STEM OPT Processing
  STEM_OPT_APPLICATION: {
    min: 3,
    max: 5,
    average: 4,
    notes: 'Apply before current OPT expires',
  },
  
  // H1B Processing
  H1B_PETITION: {
    min: 3,
    max: 6,
    average: 4,
    notes: 'Regular processing time',
  },
  
  H1B_PREMIUM: {
    min: 0.5, // 15 days
    max: 0.5,
    average: 0.5,
    notes: 'Premium processing (additional fee applies)',
  },
  
  // Other Applications
  SSN_APPLICATION: {
    min: 0.5, // 2 weeks
    max: 1, // 4 weeks
    average: 0.75,
    notes: 'Visit SSA office in person with EAD card',
  },
  
  ADDRESS_CHANGE: {
    min: 0, // Immediate online
    max: 0.25, // 1 week if by mail
    average: 0,
    notes: 'Must report within 10 days of moving',
  },
} as const;

/**
 * Important deadline offsets (in days from reference date)
 */
export const DEADLINE_OFFSETS = {
  // OPT Deadlines
  OPT_APPLICATION_START: -90, // 90 days before graduation
  OPT_APPLICATION_DEADLINE: 60, // 60 days after program end
  GRACE_PERIOD: 60, // 60 days after program end
  UNEMPLOYMENT_LIMIT: 90, // 90 days total unemployment allowed during OPT
  
  // STEM OPT Deadlines
  STEM_APPLICATION_DEADLINE: -30, // Apply 30 days before OPT expires
  STEM_REPORTING_INTERVAL: 180, // Report every 6 months (180 days)
  
  // H1B Timeline
  H1B_REGISTRATION_START: 0, // March 1st (absolute date, not offset)
  H1B_REGISTRATION_END: 17, // March 18th typically
  H1B_LOTTERY_RESULTS: 30, // Late March/Early April
  H1B_PETITION_DEADLINE: 31, // April 1st
  H1B_START_DATE: 0, // October 1st (absolute date)
  
  // Compliance Deadlines
  ADDRESS_CHANGE_DEADLINE: 10, // 10 days after moving
  EMPLOYMENT_REPORT_DEADLINE: 10, // 10 days to report to DSO
  
  // Document Expiry Warnings
  PASSPORT_EXPIRY_WARNING: 180, // 6 months before expiry
  EAD_EXPIRY_WARNING: 90, // 3 months before expiry
  VISA_EXPIRY_WARNING: 90, // 3 months before expiry
} as const;

/**
 * Work authorization durations (in months)
 */
export const WORK_AUTHORIZATION_DURATION = {
  OPT_STANDARD: 12, // 12 months
  OPT_STEM_EXTENSION: 24, // 24 months extension
  OPT_TOTAL_WITH_STEM: 36, // 12 + 24 months
  H1B_INITIAL: 36, // 3 years
  H1B_EXTENSION: 36, // 3 years (renewable once)
  H1B_MAXIMUM: 72, // 6 years total
} as const;

/**
 * Important dates in the immigration calendar
 * These are fixed dates each year
 */
export const ANNUAL_IMMIGRATION_DATES = {
  H1B_REGISTRATION_START: { month: 3, day: 1 }, // March 1
  H1B_REGISTRATION_END: { month: 3, day: 18 }, // March 18 (typical)
  H1B_PETITION_START: { month: 4, day: 1 }, // April 1
  H1B_STATUS_START: { month: 10, day: 1 }, // October 1
} as const;

/**
 * Fee amounts (in USD)
 * Note: These change periodically, centralize for easy updates
 */
export const APPLICATION_FEES = {
  I765_OPT: 410, // Form I-765 (OPT)
  I765_STEM: 410, // Form I-765 (STEM OPT)
  I983: 0, // Form I-983 (no fee)
  I129_BASE: 460, // Form I-129 base fee
  I129_PREMIUM: 2500, // Premium processing
  H1B_REGISTRATION: 10, // H1B lottery registration
  SSN: 0, // Social Security Number (no fee)
  ADDRESS_CHANGE: 0, // AR-11 (no fee)
} as const;

/**
 * Deadline priority thresholds (in days)
 * Used to determine urgency level
 */
export const PRIORITY_THRESHOLDS = {
  CRITICAL: 3, // Less than 3 days = critical
  HIGH: 7, // Less than 7 days = high
  MEDIUM: 30, // Less than 30 days = medium
  LOW: 90, // More than 30 days = low
} as const;

/**
 * Notification intervals (days before deadline to notify)
 */
export const NOTIFICATION_INTERVALS = {
  CRITICAL_DEADLINES: [30, 14, 7, 3, 1], // OPT deadlines, H1B registration
  IMPORTANT_DEADLINES: [30, 14, 7], // Document expiry, STEM deadlines
  ROUTINE_DEADLINES: [30, 7], // Address changes, reporting
  DOCUMENT_EXPIRY: [180, 90, 60, 30], // 6mo, 3mo, 2mo, 1mo before expiry
} as const;

/**
 * Unemployment tracking
 */
export const UNEMPLOYMENT_LIMITS = {
  OPT_STANDARD: 90, // 90 days total during 12-month OPT
  OPT_STEM: 150, // 150 days total during 24-month STEM extension
  OPT_COMBINED: 240, // Combined limit for OPT + STEM (90 + 150)
} as const;

/**
 * Status-specific constants
 */
export const STATUS_CONSTANTS = {
  F1_VISA: {
    graceperiod: 60, // 60 days after program end
    maintenanceRequired: true,
    workRestrictions: 'On-campus only during school, off-campus with authorization',
  },
  
  OPT: {
    maxDuration: 12, // months
    unemploymentLimit: 90, // days
    travelRestrictions: 'Valid EAD card and valid I-20 required for re-entry',
  },
  
  STEM_OPT: {
    maxDuration: 24, // months
    unemploymentLimit: 150, // days
    reportingRequirement: 'Every 6 months',
    eligibleDegrees: 'STEM designated degree program',
  },
  
  H1B: {
    maxInitialDuration: 36, // months
    maxTotalDuration: 72, // months (6 years)
    employerDependent: true,
    portability: 'Can change employers with approved petition',
  },
} as const;

/**
 * Map deadline types to their offset constants
 */
export const DEADLINE_TYPE_OFFSETS: Record<DeadlineType, number | null> = {
  [DeadlineType.OPT_APPLICATION_WINDOW_START]: DEADLINE_OFFSETS.OPT_APPLICATION_START,
  [DeadlineType.OPT_APPLICATION_DEADLINE]: DEADLINE_OFFSETS.OPT_APPLICATION_DEADLINE,
  [DeadlineType.OPT_GRACE_PERIOD_END]: DEADLINE_OFFSETS.GRACE_PERIOD,
  [DeadlineType.UNEMPLOYMENT_90_DAY_LIMIT]: DEADLINE_OFFSETS.UNEMPLOYMENT_LIMIT,
  [DeadlineType.EMPLOYMENT_START_DATE]: null, // User-specific
  [DeadlineType.STEM_OPT_APPLICATION_DEADLINE]: DEADLINE_OFFSETS.STEM_APPLICATION_DEADLINE,
  [DeadlineType.STEM_REPORTING_REQUIREMENT]: DEADLINE_OFFSETS.STEM_REPORTING_INTERVAL,
  [DeadlineType.H1B_REGISTRATION_PERIOD]: DEADLINE_OFFSETS.H1B_REGISTRATION_START,
  [DeadlineType.H1B_LOTTERY_RESULTS]: DEADLINE_OFFSETS.H1B_LOTTERY_RESULTS,
  [DeadlineType.H1B_PETITION_FILING]: DEADLINE_OFFSETS.H1B_PETITION_DEADLINE,
  [DeadlineType.H1B_START_DATE]: DEADLINE_OFFSETS.H1B_START_DATE,
  [DeadlineType.CAP_GAP_EXTENSION]: null, // Calculated
  [DeadlineType.ADDRESS_CHANGE_REPORT]: DEADLINE_OFFSETS.ADDRESS_CHANGE_DEADLINE,
  [DeadlineType.DSO_EMPLOYMENT_REPORT]: DEADLINE_OFFSETS.EMPLOYMENT_REPORT_DEADLINE,
  [DeadlineType.PASSPORT_EXPIRY]: DEADLINE_OFFSETS.PASSPORT_EXPIRY_WARNING,
  [DeadlineType.VISA_EXPIRY]: DEADLINE_OFFSETS.VISA_EXPIRY_WARNING,
  [DeadlineType.I20_EXPIRY]: null,
  [DeadlineType.EAD_EXPIRY]: DEADLINE_OFFSETS.EAD_EXPIRY_WARNING,
  [DeadlineType.H1B_EXPIRY]: null,
  [DeadlineType.CUSTOM]: null,
};

/**
 * Processing time structure
 */
export interface ProcessingTime {
  min: number;
  max: number;
  average: number;
  notes: string;
}

/**
 * Map form types to processing times
 */
export const FORM_PROCESSING_TIMES: Record<FormType, ProcessingTime> = {
  [FormType.I765_OPT]: PROCESSING_TIMES.OPT_APPLICATION,
  [FormType.I765_STEM]: PROCESSING_TIMES.STEM_OPT_APPLICATION,
  [FormType.I983]: PROCESSING_TIMES.STEM_OPT_APPLICATION,
  [FormType.I129]: PROCESSING_TIMES.H1B_PETITION,
  [FormType.LCA]: { min: 0.25, max: 1, average: 0.5, notes: 'Labor Condition Application' },
  [FormType.I20]: { min: 0, max: 0.5, average: 0.25, notes: 'Issued by school DSO' },
  [FormType.I94]: { min: 0, max: 0, average: 0, notes: 'Automatic at port of entry' },
  [FormType.AR11]: PROCESSING_TIMES.ADDRESS_CHANGE,
  [FormType.SSN_APPLICATION]: PROCESSING_TIMES.SSN_APPLICATION,
  [FormType.CUSTOM]: { min: 0, max: 0, average: 0, notes: 'Custom form' },
};

/**
 * Helper to get processing time for a form
 */
export function getFormProcessingTime(formType: FormType): ProcessingTime {
  return FORM_PROCESSING_TIMES[formType];
}

/**
 * Helper to get notification intervals based on deadline priority
 */
export function getNotificationIntervalsForDeadline(isCritical: boolean): readonly number[] {
  return isCritical 
    ? NOTIFICATION_INTERVALS.CRITICAL_DEADLINES 
    : NOTIFICATION_INTERVALS.IMPORTANT_DEADLINES;
}

/**
 * Helper to determine if a deadline is critical
 */
export function isCriticalDeadlineType(deadlineType: DeadlineType): boolean {
  const criticalTypes: DeadlineType[] = [
    DeadlineType.OPT_APPLICATION_DEADLINE,
    DeadlineType.OPT_GRACE_PERIOD_END,
    DeadlineType.UNEMPLOYMENT_90_DAY_LIMIT,
    DeadlineType.H1B_REGISTRATION_PERIOD,
    DeadlineType.EAD_EXPIRY,
  ];
  
  return criticalTypes.includes(deadlineType);
}

/**
 * Export all constants
 */
export default {
  PROCESSING_TIMES,
  DEADLINE_OFFSETS,
  WORK_AUTHORIZATION_DURATION,
  ANNUAL_IMMIGRATION_DATES,
  APPLICATION_FEES,
  PRIORITY_THRESHOLDS,
  NOTIFICATION_INTERVALS,
  UNEMPLOYMENT_LIMITS,
  STATUS_CONSTANTS,
  DEADLINE_TYPE_OFFSETS,
  FORM_PROCESSING_TIMES,
  getFormProcessingTime,
  getNotificationIntervalsForDeadline,
  isCriticalDeadlineType,
};

