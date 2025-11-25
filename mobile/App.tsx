/**
 * Immigration Tracker - Main App Entry Point
 * Phase 1: Mobile-first offline iOS app
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Import navigation and theme
import AppNavigator from './src/navigation/AppNavigator';
import { lightTheme } from './src/theme/theme';

// Initialize i18n
import './src/i18n/config';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={lightTheme}>
        <NavigationContainer>
          <StatusBar style="light" />
          <AppNavigator />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
