/**
 * EmptyState Component
 * Displays a friendly message when there's no data to show
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';

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
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.container}>
          {icon && <Paragraph style={styles.icon}>{icon}</Paragraph>}
          <Paragraph style={styles.message}>{message}</Paragraph>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
  },
  container: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },
  message: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
  },
});

