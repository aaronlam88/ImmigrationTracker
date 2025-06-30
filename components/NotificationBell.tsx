import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface NotificationBellProps {
  count: number;
  onPress: () => void;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ count, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.bellIcon}>🔔</Text>
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {count > 99 ? '99+' : count.toString()}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: 8,
  },
  bellIcon: {
    fontSize: 24,
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#F44336',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default NotificationBell; 