/**
 * Profile Form Service
 * Smart form logic that shows/hides fields based on immigration status
 */

import { ImmigrationStatus } from '../models/ImmigrationStatus';

/**
 * Form field configuration for each immigration status
 */
export interface FormFieldConfig {
  /** Fields that must be filled */
  required: string[];
  /** Fields that are optional but recommended */
  optional: string[];
  /** Fields that should be hidden (not relevant) */
  hidden: string[];
  /** Help text for this status */
  helpText: string;
}

/**
 * Form field definitions by immigration status
 * This determines which fields to show/hide based on user's current status
 */
export const FORM_FIELDS_BY_STATUS: Record<ImmigrationStatus, FormFieldConfig> = {
  // F-1 Student - Just starting
  [ImmigrationStatus.F1_STUDENT]: {
    required: ['graduationDate'],
    optional: ['hasStemDegree', 'universityName'],
    hidden: ['eadReceivedDate', 'eadExpiryDate', 'jobOffer', 'employerInfo', 'h1bInfo'],
    helpText: "We'll calculate when you can apply for OPT (90 days before graduation)"
  },

  // OPT Pending - Waiting for approval
  [ImmigrationStatus.OPT_PENDING]: {
    required: ['graduationDate', 'optApplicationDate'],
    optional: ['hasStemDegree'],
    hidden: ['eadReceivedDate', 'eadExpiryDate', 'employerInfo', 'h1bInfo'],
    helpText: "Track your OPT application status and expected approval timeline"
  },

  // OPT Approved - Working on OPT
  [ImmigrationStatus.OPT_APPROVED]: {
    required: ['eadReceivedDate'],
    optional: ['graduationDate', 'hasStemDegree', 'hasJobOffer', 'employerName'],
    hidden: ['h1bInfo', 'stemOptInfo'],
    helpText: "Track your OPT expiration and prepare for next steps"
  },

  // STEM OPT Pending - Applied for STEM extension
  [ImmigrationStatus.STEM_OPT_PENDING]: {
    required: ['eadReceivedDate', 'stemOptApplicationDate', 'hasJobOffer', 'employerName'],
    optional: ['i983SubmissionDate'],
    hidden: ['graduationDate', 'hasStemDegree', 'h1bInfo'], // Already known
    helpText: "Track your STEM OPT application and I-983 requirements"
  },

  // STEM OPT Approved - Working on STEM extension
  [ImmigrationStatus.STEM_OPT_APPROVED]: {
    required: ['stemOptReceivedDate', 'hasJobOffer', 'employerName'],
    optional: ['i983SubmissionDate', 'stemOptExpiryDate'],
    hidden: ['graduationDate', 'hasStemDegree'], // Already known
    helpText: "Track I-983 reporting deadlines and STEM OPT expiration"
  },

  // H-1B Lottery - Entered lottery
  [ImmigrationStatus.H1B_LOTTERY]: {
    required: ['h1bLotteryDate', 'employerName'],
    optional: ['eadExpiryDate'],
    hidden: ['graduationDate', 'hasStemDegree'],
    helpText: "Track lottery results and prepare for potential H-1B approval"
  },

  // H-1B Pending - Approved in lottery, waiting for final approval
  [ImmigrationStatus.H1B_PETITION_FILED]: {
    required: ['h1bApplicationDate', 'employerName'],
    optional: ['eadExpiryDate', 'h1bLotteryDate'],
    hidden: ['graduationDate', 'hasStemDegree'],
    helpText: 'Track your H-1B processing and prepare for status change'
  },

  // H-1B Active - Working on H-1B
  [ImmigrationStatus.H1B_ACTIVE]: {
    required: ['h1bStartDate', 'employerName'],
    optional: ['h1bExpiryDate'],
    hidden: ['graduationDate', 'eadReceivedDate', 'hasStemDegree', 'optInfo'],
    helpText: "Track H-1B expiration and renewal deadlines"
  },

  // H-1B Extension - Renewing H-1B
  [ImmigrationStatus.H1B_EXTENSION_PENDING]: {
    required: ['h1bStartDate', 'h1bExtensionApplicationDate', 'employerName'],
    optional: ['h1bExpiryDate'],
    hidden: ['graduationDate', 'eadReceivedDate', 'optInfo'],
    helpText: "Track your H-1B extension application"
  },

  // Green Card - Permanent residency
  [ImmigrationStatus.GREEN_CARD_PENDING]: {
    required: ['greenCardApplicationDate', 'employerName'],
    optional: ['h1bExpiryDate'],
    hidden: ['graduationDate', 'eadReceivedDate', 'optInfo'],
    helpText: "Track your green card application and maintain H-1B status"
  },

  [ImmigrationStatus.GREEN_CARD_APPROVED]: {
    required: ['greenCardReceivedDate'],
    optional: [],
    hidden: ['graduationDate', 'eadReceivedDate', 'optInfo', 'h1bInfo'],
    helpText: "Congratulations! Track your green card renewal in 10 years"
  },
};

/**
 * Field metadata (labels, placeholders, help text)
 */
export interface FieldMetadata {
  label: string;
  placeholder?: string;
  helpText?: string;
  fieldType: 'date' | 'text' | 'boolean' | 'select';
}

/**
 * All possible form fields with their metadata
 */
export const FIELD_METADATA: Record<string, FieldMetadata> = {
  // F-1 Related
  graduationDate: {
    label: 'Graduation Date',
    placeholder: 'When do you graduate?',
    helpText: 'Your expected or actual graduation date',
    fieldType: 'date',
  },
  universityName: {
    label: 'University Name',
    placeholder: 'Your university',
    fieldType: 'text',
  },
  hasStemDegree: {
    label: 'Do you have a STEM degree?',
    helpText: 'STEM degrees qualify for 24-month OPT extension',
    fieldType: 'boolean',
  },

  // OPT Related
  optApplicationDate: {
    label: 'OPT Application Date',
    placeholder: 'When did you apply?',
    helpText: 'Date you submitted I-765 for OPT',
    fieldType: 'date',
  },
  eadReceivedDate: {
    label: 'EAD Card Received Date',
    placeholder: 'When did you receive EAD?',
    helpText: 'This determines your OPT start date',
    fieldType: 'date',
  },
  eadExpiryDate: {
    label: 'EAD Expiry Date',
    placeholder: 'When does EAD expire?',
    helpText: 'Usually 12 months after start date',
    fieldType: 'date',
  },

  // STEM OPT Related
  stemOptApplicationDate: {
    label: 'STEM OPT Application Date',
    placeholder: 'When did you apply?',
    fieldType: 'date',
  },
  stemOptReceivedDate: {
    label: 'STEM OPT EAD Received',
    placeholder: 'When did you receive STEM EAD?',
    fieldType: 'date',
  },
  stemOptExpiryDate: {
    label: 'STEM OPT Expiry Date',
    placeholder: 'When does it expire?',
    helpText: 'Usually 24 months after start',
    fieldType: 'date',
  },
  i983SubmissionDate: {
    label: 'I-983 Submission Date',
    placeholder: 'When did you submit I-983?',
    helpText: 'Must be submitted every 12 months',
    fieldType: 'date',
  },

  // Employment Related
  hasJobOffer: {
    label: 'Do you have a job offer?',
    helpText: 'Required for STEM OPT and H-1B',
    fieldType: 'boolean',
  },
  employerName: {
    label: 'Employer Name',
    placeholder: 'Your employer',
    fieldType: 'text',
  },

  // H-1B Related
  h1bLotteryDate: {
    label: 'H-1B Lottery Date',
    placeholder: 'When did you enter lottery?',
    fieldType: 'date',
  },
  h1bApplicationDate: {
    label: 'H-1B Application Date',
    placeholder: 'When was H-1B filed?',
    fieldType: 'date',
  },
  h1bStartDate: {
    label: 'H-1B Start Date',
    placeholder: 'When did H-1B start?',
    helpText: 'Usually October 1st',
    fieldType: 'date',
  },
  h1bExpiryDate: {
    label: 'H-1B Expiry Date',
    placeholder: 'When does H-1B expire?',
    helpText: 'Usually 3 years initially',
    fieldType: 'date',
  },
  h1bExtensionApplicationDate: {
    label: 'H-1B Extension Application',
    placeholder: 'When did you apply for extension?',
    fieldType: 'date',
  },

  // Green Card Related
  greenCardApplicationDate: {
    label: 'Green Card Application Date',
    placeholder: 'When did you apply?',
    fieldType: 'date',
  },
  greenCardReceivedDate: {
    label: 'Green Card Received',
    placeholder: 'When did you receive it?',
    fieldType: 'date',
  },
};

/**
 * Get form configuration for a specific immigration status
 */
export function getFormConfig(status: ImmigrationStatus): FormFieldConfig {
  return FORM_FIELDS_BY_STATUS[status] || {
    required: [],
    optional: [],
    hidden: [],
    helpText: 'Select your immigration status to see relevant fields',
  };
}

/**
 * Check if a field should be shown for a given status
 */
export function shouldShowField(field: string, status: ImmigrationStatus): boolean {
  const config = getFormConfig(status);
  return !config.hidden.includes(field);
}

/**
 * Check if a field is required for a given status
 */
export function isFieldRequired(field: string, status: ImmigrationStatus): boolean {
  const config = getFormConfig(status);
  return config.required.includes(field);
}

/**
 * Get all visible fields for a status (required + optional)
 */
export function getVisibleFields(status: ImmigrationStatus): string[] {
  const config = getFormConfig(status);
  return [...config.required, ...config.optional];
}

/**
 * Validate profile data based on status requirements
 */
export function validateProfileForStatus(
  status: ImmigrationStatus,
  profileData: Record<string, any>
): { isValid: boolean; errors: string[] } {
  const config = getFormConfig(status);
  const errors: string[] = [];

  // Check required fields
  config.required.forEach(field => {
    if (!profileData[field] || profileData[field] === '') {
      const metadata = FIELD_METADATA[field];
      errors.push(`${metadata?.label || field} is required`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}

