/**
 * Timeline Screen
 * Displays the complete immigration timeline with deadlines and milestones
 */

import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, List, ProgressBar, Text } from 'react-native-paper';

export default function TimelineScreen() {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Immigration Journey Progress</Title>
          <ProgressBar progress={0.3} color="#6200ee" style={styles.progressBar} />
          <Text style={styles.progressText}>30% Complete</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Timeline</Title>
          
          <List.Section>
            <List.Subheader>F-1 Phase</List.Subheader>
            <List.Item
              title="F-1 Student Status"
              description="Currently active"
              left={props => <List.Icon {...props} icon="check-circle" color="green" />}
            />
            <List.Item
              title="Graduation"
              description="Expected: May 2025"
              left={props => <List.Icon {...props} icon="school" />}
            />
          </List.Section>

          <List.Section>
            <List.Subheader>OPT Phase</List.Subheader>
            <List.Item
              title="OPT Application"
              description="Apply 90 days before graduation"
              left={props => <List.Icon {...props} icon="file-document-edit" />}
            />
            <List.Item
              title="EAD Card Received"
              description="Pending application"
              left={props => <List.Icon {...props} icon="card-account-details" />}
            />
          </List.Section>

          <List.Section>
            <List.Subheader>H-1B Phase</List.Subheader>
            <List.Item
              title="H1B Registration"
              description="March registration period"
              left={props => <List.Icon {...props} icon="account-plus" />}
            />
          </List.Section>
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
  progressBar: {
    marginTop: 16,
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    marginTop: 8,
    textAlign: 'center',
    color: '#666',
  },
});




