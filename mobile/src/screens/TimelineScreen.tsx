/**
 * Timeline Screen
 * Displays the complete immigration timeline with deadlines and milestones
 */

import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, List, ProgressBar, Text, Button, ActivityIndicator, SegmentedButtons, Chip } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { UserProfile } from '../models/UserProfile';
import { TimelineEvent } from '../models/Timeline';
import { UserProfileStorage } from '../storage/UserProfileStorage';
import { TimelineService } from '../services/TimelineService';
import { getStatusLabel, ImmigrationPhase } from '../models/ImmigrationStatus';
import { formatDate, getDaysUntil, isAfter } from '../utils/dateCalculations';

export default function TimelineScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [allEvents, setAllEvents] = useState<TimelineEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phaseFilter, setPhaseFilter] = useState<string>('ALL');
  const [progress, setProgress] = useState(0);

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
      const events = timeline.events;
      
      // Sort events by date
      const sortedEvents = events.sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      
      setAllEvents(sortedEvents);
      setFilteredEvents(sortedEvents);

      // Calculate progress (percentage of past events)
      const now = new Date();
      const pastEvents = sortedEvents.filter(e => !isAfter(e.date, now)).length;
      const totalEvents = sortedEvents.length || 1;
      setProgress(pastEvents / totalEvents);

      setLoading(false);
    } catch (err) {
      console.error('Error loading timeline data:', err);
      setError('Failed to load timeline information');
      setLoading(false);
    }
  };

  // Load data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  // Filter events when filter changes
  useEffect(() => {
    if (phaseFilter === 'ALL') {
      setFilteredEvents(allEvents);
    } else {
      const filtered = allEvents.filter(event => event.phase === phaseFilter);
      setFilteredEvents(filtered);
    }
  }, [phaseFilter, allEvents]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const getEventIcon = (type: string): string => {
    switch (type) {
      case 'STATUS_CHANGE':
        return 'account-convert';
      case 'DEADLINE':
        return 'calendar-alert';
      case 'MILESTONE':
        return 'flag-checkered';
      case 'ACTION_REQUIRED':
        return 'alert-circle';
      case 'DOCUMENT_DUE':
        return 'file-document-alert';
      default:
        return 'information';
    }
  };

  const getEventColor = (event: TimelineEvent): string => {
    const now = new Date();
    const eventDate = new Date(event.date);
    
    // Past events - gray
    if (!isAfter(event.date, now)) {
      return '#9E9E9E';
    }
    
    // Future events - color by type
    switch (event.type) {
      case 'DEADLINE':
      case 'ACTION_REQUIRED':
      case 'DOCUMENT_DUE':
        return '#F57C00'; // Orange for urgent
      case 'MILESTONE':
        return '#6750A4'; // Purple for milestones
      default:
        return '#388E3C'; // Green for normal
    }
  };

  const groupEventsByPhase = () => {
    const groups: { [key: string]: TimelineEvent[] } = {};
    
    filteredEvents.forEach(event => {
      const phase = event.phase || 'OTHER';
      if (!groups[phase]) {
        groups[phase] = [];
      }
      groups[phase].push(event);
    });
    
    return groups;
  };

  const getPhaseLabel = (phase: string): string => {
    switch (phase) {
      case ImmigrationPhase.STUDENT:
        return 'F-1 Student Phase';
      case ImmigrationPhase.OPT:
        return 'OPT Phase';
      case ImmigrationPhase.H1B:
        return 'H-1B Phase';
      default:
        return 'Other';
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Paragraph style={styles.loadingText}>Loading your timeline...</Paragraph>
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
        <Title>No Timeline Yet</Title>
        <Paragraph style={styles.onboardingText}>
          Set up your profile to see your immigration timeline.
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

  const eventGroups = groupEventsByPhase();
  const progressPercent = Math.round(progress * 100);

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Progress Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Immigration Journey Progress</Title>
          <ProgressBar 
            progress={progress} 
            color="#6750A4" 
            style={styles.progressBar} 
          />
          <Text style={styles.progressText}>{progressPercent}% Complete</Text>
          <Paragraph style={styles.progressDescription}>
            You've completed {Math.round(progress * allEvents.length)} of {allEvents.length} milestones
          </Paragraph>
        </Card.Content>
      </Card>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <SegmentedButtons
          value={phaseFilter}
          onValueChange={setPhaseFilter}
          buttons={[
            { value: 'ALL', label: 'All' },
            { value: ImmigrationPhase.STUDENT, label: 'F-1' },
            { value: ImmigrationPhase.OPT, label: 'OPT' },
            { value: ImmigrationPhase.H1B, label: 'H-1B' },
          ]}
          style={styles.segmentedButtons}
        />
      </View>

      {/* Timeline Events by Phase */}
      {Object.keys(eventGroups).length > 0 ? (
        Object.entries(eventGroups).map(([phase, events]) => (
          <Card key={phase} style={styles.card}>
            <Card.Content>
              <Title>{getPhaseLabel(phase)}</Title>
              <List.Section>
                {events.map((event, index) => {
                  const isPast = !isAfter(event.date, new Date());
                  const eventColor = getEventColor(event);
                  const daysUntil = isPast ? null : getDaysUntil(event.date);
                  
                  return (
                    <List.Item
                      key={index}
                      title={event.title}
                      description={
                        isPast 
                          ? `Completed on ${formatDate(event.date)}`
                          : `${formatDate(event.date)}${daysUntil !== null ? ` • ${daysUntil} days` : ''}`
                      }
                      left={props => (
                        <List.Icon 
                          {...props} 
                          icon={getEventIcon(event.type)}
                          color={eventColor}
                        />
                      )}
                      right={() => (
                        isPast ? (
                          <List.Icon icon="check" color="#4CAF50" />
                        ) : event.type === 'DEADLINE' || event.type === 'ACTION_REQUIRED' ? (
                          <Chip 
                            style={{ backgroundColor: '#FFF3E0' }}
                            textStyle={{ color: '#F57C00', fontSize: 10 }}
                          >
                            URGENT
                          </Chip>
                        ) : null
                      )}
                      style={[
                        styles.listItem,
                        isPast && styles.pastEvent
                      ]}
                      titleStyle={isPast ? styles.pastEventText : undefined}
                      descriptionStyle={isPast ? styles.pastEventText : undefined}
                    />
                  );
                })}
              </List.Section>
            </Card.Content>
          </Card>
        ))
      ) : (
        <Card style={styles.card}>
          <Card.Content>
            <Paragraph style={styles.emptyState}>
              No events found for the selected filter.
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
  progressBar: {
    marginTop: 16,
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    marginTop: 8,
    textAlign: 'center',
    color: '#666',
    fontWeight: 'bold',
    fontSize: 16,
  },
  progressDescription: {
    marginTop: 4,
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
  },
  filterContainer: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  segmentedButtons: {
    backgroundColor: 'white',
  },
  listItem: {
    paddingVertical: 4,
  },
  pastEvent: {
    opacity: 0.6,
  },
  pastEventText: {
    textDecorationLine: 'line-through',
    color: '#999',
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




