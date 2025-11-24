/**
 * OnboardingPrompt Component
 * Prompts new users to set up their profile
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Paragraph, Button } from 'react-native-paper';

export interface OnboardingPromptProps {
  /** Title of the onboarding prompt */
  title?: string;
  /** Description text */
  message?: string;
  /** Button text */
  buttonText?: string;
  /** Callback when button is pressed */
  onSetup?: () => void;
}

/**
 * Standard onboarding prompt component
 * 
 * @example
 * ```tsx
 * <OnboardingPrompt 
 *   title="Welcome!"
 *   message="Set up your profile to get started"
 *   onSetup={() => navigation.navigate('ProfileSetup')}
 * />
 * ```
 */
export function OnboardingPrompt({ 
  title = 'Welcome to Immigration Tracker',
  message = "Let's set up your profile to track your immigration journey.",
  buttonText = 'Set Up Profile',
  onSetup
}: OnboardingPromptProps) {
  return (
    <View style={styles.container}>
      <Title style={styles.title}>{title}</Title>
      <Paragraph style={styles.message}>{message}</Paragraph>
      {onSetup && (
        <Button 
          mode="contained" 
          onPress={onSetup} 
          style={styles.button}
        >
          {buttonText}
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    textAlign: 'center',
    marginVertical: 16,
    color: '#666',
  },
  button: {
    marginTop: 8,
  },
});

