# Mobile App Source Code Index

Quick reference for navigating the immigration tracker codebase.

---

## 📁 Directory Structure

```text
mobile/src/
├── models/          # TypeScript interfaces and types
├── storage/         # Local data persistence
├── services/        # Business logic
├── utils/           # Helper functions and test data
├── constants/       # Static data and configuration
├── components/      # UI components (TODO: MA-003+)
├── screens/         # App screens (TODO: MA-003+)
└── navigation/      # Navigation setup (TODO: MA-003+)
```

---

## 🎯 Core Models (`models/`)

### `ImmigrationStatus.ts`

**30+ immigration statuses** covering the complete journey:

- `ImmigrationStatus` enum: F1_STUDENT, OPT_PENDING, H1B_ACTIVE, etc.
- `ImmigrationPhase` enum: F1_PHASE, OPT_PHASE, H1B_PHASE, etc.
- Helper functions: `getStatusLabel()`, `getStatusDescription()`, `getStatusPhase()`

### `UserProfile.ts`

**User's immigration profile** with all dates and information:

- Interface: name, email, currentStatus, dates, employer info
- Helper functions: `createEmptyProfile()`, `isProfileComplete()`
- Type guards: `hasGraduated()`, `hasEADCard()`, `isEmployed()`

### `Timeline.ts`

**Deadlines and action items**:

- `DeadlineType` enum: 30+ deadline types (OPT_APPLICATION_DEADLINE, etc.)
- `ActionItemCategory` enum: FORM_FILING, DOCUMENT_PREP, EMPLOYER_ACTION, etc.
- Interfaces: `Deadline`, `ActionItem`, `TimelineEvent`

### `Forms.ts`

**Immigration forms and documents**:

- `FormType` enum: I765_OPT, I983, I129, etc.
- `DocumentCategory` enum: VISA, PASSPORT, EAD_CARD, etc.
- Interfaces: `FormInfo`, `DocumentMetadata`

---

## 💾 Storage Layer (`storage/`)

### `AsyncStorageService.ts`

**Type-safe wrapper** around React Native AsyncStorage:

- Generic methods: `getItem<T>()`, `setItem<T>()`, `removeItem()`
- Bulk operations: `getMultipleItems()`, `setMultipleItems()`
- Date handling: `prepareDateForStorage()`, `parseDateFromStorage()`
- Error handling: `StorageError` class

### `UserProfileStorage.ts`

**User profile persistence**:

- `saveProfile()` - Save complete profile
- `getProfile()` - Retrieve profile
- `updateProfile()` - Update entire profile
- `updateProfileField()` - Update single field
- `deleteProfile()` - Remove profile
- `hasProfile()` - Check if profile exists

---

## 🧠 Business Logic (`services/`)

### `TimelineService.ts`

**Immigration timeline generation** (500+ lines):

**Main Functions:**

- `generateImmigrationTimeline(profile)` - Complete timeline with all events
- `getUpcomingDeadlines(profile, limit?)` - Next N deadlines sorted by priority
- `getRequiredActions(profile)` - Action items based on current status

**Status-Specific Generators:**

- `generateF1Timeline()` - F-1 student deadlines
- `generateOPTTimeline()` - OPT application and employment deadlines
- `generateSTEMTimeline()` - STEM OPT extension deadlines
- `generateH1BTimeline()` - H1B registration, lottery, petition deadlines

**Use in UI:**

```typescript
const timeline = TimelineService.generateImmigrationTimeline(userProfile);
const deadlines = TimelineService.getUpcomingDeadlines(userProfile, 5);
const actions = TimelineService.getRequiredActions(userProfile);
```

### `StatusService.ts`

**Status transitions and phase management**:

**Main Functions:**

- `isValidTransition(from, to)` - Check if status change is allowed
- `getValidTransitions(status)` - Get all valid next statuses
- `getNextEligibleStatus(profile)` - Determine next status based on profile
- `getCurrentPhase(status)` - Get current immigration phase

**Valid Transitions Map:**

```typescript
F1_STUDENT → [GRADUATED, OPT_PENDING]
OPT_ACTIVE → [STEM_OPT_PENDING, H1B_REGISTERED]
// ... 30+ statuses mapped
```

---

## 🛠️ Utilities (`utils/`)

### `dateCalculations.ts`

**Date math for immigration deadlines**:

- `addBusinessDays()` - Skip weekends for processing times
- `calculateOPTDeadline()` - OPT application windows
- `calculateH1BDates()` - H1B registration and start dates
- `isWeekend()`, `isBusinessDay()` - Day type checks

### `testData.ts`

**7 sample profiles** for testing:

- `sampleF1Student` - About to graduate
- `sampleOPTPending` - Awaiting approval
- `sampleOPTApproved` - Job searching
- `sampleOPTWithJob` - Employed, considering STEM
- `sampleSTEMOPT` - On STEM extension
- `sampleH1BPending` - Petition filed
- `sampleH1BActive` - Working on H1B

**Helpers:**

- `getSampleProfileByStatus(status)` - Find sample by status
- `logSampleProfiles()` - Debug output
- `TEST_SCENARIOS` - Expected outcomes for each scenario

### `demo.ts`

**Integration testing**:

- `runDemo()` - Full integration test (storage → services → calculations)
- `testProfile(index)` - Test specific sample profile
- `clearAllData()` - Reset storage for testing

---

## 📋 Constants (`constants/`)

### `formResources.ts`

**40+ USCIS URLs and resources**:

**Main Objects:**

- `USCIS_URLS` - All USCIS links (forms, guides, tracking)
- `GOVERNMENT_URLS` - SSA, State Dept, etc.
- `CONTACT_INFO` - USCIS phone, email, hours
- `FORM_RESOURCES` - Complete form information with instructions

**Helpers:**

- `getFormResources(formType)` - Get all resources for a specific form
- `getTopicResources(topic)` - Get resources by topic (OPT, H1B, etc.)

**Usage in UI:**

```typescript
const optResources = getTopicResources('OPT');
// Display clickable links to USCIS guides
```

### `immigrationProcess.ts`

**Processing times, fees, deadlines**:

**Main Objects:**

- `PROCESSING_TIMES` - Average times (OPT: 3-5 months, H1B: 3-6 months)
- `DEADLINE_OFFSETS` - Days from reference (OPT: -90 days, etc.)
- `APPLICATION_FEES` - Current fees (I-765: $410, etc.)
- `WORK_AUTHORIZATION_DURATION` - Validity periods
- `NOTIFICATION_INTERVALS` - When to send reminders

**Helpers:**

- `getFormProcessingTime(formType)` - Get processing time
- `getNotificationIntervalsForDeadline(isCritical)` - Reminder schedule
- `isCriticalDeadlineType(type)` - Determine urgency

---

## 🎨 UI Components (TODO: MA-003+)

**Not yet created.** Will include:

- Navigation components (tabs, stacks)
- Screen layouts (Status, Timeline, Documents, Settings)
- Reusable UI elements (cards, lists, forms)

---

## 🔗 Data Flow

```text
User Input
    ↓
[UserProfileStorage] ← Save/retrieve user data
    ↓
[Services Layer]
    ├── TimelineService → Calculate deadlines & actions
    └── StatusService → Manage status transitions
    ↓
[UI Layer] ← Display timeline, deadlines, actions
```

---

## 📖 Common Usage Patterns

### **1. Save New User Profile**

```typescript
import { UserProfileStorage } from './storage/UserProfileStorage';
import { createEmptyProfile } from './models/UserProfile';

const profile = createEmptyProfile();
profile.name = 'John Doe';
profile.currentStatus = ImmigrationStatus.F1_STUDENT;
profile.graduationDate = new Date('2025-05-15');

await UserProfileStorage.saveProfile(profile);
```

### **2. Get Timeline for Current User**

```typescript
import { UserProfileStorage } from './storage/UserProfileStorage';
import { TimelineService } from './services/TimelineService';

const profile = await UserProfileStorage.getProfile();
if (profile) {
  const timeline = TimelineService.generateImmigrationTimeline(profile);
  const deadlines = TimelineService.getUpcomingDeadlines(profile, 5);
  const actions = TimelineService.getRequiredActions(profile);
}
```

### **3. Check Status Transition**

```typescript
import { StatusService } from './services/StatusService';
import { ImmigrationStatus } from './models/ImmigrationStatus';

const canTransition = StatusService.isValidTransition(
  ImmigrationStatus.F1_STUDENT,
  ImmigrationStatus.OPT_PENDING
); // true

const nextStatus = StatusService.getNextEligibleStatus(profile);
```

### **4. Get Form Resources**

```typescript
import { getFormResources, getTopicResources } from './constants/formResources';

const optResources = getFormResources(FormType.I765_OPT);
// { forms, instructions, guides, trackingLinks }

const allOPTInfo = getTopicResources('OPT');
// Array of all OPT-related resources
```

---

## 🧪 Testing

### **Run Integration Demo**

```typescript
import { runDemo } from './utils/demo';
await runDemo(); // Tests storage, timeline, status services
```

### **Test Specific Profile**

```typescript
import { testProfile } from './utils/demo';
await testProfile(0); // Test F-1 student
await testProfile(4); // Test STEM OPT
```

### **Use Sample Data**

```typescript
import { allSampleProfiles, sampleF1Student } from './utils/testData';

// Use in UI prototypes
const timeline = TimelineService.generateImmigrationTimeline(sampleF1Student);
```

---

## 🚀 Next Steps (For MA-003+)

1. **Navigation Setup** - React Navigation with bottom tabs
2. **Status Screen** - Display current status, next steps, deadlines
3. **Timeline Screen** - Visual timeline with interactive calendar
4. **Settings Screen** - Edit profile, preferences
5. **Notifications** - Local reminders for deadlines

---

**Last Updated**: MA-002 completion (November 24, 2025)  
**Status**: Data layer complete, ready for UI development
