/**
 * OnboardingPrompt Component
 * Prompts new users to set up their profile
 */

import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { ContainerStyles, TextStyles, ButtonStyles, Spacing } from '../../theme/sharedStyles';
import { createStyles } from '../../theme/sharedStyles';

export interface OnboardingPromptProps {
  /** Title of the onboarding prompt */
  title?: string;
  /** Description text */
  message?: string;
  /** Button text */
  buttonText?: string;
  /** Callback when button is pressed (for custom navigation) */
  onSetup?: () => void;
  /** Auto-navigate to Settings tab if no callback provided */
  autoNavigateToSettings?: boolean;
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
    <View style={ContainerStyles.centered}>
      <Text variant="titleLarge" style={styles.title}>{title}</Text>
      <Text variant="bodyMedium" style={[TextStyles.centeredText, TextStyles.mutedText, styles.message]}>
        {message}
      </Text>
      {onSetup && (
        <Button 
          mode="contained" 
          onPress={onSetup} 
          style={ButtonStyles.button}
        >
          {buttonText}
        </Button>
      )}
    </View>
  );
}

const styles = createStyles({
  title: {
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  message: {
    marginVertical: Spacing.md,
  },
});

