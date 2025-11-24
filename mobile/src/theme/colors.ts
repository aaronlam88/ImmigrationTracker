/**
 * Color Utilities
 * Centralized color definitions and helper functions for immigration tracker UI
 */

/**
 * Immigration-specific color palette
 */
export const ImmigrationColors = {
  /** Priority-based colors for deadlines and actions */
  priority: {
    CRITICAL: '#D32F2F',  // Red
    HIGH: '#F57C00',      // Orange
    MEDIUM: '#FBC02D',    // Yellow
    LOW: '#388E3C',       // Green
  },
  
  /** Status-based colors */
  status: {
    active: '#4CAF50',    // Green - Active/Approved
    pending: '#FBC02D',   // Yellow - Pending/In Progress
    expired: '#9E9E9E',   // Gray - Expired/Past
    denied: '#D32F2F',    // Red - Denied/Rejected
  },
  
  /** Event type colors */
  event: {
    deadline: '#F57C00',       // Orange - Urgent
    milestone: '#6750A4',      // Purple - Important
    normal: '#388E3C',         // Green - Regular
    actionRequired: '#F57C00', // Orange - Needs attention
  },
};

/**
 * Get color for a priority level
 * @param priority - Priority level (CRITICAL, HIGH, MEDIUM, LOW)
 * @returns Hex color code
 */
export function getPriorityColor(priority: string | undefined): string {
  if (!priority) return ImmigrationColors.priority.LOW;
  
  switch (priority.toUpperCase()) {
    case 'CRITICAL':
      return ImmigrationColors.priority.CRITICAL;
    case 'HIGH':
      return ImmigrationColors.priority.HIGH;
    case 'MEDIUM':
      return ImmigrationColors.priority.MEDIUM;
    case 'LOW':
      return ImmigrationColors.priority.LOW;
    default:
      return ImmigrationColors.priority.LOW;
  }
}

/**
 * Get color for a deadline based on days until due
 * @param daysUntil - Number of days until deadline
 * @returns Hex color code
 */
export function getDeadlineColorByDays(daysUntil: number): string {
  if (daysUntil <= 7) return ImmigrationColors.priority.CRITICAL;
  if (daysUntil <= 14) return ImmigrationColors.priority.HIGH;
  if (daysUntil <= 30) return ImmigrationColors.priority.MEDIUM;
  return ImmigrationColors.priority.LOW;
}

/**
 * Get color for a timeline event
 * @param type - Event type
 * @param isPast - Whether the event is in the past
 * @returns Hex color code
 */
export function getEventColor(type: string, isPast: boolean = false): string {
  if (isPast) return ImmigrationColors.status.expired;
  
  switch (type) {
    case 'DEADLINE':
    case 'ACTION_REQUIRED':
    case 'DOCUMENT_DUE':
      return ImmigrationColors.event.actionRequired;
    case 'MILESTONE':
      return ImmigrationColors.event.milestone;
    default:
      return ImmigrationColors.event.normal;
  }
}

/**
 * Get background color with opacity for chips/badges
 * @param color - Base hex color
 * @param opacity - Opacity value (0-1), defaults to 0.12
 * @returns Color string with opacity
 */
export function getColorWithOpacity(color: string, opacity: number = 0.12): string {
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Get label for a priority level
 * @param priority - Priority level
 * @returns Human-readable priority label
 */
export function getPriorityLabel(priority: string | undefined): string {
  if (!priority) return 'Low';
  
  switch (priority.toUpperCase()) {
    case 'CRITICAL':
      return 'Critical';
    case 'HIGH':
      return 'High';
    case 'MEDIUM':
      return 'Medium';
    case 'LOW':
      return 'Low';
    default:
      return 'Low';
  }
}

