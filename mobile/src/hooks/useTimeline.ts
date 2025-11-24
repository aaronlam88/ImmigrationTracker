/**
 * useTimeline Hook
 * Custom hook for generating and managing timeline data based on user profile
 */

import { useState, useEffect } from 'react';
import { UserProfile } from '../models/UserProfile';
import { Deadline, ActionItem, TimelineEvent } from '../models/Timeline';
import { TimelineService } from '../services/TimelineService';
import { ImmigrationStatus } from '../models/ImmigrationStatus';
import { StatusService } from '../services/StatusService';

export interface Timeline {
  deadlines: Deadline[];
  actionItems: ActionItem[];
  events: TimelineEvent[];
}

export interface UseTimelineReturn {
  timeline: Timeline | null;
  nextStatus: ImmigrationStatus | null;
  loading: boolean;
}

/**
 * Hook to generate timeline data from user profile
 * Automatically recalculates when profile changes
 * 
 * @param profile - User profile to generate timeline for (or null)
 * @returns Object containing timeline data and next recommended status
 * 
 * @example
 * ```tsx
 * const { profile } = useUserProfile();
 * const { timeline, nextStatus } = useTimeline(profile);
 * 
 * if (timeline) {
 *   // Display deadlines, actions, events
 *   console.log(timeline.deadlines);
 * }
 * ```
 */
export function useTimeline(profile: UserProfile | null): UseTimelineReturn {
  const [timeline, setTimeline] = useState<Timeline | null>(null);
  const [nextStatus, setNextStatus] = useState<ImmigrationStatus | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!profile) {
      setTimeline(null);
      setNextStatus(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      // Generate timeline from profile
      const generatedTimeline = TimelineService.generateUserTimeline(profile);
      
      setTimeline({
        deadlines: generatedTimeline.deadlines,
        actionItems: generatedTimeline.actionItems,
        events: generatedTimeline.events,
      });

      // Get recommended next status
      const recommended = StatusService.getRecommendedNextStatus(profile);
      setNextStatus(recommended);
    } catch (error) {
      console.error('Error generating timeline:', error);
      setTimeline(null);
      setNextStatus(null);
    } finally {
      setLoading(false);
    }
  }, [profile]);

  return {
    timeline,
    nextStatus,
    loading,
  };
}

