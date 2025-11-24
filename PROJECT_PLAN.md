# Immigration Tracker - Project Plan

**Strategy**: Mobile-First Offline → Backend Integration → GraphQL Optimization  
**Current Phase**: Phase 1 - iOS Mobile App Development  
**Tech Stack**: React Native (Phase 1) → Spring Boot + GraphQL (Phase 3+)

---

## 🎯 Project Roadmap

### 🚀 Phase 1: Offline Mobile App (Current - Months 1-3)

**Goal**: Fast time-to-market iOS app with offline capabilities

- **iOS App**: React Native + Local SQLite storage
- **Core Features**: Immigration tracking, document management, deadline alerts
- **No Server**: All data stored locally, zero infrastructure costs
- **Validation**: App Store deployment, user feedback collection

### 📱 Phase 2: Android & Cross-Platform (Months 4-5)

**Goal**: Expand to Android platform

- **Android App**: Port and optimize for Android
- **Cross-Platform**: Consistent UI/UX across iOS/Android
- **Market Expansion**: Google Play Store deployment

### 🌐 Phase 3: Backend Integration (Months 6-9)

**Goal**: Add cloud services and synchronization

- **Spring Boot API**: RESTful backend services
- **Cloud Sync**: Multi-device data synchronization
- **Authentication**: JWT with offline capability
- **Web Dashboard**: Basic web interface

### 🔄 Phase 4: GraphQL Migration (Months 10-12)

**Goal**: Optimize mobile performance

- **GraphQL API**: Replace REST for better mobile performance
- **Real-time**: Subscriptions for live updates
- **Offline-First**: Optimistic updates and caching

### 🎯 Phase 5: Advanced Features (Months 13-15)

**Goal**: AI-powered and enterprise features

- **AI Analytics**: Deadline prediction and risk assessment
- **Document OCR**: Automatic data extraction
- **Enterprise**: Advisor dashboards, bulk management

---

## 📝 Current Sprint - Phase 1: Mobile Foundation

### Sprint 1: React Native Setup (CURRENT FOCUS)

#### Mobile Project Setup

- [✅ @claude] **MA-001: React Native Project Setup**
  - ✅ Initialize Expo project with expo-template-blank-typescript
  - ✅ Clean project structure for Phase 1 focus
  - ✅ Update README.md for mobile-first approach
  - ✅ Install all dependencies (UI, Navigation, Offline features)
  - ✅ Project verified and ready for development

#### State Management & Data Models

- [✅ @claude] **MA-002: State Management & Data Models**
  - ✅ Created TypeScript models for all immigration entities
  - ✅ Implemented AsyncStorage for local persistence
  - ✅ Built timeline and deadline calculation services
  - ✅ Created status transition logic
  - ✅ Added constants for processing times and fees
  - ✅ Created test data and integration demo
  - **Simplified approach**: No database for MVP, state management only

#### Navigation & UI Foundation

- [✅ @claude] **MA-003: Navigation & UI Foundation**
  - ✅ Set up React Navigation with NavigationContainer
  - ✅ Create bottom tab navigation (Status, Timeline, Documents, Settings)
  - ✅ Implemented Material Design 3 theme with React Native Paper
  - ✅ Created placeholder screens with basic UI layouts
  - ✅ Configured icons with MaterialCommunityIcons
  - ✅ Set up SafeAreaProvider for proper screen rendering

#### Immigration Features

- [ ] **MA-004: Immigration Status Screen**
  - Display current immigration status
  - Show next eligible status
  - List upcoming deadlines (top 5)
  - Display required actions
  - Integrate with TimelineService

- [ ] **MA-005: Timeline Screen**
  - Display full immigration timeline
  - Visual progress indicators
  - Interactive deadline calendar
  - Filter by phase (F1, OPT, H1B)

- [ ] **MA-006: Local Notifications**
  - Set up expo-notifications
  - Schedule deadline reminders
  - Configure notification intervals
  - Handle notification interactions

- [ ] **MA-007: Settings & Profile Management**
  - User profile form
  - Edit immigration dates
  - Update current status
  - Data persistence with UserProfileStorage

#### iOS Deployment

- [ ] **MA-007: iOS App Store Preparation**
  - Configure app icons, splash screens, metadata
  - Set up iOS signing and provisioning
  - Prepare TestFlight and App Store submission

---

## 📋 Task Management Rules

### How to Use This Plan

1. **Pick Available Tasks**: Choose tasks marked `[ ]`
2. **Assign Yourself**: Change to `[🔄 @your-username]`  
3. **Update Progress**: Add notes or blockers to task description
4. **Mark Complete**: Change to `[✅ @your-username]` when done
5. **Add New Tasks**: Break down complex work as needed

### Task Categories

- **MA-xxx**: Mobile App tasks (Phase 1)
- **BE-xxx**: Backend tasks (Phase 3)
- **GQL-xxx**: GraphQL tasks (Phase 4)

### Dependencies

Tasks marked with `🔗 Depends on: XXX` must wait for prerequisite completion.

---

## 🚀 Quick Start

### For New Contributors

1. **Read Documentation**: Check README.md and PROJECT_REQUIREMENTS.md
2. **Set Up Environment**: Install React Native CLI and Xcode
3. **Pick First Task**: Start with MA-001 (React Native Project Setup)
4. **Follow Guidelines**: See AGENTS.md for coding standards

### Development Commands

```bash
# Mobile Development (Current)
npx react-native init ImmigrationTrackerMobile --template react-native-template-typescript
cd ios && pod install
npx react-native run-ios

# Backend Development (Phase 3)
cd backend && ./gradlew bootRun
```

---

## 📊 Success Metrics

### Phase 1 Goals

- [ ] iOS app deployed to App Store
- [ ] Core immigration tracking features working offline
- [ ] User feedback collected and analyzed
- [ ] Market validation achieved

### Future Phases

- **Phase 2**: Android app with feature parity
- **Phase 3**: Cloud sync and multi-device support  
- **Phase 4**: GraphQL optimization and real-time features

---

**Current Priority**: Complete Phase 1 mobile app for iOS with offline capabilities. Backend work is preserved for Phase 3 integration.

*For detailed specifications, see PROJECT_REQUIREMENTS.md. For AI agent guidelines, see AGENTS.md.*
