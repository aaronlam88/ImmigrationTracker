/**
 * Status Screen
 * Displays current immigration status, upcoming deadlines, and required actions
 */

import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, List, Chip } from 'react-native-paper';

export default function StatusScreen() {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Current Status</Title>
          <Chip style={styles.statusChip} mode="flat">
            F-1 Student
          </Chip>
          <Paragraph style={styles.description}>
            You are currently on F-1 student visa status.
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Next Steps</Title>
          <List.Item
            title="Start OPT Application"
            description="Application window opens in 90 days"
            left={props => <List.Icon {...props} icon="clock-alert" />}
          />
          <List.Item
            title="Prepare Documents"
            description="Gather required documents for I-765"
            left={props => <List.Icon {...props} icon="file-document" />}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Upcoming Deadlines</Title>
          <List.Item
            title="OPT Application Window Opens"
            description="90 days before graduation"
            left={props => <List.Icon {...props} icon="calendar-alert" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 16,
    marginBottom: 8,
  },
  statusChip: {
    alignSelf: 'flex-start',
    marginVertical: 8,
  },
  description: {
    marginTop: 8,
    color: '#666',
  },
});

