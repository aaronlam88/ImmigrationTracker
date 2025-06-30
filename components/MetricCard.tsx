import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface MetricCardProps {
  title: string;
  value: string;
  color: string;
  icon: string;
  onPress: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, color, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.value, { color }]}>{value}</Text>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </View>
      <View style={[styles.indicator, { backgroundColor: color }]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '48%',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  title: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  indicator: {
    height: 3,
    width: '100%',
  },
});

export default MetricCard; 