/**
 * To-Do Screen
 * Shows actionable items and preparation steps for the user's next immigration status
 */

import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { Text, Card, List, Chip, useTheme, ActivityIndicator, Button, Title, Paragraph } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { UserProfile } from '../models/UserProfile';
import { ActionItem, Deadline } from '../models/Timeline';
import { UserProfileStorage } from '../storage/UserProfileStorage';
import { TimelineService } from '../services/TimelineService';
import { StatusService } from '../services/StatusService';
import { getStatusLabel, ImmigrationStatus } from '../models/ImmigrationStatus';
import { formatDate, getDaysUntil } from '../utils/dateCalculations';

export default function ToDoScreen() {
  const theme = useTheme();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [currentActions, setCurrentActions] = useState<ActionItem[]>([]);
  const [upcomingActions, setUpcomingActions] = useState<ActionItem[]>([]);
  const [urgentDeadlines, setUrgentDeadlines] = useState<Deadline[]>([]);
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
        setProfile(null);
        setLoading(false);
        return;
      }

      setProfile(userProfile);

      // Generate timeline
      const timeline = TimelineService.generateUserTimeline(userProfile);
      
      // Get current actions (no due date or due within 30 days)
      const now = new Date();
      const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      
      const current = timeline.actionItems.filter(action => {
        if (!action.dueDate) return true;
        const dueDate = new Date(action.dueDate);
        return dueDate >= now && dueDate <= thirtyDaysFromNow;
      }).slice(0, 5);
      
      setCurrentActions(current);

      // Get upcoming actions (due between 30-90 days)
      const ninetyDaysFromNow = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
      
      const upcoming = timeline.actionItems.filter(action => {
        if (!action.dueDate) return false;
        const dueDate = new Date(action.dueDate);
        return dueDate > thirtyDaysFromNow && dueDate <= ninetyDaysFromNow;
      }).slice(0, 5);
      
      setUpcomingActions(upcoming);

      // Get urgent deadlines (within 2 weeks)
      const twoWeeksFromNow = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
      
      const urgent = timeline.deadlines.filter(deadline => {
        const dueDate = new Date(deadline.dueDate);
        return dueDate >= now && dueDate <= twoWeeksFromNow;
      }).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
        .slice(0, 3);
      
      setUrgentDeadlines(urgent);

      // Get recommended next status
      const recommended = StatusService.getRecommendedNextStatus(userProfile);
      setNextStatus(recommended);

      setLoading(false);
    } catch (err) {
      console.error('Error loading to-do data:', err);
      setError('Failed to load to-do information');
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
        return 'clipboard-check';
    }
  };

  const getPriorityColor = (priority: string | undefined): string => {
    switch (priority) {
      case 'CRITICAL':
        return theme.colors.error;
      case 'HIGH':
        return '#F57C00';
      case 'MEDIUM':
        return '#FBC02D';
      default:
        return theme.colors.primary;
    }
  };

  const getPriorityLabel = (priority: string | undefined): string => {
    switch (priority) {
      case 'CRITICAL':
        return 'Critical';
      case 'HIGH':
        return 'High';
      case 'MEDIUM':
        return 'Medium';
      default:
        return 'Low';
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Paragraph style={styles.loadingText}>Loading your to-do list...</Paragraph>
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
        <Title>Welcome!</Title>
        <Paragraph style={styles.onboardingText}>
          Set up your profile to get a personalized to-do list.
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
      <View style={styles.content}>
        {/* Next Status Banner */}
        {nextStatus && (
          <Card style={[styles.card, styles.nextStatusCard]}>
            <Card.Content>
              <View style={styles.nextStatusHeader}>
                <Text variant="titleMedium" style={styles.nextStatusTitle}>
                  📍 Next Milestone
                </Text>
                <Chip mode="outlined" compact>
                  {getStatusLabel(nextStatus)}
                </Chip>
              </View>
              <Text variant="bodyMedium" style={styles.nextStatusDescription}>
                Work on the actions below to prepare for your transition.
              </Text>
            </Card.Content>
          </Card>
        )}

        {/* Urgent Deadlines */}
        {urgentDeadlines.length > 0 && (
          <Card style={[styles.card, styles.urgentCard]}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.sectionTitle}>
                ⚠️ Urgent Deadlines
              </Text>
              <Text variant="bodyMedium" style={styles.subtitle}>
                Action required within 2 weeks
              </Text>

              {urgentDeadlines.map((deadline, index) => {
                const daysUntil = getDaysUntil(deadline.dueDate);
                return (
                  <List.Item
                    key={index}
                    title={deadline.title}
                    description={`${formatDate(deadline.dueDate)} • ${daysUntil} days left`}
                    left={(props) => (
                      <List.Icon {...props} icon="alert-circle" color={theme.colors.error} />
                    )}
                    right={() => (
                      <Chip 
                        mode="flat"
                        style={{ backgroundColor: theme.colors.errorContainer }}
                        textStyle={{ color: theme.colors.error }}
                      >
                        {getPriorityLabel(deadline.priority)}
                      </Chip>
                    )}
                    style={styles.listItem}
                  />
                );
              })}
            </Card.Content>
          </Card>
        )}

        {/* Current Focus Section */}
        {currentActions.length > 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.sectionTitle}>
                Current Focus
              </Text>
              <Text variant="bodyMedium" style={styles.subtitle}>
                Actions you need to take now
              </Text>

              {currentActions.map((action, index) => {
                const dueText = action.dueDate 
                  ? `Due ${formatDate(action.dueDate)} • ${getDaysUntil(action.dueDate)} days`
                  : 'No deadline';
                
                return (
                  <List.Item
                    key={index}
                    title={action.title}
                    description={`${action.description || ''}\n${dueText}`}
                    left={(props) => (
                      <List.Icon 
                        {...props} 
                        icon={getActionIcon(action.category)}
                        color={getPriorityColor(action.priority)}
                      />
                    )}
                    right={action.priority ? () => (
                      <Chip 
                        mode="outlined" 
                        compact
                        style={{ borderColor: getPriorityColor(action.priority) }}
                        textStyle={{ color: getPriorityColor(action.priority) }}
                      >
                        {getPriorityLabel(action.priority)}
                      </Chip>
                    ) : undefined}
                    style={styles.listItem}
                  />
                );
              })}
            </Card.Content>
          </Card>
        )}

        {/* Get Ready For Section */}
        {upcomingActions.length > 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.sectionTitle}>
                Get Ready For
              </Text>
              <Text variant="bodyMedium" style={styles.subtitle}>
                Upcoming actions in the next 30-90 days
              </Text>

              {upcomingActions.map((action, index) => {
                const dueText = action.dueDate 
                  ? `Due ${formatDate(action.dueDate)} • ${getDaysUntil(action.dueDate)} days`
                  : '';
                
                return (
                  <List.Item
                    key={index}
                    title={action.title}
                    description={`${action.description || ''}\n${dueText}`}
                    left={(props) => (
                      <List.Icon {...props} icon={getActionIcon(action.category)} />
                    )}
                    style={styles.listItem}
                  />
                );
              })}
            </Card.Content>
          </Card>
        )}

        {/* Empty State */}
        {currentActions.length === 0 && upcomingActions.length === 0 && urgentDeadlines.length === 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.emptyStateContainer}>
                <Text variant="headlineSmall" style={styles.emptyStateTitle}>
                  🎉 All Caught Up!
                </Text>
                <Paragraph style={styles.emptyStateText}>
                  You have no pending action items. Check back later or update your profile if your status changes.
                </Paragraph>
              </View>
            </Card.Content>
          </Card>
        )}
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

