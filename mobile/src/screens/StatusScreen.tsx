/**
 * Status Screen
 * Displays current immigration status, upcoming deadlines, and required actions
 * Includes profile editing functionality
 */

import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl, Alert } from 'react-native';
import { Card, List, Chip, Button, ActivityIndicator, Text, Portal, Modal, Divider, Snackbar } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { UserProfile } from '../models/UserProfile';
import { Deadline, ActionItem } from '../models/Timeline';
import { UserProfileStorage } from '../storage/UserProfileStorage';
import { TimelineService } from '../services/TimelineService';
import { StatusService } from '../services/StatusService';
import { getStatusLabel, ImmigrationStatus, getAllStatuses } from '../models/ImmigrationStatus';
import { formatDisplayDate, getDaysUntil } from '../utils/dateCalculations';
import { Spacing, Colors, FontSizes, ContainerStyles, CardStyles, TextStyles, ImmigrationColors, lightTheme } from '../theme';
import { useTranslation } from '../i18n';
import { SmartProfileForm, StatusSelector } from '../components/profile';
import { createEmptyProfile } from '../models/UserProfile';
import { validateProfileForStatus } from '../services/ProfileFormService';

export default function StatusScreen() {
  const { t } = useTranslation();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [nextStatus, setNextStatus] = useState<ImmigrationStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Profile editing state
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<ImmigrationStatus>(ImmigrationStatus.F1_STUDENT);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  const loadData = async () => {
    try {
      setError(null);
      
      const userProfile = await UserProfileStorage.get();
      
      if (!userProfile) {
        setProfile(null);
        setLoading(false);
        return;
      }

      setProfile(userProfile);

      const timeline = TimelineService.generateUserTimeline(userProfile);
      const allDeadlines = timeline.deadlines;
      
      const upcomingDeadlines = allDeadlines
        .filter(d => new Date(d.dueDate) >= new Date())
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
        .slice(0, 5);
      
      setDeadlines(upcomingDeadlines);

      const actions = timeline.actionItems
        .filter(a => a.dueDate ? new Date(a.dueDate) >= new Date() : true)
        .slice(0, 3);
      setActionItems(actions);

      const recommended = StatusService.getRecommendedNextStatus(userProfile.currentStatus);
      setNextStatus(recommended);

      setLoading(false);
    } catch (err) {
      console.error('Error loading status data:', err);
      setError(t('common.error'));
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  useEffect(() => {
    if (profile && !isInitialized) {
      setSelectedStatus(profile.currentStatus);
      setFormValues({
        graduationDate: profile.graduationDate || '',
        eadReceivedDate: profile.eadReceivedDate || '',
        eadExpiryDate: profile.eadExpiryDate || '',
        hasStemDegree: profile.hasStemDegree || false,
        hasJobOffer: profile.hasJobOffer || false,
        employerName: profile.currentEmployer || '',
      });
      setIsInitialized(true);
    }
  }, [profile, isInitialized]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleEditProfile = () => {
    if (profile) {
      setSelectedStatus(profile.currentStatus);
      setFormValues({
        graduationDate: profile.graduationDate || '',
        eadReceivedDate: profile.eadReceivedDate || '',
        eadExpiryDate: profile.eadExpiryDate || '',
        hasStemDegree: profile.hasStemDegree || false,
        hasJobOffer: profile.hasJobOffer || false,
        employerName: profile.currentEmployer || '',
      });
    }
    setEditModalVisible(true);
  };

  const handleStatusSelect = (status: ImmigrationStatus) => {
    setSelectedStatus(status);
    setFormErrors({});
    setFormValues({});
  };

  const handleFieldChange = (field: string, value: any) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      setFormErrors({});

      const validation = validateProfileForStatus(selectedStatus, formValues);
      if (!validation.isValid) {
        const errorMap: Record<string, string> = {};
        validation.errors.forEach(err => {
          const field = err.split(' ')[0].toLowerCase();
          errorMap[field] = err;
        });
        setFormErrors(errorMap);
        setSaving(false);
        return;
      }

      let updatedProfile;
      if (profile) {
        updatedProfile = {
          ...profile,
          currentStatus: selectedStatus,
          graduationDate: formValues.graduationDate || profile.graduationDate,
          eadReceivedDate: formValues.eadReceivedDate || profile.eadReceivedDate,
          eadExpiryDate: formValues.eadExpiryDate || profile.eadExpiryDate,
          hasStemDegree: formValues.hasStemDegree ?? profile.hasStemDegree,
          hasJobOffer: formValues.hasJobOffer ?? profile.hasJobOffer,
          currentEmployer: formValues.employerName || profile.currentEmployer,
          updatedAt: new Date().toISOString(),
        };
      } else {
        updatedProfile = {
          ...createEmptyProfile(),
          name: 'User',
          currentStatus: selectedStatus,
          graduationDate: formValues.graduationDate,
          eadReceivedDate: formValues.eadReceivedDate,
          eadExpiryDate: formValues.eadExpiryDate,
          hasStemDegree: formValues.hasStemDegree || false,
          hasJobOffer: formValues.hasJobOffer || false,
          currentEmployer: formValues.employerName,
        };
      }

      await UserProfileStorage.save(updatedProfile);
      await loadData();
      setSaving(false);
      setEditModalVisible(false);
      setSnackbarMessage(profile ? t('settings.profileUpdated') : t('settings.profileCreated'));
      setSnackbarVisible(true);
    } catch (err) {
      console.error('Error saving profile:', err);
      setSaving(false);
      Alert.alert(t('common.error'), t('settings.failedToSave'));
    }
  };

  const getDeadlinePriorityColor = (priority: string): string => {
    switch (priority) {
      case 'CRITICAL':
        return ImmigrationColors.priority.CRITICAL;
      case 'HIGH':
        return ImmigrationColors.priority.HIGH;
      case 'MEDIUM':
        return ImmigrationColors.priority.MEDIUM;
      default:
        return ImmigrationColors.priority.LOW;
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text variant="bodyMedium" style={styles.loadingText}>
          {t('common.loading')}
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button mode="contained" onPress={loadData} style={styles.retryButton}>
          {t('common.retry')}
        </Button>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.centerContainer}>
        <Text variant="titleLarge">{t('status.noProfile')}</Text>
        <Text variant="bodyMedium" style={styles.onboardingText}>
          {t('status.noProfileDescription')}
        </Text>
        <Button 
          mode="contained" 
          onPress={() => setEditModalVisible(true)}
          style={styles.setupButton}
        >
          {t('status.setUpProfile')}
        </Button>

        {/* Create Profile Modal */}
        <Portal>
          <Modal
            visible={editModalVisible}
            onDismiss={() => setEditModalVisible(false)}
            contentContainerStyle={styles.modalContainer}
          >
            <Card style={styles.modalCard}>
              <Card.Content>
                <Text variant="titleLarge" style={styles.modalTitle}>
                  {t('status.createProfile')}
                </Text>
                <StatusSelector
                  value={selectedStatus}
                  statuses={getAllStatuses()}
                  onChange={handleStatusSelect}
                />
                <Divider style={styles.divider} />
                <SmartProfileForm
                  key={selectedStatus}
                  status={selectedStatus}
                  values={formValues}
                  onChange={handleFieldChange}
                  errors={formErrors}
                />
                <Button
                  mode="contained"
                  onPress={handleSaveProfile}
                  loading={saving}
                  disabled={saving}
                  style={styles.saveButton}
                >
                  {t('profile.startTracking')}
                </Button>
              </Card.Content>
            </Card>
          </Modal>
        </Portal>
      </View>
    );
  }

  return (
    <>
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Current Status Card */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.statusHeader}>
              <Text variant="titleLarge">{t('status.title')}</Text>
              <Button
                mode="text"
                icon="pencil"
                onPress={handleEditProfile}
                compact
              >
                {t('common.update')}
              </Button>
            </View>
            <Chip 
              style={[styles.statusChip, { backgroundColor: ImmigrationColors.status.pending }]}
              textStyle={{ color: lightTheme.colors.primary }}
            >
              {getStatusLabel(profile.currentStatus)}
            </Chip>
            <Text variant="bodyMedium" style={styles.description}>
              {profile.currentStatus === ImmigrationStatus.F1_STUDENT && 
                t('status.f1Description', { defaultValue: 'You are currently on F-1 student visa status.' })
              }
              {profile.currentStatus === ImmigrationStatus.OPT_PENDING && 
                t('status.optPendingDescription', { defaultValue: 'Your OPT application is being processed.' })
              }
              {profile.currentStatus === ImmigrationStatus.OPT_APPROVED && 
                t('status.optApprovedDescription', { defaultValue: 'Your OPT is approved!' })
              }
            </Text>
          </Card.Content>
        </Card>

        {/* Next Status Card */}
        {nextStatus && (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleLarge">{t('status.nextStep')}</Text>
              <List.Item
                title={`${t('status.transitionTo')} ${getStatusLabel(nextStatus)}`}
                description={t('status.recommendedNextStatus')}
                left={props => <List.Icon {...props} icon="arrow-right-circle" color={lightTheme.colors.primary} />}
                right={props => <List.Icon {...props} icon="chevron-right" />}
              />
            </Card.Content>
          </Card>
        )}

        {/* Upcoming Deadlines Card */}
        {deadlines.length > 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleLarge">{t('status.upcomingDeadlines')}</Text>
              {deadlines.map((deadline, index) => {
                const daysUntil = getDaysUntil(deadline.dueDate);
                const priorityColor = getDeadlinePriorityColor(deadline.priority);
                
                return (
                  <List.Item
                    key={index}
                    title={deadline.title}
                    description={`${formatDisplayDate(deadline.dueDate)} • ${daysUntil} ${daysUntil === 1 ? t('status.day') : t('status.days')}`}
                    left={props => (
                      <List.Icon 
                        {...props} 
                        icon="calendar-alert"
                        color={priorityColor}
                      />
                    )}
                    right={() => (
                      <Chip 
                        style={{ backgroundColor: priorityColor + '20' }}
                        textStyle={{ color: priorityColor, fontSize: 10 }}
                      >
                        {deadline.priority}
                      </Chip>
                    )}
                    style={styles.listItem}
                  />
                );
              })}
            </Card.Content>
          </Card>
        )}

        {/* Required Actions Card */}
        {actionItems.length > 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleLarge">{t('todo.currentFocus')}</Text>
              {actionItems.map((action, index) => (
                <List.Item
                  key={index}
                  title={action.title}
                  description={action.description}
                  left={props => (
                    <List.Icon 
                      {...props} 
                      icon="check-circle"
                      color={lightTheme.colors.primary}
                    />
                  )}
                  right={props => <List.Icon {...props} icon="chevron-right" />}
                  style={styles.listItem}
                />
              ))}
            </Card.Content>
          </Card>
        )}
      </ScrollView>

      {/* Edit Profile Modal */}
      <Portal>
        <Modal
          visible={editModalVisible}
          onDismiss={() => setEditModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Card style={styles.modalCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.modalTitle}>
                {t('status.updateProfile')}
              </Text>
              <StatusSelector
                value={selectedStatus}
                statuses={getAllStatuses()}
                onChange={handleStatusSelect}
              />
              <Divider style={styles.divider} />
              <SmartProfileForm
                key={selectedStatus}
                status={selectedStatus}
                values={formValues}
                onChange={handleFieldChange}
                errors={formErrors}
              />
              <Button
                mode="contained"
                onPress={handleSaveProfile}
                loading={saving}
                disabled={saving}
                style={styles.saveButton}
              >
                {t('profile.updateProfile')}
              </Button>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>

      {/* Success Snackbar */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: t('common.ok'),
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: ContainerStyles.screen,
  centerContainer: ContainerStyles.centered,
  card: CardStyles.card,
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  statusChip: {
    alignSelf: 'flex-start',
    marginVertical: Spacing.sm,
  },
  description: {
    marginTop: Spacing.sm,
    color: Colors.textSecondary,
    lineHeight: FontSizes.xl,
  },
  listItem: {
    paddingVertical: Spacing.xs,
  },
  loadingText: TextStyles.loadingText,
  errorText: TextStyles.errorText,
  retryButton: {
    marginTop: Spacing.sm,
  },
  onboardingText: {
    ...TextStyles.centeredText,
    marginVertical: Spacing.md,
    color: Colors.textSecondary,
  },
  setupButton: {
    marginTop: Spacing.sm,
  },
  modalContainer: {
    padding: Spacing.md,
  },
  modalCard: {
    borderRadius: 16,
  },
  modalTitle: {
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  divider: {
    marginVertical: Spacing.md,
  },
  saveButton: {
    marginTop: Spacing.lg,
  },
});
