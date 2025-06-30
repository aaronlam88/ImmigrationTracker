import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { StatusHistoryEntry, ImmigrationStatus } from '../types/immigration';

interface StatusTimelineProps {
  statusHistory: StatusHistoryEntry[];
  currentStatus: ImmigrationStatus;
}

const StatusTimeline: React.FC<StatusTimelineProps> = ({ statusHistory, currentStatus }) => {
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

  return (
    <View style={styles.container}>
      {statusHistory.map((entry, index) => {
        const isLast = index === statusHistory.length - 1;
        const statusColor = getStatusColor(entry.status);
        
        return (
          <View key={entry.id} style={styles.timelineItem}>
            <View style={styles.timelineLeft}>
              <View style={[styles.dot, { backgroundColor: statusColor }]} />
              {!isLast && <View style={styles.line} />}
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.statusTitle}>
                {getStatusDisplayName(entry.status)}
              </Text>
              <Text style={styles.dateText}>
                {format(entry.startDate, 'MMM dd, yyyy')}
                {entry.endDate && ` - ${format(entry.endDate, 'MMM dd, yyyy')}`}
                {isLast && !entry.endDate && ' - Present'}
              </Text>
              {entry.notes && (
                <Text style={styles.notesText}>{entry.notes}</Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 15,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
  },
  line: {
    width: 2,
    backgroundColor: '#E0E0E0',
    flex: 1,
    marginTop: 5,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 10,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});

export default StatusTimeline; 