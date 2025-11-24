/**
 * Timeframe Constants
 * Centralized time-related constants for immigration tracking logic
 */

/**
 * Time duration constants
 */
export const Timeframes = {
  /** Milliseconds in one day */
  MS_PER_DAY: 24 * 60 * 60 * 1000,
  
  /** Number of days to consider a deadline "urgent" */
  URGENT_DEADLINE_DAYS: 14,
  
  /** Number of days to consider a deadline "very urgent" */
  VERY_URGENT_DEADLINE_DAYS: 7,
  
  /** Number of days for "current actions" timeframe */
  CURRENT_ACTIONS_DAYS: 30,
  
  /** Number of days for "upcoming actions" timeframe */
  UPCOMING_ACTIONS_DAYS: 90,
  
  /** Number of days for "soon" events */
  SOON_DAYS: 30,
} as const;

/**
 * Display limits for lists
 */
export const DisplayLimits = {
  /** Maximum number of deadlines to show on status screen */
  MAX_DEADLINES_STATUS: 5,
  
  /** Maximum number of action items to show on status screen */
  MAX_ACTIONS_STATUS: 3,
  
  /** Maximum number of urgent deadlines to show on todo screen */
  MAX_URGENT_DEADLINES: 3,
  
  /** Maximum number of current actions to show on todo screen */
  MAX_CURRENT_ACTIONS: 5,
  
  /** Maximum number of upcoming actions to show on todo screen */
  MAX_UPCOMING_ACTIONS: 5,
} as const;

/**
 * Helper function to calculate date X days from now
 * @param days - Number of days to add
 * @param fromDate - Starting date (defaults to now)
 * @returns Date object
 */
export function getDaysFromNow(days: number, fromDate: Date = new Date()): Date {
  return new Date(fromDate.getTime() + days * Timeframes.MS_PER_DAY);
}

/**
 * Helper function to check if a date is within X days from now
 * @param date - Date to check
 * @param days - Number of days threshold
 * @returns True if date is within the threshold
 */
export function isWithinDays(date: Date | string, days: number): boolean {
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const threshold = getDaysFromNow(days);
  const now = new Date();
  
  return targetDate >= now && targetDate <= threshold;
}

/**
 * Helper function to check if a date is urgent (within URGENT_DEADLINE_DAYS)
 * @param date - Date to check
 * @returns True if date is urgent
 */
export function isUrgent(date: Date | string): boolean {
  return isWithinDays(date, Timeframes.URGENT_DEADLINE_DAYS);
}

/**
 * Helper function to check if a date is very urgent (within VERY_URGENT_DEADLINE_DAYS)
 * @param date - Date to check
 * @returns True if date is very urgent
 */
export function isVeryUrgent(date: Date | string): boolean {
  return isWithinDays(date, Timeframes.VERY_URGENT_DEADLINE_DAYS);
}

