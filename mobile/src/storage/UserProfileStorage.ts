/**
 * User Profile Storage
 * Specialized storage methods for user profile with proper date handling
 */

import { UserProfile, updateUserProfile } from '../models/UserProfile';
import AsyncStorageService, { StorageKey, StorageError } from './AsyncStorageService';

/**
 * Fields in UserProfile that contain dates
 */
const USER_PROFILE_DATE_FIELDS = [
  'graduationDate',
  'programEndDate',
  'optApplicationDate',
  'optApprovalDate',
  'eadReceivedDate',
  'eadExpiryDate',
  'stemOptApplicationDate',
  'stemOptExpiryDate',
  'h1bRegistrationDate',
  'h1bApprovalDate',
  'h1bStartDate',
  'h1bExpiryDate',
  'employmentStartDate',
  'passportExpiryDate',
  'visaExpiryDate',
  'i20ExpiryDate',
  'createdAt',
  'updatedAt',
];

/**
 * Save user profile to storage
 */
export async function saveUserProfile(profile: UserProfile): Promise<void> {
  try {
    // Prepare dates for storage (convert to ISO strings)
    const prepared = AsyncStorageService.prepareDateForStorage(profile);
    await AsyncStorageService.setItem<UserProfile>(StorageKey.USER_PROFILE, prepared);
  } catch (error) {
    throw new StorageError(
      'Failed to save user profile',
      StorageKey.USER_PROFILE,
      'set',
      error as Error
    );
  }
}

/**
 * Get user profile from storage
 */
export async function getUserProfile(): Promise<UserProfile | null> {
  try {
    const profile = await AsyncStorageService.getItem<UserProfile>(StorageKey.USER_PROFILE);
    
    if (!profile) {
      return null;
    }

    // Parse dates back to Date objects if needed
    // Note: For Phase 1, we keep them as ISO strings for simplicity
    // Can be converted to Date objects in the UI layer when needed
    return profile;
  } catch (error) {
    throw new StorageError(
      'Failed to get user profile',
      StorageKey.USER_PROFILE,
      'get',
      error as Error
    );
  }
}

/**
 * Update user profile (immutable update)
 */
export async function updateUserProfileStorage(
  updates: Partial<Omit<UserProfile, 'id' | 'createdAt'>>
): Promise<UserProfile> {
  try {
    const currentProfile = await getUserProfile();
    
    if (!currentProfile) {
      throw new Error('No user profile found to update');
    }

    const updatedProfile = updateUserProfile(currentProfile, updates);
    await saveUserProfile(updatedProfile);
    
    return updatedProfile;
  } catch (error) {
    throw new StorageError(
      'Failed to update user profile',
      StorageKey.USER_PROFILE,
      'set',
      error as Error
    );
  }
}

/**
 * Delete user profile
 */
export async function deleteUserProfile(): Promise<void> {
  try {
    await AsyncStorageService.removeItem(StorageKey.USER_PROFILE);
  } catch (error) {
    throw new StorageError(
      'Failed to delete user profile',
      StorageKey.USER_PROFILE,
      'remove',
      error as Error
    );
  }
}

/**
 * Check if user profile exists
 */
export async function hasUserProfile(): Promise<boolean> {
  try {
    return await AsyncStorageService.hasItem(StorageKey.USER_PROFILE);
  } catch (error) {
    return false;
  }
}

/**
 * Update specific field in user profile
 */
export async function updateUserProfileField<K extends keyof UserProfile>(
  field: K,
  value: UserProfile[K]
): Promise<UserProfile> {
  return updateUserProfileStorage({ [field]: value } as Partial<UserProfile>);
}

/**
 * Get specific field from user profile
 */
export async function getUserProfileField<K extends keyof UserProfile>(
  field: K
): Promise<UserProfile[K] | null> {
  try {
    const profile = await getUserProfile();
    return profile ? profile[field] : null;
  } catch (error) {
    return null;
  }
}

/**
 * Bulk update multiple fields
 */
export async function bulkUpdateUserProfile(
  updates: Array<{ field: keyof UserProfile; value: any }>
): Promise<UserProfile> {
  const updateObject: Partial<UserProfile> = {};
  updates.forEach(({ field, value }) => {
    (updateObject as any)[field] = value;
  });
  return updateUserProfileStorage(updateObject);
}

/**
 * Export all profile storage functions
 */
export const UserProfileStorage = {
  save: saveUserProfile,
  get: getUserProfile,
  update: updateUserProfileStorage,
  delete: deleteUserProfile,
  has: hasUserProfile,
  updateField: updateUserProfileField,
  getField: getUserProfileField,
  bulkUpdate: bulkUpdateUserProfile,
};

export default UserProfileStorage;

