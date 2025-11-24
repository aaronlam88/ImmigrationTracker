/**
 * LoadingView Component
 * Displays a centered loading spinner with optional message
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Paragraph } from 'react-native-paper';

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
    <View style={styles.container}>
      <ActivityIndicator size={size} />
      {message && <Paragraph style={styles.message}>{message}</Paragraph>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  message: {
    marginTop: 16,
    color: '#666',
    textAlign: 'center',
  },
});

