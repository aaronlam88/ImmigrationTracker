/**
 * App Theme Configuration
 * Using React Native Paper's Material Design 3 theme
 */

import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

/**
 * Light theme (default)
 */
export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200ee',
    primaryContainer: '#bb86fc',
    secondary: '#03dac6',
    secondaryContainer: '#018786',
    tertiary: '#03a9f4',
    error: '#b00020',
    errorContainer: '#f9dedc',
    background: '#f5f5f5',
    surface: '#ffffff',
    surfaceVariant: '#f3f3f3',
    onPrimary: '#ffffff',
    onSecondary: '#000000',
    onBackground: '#000000',
    onSurface: '#000000',
    outline: '#79747e',
  },
};

/**
 * Dark theme (future enhancement)
 */
export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#bb86fc',
    primaryContainer: '#3700b3',
    secondary: '#03dac6',
    secondaryContainer: '#005457',
    tertiary: '#03a9f4',
    error: '#cf6679',
    errorContainer: '#b00020',
    background: '#121212',
    surface: '#1e1e1e',
    surfaceVariant: '#2c2c2c',
    onPrimary: '#000000',
    onSecondary: '#000000',
    onBackground: '#ffffff',
    onSurface: '#ffffff',
    outline: '#938f99',
  },
};

/**
 * Immigration-specific color scheme
 */
export const immigrationColors = {
  // Status colors
  statusActive: '#4caf50', // Green
  statusPending: '#ff9800', // Orange
  statusExpired: '#f44336', // Red
  statusUpcoming: '#2196f3', // Blue
  
  // Priority colors
  criticalPriority: '#d32f2f', // Dark red
  highPriority: '#ff6f00', // Dark orange
  mediumPriority: '#ffa726', // Light orange
  lowPriority: '#66bb6a', // Light green
  
  // Phase colors (from diagram.svg)
  f1Phase: '#3498db', // Blue
  optPhase: '#9b59b6', // Purple
  ssnPhase: '#f1c40f', // Yellow
  stemPhase: '#27ae60', // Green
  h1bPhase: '#e91e63', // Pink
};

/**
 * Typography
 */
export const typography = {
  // Heading sizes
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,
  
  // Body text
  body1: 16,
  body2: 14,
  
  // Other
  caption: 12,
  button: 14,
};

/**
 * Spacing
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

/**
 * Border radius
 */
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  full: 9999,
};

/**
 * Export default theme
 */
export default {
  light: lightTheme,
  dark: darkTheme,
  colors: immigrationColors,
  typography,
  spacing,
  borderRadius,
};




