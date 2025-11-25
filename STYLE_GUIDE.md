# Style Guide 🎨

## Overview

This guide explains how to use the centralized style system in the Immigration Tracker mobile app to ensure consistency across all components and screens.

---

## 🎯 Goals

- **Consistency**: Same spacing, colors, and typography throughout the app
- **Maintainability**: Change once, apply everywhere
- **Developer Experience**: Easy-to-use, well-documented style utilities
- **Performance**: Optimized StyleSheet creation

---

## 📦 Imports

All theme utilities can be imported from the `theme` module:

```typescript
// Import everything from theme module
import {
  Spacing,
  FontSizes,
  Colors,
  ContainerStyles,
  CardStyles,
  TextStyles,
  // ... etc
} from '../theme';

// Or import specific utilities
import { Spacing, ContainerStyles } from '../theme/sharedStyles';
import { getPriorityColor } from '../theme/colors';
```

---

## 📐 Spacing System

Use consistent spacing values instead of hardcoding pixels:

```typescript
import { Spacing } from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,        // 16px
    marginTop: Spacing.lg,       // 24px
    gap: Spacing.sm,             // 8px
  },
});
```

**Available spacing values:**
- `xs`: 4px - Minimal spacing
- `sm`: 8px - Small spacing
- `md`: 16px - **Default/most common**
- `lg`: 24px - Large spacing
- `xl`: 32px - Extra large
- `xxl`: 48px - Huge spacing

---

## 🎨 Color System

### Using Semantic Colors

```typescript
import { Colors, ImmigrationColors } from '../theme';

// App-wide colors
const styles = StyleSheet.create({
  text: { color: Colors.textPrimary },      // #000000
  mutedText: { color: Colors.textSecondary }, // #666666
  background: { backgroundColor: Colors.background }, // #f5f5f5
});

// Immigration-specific colors
const deadlineColor = ImmigrationColors.priority.HIGH; // #F57C00
```

### Using Color Helper Functions

```typescript
import { getPriorityColor, getEventColor } from '../theme';

// Get color for priority level
const color = getPriorityColor('HIGH'); // Returns: #F57C00

// Get color for event type
const eventColor = getEventColor('DEADLINE', false); // Returns: #F57C00
const pastEventColor = getEventColor('DEADLINE', true); // Returns: #9E9E9E
```

---

## 📝 Typography

Use predefined font sizes instead of hardcoding:

```typescript
import { FontSizes } from '../theme';

const styles = StyleSheet.create({
  title: {
    fontSize: FontSizes.xl,      // 20px
    fontWeight: 'bold',
  },
  body: {
    fontSize: FontSizes.base,    // 16px - default
  },
  caption: {
    fontSize: FontSizes.sm,      // 12px
  },
});
```

**Available font sizes:**
- `xs`: 10px
- `sm`: 12px  
- `md`: 14px
- `base`: 16px - **Default body text**
- `lg`: 18px
- `xl`: 20px
- `xxl`: 24px
- `xxxl`: 32px
- `huge`: 48px

---

## 🏗️ Pre-built Style Sets

Instead of creating custom styles from scratch, use pre-built style sets:

### Container Styles

```typescript
import { ContainerStyles } from '../theme';

// Full screen container
<View style={ContainerStyles.screen}>

// Centered content (for loading/error states)
<View style={ContainerStyles.centered}>

// Standard content padding
<View style={ContainerStyles.content}>

// Row with space-between
<View style={ContainerStyles.rowBetween}>
```

### Card Styles

```typescript
import { CardStyles } from '../theme';

// Standard card
<Card style={CardStyles.card}>

// Card with elevation/shadow
<Card style={CardStyles.cardElevated}>

// Compact card (less margin)
<Card style={CardStyles.cardCompact}>
```

### Text Styles

```typescript
import { TextStyles } from '../theme';

// Section title
<Text style={TextStyles.sectionTitle}>Title</Text>

// Subtitle/description
<Text style={TextStyles.subtitle}>Description</Text>

// Error message
<Text style={TextStyles.errorText}>Error!</Text>

// Muted/secondary text
<Text style={TextStyles.mutedText}>Secondary</Text>

// Empty state message
<Text style={TextStyles.emptyText}>No data</Text>
```

### List Styles

```typescript
import { ListStyles } from '../theme';

// Standard list item
<List.Item style={ListStyles.listItem} />

// Past/completed item (grayed out)
<List.Item style={ListStyles.pastItem} />

// Past item text (strikethrough)
<Text style={ListStyles.pastItemText}>Completed</Text>
```

---

## 🔧 Creating Custom Styles

When you need custom styles, use the `createStyles` helper:

```typescript
import { createStyles, Spacing, Colors } from '../theme';

const styles = createStyles({
  // Use shared styles
  container: ContainerStyles.centered,
  
  // Extend with custom properties
  customCard: {
    ...CardStyles.card,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  
  // Create completely new styles using constants
  header: {
    padding: Spacing.lg,
    backgroundColor: Colors.surface,
  },
});
```

---

## ✨ Best Practices

### ✅ DO:

```typescript
// Use spacing constants
padding: Spacing.md,
marginTop: Spacing.lg,

// Use color constants
color: Colors.textSecondary,
backgroundColor: ImmigrationColors.priority.HIGH,

// Use font size constants
fontSize: FontSizes.base,

// Use pre-built styles
<View style={ContainerStyles.centered}>

// Combine styles when needed
<Text style={[TextStyles.centeredText, TextStyles.mutedText]}>
```

### ❌ DON'T:

```typescript
// Don't hardcode spacing
padding: 16,
marginTop: 24,

// Don't hardcode colors
color: '#666666',
backgroundColor: '#F57C00',

// Don't hardcode font sizes
fontSize: 16,

// Don't recreate common patterns
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

---

## 📋 Migration Guide

### For Existing Components

**Before:**
```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    color: '#D32F2F',
    marginBottom: 16,
    textAlign: 'center',
  },
});
```

**After:**
```typescript
import { ContainerStyles, TextStyles } from '../theme';

// Just use the pre-built styles!
<View style={ContainerStyles.centered}>
  <Text style={TextStyles.errorText}>Error!</Text>
</View>
```

---

## 🎯 Examples

### Example 1: Loading Screen

```typescript
import { LoadingView } from '../components/common';

// That's it! No custom styles needed
export function MyScreen() {
  if (loading) {
    return <LoadingView message="Loading data..." />;
  }
  // ...
}
```

### Example 2: Custom Screen with Shared Styles

```typescript
import { ContainerStyles, CardStyles, TextStyles, Spacing } from '../theme';
import { createStyles } from '../theme';

export function MyScreen() {
  return (
    <ScrollView style={ContainerStyles.screen}>
      <Card style={CardStyles.card}>
        <Card.Content>
          <Text style={TextStyles.sectionTitle}>My Title</Text>
          <Text style={TextStyles.subtitle}>Description</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

// Only create custom styles for unique cases
const styles = createStyles({
  customElement: {
    padding: Spacing.lg,
    // ... custom properties
  },
});
```

### Example 3: Using Color Helpers

```typescript
import { getPriorityColor, getColorWithOpacity } from '../theme';

function DeadlineItem({ deadline }) {
  const priorityColor = getPriorityColor(deadline.priority);
  const backgroundColor = getColorWithOpacity(priorityColor, 0.12);
  
  return (
    <Chip
      style={{ backgroundColor }}
      textStyle={{ color: priorityColor }}
    >
      {deadline.priority}
    </Chip>
  );
}
```

---

## 📚 Reference

### Complete Style Sets

- **ContainerStyles**: `screen`, `centered`, `content`, `rowBetween`, `rowCenter`
- **CardStyles**: `card`, `cardElevated`, `cardCompact`
- **TextStyles**: `sectionTitle`, `subtitle`, `errorText`, `mutedText`, `centeredText`, `loadingText`, `emptyText`
- **ButtonStyles**: `button`, `buttonSpaced`, `retryButton`
- **ListStyles**: `listItem`, `listItemNoPadding`, `pastItem`, `pastItemText`
- **IconStyles**: `iconLarge`, `iconMedium`
- **ProgressStyles**: `progressBar`, `progressText`, `progressDescription`

### Color Helpers

- `getPriorityColor(priority)` - Get color for CRITICAL, HIGH, MEDIUM, LOW
- `getDeadlineColorByDays(days)` - Get color based on urgency
- `getEventColor(type, isPast)` - Get color for timeline events
- `getColorWithOpacity(color, opacity)` - Create translucent colors
- `getPriorityLabel(priority)` - Get human-readable label

### Icon Helpers

- `getDeadlineIcon(type)` - Icon for deadline types
- `getActionIcon(category)` - Icon for action categories
- `getEventIcon(type)` - Icon for timeline events
- `getStatusIcon(status)` - Icon for immigration status

---

## 🆘 Questions?

- Check `mobile/src/theme/sharedStyles.ts` for all available styles
- Check `mobile/src/theme/colors.ts` for color utilities
- Check `mobile/src/utils/iconMapping.ts` for icon utilities
- Look at `mobile/src/components/common/*` for usage examples

---

*Last updated: Phase 1 Refactoring - Style System Implementation*

