export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  emailVerified: boolean;
  createdAt: Date;
  lastLoginAt: Date;
  preferences: UserPreferences;
  subscriptions: NotificationSubscription[];
}

export interface UserPreferences {
  timezone: string;
  language: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  calendarIntegration: boolean;
  reminderDefaults: ReminderDefaults;
  theme: 'light' | 'dark' | 'system';
}

export interface ReminderDefaults {
  deadlineReminders: number[]; // days before deadline [30, 14, 7, 1]
  emailReminders: boolean;
  pushReminders: boolean;
  calendarEvents: boolean;
}

export interface NotificationSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface GoogleAuthResponse {
  idToken: string;
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    photo?: string;
  };
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  reminders: EventReminder[];
  location?: string;
  attendees?: string[];
}

export interface EventReminder {
  method: 'email' | 'popup';
  minutes: number;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlBody: string;
  textBody: string;
  variables: string[];
}

export enum NotificationType {
  DEADLINE_REMINDER = 'DEADLINE_REMINDER',
  STATUS_UPDATE = 'STATUS_UPDATE',
  DOCUMENT_EXPIRING = 'DOCUMENT_EXPIRING',
  H1B_LOTTERY = 'H1B_LOTTERY',
  GENERAL_INFO = 'GENERAL_INFO'
} 