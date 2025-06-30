import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { format, differenceInDays } from 'date-fns';
import { useImmigrationStore } from '../store/immigrationStore';
import { ImmigrationStatus, Priority } from '../types/immigration';
import StatusTimeline from './StatusTimeline';
import DeadlineCard from './DeadlineCard';
import MetricCard from './MetricCard';
import NotificationBell from './NotificationBell';

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const {
    currentCase,
    notifications,
    getUpcomingDeadlines,
    getOverdueDeadlines,
    getCriticalNotifications,
    generateAutomaticDeadlines
  } = useImmigrationStore();

  useEffect(() => {
    if (currentCase) {
      generateAutomaticDeadlines();
    }
  }, [currentCase?.currentStatus]);

  if (!currentCase) {
    return (
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>Welcome to Immigration Tracker</Text>
          <Text style={styles.welcomeText}>
            Track your U.S. immigration journey from F-1 student to permanent resident
          </Text>
          <TouchableOpacity 
            style={styles.setupButton}
            onPress={() => onNavigate('setup')}
          >
            <Text style={styles.setupButtonText}>Set Up Your Case</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const upcomingDeadlines = getUpcomingDeadlines(30);
  const overdueDeadlines = getOverdueDeadlines();
  const criticalNotifications = getCriticalNotifications();

  const getStatusColor = (status: ImmigrationStatus) => {
    switch (status) {
      case ImmigrationStatus.F1_STUDENT:
        return '#2196F3';
      case ImmigrationStatus.POST_COMPLETION_OPT:
        return '#FF9800';
      case ImmigrationStatus.STEM_OPT_EXTENSION:
        return '#4CAF50';
      case ImmigrationStatus.H1B_APPROVED:
      case ImmigrationStatus.H1B_ACTIVE:
        return '#8BC34A';
      case ImmigrationStatus.PERMANENT_RESIDENT:
        return '#4CAF50';
      default:
        return '#9E9E9E';
    }
  };

  const getStatusDisplayName = (status: ImmigrationStatus) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const unemploymentProgress = currentCase.unemploymentDays / currentCase.maxUnemploymentDays;
  const unemploymentDaysRemaining = currentCase.maxUnemploymentDays - currentCase.unemploymentDays;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            Hello, {currentCase.personalInfo.firstName}!
          </Text>
          <Text style={styles.subtitle}>
            Current Status: {getStatusDisplayName(currentCase.currentStatus)}
          </Text>
        </View>
        <NotificationBell 
          count={criticalNotifications.length}
          onPress={() => onNavigate('notifications')}
        />
      </View>

      {/* Critical Alerts */}
      {(overdueDeadlines.length > 0 || unemploymentProgress > 0.8) && (
        <View style={styles.alertContainer}>
          <Text style={styles.alertTitle}>⚠️ Action Required</Text>
          {overdueDeadlines.length > 0 && (
            <Text style={styles.alertText}>
              You have {overdueDeadlines.length} overdue deadline{overdueDeadlines.length > 1 ? 's' : ''}
            </Text>
          )}
          {unemploymentProgress > 0.8 && (
            <Text style={styles.alertText}>
              Warning: Only {unemploymentDaysRemaining} unemployment days remaining
            </Text>
          )}
        </View>
      )}

      {/* Status Overview */}
      <View style={styles.statusContainer}>
        <Text style={styles.sectionTitle}>Current Status</Text>
        <View style={[styles.statusCard, { borderLeftColor: getStatusColor(currentCase.currentStatus) }]}>
          <Text style={styles.statusTitle}>
            {getStatusDisplayName(currentCase.currentStatus)}
          </Text>
          <Text style={styles.statusDuration}>
            Since {format(currentCase.statusHistory[currentCase.statusHistory.length - 1]?.startDate, 'MMM dd, yyyy')}
          </Text>
          {currentCase.currentStatus.includes('OPT') && (
            <View style={styles.unemploymentContainer}>
              <Text style={styles.unemploymentText}>
                Unemployment: {currentCase.unemploymentDays}/{currentCase.maxUnemploymentDays} days
              </Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${Math.min(unemploymentProgress * 100, 100)}%`,
                      backgroundColor: unemploymentProgress > 0.8 ? '#F44336' : unemploymentProgress > 0.6 ? '#FF9800' : '#4CAF50'
                    }
                  ]} 
                />
              </View>
            </View>
          )}
        </View>
      </View>

      {/* Key Metrics */}
      <View style={styles.metricsContainer}>
        <Text style={styles.sectionTitle}>Quick Overview</Text>
        <View style={styles.metricsGrid}>
          <MetricCard
            title="Upcoming Deadlines"
            value={upcomingDeadlines.length.toString()}
            color="#FF9800"
            icon="📅"
            onPress={() => onNavigate('deadlines')}
          />
          <MetricCard
            title="Documents"
            value={currentCase.documents.length.toString()}
            color="#2196F3"
            icon="📄"
            onPress={() => onNavigate('documents')}
          />
          <MetricCard
            title="H-1B Attempts"
            value={currentCase.h1bAttempts.length.toString()}
            color="#9C27B0"
            icon="🎯"
            onPress={() => onNavigate('h1b-tracker')}
          />
          <MetricCard
            title="Notifications"
            value={notifications.filter(n => !n.read).length.toString()}
            color="#F44336"
            icon="🔔"
            onPress={() => onNavigate('notifications')}
          />
        </View>
      </View>

      {/* Timeline */}
      <View style={styles.timelineContainer}>
        <Text style={styles.sectionTitle}>Status Timeline</Text>
        <StatusTimeline 
          statusHistory={currentCase.statusHistory}
          currentStatus={currentCase.currentStatus}
        />
      </View>

      {/* Upcoming Deadlines */}
      <View style={styles.deadlinesContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Deadlines</Text>
          <TouchableOpacity onPress={() => onNavigate('deadlines')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        {upcomingDeadlines.length === 0 ? (
          <Text style={styles.emptyText}>No upcoming deadlines</Text>
        ) : (
          upcomingDeadlines.slice(0, 3).map((deadline) => (
            <DeadlineCard 
              key={deadline.id}
              deadline={deadline}
              onPress={() => onNavigate('deadlines')}
            />
          ))
        )}
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => onNavigate('update-status')}
          >
            <Text style={styles.actionIcon}>🔄</Text>
            <Text style={styles.actionText}>Update Status</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => onNavigate('add-deadline')}
          >
            <Text style={styles.actionIcon}>➕</Text>
            <Text style={styles.actionText}>Add Deadline</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => onNavigate('upload-document')}
          >
            <Text style={styles.actionIcon}>📤</Text>
            <Text style={styles.actionText}>Upload Document</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => onNavigate('h1b-tracker')}
          >
            <Text style={styles.actionIcon}>🎯</Text>
            <Text style={styles.actionText}>H-1B Tracker</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  setupButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  setupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  alertContainer: {
    backgroundColor: '#FFF3E0',
    margin: 10,
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 5,
  },
  alertText: {
    fontSize: 14,
    color: '#E65100',
  },
  statusContainer: {
    margin: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewAllText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '600',
  },
  statusCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusDuration: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  unemploymentContainer: {
    marginTop: 10,
  },
  unemploymentText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  metricsContainer: {
    margin: 10,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timelineContainer: {
    margin: 10,
  },
  deadlinesContainer: {
    margin: 10,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    padding: 20,
  },
  actionsContainer: {
    margin: 10,
    marginBottom: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: 'white',
    width: '48%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});

export default Dashboard; 