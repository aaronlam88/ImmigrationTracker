import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { format, differenceInDays } from 'date-fns';
import { Deadline, Priority } from '../types/immigration';

interface DeadlineCardProps {
  deadline: Deadline;
  onPress: () => void;
}

const DeadlineCard: React.FC<DeadlineCardProps> = ({ deadline, onPress }) => {
  const now = new Date();
  const daysUntilDue = differenceInDays(deadline.dueDate, now);
  
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case Priority.CRITICAL:
        return '#F44336';
      case Priority.HIGH:
        return '#FF9800';
      case Priority.MEDIUM:
        return '#2196F3';
      case Priority.LOW:
        return '#4CAF50';
      default:
        return '#9E9E9E';
    }
  };

  const getPriorityIcon = (priority: Priority) => {
    switch (priority) {
      case Priority.CRITICAL:
        return '🚨';
      case Priority.HIGH:
        return '⚠️';
      case Priority.MEDIUM:
        return '📋';
      case Priority.LOW:
        return '📝';
      default:
        return '📄';
    }
  };

  const getUrgencyStyle = () => {
    if (daysUntilDue < 0) {
      return { backgroundColor: '#FFEBEE', borderLeftColor: '#F44336' };
    } else if (daysUntilDue <= 7) {
      return { backgroundColor: '#FFF3E0', borderLeftColor: '#FF9800' };
    }
    return { backgroundColor: 'white', borderLeftColor: getPriorityColor(deadline.priority) };
  };

  const getUrgencyText = () => {
    if (daysUntilDue < 0) {
      return `${Math.abs(daysUntilDue)} days overdue`;
    } else if (daysUntilDue === 0) {
      return 'Due today';
    } else if (daysUntilDue === 1) {
      return 'Due tomorrow';
    } else {
      return `${daysUntilDue} days remaining`;
    }
  };

  return (
    <TouchableOpacity style={[styles.container, getUrgencyStyle()]} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.icon}>{getPriorityIcon(deadline.priority)}</Text>
          <Text style={styles.title} numberOfLines={2}>
            {deadline.title}
          </Text>
        </View>
        <View style={styles.urgencyContainer}>
          <Text style={[
            styles.urgencyText,
            { color: daysUntilDue < 0 ? '#F44336' : daysUntilDue <= 7 ? '#FF9800' : '#666' }
          ]}>
            {getUrgencyText()}
          </Text>
        </View>
      </View>
      
      <Text style={styles.description} numberOfLines={2}>
        {deadline.description}
      </Text>
      
      <View style={styles.footer}>
        <Text style={styles.dueDate}>
          Due: {format(deadline.dueDate, 'MMM dd, yyyy')}
        </Text>
        <View style={styles.categoryContainer}>
          <Text style={[styles.category, { color: getPriorityColor(deadline.priority) }]}>
            {deadline.category.replace(/_/g, ' ')}
          </Text>
        </View>
      </View>
      
      {deadline.associatedForm && (
        <View style={styles.formContainer}>
          <Text style={styles.formText}>Form: {deadline.associatedForm}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  urgencyContainer: {
    alignItems: 'flex-end',
  },
  urgencyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueDate: {
    fontSize: 12,
    color: '#666',
  },
  categoryContainer: {
    alignItems: 'flex-end',
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  formContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  formText: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '500',
  },
});

export default DeadlineCard; 