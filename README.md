# Immigration Tracker

A comprehensive web and mobile application for international students to track their U.S. immigration journey from F-1 student status to permanent residency.

![Immigration Tracker Dashboard](https://via.placeholder.com/800x400/2196F3/FFFFFF?text=Immigration+Tracker+Dashboard)

## 🌟 Features

### 📊 **Dashboard & Overview**
- Real-time immigration status tracking
- Visual timeline of your immigration journey
- Critical deadline alerts and warnings
- Unemployment day counter (for OPT status)
- Quick access to all features

### 📅 **Deadline Management**
- Automatic deadline generation based on your status
- Priority-based deadline categorization
- Multiple reminder options (push, email, calendar)
- Form association for each deadline
- Overdue deadline tracking

### 🔔 **Smart Notifications**
- **Push Notifications**: Real-time alerts on web and mobile
- **Email Reminders**: HTML-formatted deadline reminders
- **Calendar Integration**: Automatic event creation
- **Customizable Reminders**: Set reminder preferences (1, 7, 14, 30 days)

### 🔐 **Authentication & Security**
- **Email/Password Authentication**
- **Google OAuth Integration** with Calendar/Gmail scopes
- **Firebase Authentication** with persistent sessions
- **Secure data storage** with Firestore

### 📱 **Cross-Platform**
- **Web Application**: Full-featured web experience
- **Mobile Ready**: React Native for iOS and Android
- **Responsive Design**: Works on all screen sizes
- **PWA Support**: Installable web app

### 📄 **Document Management**
- Upload and organize immigration documents
- Document expiration tracking
- Category-based organization
- Secure cloud storage

### 🎯 **H-1B Lottery Tracking**
- Multiple H-1B attempt tracking
- Lottery result management
- Employer information storage
- Timeline visualization

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Expo CLI (`npm install -g @expo/cli`)
- Firebase project setup
- (Optional) Google Cloud Console project for OAuth

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/immigration-tracker.git
   cd immigration-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password and Google)
   - Enable Firestore Database
   - Copy your Firebase config to `config/firebase.ts`:

   ```typescript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "your-app-id"
   };
   ```

4. **Configure Google OAuth (Optional)**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Enable Google Calendar API and Gmail API
   - Create OAuth 2.0 credentials
   - Add your domain to authorized origins

5. **Start the development server**
   ```bash
   # For web
   npm run web
   
   # For mobile development
   npm start
   ```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```bash
# Firebase Configuration
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id

# Google OAuth (Optional)
EXPO_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id

# Web Push Notifications (Optional)
EXPO_PUBLIC_VAPID_PUBLIC_KEY=your-vapid-public-key
```

### Notification Setup

#### Push Notifications
1. **Web**: Configure VAPID keys for web push notifications
2. **Mobile**: Notifications work out of the box with Expo

#### Email Notifications
Email reminders are generated automatically. For production:
1. Set up a backend service to send scheduled emails
2. Use services like SendGrid, AWS SES, or Firebase Functions
3. Configure email templates in the notification service

#### Calendar Integration
- **Google Calendar**: Automatically enabled with Google OAuth
- **Native Calendar**: Uses device calendar permissions

## 📊 Immigration Status Flow

The app tracks the following status progression:

```
F-1 Student → Post-Completion OPT → STEM OPT Extension → H-1B Process → Green Card
```

### Automatic Features by Status:

- **F-1 Student**: Graduation preparation deadlines
- **Post-Completion OPT**: STEM extension preparation, unemployment tracking
- **STEM OPT Extension**: Biannual reporting, employer verification
- **H-1B Process**: Registration periods, lottery tracking, petition status
- **Green Card**: I-140/I-485 process tracking

## 🎨 Customization

### Themes
The app supports light/dark themes and system preference detection.

### Reminder Preferences
Users can customize:
- Reminder timing (days before deadline)
- Notification methods (push, email, calendar)
- Priority levels for different deadline types

### Data Export/Import
- Export all data as JSON
- Import from backup files
- Data portability for user control

## 🛠️ Development

### Project Structure
```
immigration-tracker/
├── app/                    # Expo Router pages
├── components/            # React components
│   ├── auth/             # Authentication components
│   └── ...               # Other UI components
├── config/               # Configuration files
├── services/             # Business logic services
├── store/                # Zustand state management
├── types/                # TypeScript type definitions
└── ...
```

### Key Technologies
- **Frontend**: React Native with Expo
- **Web**: React Native Web
- **State Management**: Zustand with persistence
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Forms**: React Hook Form with Zod validation
- **Notifications**: Expo Notifications + Web Push API
- **Calendar**: Expo Calendar + Google Calendar API

### Adding New Features
1. Define types in `types/`
2. Add state management in `store/`
3. Create UI components in `components/`
4. Add business logic to `services/`
5. Update the main app navigation

## 📱 Deployment

### Web Deployment
```bash
# Build for web
npm run build:web

# Deploy to your hosting provider
# (Netlify, Vercel, Firebase Hosting, etc.)
```

### Mobile Deployment
```bash
# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Submit to app stores
eas submit
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@immigrationtracker.app
- 💬 GitHub Issues: [Report a bug](https://github.com/yourusername/immigration-tracker/issues)
- 📖 Documentation: [Full documentation](https://docs.immigrationtracker.app)

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/) and [React Native](https://reactnative.dev/)
- Authentication powered by [Firebase](https://firebase.google.com/)
- Icons from [Expo Vector Icons](https://icons.expo.fyi/)
- Inspired by the needs of international students navigating U.S. immigration

---

**⚠️ Legal Disclaimer**: This app is for informational purposes only and does not constitute legal advice. Always consult with qualified immigration attorneys for legal guidance. 