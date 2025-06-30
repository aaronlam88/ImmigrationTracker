import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { useImmigrationStore } from '../store/immigrationStore';
import { notificationService } from '../services/notificationService';

// Components
import LoginScreen from '../components/auth/LoginScreen';
import SignupScreen from '../components/auth/SignupScreen';
import SetupScreen from '../components/SetupScreen';
import Dashboard from '../components/Dashboard';

type Screen = 'login' | 'signup' | 'setup' | 'dashboard' | 'loading';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('loading');
  const { isAuthenticated, loading: authLoading, initializeAuth, user } = useAuthStore();
  const { currentCase } = useImmigrationStore();

  useEffect(() => {
    // Initialize authentication
    const unsubscribe = initializeAuth();
    
    // Initialize notifications safely (only in browser environment)
    const initNotifications = async () => {
      try {
        await notificationService.initialize();
      } catch (error) {
        console.warn('Failed to initialize notifications:', error);
      }
    };
    
    initNotifications();

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        setCurrentScreen('login');
      } else if (!currentCase) {
        setCurrentScreen('setup');
      } else {
        setCurrentScreen('dashboard');
        
        // Set up web push notifications for authenticated users
        if (user && typeof window !== 'undefined') {
          const setupWebPush = async () => {
            try {
              const service = notificationService.getInstance();
              await service.registerForWebPushNotifications(user);
            } catch (error) {
              console.warn('Failed to setup web push notifications:', error);
            }
          };
          setupWebPush();
        }
      }
    }
  }, [isAuthenticated, authLoading, currentCase, user]);

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen
            onNavigateToSignup={() => handleNavigate('signup')}
            onNavigateToForgotPassword={() => {/* TODO: Implement forgot password */}}
          />
        );
      
      case 'signup':
        return (
          <SignupScreen
            onNavigateToLogin={() => handleNavigate('login')}
          />
        );
      
      case 'setup':
        return (
          <SetupScreen
            onComplete={() => handleNavigate('dashboard')}
          />
        );
      
      case 'dashboard':
        return (
          <Dashboard
            onNavigate={(screen) => {
              // Handle navigation to different parts of the app
              console.log('Navigate to:', screen);
              // For now, just stay on dashboard
              // Later, you can implement proper navigation
            }}
          />
        );
      
      case 'loading':
      default:
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2196F3" />
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
}); 