/**
 * useUserProfile Hook
 * Custom hook for loading and managing user profile data
 */

import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { UserProfile } from '../models/UserProfile';
import { UserProfileStorage } from '../storage/UserProfileStorage';

export interface UseUserProfileReturn {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  refreshing: boolean;
  refresh: () => Promise<void>;
}

/**
 * Hook to load and manage user profile data
 * Automatically loads profile when screen comes into focus
 * 
 * @returns Object containing profile data, loading states, and refresh function
 * 
 * @example
 * ```tsx
 * const { profile, loading, error, refresh } = useUserProfile();
 * 
 * if (loading) return <LoadingView />;
 * if (error) return <ErrorView message={error} onRetry={refresh} />;
 * if (!profile) return <OnboardingView />;
 * 
 * return <View>{profile.name}</View>;
 * ```
 */
export function useUserProfile(): UseUserProfileReturn {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async (isRefreshing: boolean = false) => {
    try {
      if (!isRefreshing) {
        setLoading(true);
      }
      setError(null);
      
      const userProfile = await UserProfileStorage.get();
      setProfile(userProfile);
      
      setLoading(false);
      if (isRefreshing) {
        setRefreshing(false);
      }
    } catch (err) {
      console.error('Error loading user profile:', err);
      setError('Failed to load profile');
      setLoading(false);
      if (isRefreshing) {
        setRefreshing(false);
      }
    }
  }, []);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await loadProfile(true);
  }, [loadProfile]);

  // Load profile when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadProfile(false);
    }, [loadProfile])
  );

  return {
    profile,
    loading,
    error,
    refreshing,
    refresh,
  };
}

