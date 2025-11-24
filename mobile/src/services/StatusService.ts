/**
 * Status Service
 * Handles immigration status transitions and validation
 */

import { ImmigrationStatus, ImmigrationPhase, StatusToPhase } from '../models/ImmigrationStatus';

/**
 * Valid status transitions map
 * Defines which statuses can transition to which other statuses
 */
const VALID_TRANSITIONS: Record<ImmigrationStatus, ImmigrationStatus[]> = {
  // F-1 Student Phase
  [ImmigrationStatus.F1_STUDENT]: [
    ImmigrationStatus.GRADUATED,
    ImmigrationStatus.OPT_NOT_APPLIED,
    ImmigrationStatus.OTHER,
  ],
  
  [ImmigrationStatus.GRADUATED]: [
    ImmigrationStatus.OPT_NOT_APPLIED,
    ImmigrationStatus.OPT_PENDING,
    ImmigrationStatus.OTHER,
  ],
  
  // OPT Phase
  [ImmigrationStatus.OPT_NOT_APPLIED]: [
    ImmigrationStatus.OPT_PENDING,
    ImmigrationStatus.STATUS_EXPIRED,
  ],
  
  [ImmigrationStatus.OPT_PENDING]: [
    ImmigrationStatus.OPT_APPROVED,
    ImmigrationStatus.OPT_NOT_APPLIED, // If denied, may reapply
    ImmigrationStatus.STATUS_EXPIRED,
  ],
  
  [ImmigrationStatus.OPT_APPROVED]: [
    ImmigrationStatus.EAD_RECEIVED,
  ],
  
  [ImmigrationStatus.EAD_RECEIVED]: [
    ImmigrationStatus.JOB_SEARCHING,
    ImmigrationStatus.JOB_OFFER_RECEIVED,
    ImmigrationStatus.EMPLOYED,
    ImmigrationStatus.STEM_OPT_ELIGIBLE,
  ],
  
  // Employment Phase
  [ImmigrationStatus.JOB_SEARCHING]: [
    ImmigrationStatus.JOB_OFFER_RECEIVED,
    ImmigrationStatus.EMPLOYED,
    ImmigrationStatus.STATUS_EXPIRED,
  ],
  
  [ImmigrationStatus.JOB_OFFER_RECEIVED]: [
    ImmigrationStatus.EMPLOYED,
    ImmigrationStatus.JOB_SEARCHING, // If offer falls through
  ],
  
  [ImmigrationStatus.EMPLOYED]: [
    ImmigrationStatus.STEM_OPT_ELIGIBLE,
    ImmigrationStatus.STEM_OPT_PENDING,
    ImmigrationStatus.H1B_PREPARING,
    ImmigrationStatus.H1B_REGISTERED,
    ImmigrationStatus.JOB_SEARCHING, // If job ends
    ImmigrationStatus.STATUS_EXPIRED,
  ],
  
  // STEM OPT Phase
  [ImmigrationStatus.STEM_OPT_ELIGIBLE]: [
    ImmigrationStatus.STEM_OPT_PENDING,
    ImmigrationStatus.EMPLOYED, // If choose not to apply
    ImmigrationStatus.STATUS_EXPIRED,
  ],
  
  [ImmigrationStatus.STEM_OPT_PENDING]: [
    ImmigrationStatus.STEM_OPT_APPROVED,
    ImmigrationStatus.STEM_OPT_ELIGIBLE, // If denied
    ImmigrationStatus.STATUS_EXPIRED,
  ],
  
  [ImmigrationStatus.STEM_OPT_APPROVED]: [
    ImmigrationStatus.EMPLOYED,
    ImmigrationStatus.H1B_PREPARING,
    ImmigrationStatus.STATUS_EXPIRED,
  ],
  
  // H1B Phase
  [ImmigrationStatus.H1B_PREPARING]: [
    ImmigrationStatus.H1B_REGISTERED,
    ImmigrationStatus.EMPLOYED, // If decide not to pursue H1B
  ],
  
  [ImmigrationStatus.H1B_REGISTERED]: [
    ImmigrationStatus.H1B_SELECTED,
    ImmigrationStatus.H1B_NOT_SELECTED,
  ],
  
  [ImmigrationStatus.H1B_SELECTED]: [
    ImmigrationStatus.H1B_PETITION_FILED,
  ],
  
  [ImmigrationStatus.H1B_PETITION_FILED]: [
    ImmigrationStatus.H1B_APPROVED,
    ImmigrationStatus.H1B_PREPARING, // If denied, can try again
    ImmigrationStatus.STATUS_EXPIRED,
  ],
  
  [ImmigrationStatus.H1B_APPROVED]: [
    ImmigrationStatus.H1B_ACTIVE,
  ],
  
  [ImmigrationStatus.H1B_ACTIVE]: [
    ImmigrationStatus.OTHER, // Could transition to green card process, etc.
  ],
  
  // Alternative/End States
  [ImmigrationStatus.H1B_NOT_SELECTED]: [
    ImmigrationStatus.H1B_PREPARING, // Try again next year
    ImmigrationStatus.EMPLOYED, // Continue on OPT/STEM OPT
    ImmigrationStatus.STATUS_EXPIRED,
  ],
  
  [ImmigrationStatus.STATUS_EXPIRED]: [
    ImmigrationStatus.OTHER,
  ],
  
  [ImmigrationStatus.OTHER]: [
    // Can transition to any status for manual correction
    ...Object.values(ImmigrationStatus),
  ],
};

/**
 * Check if a status transition is valid
 */
export function isValidTransition(
  currentStatus: ImmigrationStatus,
  newStatus: ImmigrationStatus
): boolean {
  if (currentStatus === newStatus) {
    return true; // Staying in same status is always valid
  }
  
  const allowedTransitions = VALID_TRANSITIONS[currentStatus];
  return allowedTransitions.includes(newStatus);
}

/**
 * Get all possible next statuses from current status
 */
export function getNextStatuses(currentStatus: ImmigrationStatus): ImmigrationStatus[] {
  return VALID_TRANSITIONS[currentStatus] || [];
}

/**
 * Get the most likely next status based on current status
 */
export function getRecommendedNextStatus(currentStatus: ImmigrationStatus): ImmigrationStatus | null {
  const nextStatuses = getNextStatuses(currentStatus);
  
  if (nextStatuses.length === 0) {
    return null;
  }
  
  // Return the most common/expected next status
  const recommendations: Record<ImmigrationStatus, ImmigrationStatus> = {
    [ImmigrationStatus.F1_STUDENT]: ImmigrationStatus.GRADUATED,
    [ImmigrationStatus.GRADUATED]: ImmigrationStatus.OPT_PENDING,
    [ImmigrationStatus.OPT_NOT_APPLIED]: ImmigrationStatus.OPT_PENDING,
    [ImmigrationStatus.OPT_PENDING]: ImmigrationStatus.OPT_APPROVED,
    [ImmigrationStatus.OPT_APPROVED]: ImmigrationStatus.EAD_RECEIVED,
    [ImmigrationStatus.EAD_RECEIVED]: ImmigrationStatus.JOB_SEARCHING,
    [ImmigrationStatus.JOB_SEARCHING]: ImmigrationStatus.JOB_OFFER_RECEIVED,
    [ImmigrationStatus.JOB_OFFER_RECEIVED]: ImmigrationStatus.EMPLOYED,
    [ImmigrationStatus.EMPLOYED]: ImmigrationStatus.H1B_PREPARING,
    [ImmigrationStatus.STEM_OPT_ELIGIBLE]: ImmigrationStatus.STEM_OPT_PENDING,
    [ImmigrationStatus.STEM_OPT_PENDING]: ImmigrationStatus.STEM_OPT_APPROVED,
    [ImmigrationStatus.STEM_OPT_APPROVED]: ImmigrationStatus.EMPLOYED,
    [ImmigrationStatus.H1B_PREPARING]: ImmigrationStatus.H1B_REGISTERED,
    [ImmigrationStatus.H1B_REGISTERED]: ImmigrationStatus.H1B_SELECTED,
    [ImmigrationStatus.H1B_SELECTED]: ImmigrationStatus.H1B_PETITION_FILED,
    [ImmigrationStatus.H1B_PETITION_FILED]: ImmigrationStatus.H1B_APPROVED,
    [ImmigrationStatus.H1B_APPROVED]: ImmigrationStatus.H1B_ACTIVE,
    [ImmigrationStatus.H1B_NOT_SELECTED]: ImmigrationStatus.H1B_PREPARING,
    [ImmigrationStatus.H1B_ACTIVE]: ImmigrationStatus.OTHER,
    [ImmigrationStatus.STATUS_EXPIRED]: ImmigrationStatus.OTHER,
    [ImmigrationStatus.OTHER]: ImmigrationStatus.F1_STUDENT,
  };
  
  return recommendations[currentStatus] || nextStatuses[0];
}

/**
 * Get the current phase from status
 */
export function getCurrentPhase(status: ImmigrationStatus): ImmigrationPhase {
  return StatusToPhase[status];
}

/**
 * Check if status is in a specific phase
 */
export function isInPhase(status: ImmigrationStatus, phase: ImmigrationPhase): boolean {
  return getCurrentPhase(status) === phase;
}

/**
 * Check if status is a terminal state (no further transitions)
 */
export function isTerminalStatus(status: ImmigrationStatus): boolean {
  const nextStatuses = getNextStatuses(status);
  return nextStatuses.length === 0 || 
         (nextStatuses.length === 1 && nextStatuses[0] === ImmigrationStatus.OTHER);
}

/**
 * Check if status requires immediate action
 */
export function requiresImmediateAction(status: ImmigrationStatus): boolean {
  const urgentStatuses: ImmigrationStatus[] = [
    ImmigrationStatus.OPT_NOT_APPLIED,
    ImmigrationStatus.GRADUATED,
    ImmigrationStatus.STATUS_EXPIRED,
    ImmigrationStatus.H1B_SELECTED, // Must file petition
  ];
  
  return urgentStatuses.includes(status);
}

/**
 * Check if status allows employment
 */
export function canWork(status: ImmigrationStatus): boolean {
  const workAuthorizedStatuses: ImmigrationStatus[] = [
    ImmigrationStatus.EAD_RECEIVED,
    ImmigrationStatus.JOB_SEARCHING,
    ImmigrationStatus.JOB_OFFER_RECEIVED,
    ImmigrationStatus.EMPLOYED,
    ImmigrationStatus.STEM_OPT_APPROVED,
    ImmigrationStatus.H1B_ACTIVE,
  ];
  
  return workAuthorizedStatuses.includes(status);
}

/**
 * Check if status is eligible for STEM OPT
 */
export function isStemOptEligible(
  status: ImmigrationStatus,
  hasStemDegree: boolean
): boolean {
  if (!hasStemDegree) {
    return false;
  }
  
  const eligibleStatuses: ImmigrationStatus[] = [
    ImmigrationStatus.OPT_APPROVED,
    ImmigrationStatus.EAD_RECEIVED,
    ImmigrationStatus.EMPLOYED,
  ];
  
  return eligibleStatuses.includes(status);
}

/**
 * Check if status is eligible for H1B
 */
export function isH1bEligible(status: ImmigrationStatus, hasJobOffer: boolean): boolean {
  if (!hasJobOffer) {
    return false;
  }
  
  const eligibleStatuses: ImmigrationStatus[] = [
    ImmigrationStatus.EMPLOYED,
    ImmigrationStatus.STEM_OPT_APPROVED,
  ];
  
  return eligibleStatuses.includes(status);
}

/**
 * Get status progression path (typical journey)
 */
export function getTypicalProgressionPath(startStatus: ImmigrationStatus): ImmigrationStatus[] {
  const progressions: Partial<Record<ImmigrationStatus, ImmigrationStatus[]>> = {
    [ImmigrationStatus.F1_STUDENT]: [
      ImmigrationStatus.F1_STUDENT,
      ImmigrationStatus.GRADUATED,
      ImmigrationStatus.OPT_PENDING,
      ImmigrationStatus.OPT_APPROVED,
      ImmigrationStatus.EAD_RECEIVED,
      ImmigrationStatus.EMPLOYED,
      ImmigrationStatus.H1B_PREPARING,
      ImmigrationStatus.H1B_REGISTERED,
      ImmigrationStatus.H1B_SELECTED,
      ImmigrationStatus.H1B_PETITION_FILED,
      ImmigrationStatus.H1B_APPROVED,
      ImmigrationStatus.H1B_ACTIVE,
    ],
  };
  
  return progressions[startStatus] || [startStatus];
}

/**
 * Validate status transition and return error message if invalid
 */
export function validateTransition(
  currentStatus: ImmigrationStatus,
  newStatus: ImmigrationStatus
): { valid: boolean; error?: string } {
  if (currentStatus === newStatus) {
    return { valid: true };
  }
  
  if (!isValidTransition(currentStatus, newStatus)) {
    return {
      valid: false,
      error: `Cannot transition from ${currentStatus} to ${newStatus}. This transition is not allowed.`,
    };
  }
  
  return { valid: true };
}

/**
 * Get status transition suggestions with reasons
 */
export function getTransitionSuggestions(currentStatus: ImmigrationStatus): Array<{
  status: ImmigrationStatus;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}> {
  const suggestions: Array<{
    status: ImmigrationStatus;
    reason: string;
    priority: 'high' | 'medium' | 'low';
  }> = [];
  
  const nextStatuses = getNextStatuses(currentStatus);
  const recommended = getRecommendedNextStatus(currentStatus);
  
  nextStatuses.forEach(status => {
    const isRecommended = status === recommended;
    const priority = isRecommended ? 'high' : 'medium';
    
    const reasons: Record<string, string> = {
      [`${ImmigrationStatus.OPT_PENDING}`]: 'Submit OPT application to USCIS',
      [`${ImmigrationStatus.EAD_RECEIVED}`]: 'EAD card has arrived',
      [`${ImmigrationStatus.EMPLOYED}`]: 'Started working with valid authorization',
      [`${ImmigrationStatus.STEM_OPT_PENDING}`]: 'Apply for 24-month STEM extension',
      [`${ImmigrationStatus.H1B_REGISTERED}`]: 'Employer registered for H1B lottery',
      [`${ImmigrationStatus.H1B_ACTIVE}`]: 'H1B status is now effective',
    };
    
    suggestions.push({
      status,
      reason: reasons[status] || 'Next step in immigration process',
      priority,
    });
  });
  
  return suggestions.sort((a, b) => {
    if (a.priority === 'high' && b.priority !== 'high') return -1;
    if (a.priority !== 'high' && b.priority === 'high') return 1;
    return 0;
  });
}

/**
 * Export the status service
 */
export const StatusService = {
  isValidTransition,
  getNextStatuses,
  getRecommendedNextStatus,
  getCurrentPhase,
  isInPhase,
  isTerminalStatus,
  requiresImmediateAction,
  canWork,
  isStemOptEligible,
  isH1bEligible,
  getTypicalProgressionPath,
  validateTransition,
  getTransitionSuggestions,
};

export default StatusService;

