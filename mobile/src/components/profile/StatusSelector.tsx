/**
 * StatusSelector Component
 * Displays a button to open a modal for selecting immigration status
 */

import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Portal, Modal, Card, Text } from 'react-native-paper';
import { ImmigrationStatus, getStatusLabel } from '../../models/ImmigrationStatus';
import { Spacing, FontSizes, BorderRadius, ImmigrationColors, Colors, lightTheme, createStyles } from '../../theme';

export interface StatusSelectorProps {
  /** Currently selected status */
  value: ImmigrationStatus;
  /** Callback when status is selected */
  onChange: (status: ImmigrationStatus) => void;
  /** List of statuses to display */
  statuses: ImmigrationStatus[];
}

export function StatusSelector({ value, onChange, statuses }: StatusSelectorProps) {
  const [visible, setVisible] = useState(false);

  const handleSelect = (status: ImmigrationStatus) => {
    onChange(status);
    setVisible(false);
  };

  return (
    <>
      <Button
        mode="outlined"
        onPress={() => setVisible(true)}
        icon="chevron-down"
        contentStyle={styles.menuButton}
        style={styles.menuButtonContainer}
      >
        {getStatusLabel(value)}
      </Button>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.modalRoot}
        >
          <Card style={styles.modalCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.modalTitle}>Select Your Current Status</Text>
              <ScrollView style={styles.modalList} showsVerticalScrollIndicator={false}>
                {statuses.map(status => (
                  <Button
                    key={status}
                    mode={value === status ? 'contained' : 'text'}
                    onPress={() => handleSelect(status)}
                    style={[
                      styles.statusButton,
                      value === status && styles.selectedStatusButton,
                    ]}
                    contentStyle={styles.statusButtonContent}
                    labelStyle={
                      value === status ? styles.selectedStatusText : styles.statusText
                    }
                  >
                    {getStatusLabel(status)}
                  </Button>
                ))}
              </ScrollView>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>
    </>
  );
}

const styles = createStyles({
  menuButton: {
    flexDirection: 'row-reverse',
  },
  menuButtonContainer: {
    marginTop: Spacing.sm,
  },
  modalRoot: {
    marginHorizontal: Spacing.lg,
  },
  modalCard: {
    borderRadius: BorderRadius.xl,
    elevation: 4,
  },
  modalTitle: {
    marginBottom: Spacing.md,
    textAlign: 'center',
    fontWeight: '600',
  },
  modalList: {
    maxHeight: 320,
    marginBottom: Spacing.sm,
  },
  statusButton: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: Spacing.xs / 2,
    borderRadius: BorderRadius.lg,
  },
  selectedStatusButton: {
    backgroundColor: ImmigrationColors.status.pending,
  },
  statusButtonContent: {
    justifyContent: 'flex-start',
    paddingVertical: Spacing.sm,
  },
  statusText: {
    color: Colors.textPrimary,
    fontSize: FontSizes.base,
  },
  selectedStatusText: {
    color: lightTheme.colors.primary,
    fontWeight: '600',
    fontSize: FontSizes.base,
  },
});


