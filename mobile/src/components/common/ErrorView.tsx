/**
 * ErrorView Component
 * Displays an error message with a retry button
 */

import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { ContainerStyles, TextStyles, ButtonStyles } from '../../theme/sharedStyles';

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
    <View style={ContainerStyles.centered}>
      <Text style={TextStyles.errorText}>{message}</Text>
      {onRetry && (
        <Button 
          mode="contained" 
          onPress={onRetry} 
          style={ButtonStyles.retryButton}
        >
          {retryText}
        </Button>
      )}
    </View>
  );
}

