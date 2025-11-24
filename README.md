# Immigration Tracker 📱

A mobile-first offline application to help international students navigate immigration processes, track critical deadlines, and maintain compliance for OPT, H1B, and other visa categories.

## 🎯 Overview

- 📅 Track critical immigration deadlines with local notifications
- 📄 Manage sensitive immigration documents securely offline
- 🔄 Navigate complex visa processes (F-1 → OPT → H1B)
- 🏢 Coordinate job search with work authorization requirements
- ✅ Maintain compliance with immigration regulations
- 🔒 **Offline-first**: All features work without internet connection

## 🛠️ Technology Stack

### Phase 1: Mobile-First Offline App (Current)

- **Platform**: Expo managed workflow with TypeScript
- **UI Library**: React Native Paper (Material Design)
- **Database**: Local SQLite with expo-sqlite
- **Navigation**: React Navigation 6+ (Stack + Bottom Tabs)
- **State**: React Hooks with offline-first patterns
- **Storage**: Local file system for documents
- **Notifications**: Expo Notifications for local reminders

### Phase 3: Backend Integration (Future)

- **API**: Spring Boot 3.x + Java 17+
- **Database**: PostgreSQL (prod) / SQLite (dev)
- **Authentication**: JWT with offline capability
- **Migration**: RESTful → GraphQL planned

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** with npm
- **Expo CLI**: `npm install -g @expo/cli`
- **Development Options**:
  - **Expo Go app** on your phone (fastest testing)
  - **iOS Simulator** (Xcode from App Store)
  - **Android Emulator** (Android Studio)
  - **Web browser** (for quick development)

### Quick Start

```bash
git clone https://github.com/aaronlam88/ImmigrationTracker.git
cd ImmigrationTracker/mobile
npm install
npx expo start
```

**Development**: Press `i` (iOS), `a` (Android), `w` (web), or scan QR with Expo Go app.

## 🔧 Key Features

- **Offline-First**: All data stored locally with AsyncStorage
- **Immigration Timeline**: Track F-1 → OPT → H1B journey with automated calculations
- **Smart Deadlines**: Automated deadline tracking with priority levels
- **Status Management**: Track and transition between immigration statuses
- **Business Logic**: Complete timeline and action item generation
- **Material Design**: React Native Paper UI components

## 📁 Project Structure

```text
ImmigrationTracker/
├── 📋 Documentation
│   ├── AGENTS.md              # AI agent guidelines
│   ├── PROJECT_PLAN.md        # Current roadmap
│   ├── PROJECT_REQUIREMENTS.md # Detailed specifications
│   ├── KNOWLEDGE.md           # Technical knowledge base
│   ├── diagram.svg            # Immigration process flowchart
│   └── README.md              # This file
│
└── 📱 Mobile App (Phase 1 Focus)
    └── mobile/                # React Native TypeScript project
        ├── src/
        │   ├── models/        # TypeScript interfaces ✅
        │   ├── storage/       # AsyncStorage layer ✅
        │   ├── services/      # Business logic (Timeline, Status) ✅
        │   ├── utils/         # Date calculations, test data ✅
        │   ├── constants/     # Processing times, fees, URLs ✅
        │   ├── components/    # Reusable UI components (TODO)
        │   ├── screens/       # App screens (Status, Timeline, To Do, Settings) ✅
        │   └── navigation/    # Bottom tab navigation ✅
        ├── ios/               # iOS-specific files
        ├── android/           # Android files (Phase 2)
        ├── App.tsx            # Main app component
        └── package.json       # Dependencies
```

## 🧪 Testing

```bash
cd mobile
npm test                    # Run tests
npx expo start              # Development server
```

## 📊 Current Development Status

### ✅ Phase 1: Mobile-First Offline App (Current)

**Sprint 1 Progress: 5/7 tasks complete (71%)**

- [✅] **MA-001: Project Setup** - Expo + TypeScript + all dependencies
- [✅] **MA-002: State Management & Data Models** - Complete data layer
  - ✅ TypeScript models (Immigration Status, User Profile, Timeline, Forms)
  - ✅ AsyncStorage wrapper with type safety
  - ✅ Timeline calculation service
  - ✅ Status transition logic
  - ✅ Immigration process constants
  - ✅ Test data and integration demo
- [✅] **MA-003: Navigation & UI Foundation** - App navigation complete
  - ✅ Bottom tab navigation (4 main screens)
  - ✅ Material Design 3 theme
  - ✅ Placeholder screens with UI components
- [✅] **MA-004: Immigration Status Screen** - Fully functional
  - ✅ Current status display with color-coded chips
  - ✅ Next eligible status recommendations
  - ✅ Top 5 upcoming deadlines with priority indicators
  - ✅ Required action items with icons
  - ✅ Real-time data from UserProfileStorage and services
  - ✅ Loading, error handling, and pull-to-refresh
- [✅] **MA-005: Timeline Screen** - Complete timeline view
  - ✅ Full immigration timeline with all events
  - ✅ Visual progress indicators (% completion)
  - ✅ Filter by phase (All, F-1, OPT, H-1B)
  - ✅ Past/future event differentiation
  - ✅ Color-coded by type and urgency
  - ✅ Loading, error handling, and pull-to-refresh
- [ ] **MA-004**: Immigration status tracking screens
- [ ] **MA-005**: Deadline tracking with notifications
- [ ] **MA-006**: Document management
- [ ] **MA-007**: App Store preparation

### 📅 Future Phases

- **Phase 2**: Android app development
- **Phase 3**: Backend integration and cloud sync
- **Phase 4**: GraphQL optimization
- **Phase 5**: AI-powered features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Immigration Process

**F-1 Student** → **OPT** → **Employment** → **H1B** → **Work Authorization**

See [diagram.svg](diagram.svg) for complete process flowchart.

## 📖 Documentation

- [Project Requirements](PROJECT_REQUIREMENTS.md) - Detailed specifications
- [Project Plan](PROJECT_PLAN.md) - Implementation roadmap  
- [AI Agent Guidelines](AGENTS.md) - Development guidelines
- [Technical Knowledge](KNOWLEDGE.md) - Architecture decisions

---

**Status**: 🚀 Phase 1 - Mobile-first offline iOS app development in progress

**Strategy**: Mobile-First Offline → Backend Integration → GraphQL Optimization

For detailed technical specifications and development progress, see [PROJECT_PLAN.md](PROJECT_PLAN.md).
