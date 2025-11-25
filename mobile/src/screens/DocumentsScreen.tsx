/**
 * Documents Screen
 * Placeholder for document management (Phase 1 MVP - just metadata)
 */

import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, List, FAB, Text } from 'react-native-paper';
import { Spacing, Colors, ContainerStyles, CardStyles, TextStyles } from '../theme';
import { useTranslation } from '../i18n';

export default function DocumentsScreen() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">{t('documents.title')}</Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              {t('documents.subtitle')}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">{t('documents.visaStatusDocuments')}</Text>
            <List.Item
              title={t('documents.passport')}
              description={t('documents.passportValidUntil')}
              left={props => <List.Icon {...props} icon="passport" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
            <List.Item
              title={t('documents.i20')}
              description={t('documents.i20Description')}
              left={props => <List.Icon {...props} icon="file-document" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
            <List.Item
              title={t('documents.f1Visa')}
              description={t('documents.f1VisaDescription')}
              left={props => <List.Icon {...props} icon="card-account-details" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">{t('documents.formsApplications')}</Text>
            <List.Item
              title={t('documents.i765')}
              description={t('documents.i765Description')}
              left={props => <List.Icon {...props} icon="file-document-edit" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        label={t('documents.addDocument')}
        onPress={() => {
          // TODO: Implement in Phase 2
          console.log('Add document tapped');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: ContainerStyles.screen,
  card: CardStyles.card,
  subtitle: {
    ...TextStyles.mutedText,
    marginTop: Spacing.xs,
  },
  fab: {
    position: 'absolute',
    margin: Spacing.md,
    right: 0,
    bottom: 0,
  },
});




