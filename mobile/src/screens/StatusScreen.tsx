/**
 * Status Screen
 * Displays current immigration status, upcoming deadlines, and required actions
 */

import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, List, Chip, Button, ActivityIndicator, Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { UserProfile } from '../models/UserProfile';
import { Deadline, ActionItem } from '../models/Timeline';
import { UserProfileStorage } from '../storage/UserProfileStorage';
import { TimelineService } from '../services/TimelineService';
import { StatusService } from '../services/StatusService';
import { getStatusLabel, ImmigrationStatus } from '../models/ImmigrationStatus';
import { formatDate, getDaysUntil } from '../utils/dateCalculations';

export default function StatusScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [nextStatus, setNextStatus] = useState<ImmigrationStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setError(null);
      
      // Load user profile
      const userProfile = await UserProfileStorage.get();
      
      if (!userProfile) {
        // No profile exists yet - show onboarding state
        setProfile(null);
        setLoading(false);
        return;
      }

      setProfile(userProfile);

      // Generate timeline and deadlines
      const timeline = TimelineService.generateUserTimeline(userProfile);
      const allDeadlines = timeline.deadlines;
      
      // Sort by date and take top 5 upcoming deadlines
      const upcomingDeadlines = allDeadlines
        .filter(d => new Date(d.dueDate) >= new Date())
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
        .slice(0, 5);
      
      setDeadlines(upcomingDeadlines);

      // Get action items
      const actions = timeline.actionItems
        .filter(a => a.dueDate ? new Date(a.dueDate) >= new Date() : true)
        .slice(0, 3);
      setActionItems(actions);

      // Get recommended next status
      const recommended = StatusService.getRecommendedNextStatus(userProfile);
      setNextStatus(recommended);

      setLoading(false);
    } catch (err) {
      console.error('Error loading status data:', err);
      setError('Failed to load status information');
      setLoading(false);
    }
  };

  // Load data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const getDeadlinePriorityColor = (priority: string): string => {
    switch (priority) {
      case 'CRITICAL':
        return '#D32F2F'; // Red
      case 'HIGH':
        return '#F57C00'; // Orange
      case 'MEDIUM':
        return '#FBC02D'; // Yellow
      default:
        return '#388E3C'; // Green
    }
  };

  const getDeadlineIcon = (type: string): string => {
    switch (type) {
      case 'OPT_APPLICATION_WINDOW_OPENS':
      case 'STEM_OPT_APPLICATION_WINDOW_OPENS':
        return 'calendar-clock';
      case 'OPT_APPLICATION_DEADLINE':
      case 'STEM_OPT_APPLICATION_DEADLINE':
        return 'calendar-alert';
      case 'EAD_EXPIRY':
        return 'card-account-details-outline';
      case 'I983_SUBMISSION':
        return 'file-document-edit';
      case 'H1B_LOTTERY':
        return 'ticket';
      case 'H1B_APPROVAL_EXPECTED':
        return 'check-circle-outline';
      default:
        return 'calendar';
    }
  };

  const getActionIcon = (category: string): string => {
    switch (category) {
      case 'APPLICATION':
        return 'file-document-edit';
      case 'DOCUMENTATION':
        return 'folder-open';
      case 'TRACKING':
        return 'magnify';
      case 'PREPARATION':
        return 'school';
      case 'EMPLOYER':
        return 'briefcase';
      default:
        return 'information';
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Paragraph style={styles.loadingText}>Loading your status...</Paragraph>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button mode="contained" onPress={loadData} style={styles.retryButton}>
          Retry
        </Button>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.centerContainer}>
        <Title>Welcome to Immigration Tracker</Title>
        <Paragraph style={styles.onboardingText}>
          Let's set up your profile to track your immigration journey.
        </Paragraph>
        <Button 
          mode="contained" 
          onPress={() => {/* TODO: Navigate to profile setup */}}
          style={styles.setupButton}
        >
          Set Up Profile
        </Button>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Current Status Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Current Status</Title>
          <Chip 
            style={[
              styles.statusChip,
              { backgroundColor: '#E8DEF8' }
            ]}
            textStyle={{ color: '#6750A4' }}
          >
            {getStatusLabel(profile.currentStatus)}
          </Chip>
          <Paragraph style={styles.description}>
            {profile.currentStatus === ImmigrationStatus.F1_STUDENT && 
              'You are currently on F-1 student visa status. Focus on maintaining your studies and prepare for your next steps.'
            }
            {profile.currentStatus === ImmigrationStatus.OPT_PENDING && 
              'Your OPT application is being processed. You can start working once you receive your EAD card.'
            }
            {profile.currentStatus === ImmigrationStatus.OPT_APPROVED && 
              'Your OPT is approved! You can work for up to 12 months (or 36 months with STEM extension).'
            }
            {profile.currentStatus === ImmigrationStatus.STEM_OPT_PENDING && 
              'Your STEM OPT extension application is being processed.'
            }
            {profile.currentStatus === ImmigrationStatus.STEM_OPT_APPROVED && 
              'Your STEM OPT extension is approved! You have 24 additional months to work.'
            }
            {profile.currentStatus === ImmigrationStatus.H1B_PENDING && 
              'Your H-1B petition is being processed. Continue working on your current status.'
            }
            {profile.currentStatus === ImmigrationStatus.H1B_ACTIVE && 
              'You are on H-1B status. You can work for your sponsoring employer.'
            }
          </Paragraph>
        </Card.Content>
      </Card>

      {/* Next Status Card */}
      {nextStatus && (
        <Card style={styles.card}>
          <Card.Content>
            <Title>Next Step</Title>
            <List.Item
              title={`Transition to ${getStatusLabel(nextStatus)}`}
              description="Recommended next immigration status"
              left={props => <List.Icon {...props} icon="arrow-right-circle" color="#6750A4" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
          </Card.Content>
        </Card>
      )}

      {/* Upcoming Deadlines Card */}
      {deadlines.length > 0 && (
        <Card style={styles.card}>
          <Card.Content>
            <Title>Upcoming Deadlines</Title>
            {deadlines.map((deadline, index) => {
              const daysUntil = getDaysUntil(deadline.dueDate);
              const priorityColor = getDeadlinePriorityColor(deadline.priority);
              
              return (
                <List.Item
                  key={index}
                  title={deadline.title}
                  description={`${formatDate(deadline.dueDate)} • ${daysUntil} days`}
                  left={props => (
                    <List.Icon 
                      {...props} 
                      icon={getDeadlineIcon(deadline.type)}
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
            <Title>Required Actions</Title>
            {actionItems.map((action, index) => (
              <List.Item
                key={index}
                title={action.title}
                description={action.description}
                left={props => (
                  <List.Icon 
                    {...props} 
                    icon={getActionIcon(action.category)}
                    color="#6750A4"
                  />
                )}
                right={props => <List.Icon {...props} icon="chevron-right" />}
                style={styles.listItem}
              />
            ))}
          </Card.Content>
        </Card>
      )}

      {/* Empty State */}
      {deadlines.length === 0 && actionItems.length === 0 && (
        <Card style={styles.card}>
          <Card.Content>
            <Paragraph style={styles.emptyState}>
              No upcoming deadlines or actions. Check back later or update your profile.
            </Paragraph>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
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
    lineHeight: 20,
  },
  listItem: {
    paddingVertical: 4,
  },
  loadingText: {
    marginTop: 16,
    color: '#666',
  },
  errorText: {
    color: '#D32F2F',
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 8,
  },
  onboardingText: {
    textAlign: 'center',
    marginVertical: 16,
    color: '#666',
  },
  setupButton: {
    marginTop: 8,
  },
  emptyState: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
  },
});




