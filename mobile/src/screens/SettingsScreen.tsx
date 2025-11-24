/**
 * Settings Screen
 * User profile management and app preferences
 */

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Title, List, Divider } from 'react-native-paper';

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Profile</Title>
          <List.Item
            title="Edit Profile"
            description="Update your immigration information"
            left={props => <List.Icon {...props} icon="account-edit" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {
              // TODO: Navigate to profile edit screen
              console.log('Edit profile tapped');
            }}
          />
          <Divider />
          <List.Item
            title="Current Status"
            description="F-1 Student"
            left={props => <List.Icon {...props} icon="account-check" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Notifications</Title>
          <List.Item
            title="Deadline Reminders"
            description="Get notified about upcoming deadlines"
            left={props => <List.Icon {...props} icon="bell-ring" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            title="Status Updates"
            description="Notifications for status changes"
            left={props => <List.Icon {...props} icon="bell-alert" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Resources</Title>
          <List.Item
            title="USCIS Links"
            description="Official USCIS forms and guides"
            left={props => <List.Icon {...props} icon="link-variant" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            title="Help & Support"
            description="Get help with the app"
            left={props => <List.Icon {...props} icon="help-circle" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            title="About"
            description="App version and information"
            left={props => <List.Icon {...props} icon="information" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Data Management</Title>
          <List.Item
            title="Export Data"
            description="Backup your immigration data"
            left={props => <List.Icon {...props} icon="export" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            title="Clear Data"
            description="Remove all stored data"
            left={props => <List.Icon {...props} icon="delete" color="#d32f2f" />}
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
});




