/**
 * User Profile Model
 * Stores user's immigration journey information
 */

import { ImmigrationStatus } from './ImmigrationStatus';

/**
 * Main user profile interface
 * Stored in AsyncStorage as JSON
 */
export interface UserProfile {
  /** Unique identifier */
  readonly id: string;

  /** Basic Information */
  readonly name: string;
  readonly email?: string;

  /** Current Immigration Status */
  readonly currentStatus: ImmigrationStatus;

  /** Critical Dates */
  readonly graduationDate?: Date | string; // ISO string for JSON serialization
  readonly programEndDate?: Date | string;
  readonly optApplicationDate?: Date | string;
  readonly optApprovalDate?: Date | string;
  readonly eadReceivedDate?: Date | string;
  readonly eadExpiryDate?: Date | string;
  readonly stemOptApplicationDate?: Date | string;
  readonly stemOptExpiryDate?: Date | string;
  readonly h1bRegistrationDate?: Date | string;
  readonly h1bApprovalDate?: Date | string;
  readonly h1bStartDate?: Date | string;
  readonly h1bExpiryDate?: Date | string;

  /** Education Details */
  readonly hasStemDegree: boolean;
  readonly degreeField?: string;
  readonly universityName?: string;

  /** Employment Information */
  readonly currentEmployer?: string;
  readonly employmentStartDate?: Date | string;
  readonly jobTitle?: string;
  readonly hasJobOffer: boolean;

  /** Document Tracking */
  readonly sevisId?: string;
  readonly passportNumber?: string;
  readonly passportExpiryDate?: Date | string;
  readonly visaExpiryDate?: Date | string;
  readonly i20ExpiryDate?: Date | string;

  /** H1B Specific */
  readonly h1bLotterySelected?: boolean;
  readonly h1bLotteryYear?: number;
  readonly employerWillingToSponsor?: boolean;

  /** System Fields */
  readonly createdAt: Date | string;
  readonly updatedAt: Date | string;
}

/**
 * Form data for creating/updating user profile
 * (mutable version for form inputs)
 */
export interface UserProfileInput {
  name: string;
  email?: string;
  currentStatus: ImmigrationStatus;
  graduationDate?: Date;
  programEndDate?: Date;
  hasStemDegree: boolean;
  degreeField?: string;
  universityName?: string;
  sevisId?: string;
  // ... can be extended based on form needs
}

/**
 * Helper to create a new user profile with defaults
 */
export const createUserProfile = (input: Partial<UserProfileInput>): UserProfile => {
  const now = new Date().toISOString();
  return {
    id: generateUserId(),
    name: input.name || 'User',
    email: input.email,
    currentStatus: input.currentStatus || ImmigrationStatus.F1_STUDENT,
    graduationDate: input.graduationDate?.toISOString(),
    programEndDate: input.programEndDate?.toISOString(),
    hasStemDegree: input.hasStemDegree || false,
    degreeField: input.degreeField,
    universityName: input.universityName,
    sevisId: input.sevisId,
    hasJobOffer: false,
    createdAt: now,
    updatedAt: now,
  };
};

/**
 * Helper to update user profile (immutable)
 */
export const updateUserProfile = (
  profile: UserProfile,
  updates: Partial<Omit<UserProfile, 'id' | 'createdAt'>>
): UserProfile => {
  return {
    ...profile,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
};

/**
 * Generate unique user ID
 * For single-user app, we can use a constant or UUID
 */
const generateUserId = (): string => {
  // For Phase 1, we only have single user
  return 'user_default';
  // Future: Use UUID or similar
  // return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Type guard to check if dates are valid
 */
export const hasGraduationDate = (profile: UserProfile): boolean => {
  return !!profile.graduationDate;
};

export const hasEADCard = (profile: UserProfile): boolean => {
  return !!profile.eadReceivedDate;
};

export const hasStemOpt = (profile: UserProfile): boolean => {
  return profile.hasStemDegree && profile.currentStatus === ImmigrationStatus.STEM_OPT_APPROVED;
};

export const isH1bEligible = (profile: UserProfile): boolean => {
  return hasEADCard(profile) && profile.hasJobOffer && profile.employerWillingToSponsor === true;
};

