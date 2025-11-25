/**
 * EmptyState Component
 * Displays a friendly message when there's no data to show
 */

import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { CardStyles, TextStyles, IconStyles, Spacing } from '../../theme/sharedStyles';
import { createStyles } from '../../theme/sharedStyles';

export interface EmptyStateProps {
  /** Message to display */
  message: string;
  /** Optional emoji or icon prefix */
  icon?: string;
}

/**
 * Standard empty state component
 * 
 * @example
 * ```tsx
 * <EmptyState 
 *   icon="🎉" 
 *   message="No pending actions. You're all caught up!" 
 * />
 * ```
 */
export function EmptyState({ message, icon }: EmptyStateProps) {
  return (
    <Card style={CardStyles.card}>
      <Card.Content>
        <View style={styles.container}>
          {icon && (
            <Text style={IconStyles.iconLarge} variant="displaySmall">
              {icon}
            </Text>
          )}
          <Text variant="bodyMedium" style={TextStyles.emptyText}>
            {message}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = createStyles({
  container: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
});

