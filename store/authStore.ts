import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User, UserPreferences, AuthState, GoogleAuthResponse } from '../types/user';

interface AuthStore extends AuthState {
  // Actions
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName?: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
  initializeAuth: () => void;
  clearError: () => void;
  sendVerificationEmail: () => Promise<void>;
}

const defaultPreferences: UserPreferences = {
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  language: 'en',
  emailNotifications: true,
  pushNotifications: true,
  calendarIntegration: false,
  reminderDefaults: {
    deadlineReminders: [30, 14, 7, 1],
    emailReminders: true,
    pushReminders: true,
    calendarEvents: false
  },
  theme: 'system'
};

const createUserDocument = async (firebaseUser: FirebaseUser, additionalData: any = {}) => {
  const userRef = doc(db, 'users', firebaseUser.uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    const userData: User = {
      id: firebaseUser.uid,
      email: firebaseUser.email!,
      displayName: firebaseUser.displayName || additionalData.displayName || '',
      photoURL: firebaseUser.photoURL || '',
      emailVerified: firebaseUser.emailVerified,
      createdAt: new Date(),
      lastLoginAt: new Date(),
      preferences: { ...defaultPreferences, ...additionalData.preferences },
      subscriptions: []
    };

    await setDoc(userRef, userData);
    return userData;
  } else {
    // Update last login
    await updateDoc(userRef, { lastLoginAt: new Date() });
    return userDoc.data() as User;
  }
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,
      isAuthenticated: false,

      signIn: async (email: string, password: string) => {
        set({ loading: true, error: null });
        try {
          const result = await signInWithEmailAndPassword(auth, email, password);
          const userData = await createUserDocument(result.user);
          set({ 
            user: userData, 
            isAuthenticated: true, 
            loading: false 
          });
        } catch (error: any) {
          set({ 
            error: error.message, 
            loading: false 
          });
        }
      },

      signUp: async (email: string, password: string, displayName?: string) => {
        set({ loading: true, error: null });
        try {
          const result = await createUserWithEmailAndPassword(auth, email, password);
          
          if (displayName) {
            await updateProfile(result.user, { displayName });
          }

          const userData = await createUserDocument(result.user, { displayName });
          
          // Send verification email
          await sendEmailVerification(result.user);
          
          set({ 
            user: userData, 
            isAuthenticated: true, 
            loading: false 
          });
        } catch (error: any) {
          set({ 
            error: error.message, 
            loading: false 
          });
        }
      },

      signInWithGoogle: async () => {
        set({ loading: true, error: null });
        try {
          const provider = new GoogleAuthProvider();
          provider.addScope('https://www.googleapis.com/auth/calendar');
          provider.addScope('https://www.googleapis.com/auth/gmail.send');
          
          const result = await signInWithPopup(auth, provider);
          const credential = GoogleAuthProvider.credentialFromResult(result);
          
          const userData = await createUserDocument(result.user, {
            preferences: {
              ...defaultPreferences,
              calendarIntegration: true // Enable by default for Google users
            }
          });
          
          set({ 
            user: userData, 
            isAuthenticated: true, 
            loading: false 
          });
        } catch (error: any) {
          set({ 
            error: error.message, 
            loading: false 
          });
        }
      },

      signOut: async () => {
        set({ loading: true });
        try {
          await signOut(auth);
          set({ 
            user: null, 
            isAuthenticated: false, 
            loading: false 
          });
        } catch (error: any) {
          set({ 
            error: error.message, 
            loading: false 
          });
        }
      },

      updateUserProfile: async (updates: Partial<User>) => {
        const { user } = get();
        if (!user) return;

        set({ loading: true });
        try {
          const userRef = doc(db, 'users', user.id);
          await updateDoc(userRef, updates);
          
          set({ 
            user: { ...user, ...updates }, 
            loading: false 
          });
        } catch (error: any) {
          set({ 
            error: error.message, 
            loading: false 
          });
        }
      },

      updatePreferences: async (preferences: Partial<UserPreferences>) => {
        const { user } = get();
        if (!user) return;

        const updatedPreferences = { ...user.preferences, ...preferences };
        await get().updateUserProfile({ preferences: updatedPreferences });
      },

      initializeAuth: () => {
        set({ loading: true });
        
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            try {
              const userData = await createUserDocument(firebaseUser);
              set({ 
                user: userData, 
                isAuthenticated: true, 
                loading: false 
              });
            } catch (error: any) {
              set({ 
                error: error.message, 
                loading: false 
              });
            }
          } else {
            set({ 
              user: null, 
              isAuthenticated: false, 
              loading: false 
            });
          }
        });

        return unsubscribe;
      },

      clearError: () => {
        set({ error: null });
      },

      sendVerificationEmail: async () => {
        const currentUser = auth.currentUser;
        if (currentUser && !currentUser.emailVerified) {
          await sendEmailVerification(currentUser);
        }
      }
    }),
    {
      name: 'auth-storage',
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        }
      },
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
); 