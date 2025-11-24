/**
 * Icon Mapping Utilities
 * Centralized icon selection logic for immigration-related UI elements
 */

/**
 * Get icon name for a deadline type
 * @param type - The deadline type from DeadlineType enum
 * @returns Material Community Icons icon name
 */
export function getDeadlineIcon(type: string): string {
  switch (type) {
    case 'OPT_APPLICATION_WINDOW_OPENS':
    case 'STEM_OPT_APPLICATION_WINDOW_OPENS':
      return 'calendar-clock';
    case 'OPT_APPLICATION_DEADLINE':
    case 'STEM_OPT_APPLICATION_DEADLINE':
      return 'calendar-alert';
    case 'EAD_EXPIRY':
      return 'card-account-details-outline';
    case 'I983_SUBMISSION':
      return 'file-document-edit';
    case 'H1B_LOTTERY':
      return 'ticket';
    case 'H1B_APPROVAL_EXPECTED':
      return 'check-circle-outline';
    default:
      return 'calendar';
  }
}

/**
 * Get icon name for an action category
 * @param category - The action category from ActionCategory enum
 * @returns Material Community Icons icon name
 */
export function getActionIcon(category: string): string {
  switch (category) {
    case 'APPLICATION':
      return 'file-document-edit';
    case 'DOCUMENTATION':
      return 'folder-open';
    case 'TRACKING':
      return 'magnify';
    case 'PREPARATION':
      return 'school';
    case 'EMPLOYER':
      return 'briefcase';
    default:
      return 'clipboard-check';
  }
}

/**
 * Get icon name for a timeline event type
 * @param type - The event type from TimelineEventType enum
 * @returns Material Community Icons icon name
 */
export function getEventIcon(type: string): string {
  switch (type) {
    case 'STATUS_CHANGE':
      return 'account-convert';
    case 'DEADLINE':
      return 'calendar-alert';
    case 'MILESTONE':
      return 'flag-checkered';
    case 'ACTION_REQUIRED':
      return 'alert-circle';
    case 'DOCUMENT_DUE':
      return 'file-document-alert';
    default:
      return 'information';
  }
}

/**
 * Get icon name for an immigration status
 * @param status - The immigration status
 * @returns Material Community Icons icon name
 */
export function getStatusIcon(status: string): string {
  if (status.includes('F1') || status.includes('STUDENT')) {
    return 'school';
  }
  if (status.includes('OPT')) {
    return 'briefcase-account';
  }
  if (status.includes('H1B')) {
    return 'badge-account';
  }
  return 'account';
}

