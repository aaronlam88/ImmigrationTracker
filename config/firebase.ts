import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Replace with your Firebase project configuration
// Get this from Firebase Console > Project Settings > General > Your apps
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "your-api-key-here",
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abcdef",
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID // Optional for Analytics
};

// Validate configuration
const validateFirebaseConfig = () => {
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  const missingFields = requiredFields.filter(field => 
    !firebaseConfig[field as keyof typeof firebaseConfig] || 
    firebaseConfig[field as keyof typeof firebaseConfig]?.toString().includes('your-')
  );
  
  if (missingFields.length > 0) {
    console.warn(
      '🔥 Firebase Setup Required!\n' +
      'Missing or placeholder values for:', missingFields.join(', ') + '\n' +
      'Please update config/firebase.ts with your real Firebase credentials.'
    );
    return false;
  }
  return true;
};

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

try {
  // Initialize Firebase app
  app = initializeApp(firebaseConfig);
  
  // Initialize Auth with proper persistence
  if (Platform.OS === 'web') {
    // For web, use the default getAuth
    auth = getAuth(app);
  } else {
    // For React Native, use AsyncStorage persistence
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
  }
  
  // Initialize Firestore
  db = getFirestore(app);
  
  // Log successful initialization (only in development)
  if (__DEV__) {
    const isConfigValid = validateFirebaseConfig();
    if (isConfigValid) {
      console.log('🔥 Firebase initialized successfully!');
    }
  }
  
} catch (error) {
  console.error('🔥 Firebase initialization error:', error);
  
  // Provide helpful error messages
  if (error instanceof Error) {
    if (error.message.includes('API key')) {
      console.error('❌ Invalid API key. Check your Firebase configuration.');
    } else if (error.message.includes('project')) {
      console.error('❌ Invalid project ID. Check your Firebase configuration.');
    }
  }
  
  // Create fallback instances to prevent app crashes
  throw new Error(
    'Firebase initialization failed. Please check your configuration in config/firebase.ts'
  );
}

export { app, auth, db };
export default app; 