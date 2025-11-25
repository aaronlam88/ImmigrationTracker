/**
 * Shared Styles
 * Centralized style definitions for consistent UI across the app
 */

import { StyleSheet } from 'react-native';

/**
 * Common spacing values (in pixels)
 */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

/**
 * Common font sizes (in pixels)
 */
export const FontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
} as const;

/**
 * Common colors used throughout the app
 */
export const Colors = {
  // Background colors
  background: '#f5f5f5',
  surface: '#ffffff',
  
  // Text colors
  textPrimary: '#000000',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textDisabled: '#CCCCCC',
  
  // Border colors
  border: '#E0E0E0',
  borderLight: '#F0F0F0',
  
  // Semantic colors (imported from colors.ts)
  error: '#D32F2F',
  success: '#4CAF50',
  warning: '#F57C00',
  info: '#2196F3',
} as const;

/**
 * Common border radius values
 */
export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999,
} as const;

/**
 * Shared container styles
 */
export const ContainerStyles = StyleSheet.create({
  /** Standard screen container with background */
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  /** Centered container for loading/error/empty states */
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.background,
  },
  
  /** Standard content padding */
  content: {
    padding: Spacing.md,
  },
  
  /** Row container with items spaced between */
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  /** Row container with items centered */
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/**
 * Shared card styles
 */
export const CardStyles = StyleSheet.create({
  /** Standard card with margin */
  card: {
    margin: Spacing.md,
    marginBottom: Spacing.sm,
  },
  
  /** Card with elevation/shadow */
  cardElevated: {
    margin: Spacing.md,
    marginBottom: Spacing.sm,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  /** Compact card with less margin */
  cardCompact: {
    margin: Spacing.sm,
  },
});

/**
 * Shared text styles
 */
export const TextStyles = StyleSheet.create({
  /** Section title text */
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  
  /** Subtitle/description text */
  subtitle: {
    opacity: 0.7,
    marginBottom: Spacing.md,
  },
  
  /** Error message text */
  errorText: {
    color: Colors.error,
    marginBottom: Spacing.md,
    textAlign: 'center',
    fontSize: FontSizes.base,
  },
  
  /** Secondary/muted text */
  mutedText: {
    color: Colors.textSecondary,
  },
  
  /** Centered text */
  centeredText: {
    textAlign: 'center',
  },
  
  /** Loading message text */
  loadingText: {
    marginTop: Spacing.md,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  
  /** Empty state message */
  emptyText: {
    textAlign: 'center',
    color: Colors.textTertiary,
    fontStyle: 'italic',
  },
});

/**
 * Shared button styles
 */
export const ButtonStyles = StyleSheet.create({
  /** Standard button margin */
  button: {
    marginTop: Spacing.sm,
  },
  
  /** Button with more margin */
  buttonSpaced: {
    marginTop: Spacing.md,
  },
  
  /** Retry button (for error states) */
  retryButton: {
    marginTop: Spacing.sm,
  },
});

/**
 * Shared list item styles
 */
export const ListStyles = StyleSheet.create({
  /** Standard list item padding */
  listItem: {
    paddingVertical: Spacing.xs,
  },
  
  /** List item with no horizontal padding */
  listItemNoPadding: {
    paddingHorizontal: 0,
  },
  
  /** Past/completed list item (grayed out) */
  pastItem: {
    opacity: 0.6,
  },
  
  /** Past item text with strikethrough */
  pastItemText: {
    textDecorationLine: 'line-through',
    color: Colors.textTertiary,
  },
});

/**
 * Shared icon styles
 */
export const IconStyles = StyleSheet.create({
  /** Large icon (e.g., empty state) */
  iconLarge: {
    fontSize: FontSizes.huge,
    marginBottom: Spacing.md,
  },
  
  /** Medium icon */
  iconMedium: {
    fontSize: FontSizes.xxxl,
    marginBottom: Spacing.sm,
  },
});

/**
 * Shared progress/status styles
 */
export const ProgressStyles = StyleSheet.create({
  /** Progress bar styling */
  progressBar: {
    marginTop: Spacing.md,
    height: 8,
    borderRadius: BorderRadius.sm,
  },
  
  /** Progress text below bar */
  progressText: {
    marginTop: Spacing.sm,
    textAlign: 'center',
    color: Colors.textSecondary,
    fontWeight: 'bold',
    fontSize: FontSizes.base,
  },
  
  /** Progress description */
  progressDescription: {
    marginTop: Spacing.xs,
    textAlign: 'center',
    color: Colors.textTertiary,
    fontSize: FontSizes.sm,
  },
});

/**
 * Helper function to create component-specific styles that extend shared styles
 * 
 * @example
 * ```ts
 * const styles = createStyles({
 *   container: {
 *     ...ContainerStyles.centered,
 *     backgroundColor: 'red', // Override
 *   },
 *   custom: {
 *     padding: Spacing.lg,
 *   },
 * });
 * ```
 */
export function createStyles<T extends StyleSheet.NamedStyles<T>>(
  styles: T | StyleSheet.NamedStyles<T>
): T {
  return StyleSheet.create(styles);
}

