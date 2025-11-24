/**
 * Date Calculation Utilities
 * Immigration-specific date calculations based on diagram.svg timing rules
 */

import {
  addDays,
  addMonths,
  subDays,
  differenceInDays,
  differenceInMonths,
  isWeekend,
  addBusinessDays,
  format,
  parseISO,
  startOfDay,
  endOfDay,
  isBefore,
  isAfter,
  isSameDay,
} from 'date-fns';

/**
 * Calculate OPT application window start date (90 days before graduation)
 */
export function calculateOptApplicationStart(graduationDate: Date): Date {
  return subDays(graduationDate, 90);
}

/**
 * Calculate OPT application deadline (60 days after program end)
 */
export function calculateOptApplicationDeadline(programEndDate: Date): Date {
  return addDays(programEndDate, 60);
}

/**
 * Calculate grace period end date (60 days after program end)
 */
export function calculateGracePeriodEnd(programEndDate: Date): Date {
  return addDays(programEndDate, 60);
}

/**
 * Calculate unemployment limit for OPT (90 days from OPT start)
 */
export function calculateUnemploymentLimit(optStartDate: Date): Date {
  return addDays(optStartDate, 90);
}

/**
 * Calculate STEM OPT application deadline
 * Must apply before current OPT expires
 */
export function calculateStemOptDeadline(currentOptExpiryDate: Date): Date {
  // Apply at least 30 days before current OPT expires
  return subDays(currentOptExpiryDate, 30);
}

/**
 * Calculate H1B registration period (typically March 1-18)
 */
export function calculateH1bRegistrationPeriod(year: number): {
  start: Date;
  end: Date;
} {
  return {
    start: new Date(year, 2, 1), // March 1st
    end: new Date(year, 2, 18), // March 18th
  };
}

/**
 * Calculate H1B start date (always October 1st)
 */
export function calculateH1bStartDate(year: number): Date {
  return new Date(year, 9, 1); // October 1st
}

/**
 * Calculate Cap-Gap extension period
 * From OPT expiry to H1B start date (Oct 1)
 */
export function calculateCapGapPeriod(
  optExpiryDate: Date,
  h1bYear: number
): { start: Date; end: Date } | null {
  const h1bStartDate = calculateH1bStartDate(h1bYear);
  
  if (isBefore(optExpiryDate, h1bStartDate)) {
    return {
      start: optExpiryDate,
      end: h1bStartDate,
    };
  }
  
  return null; // No cap-gap needed
}

/**
 * Calculate days remaining until a deadline
 */
export function daysUntilDeadline(deadline: Date): number {
  const now = startOfDay(new Date());
  const deadlineDay = startOfDay(deadline);
  return differenceInDays(deadlineDay, now);
}

/**
 * Calculate months remaining until a date
 */
export function monthsUntilDate(targetDate: Date): number {
  const now = new Date();
  return differenceInMonths(targetDate, now);
}

/**
 * Check if a date is in the past
 */
export function isPastDate(date: Date): boolean {
  return isBefore(startOfDay(date), startOfDay(new Date()));
}

/**
 * Check if a date is in the future
 */
export function isFutureDate(date: Date): boolean {
  return isAfter(startOfDay(date), startOfDay(new Date()));
}

/**
 * Check if a date is today
 */
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

/**
 * Add business days (skipping weekends)
 * For processing time estimates
 */
export function addBusinessDaysToDate(startDate: Date, businessDays: number): Date {
  return addBusinessDays(startDate, businessDays);
}

/**
 * Calculate USCIS processing time estimate
 * @param formType - Type of form being processed
 * @returns Object with min and max processing dates
 */
export function calculateProcessingTimeEstimate(
  submissionDate: Date,
  minMonths: number,
  maxMonths: number
): { earliest: Date; latest: Date } {
  return {
    earliest: addMonths(submissionDate, minMonths),
    latest: addMonths(submissionDate, maxMonths),
  };
}

/**
 * Calculate OPT processing time (typically 3-5 months)
 */
export function calculateOptProcessingEstimate(applicationDate: Date): {
  earliest: Date;
  latest: Date;
} {
  return calculateProcessingTimeEstimate(applicationDate, 3, 5);
}

/**
 * Calculate H1B processing time (typically 3-6 months, or 15 days with premium)
 */
export function calculateH1bProcessingEstimate(
  filingDate: Date,
  isPremium: boolean = false
): { earliest: Date; latest: Date } {
  if (isPremium) {
    return {
      earliest: addBusinessDaysToDate(filingDate, 15),
      latest: addBusinessDaysToDate(filingDate, 15),
    };
  }
  return calculateProcessingTimeEstimate(filingDate, 3, 6);
}

/**
 * Calculate next deadline notification dates
 * @param deadline - The deadline date
 * @param daysBefore - Array of days before to notify (e.g., [30, 14, 7, 3, 1])
 * @returns Array of notification dates
 */
export function calculateNotificationDates(
  deadline: Date,
  daysBefore: number[]
): Date[] {
  return daysBefore
    .map(days => subDays(deadline, days))
    .filter(date => isFutureDate(date))
    .sort((a, b) => a.getTime() - b.getTime());
}

/**
 * Format date for display
 */
export function formatDisplayDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMM dd, yyyy');
}

/**
 * Format date with time
 */
export function formatDisplayDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMM dd, yyyy hh:mm a');
}

/**
 * Format date as relative time (e.g., "in 30 days", "2 months ago")
 */
export function formatRelativeDate(date: Date): string {
  const days = daysUntilDeadline(date);
  
  if (days < 0) {
    const absDays = Math.abs(days);
    if (absDays === 1) return '1 day ago';
    if (absDays < 30) return `${absDays} days ago`;
    const months = Math.floor(absDays / 30);
    return months === 1 ? '1 month ago' : `${months} months ago`;
  }
  
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days < 30) return `in ${days} days`;
  
  const months = Math.floor(days / 30);
  return months === 1 ? 'in 1 month' : `in ${months} months`;
}

/**
 * Calculate deadline urgency level
 * @returns 'critical' | 'high' | 'medium' | 'low'
 */
export function getDeadlineUrgency(deadline: Date): 'critical' | 'high' | 'medium' | 'low' {
  const days = daysUntilDeadline(deadline);
  
  if (days < 0) return 'critical'; // Overdue
  if (days <= 3) return 'critical';
  if (days <= 7) return 'high';
  if (days <= 30) return 'medium';
  return 'low';
}

/**
 * Check if deadline is within warning period
 */
export function isWithinWarningPeriod(deadline: Date, warningDays: number = 14): boolean {
  const days = daysUntilDeadline(deadline);
  return days >= 0 && days <= warningDays;
}

/**
 * Parse date from ISO string or Date object
 */
export function parseDate(date: Date | string | undefined): Date | null {
  if (!date) return null;
  if (date instanceof Date) return date;
  try {
    return parseISO(date);
  } catch {
    return null;
  }
}

/**
 * Convert Date to ISO string for storage
 */
export function toISOString(date: Date | string | undefined): string | undefined {
  if (!date) return undefined;
  if (typeof date === 'string') return date;
  return date.toISOString();
}

/**
 * Check if a date falls on a weekend
 */
export function isWeekendDay(date: Date): boolean {
  return isWeekend(date);
}

/**
 * Get next business day (skip weekends)
 */
export function getNextBusinessDay(date: Date): Date {
  let nextDay = addDays(date, 1);
  while (isWeekend(nextDay)) {
    nextDay = addDays(nextDay, 1);
  }
  return nextDay;
}

/**
 * Calculate address change deadline (10 days after moving)
 */
export function calculateAddressChangeDeadline(moveDate: Date): Date {
  return addDays(moveDate, 10);
}

/**
 * Calculate STEM reporting deadline (every 6 months)
 */
export function calculateStemReportingDeadlines(
  stemOptStartDate: Date,
  stemOptEndDate: Date
): Date[] {
  const deadlines: Date[] = [];
  let currentDate = addMonths(stemOptStartDate, 6);
  
  while (isBefore(currentDate, stemOptEndDate)) {
    deadlines.push(currentDate);
    currentDate = addMonths(currentDate, 6);
  }
  
  return deadlines;
}

/**
 * Validate if a date is reasonable for immigration purposes
 * (not too far in past or future)
 */
export function isReasonableDate(date: Date): boolean {
  const now = new Date();
  const tenYearsAgo = subDays(now, 365 * 10);
  const tenYearsFromNow = addDays(now, 365 * 10);
  
  return isAfter(date, tenYearsAgo) && isBefore(date, tenYearsFromNow);
}

