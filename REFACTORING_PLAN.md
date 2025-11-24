# Code Refactoring Plan 🔧

## Analysis Summary

After scanning all code files, I've identified the following refactoring opportunities:

---

## 1. 🎣 Extract Shared Screen Logic into Custom Hooks

### Problem
All three screens (Status, Timeline, ToDo) have duplicate logic:
- Loading user profile from storage
- Managing loading/error/refreshing states
- Generating timeline data
- Pull-to-refresh implementation
- useFocusEffect pattern

### Solution: Create Custom Hooks

#### `useUserProfile.ts`
```typescript
// Returns profile, loading, error, refresh function
export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const loadProfile = async () => { /* ... */ };
  
  useFocusEffect(useCallback(() => { loadProfile(); }, []));
  
  return { profile, loading, error, refresh: loadProfile };
}
```

#### `useTimeline.ts`
```typescript
// Returns timeline data based on user profile
export function useTimeline(profile: UserProfile | null) {
  const [timeline, setTimeline] = useState<Timeline | null>(null);
  
  useEffect(() => {
    if (profile) {
      const data = TimelineService.generateUserTimeline(profile);
      setTimeline(data);
    }
  }, [profile]);
  
  return timeline;
}
```

**Impact:** Reduces 150+ lines of duplicate code across screens

---

## 2. 🎨 Create Reusable UI Components

### Problem
Duplicate UI patterns across screens:
- Deadline list items with priority chips
- Action item cards
- Loading/error/empty states
- Onboarding prompts

### Solution: Component Library

#### Components to Create:

**`/components/common/`**
- `LoadingView.tsx` - Centralized loading spinner
- `ErrorView.tsx` - Error state with retry button
- `EmptyState.tsx` - No data placeholder
- `OnboardingPrompt.tsx` - First-time user setup

**`/components/immigration/`**
- `DeadlineCard.tsx` - Deadline list item with icon, date, priority
- `ActionCard.tsx` - Action item with category icon
- `StatusChip.tsx` - Immigration status badge
- `TimelineEventCard.tsx` - Timeline event list item
- `ProgressCard.tsx` - Progress bar with percentage

**Impact:** Improves consistency, reduces 300+ lines of duplicate JSX

---

## 3. 🔧 Consolidate Icon Mapping Logic

### Problem
Each screen has duplicate icon mapping functions:
- `getDeadlineIcon()` - Status, ToDo screens
- `getActionIcon()` - Status, ToDo screens
- `getEventIcon()` - Timeline screen

### Solution: Create `/utils/iconMapping.ts`

```typescript
export const IconMapping = {
  deadline: (type: string) => { /* ... */ },
  action: (category: string) => { /* ... */ },
  event: (type: string) => { /* ... */ },
  status: (status: ImmigrationStatus) => { /* ... */ }
};
```

**Impact:** Single source of truth, easier to maintain

---

## 4. 🎨 Extract Color/Theme Utilities

### Problem
Color logic scattered across screens:
- `getDeadlinePriorityColor()` - Status screen
- `getPriorityColor()` - ToDo screen
- `getEventColor()` - Timeline screen

### Solution: Create `/theme/colors.ts`

```typescript
export const ImmigrationColors = {
  priority: {
    CRITICAL: '#D32F2F',
    HIGH: '#F57C00',
    MEDIUM: '#FBC02D',
    LOW: '#388E3C'
  },
  status: {
    active: '#4CAF50',
    pending: '#FBC02D',
    expired: '#9E9E9E'
  }
};

export function getPriorityColor(priority: string): string { /* ... */ }
export function getStatusColor(status: ImmigrationStatus): string { /* ... */ }
```

**Impact:** Consistent theming, centralized color management

---

## 5. 📊 Create Constants for Magic Numbers

### Problem
Magic numbers scattered throughout:
- Days calculations: 30, 90, 14, 2 weeks, etc.
- Slice limits: 3, 5 items
- Date multipliers: `24 * 60 * 60 * 1000`

### Solution: Create `/constants/timeframes.ts`

```typescript
export const Timeframes = {
  URGENT_DEADLINE_DAYS: 14,
  CURRENT_ACTIONS_DAYS: 30,
  UPCOMING_ACTIONS_DAYS: 90,
  MAX_DEADLINES_DISPLAY: 5,
  MAX_ACTIONS_DISPLAY: 3,
  MS_PER_DAY: 24 * 60 * 60 * 1000
};
```

**Impact:** Self-documenting code, easier to adjust thresholds

---

## 6. 🛡️ Add Error Boundaries

### Problem
No error boundaries - runtime errors crash entire screen

### Solution: Create `ErrorBoundary.tsx`

```typescript
export class ScreenErrorBoundary extends React.Component {
  // Catches errors in child components
  // Shows friendly error UI instead of crash
}
```

**Impact:** Better UX, improved stability

---

## 7. 🔒 Improve Type Safety

### Problem
- Some places use generic error handling without types
- Missing null checks in some areas
- Could improve type inference

### Solution:
- Add strict null checks
- Create typed error classes
- Use discriminated unions for screen states

**Impact:** Fewer runtime errors, better IDE support

---

## 8. 📝 Add JSDoc Comments

### Problem
- Missing documentation for complex functions
- No param/return descriptions
- Hard for new developers to understand

### Solution: Add JSDoc to:
- All utility functions
- Service methods
- Complex business logic
- Custom hooks

**Impact:** Better developer experience, easier maintenance

---

## Priority Order

### Phase 1: High Impact, Low Risk (Do First)
1. ✅ Extract icon mapping logic → `/utils/iconMapping.ts`
2. ✅ Extract color utilities → `/theme/colors.ts`
3. ✅ Create constants for magic numbers → `/constants/timeframes.ts`

### Phase 2: Medium Impact (Do Next)
4. ✅ Create custom hooks (`useUserProfile`, `useTimeline`)
5. ✅ Create common UI components (Loading, Error, Empty states)

### Phase 3: Lower Priority (Nice to Have)
6. ⏭️ Create immigration-specific components (DeadlineCard, etc.)
7. ⏭️ Add error boundaries
8. ⏭️ Add JSDoc comments

---

## Metrics

### Expected Improvements:
- **Code Reduction:** ~500 lines of duplicate code removed
- **Component Reusability:** 8-10 new reusable components
- **Maintainability:** Centralized logic, single source of truth
- **Type Safety:** Stricter typing, fewer runtime errors
- **Developer Experience:** Better documentation, clearer code organization

---

## Notes

- All refactoring should maintain current functionality
- Test after each phase to ensure nothing breaks
- Update imports across all affected files
- Follow existing code style and conventions
- Keep git commits atomic (one refactor per commit)


