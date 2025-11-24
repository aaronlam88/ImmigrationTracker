/**
 * To-Do Screen
 * Shows actionable items and preparation steps for the user's next immigration status
 */

import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, List, Chip, useTheme } from 'react-native-paper';

export default function ToDoScreen() {
  const theme = useTheme();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Current Focus Section */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Current Focus
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              Actions you need to take now
            </Text>

            <List.Item
              title="Start OPT Application"
              description="Application window opens in 90 days"
              left={(props) => (
                <List.Icon {...props} icon="checkbox-blank-circle-outline" color={theme.colors.error} />
              )}
              right={(props) => (
                <Chip {...props} mode="outlined" compact>
                  High Priority
                </Chip>
              )}
              style={styles.listItem}
            />

            <List.Item
              title="Prepare I-765 Documents"
              description="Gather required documents"
              left={(props) => (
                <List.Icon {...props} icon="checkbox-blank-circle-outline" color={theme.colors.primary} />
              )}
              right={(props) => (
                <Chip {...props} mode="outlined" compact>
                  Medium
                </Chip>
              )}
              style={styles.listItem}
            />
          </Card.Content>
        </Card>

        {/* Preparation Section */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Get Ready For
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              What you'll need for the next step
            </Text>

            <List.Item
              title="Updated Resume"
              description="For job applications during OPT"
              left={(props) => <List.Icon {...props} icon="file-document" />}
            />

            <List.Item
              title="Professional References"
              description="Collect 2-3 reference letters"
              left={(props) => <List.Icon {...props} icon="account-multiple" />}
            />

            <List.Item
              title="Immigration Attorney Contact"
              description="Research and connect with immigration lawyers"
              left={(props) => <List.Icon {...props} icon="gavel" />}
            />
          </Card.Content>
        </Card>

        {/* Document Checklist Section */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Document Checklist
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              Required for OPT application
            </Text>

            <List.Item
              title="Form I-765"
              description="Employment Authorization Document"
              left={(props) => <List.Icon {...props} icon="checkbox-blank-outline" />}
            />

            <List.Item
              title="I-20 from DSO"
              description="With OPT recommendation"
              left={(props) => <List.Icon {...props} icon="checkbox-blank-outline" />}
            />

            <List.Item
              title="Passport Copy"
              description="Biographical pages"
              left={(props) => <List.Icon {...props} icon="checkbox-blank-outline" />}
            />

            <List.Item
              title="Passport Photos"
              description="2 recent passport-style photos"
              left={(props) => <List.Icon {...props} icon="checkbox-blank-outline" />}
            />

            <List.Item
              title="G-1145 Form"
              description="E-Notification of Application"
              left={(props) => <List.Icon {...props} icon="checkbox-blank-outline" />}
            />
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    opacity: 0.7,
    marginBottom: 16,
  },
  listItem: {
    paddingHorizontal: 0,
  },
});

