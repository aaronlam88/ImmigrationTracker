/**
 * Main App Navigator
 * Sets up the bottom tab navigation for the immigration tracker
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

// Import screens
import StatusScreen from '../screens/StatusScreen';
import TimelineScreen from '../screens/TimelineScreen';
import ToDoScreen from '../screens/ToDoScreen';
import SettingsScreen from '../screens/SettingsScreen';

export type RootTabParamList = {
  Status: undefined;
  Timeline: undefined;
  ToDo: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function AppNavigator() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.outline,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="Status"
        component={StatusScreen}
        options={{
          title: 'Immigration Status',
          tabBarLabel: 'Status',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-check" size={size} color={color} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Timeline"
        component={TimelineScreen}
        options={{
          title: 'Timeline',
          tabBarLabel: 'Timeline',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="timeline-clock" size={size} color={color} />
          ),
        }}
      />
      
      <Tab.Screen
        name="ToDo"
        component={ToDoScreen}
        options={{
          title: 'To-Do List',
          tabBarLabel: 'To Do',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard-check-outline" size={size} color={color} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

