/**
 * Immigration Status Types
 * Based on the F-1 → OPT → H1B immigration flow diagram
 */

/**
 * Core immigration status enum representing user's current position in the process
 */
export enum ImmigrationStatus {
  // F-1 Student Phase
  F1_STUDENT = 'F1_STUDENT',
  GRADUATED = 'GRADUATED',

  // OPT Phase
  OPT_NOT_APPLIED = 'OPT_NOT_APPLIED',
  OPT_PENDING = 'OPT_PENDING',
  OPT_APPROVED = 'OPT_APPROVED',
  EAD_RECEIVED = 'EAD_RECEIVED',

  // Employment Phase
  JOB_SEARCHING = 'JOB_SEARCHING',
  JOB_OFFER_RECEIVED = 'JOB_OFFER_RECEIVED',
  EMPLOYED = 'EMPLOYED',

  // STEM OPT Extension Phase
  STEM_OPT_ELIGIBLE = 'STEM_OPT_ELIGIBLE',
  STEM_OPT_PENDING = 'STEM_OPT_PENDING',
  STEM_OPT_APPROVED = 'STEM_OPT_APPROVED',

  // H1B Phase
  H1B_PREPARING = 'H1B_PREPARING',
  H1B_REGISTERED = 'H1B_REGISTERED',
  H1B_SELECTED = 'H1B_SELECTED',
  H1B_PETITION_FILED = 'H1B_PETITION_FILED',
  H1B_APPROVED = 'H1B_APPROVED',
  H1B_ACTIVE = 'H1B_ACTIVE',

  // Alternative/End States
  H1B_NOT_SELECTED = 'H1B_NOT_SELECTED',
  STATUS_EXPIRED = 'STATUS_EXPIRED',
  OTHER = 'OTHER',
}

/**
 * Human-readable labels for each status
 */
export const ImmigrationStatusLabels: Record<ImmigrationStatus, string> = {
  [ImmigrationStatus.F1_STUDENT]: 'F-1 Student',
  [ImmigrationStatus.GRADUATED]: 'Graduated',
  [ImmigrationStatus.OPT_NOT_APPLIED]: 'OPT Not Applied',
  [ImmigrationStatus.OPT_PENDING]: 'OPT Application Pending',
  [ImmigrationStatus.OPT_APPROVED]: 'OPT Approved',
  [ImmigrationStatus.EAD_RECEIVED]: 'EAD Card Received',
  [ImmigrationStatus.JOB_SEARCHING]: 'Job Searching',
  [ImmigrationStatus.JOB_OFFER_RECEIVED]: 'Job Offer Received',
  [ImmigrationStatus.EMPLOYED]: 'Employed',
  [ImmigrationStatus.STEM_OPT_ELIGIBLE]: 'STEM OPT Eligible',
  [ImmigrationStatus.STEM_OPT_PENDING]: 'STEM OPT Extension Pending',
  [ImmigrationStatus.STEM_OPT_APPROVED]: 'STEM OPT Approved (24 months)',
  [ImmigrationStatus.H1B_PREPARING]: 'Preparing for H1B',
  [ImmigrationStatus.H1B_REGISTERED]: 'H1B Registered (March)',
  [ImmigrationStatus.H1B_SELECTED]: 'H1B Lottery Selected',
  [ImmigrationStatus.H1B_PETITION_FILED]: 'H1B Petition Filed',
  [ImmigrationStatus.H1B_APPROVED]: 'H1B Approved',
  [ImmigrationStatus.H1B_ACTIVE]: 'H1B Work Authorization Active',
  [ImmigrationStatus.H1B_NOT_SELECTED]: 'H1B Lottery Not Selected',
  [ImmigrationStatus.STATUS_EXPIRED]: 'Status Expired',
  [ImmigrationStatus.OTHER]: 'Other Status',
};

/**
 * Status descriptions with actionable information
 */
export const ImmigrationStatusDescriptions: Record<ImmigrationStatus, string> = {
  [ImmigrationStatus.F1_STUDENT]: 'Currently enrolled as F-1 student. Plan to apply for OPT 90 days before graduation.',
  [ImmigrationStatus.GRADUATED]: 'Graduated from university. Apply for OPT within your grace period.',
  [ImmigrationStatus.OPT_NOT_APPLIED]: 'Eligible to apply for OPT. Application must be filed within 90 days before to 60 days after program end.',
  [ImmigrationStatus.OPT_PENDING]: 'OPT application (Form I-765) submitted to USCIS. Processing time: 3-5 months.',
  [ImmigrationStatus.OPT_APPROVED]: 'OPT approved by USCIS. Waiting for EAD card arrival.',
  [ImmigrationStatus.EAD_RECEIVED]: 'EAD card received. Can begin employment and apply for SSN.',
  [ImmigrationStatus.JOB_SEARCHING]: 'Authorized to search for employment. Must maintain valid status.',
  [ImmigrationStatus.JOB_OFFER_RECEIVED]: 'Job offer received. Coordinate start date with EAD validity.',
  [ImmigrationStatus.EMPLOYED]: 'Currently employed with valid work authorization.',
  [ImmigrationStatus.STEM_OPT_ELIGIBLE]: 'Eligible for 24-month STEM OPT extension with qualifying degree.',
  [ImmigrationStatus.STEM_OPT_PENDING]: 'STEM OPT extension application submitted. Must apply before current OPT expires.',
  [ImmigrationStatus.STEM_OPT_APPROVED]: 'STEM OPT extension approved. Total work authorization: 36 months (12 + 24).',
  [ImmigrationStatus.H1B_PREPARING]: 'Preparing for H1B application. Discuss with employer about sponsorship.',
  [ImmigrationStatus.H1B_REGISTERED]: 'H1B registration submitted during March window. Awaiting lottery results.',
  [ImmigrationStatus.H1B_SELECTED]: 'Selected in H1B lottery! Prepare to file full petition (Form I-129).',
  [ImmigrationStatus.H1B_PETITION_FILED]: 'H1B petition filed with USCIS. Processing time: 3-6 months (or 15 days with premium processing).',
  [ImmigrationStatus.H1B_APPROVED]: 'H1B petition approved. Work authorization begins October 1st.',
  [ImmigrationStatus.H1B_ACTIVE]: 'H1B work authorization active. Valid for 3 years, renewable up to 6 years.',
  [ImmigrationStatus.H1B_NOT_SELECTED]: 'Not selected in H1B lottery. Consider alternatives or reapply next year.',
  [ImmigrationStatus.STATUS_EXPIRED]: 'Current immigration status has expired. Seek immediate legal consultation.',
  [ImmigrationStatus.OTHER]: 'Other immigration status not listed above.',
};

/**
 * Phase groupings for better organization
 */
export enum ImmigrationPhase {
  STUDENT = 'STUDENT',
  OPT = 'OPT',
  EMPLOYMENT = 'EMPLOYMENT',
  STEM_OPT = 'STEM_OPT',
  H1B = 'H1B',
  OTHER = 'OTHER',
}

/**
 * Map status to phase
 */
export const StatusToPhase: Record<ImmigrationStatus, ImmigrationPhase> = {
  [ImmigrationStatus.F1_STUDENT]: ImmigrationPhase.STUDENT,
  [ImmigrationStatus.GRADUATED]: ImmigrationPhase.STUDENT,
  [ImmigrationStatus.OPT_NOT_APPLIED]: ImmigrationPhase.OPT,
  [ImmigrationStatus.OPT_PENDING]: ImmigrationPhase.OPT,
  [ImmigrationStatus.OPT_APPROVED]: ImmigrationPhase.OPT,
  [ImmigrationStatus.EAD_RECEIVED]: ImmigrationPhase.OPT,
  [ImmigrationStatus.JOB_SEARCHING]: ImmigrationPhase.EMPLOYMENT,
  [ImmigrationStatus.JOB_OFFER_RECEIVED]: ImmigrationPhase.EMPLOYMENT,
  [ImmigrationStatus.EMPLOYED]: ImmigrationPhase.EMPLOYMENT,
  [ImmigrationStatus.STEM_OPT_ELIGIBLE]: ImmigrationPhase.STEM_OPT,
  [ImmigrationStatus.STEM_OPT_PENDING]: ImmigrationPhase.STEM_OPT,
  [ImmigrationStatus.STEM_OPT_APPROVED]: ImmigrationPhase.STEM_OPT,
  [ImmigrationStatus.H1B_PREPARING]: ImmigrationPhase.H1B,
  [ImmigrationStatus.H1B_REGISTERED]: ImmigrationPhase.H1B,
  [ImmigrationStatus.H1B_SELECTED]: ImmigrationPhase.H1B,
  [ImmigrationStatus.H1B_PETITION_FILED]: ImmigrationPhase.H1B,
  [ImmigrationStatus.H1B_APPROVED]: ImmigrationPhase.H1B,
  [ImmigrationStatus.H1B_ACTIVE]: ImmigrationPhase.H1B,
  [ImmigrationStatus.H1B_NOT_SELECTED]: ImmigrationPhase.H1B,
  [ImmigrationStatus.STATUS_EXPIRED]: ImmigrationPhase.OTHER,
  [ImmigrationStatus.OTHER]: ImmigrationPhase.OTHER,
};

/**
 * Phase labels
 */
export const ImmigrationPhaseLabels: Record<ImmigrationPhase, string> = {
  [ImmigrationPhase.STUDENT]: 'F-1 Student',
  [ImmigrationPhase.OPT]: 'OPT Phase',
  [ImmigrationPhase.EMPLOYMENT]: 'Employment',
  [ImmigrationPhase.STEM_OPT]: 'STEM OPT Extension',
  [ImmigrationPhase.H1B]: 'H1B Process',
  [ImmigrationPhase.OTHER]: 'Other',
};

