/**
 * ErrorView Component
 * Displays an error message with a retry button
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

export interface ErrorViewProps {
  /** Error message to display */
  message: string;
  /** Callback function when retry button is pressed */
  onRetry?: () => void;
  /** Custom retry button text */
  retryText?: string;
}

/**
 * Standard error view component
 * 
 * @example
 * ```tsx
 * <ErrorView 
 *   message="Failed to load data" 
 *   onRetry={() => loadData()} 
 * />
 * ```
 */
export function ErrorView({ 
  message, 
  onRetry, 
  retryText = 'Retry' 
}: ErrorViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{message}</Text>
      {onRetry && (
        <Button 
          mode="contained" 
          onPress={onRetry} 
          style={styles.retryButton}
        >
          {retryText}
        </Button>
      )}
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
  errorText: {
    color: '#D32F2F',
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 16,
  },
  retryButton: {
    marginTop: 8,
  },
});

