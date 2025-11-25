/**
 * Theme Module
 * Centralized exports for all theme-related utilities
 */

// Main theme configuration
export { lightTheme, darkTheme } from './theme';

// Color utilities
export {
  ImmigrationColors,
  getPriorityColor,
  getDeadlineColorByDays,
  getEventColor,
  getColorWithOpacity,
  getPriorityLabel,
} from './colors';

// Shared styles
export {
  Spacing,
  FontSizes,
  Colors,
  BorderRadius,
  ContainerStyles,
  CardStyles,
  TextStyles,
  ButtonStyles,
  ListStyles,
  IconStyles,
  ProgressStyles,
  createStyles,
} from './sharedStyles';

