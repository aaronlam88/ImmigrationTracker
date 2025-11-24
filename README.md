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

- **Offline-First**: All data stored locally with SQLite
- **Immigration Timeline**: Track F-1 → OPT → H1B journey
- **Document Management**: Secure local storage for immigration docs
- **Deadline Tracking**: Local notifications for critical dates
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
        │   ├── components/    # Reusable UI components
        │   ├── screens/       # App screens and navigation
        │   ├── services/      # Business logic and data
        │   ├── models/        # TypeScript interfaces
        │   ├── database/      # Local SQLite layer
        │   └── utils/         # Helper functions
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

- [✅] Expo project setup with TypeScript (expo-template-blank-typescript)
- [✅] Install UI and navigation dependencies (React Native Paper, React Navigation)
- [✅] Install offline features (expo-sqlite, expo-notifications)
- [✅] Configure npm registry for public packages
- [✅] Update dependencies to latest compatible versions
- [✅] **MA-001 Complete** - Project setup finished
- [🔄] MA-002: Local SQLite database integration
- [ ] Core data models and interfaces
- [ ] Navigation structure with React Navigation
- [ ] Immigration status tracking screens
- [ ] Document management features
- [ ] Deadline tracking with notifications
- [ ] App Store preparation (iOS + Android)

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
