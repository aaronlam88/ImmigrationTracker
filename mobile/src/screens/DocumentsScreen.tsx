/**
 * Documents Screen
 * Placeholder for document management (Phase 1 MVP - just metadata)
 */

import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, List, FAB } from 'react-native-paper';

export default function DocumentsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Documents</Title>
            <Paragraph style={styles.subtitle}>
              Track your immigration documents
            </Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Visa & Status Documents</Title>
            <List.Item
              title="Passport"
              description="Valid until: Dec 2028"
              left={props => <List.Icon {...props} icon="passport" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
            <List.Item
              title="I-20"
              description="Current program authorization"
              left={props => <List.Icon {...props} icon="file-document" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
            <List.Item
              title="F-1 Visa"
              description="Entry stamp in passport"
              left={props => <List.Icon {...props} icon="card-account-details" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Forms & Applications</Title>
            <List.Item
              title="I-765 (OPT Application)"
              description="Not yet submitted"
              left={props => <List.Icon {...props} icon="file-document-edit" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        label="Add Document"
        onPress={() => {
          // TODO: Implement in Phase 2
          console.log('Add document tapped');
        }}
      />
    </View>
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
  subtitle: {
    color: '#666',
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

