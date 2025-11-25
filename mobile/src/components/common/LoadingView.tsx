/**
 * LoadingView Component
 * Displays a centered loading spinner with optional message
 */

import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { ContainerStyles, TextStyles } from '../../theme/sharedStyles';

export interface LoadingViewProps {
  /** Optional custom loading message */
  message?: string;
  /** Size of the activity indicator */
  size?: 'small' | 'large';
}

/**
 * Standard loading view component
 * 
 * @example
 * ```tsx
 * <LoadingView message="Loading your status..." />
 * ```
 */
export function LoadingView({ message = 'Loading...', size = 'large' }: LoadingViewProps) {
  return (
    <View style={ContainerStyles.centered}>
      <ActivityIndicator size={size} />
      {message && (
        <Text variant="bodyMedium" style={TextStyles.loadingText}>
          {message}
        </Text>
      )}
    </View>
  );
}

