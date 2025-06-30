import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  ImmigrationCase, 
  ImmigrationStatus, 
  Deadline, 
  Document, 
  Notification,
  H1BAttempt,
  EmployerInfo,
  EducationInfo,
  Priority,
  DeadlineCategory
} from '../types/immigration';
import { addDays, isAfter, isBefore, differenceInDays } from 'date-fns';

interface ImmigrationStore {
  // State
  currentCase: ImmigrationCase | null;
  notifications: Notification[];
  loading: boolean;
  
  // Actions
  initializeCase: (personalInfo: any) => void;
  updateStatus: (newStatus: ImmigrationStatus, notes?: string) => void;
  addDeadline: (deadline: Omit<Deadline, 'id'>) => void;
  updateDeadline: (id: string, updates: Partial<Deadline>) => void;
  completeDeadline: (id: string) => void;
  addDocument: (document: Omit<Document, 'id' | 'uploadDate'>) => void;
  removeDocument: (id: string) => void;
  addH1BAttempt: (attempt: Omit<H1BAttempt, 'id'>) => void;
  updateH1BAttempt: (id: string, updates: Partial<H1BAttempt>) => void;
  updateEmployer: (employer: EmployerInfo) => void;
  addEducation: (education: Omit<EducationInfo, 'id'>) => void;
  updateUnemploymentDays: (days: number) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'date'>) => void;
  markNotificationRead: (id: string) => void;
  getUpcomingDeadlines: (days?: number) => Deadline[];
  getOverdueDeadlines: () => Deadline[];
  getCriticalNotifications: () => Notification[];
  generateAutomaticDeadlines: () => void;
  exportData: () => string;
  importData: (data: string) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

// Helper function to safely get notification service
const getNotificationService = async () => {
  if (typeof window !== 'undefined') {
    try {
      const { notificationService } = await import('../services/notificationService');
      return notificationService.getInstance();
    } catch (error) {
      console.warn('Failed to load notification service:', error);
      return null;
    }
  }
  return null;
};

export const useImmigrationStore = create<ImmigrationStore>()(
  persist(
    (set, get) => ({
      currentCase: null,
      notifications: [],
      loading: false,

      initializeCase: (personalInfo) => {
        const newCase: ImmigrationCase = {
          id: generateId(),
          userId: generateId(),
          currentStatus: ImmigrationStatus.F1_STUDENT,
          statusHistory: [{
            id: generateId(),
            status: ImmigrationStatus.F1_STUDENT,
            startDate: new Date(),
            notes: 'Case initialized'
          }],
          personalInfo,
          education: [],
          documents: [],
          deadlines: [],
          unemploymentDays: 0,
          maxUnemploymentDays: 90,
          stemOptEligible: false,
          h1bAttempts: [],
          createdAt: new Date(),
          updatedAt: new Date()
        };

        set({ currentCase: newCase });
        get().generateAutomaticDeadlines();
      },

      updateStatus: async (newStatus, notes) => {
        const { currentCase } = get();
        if (!currentCase) return;

        const statusEntry = {
          id: generateId(),
          status: newStatus,
          startDate: new Date(),
          notes
        };

        // End previous status
        const updatedHistory = [...currentCase.statusHistory];
        if (updatedHistory.length > 0) {
          updatedHistory[updatedHistory.length - 1].endDate = new Date();
        }
        updatedHistory.push(statusEntry);

        // Update unemployment limits based on status
        let maxUnemploymentDays = 90;
        if (newStatus === ImmigrationStatus.STEM_OPT_EXTENSION) {
          maxUnemploymentDays = 150;
        }

        const updatedCase = {
          ...currentCase,
          currentStatus: newStatus,
          statusHistory: updatedHistory,
          maxUnemploymentDays,
          updatedAt: new Date()
        };

        set({ currentCase: updatedCase });
        get().generateAutomaticDeadlines();
        
        // Add notification
        get().addNotification({
          title: 'Status Updated',
          message: `Your immigration status has been updated to ${newStatus.replace(/_/g, ' ')}`,
          type: 'SUCCESS',
          read: false,
          actionRequired: false
        });

        // Send notification via service if available
        try {
          const notificationService = await getNotificationService();
          if (notificationService) {
            // This would need the user object - for now just log
            console.log('Status update notification sent');
          }
        } catch (error) {
          console.warn('Failed to send status notification:', error);
        }
      },

      addDeadline: async (deadline) => {
        const { currentCase } = get();
        if (!currentCase) return;

        const newDeadline = {
          ...deadline,
          id: generateId()
        };

        const updatedCase = {
          ...currentCase,
          deadlines: [...currentCase.deadlines, newDeadline],
          updatedAt: new Date()
        };

        set({ currentCase: updatedCase });

        // Schedule notifications for this deadline if notification service is available
        try {
          const notificationService = await getNotificationService();
          if (notificationService && typeof window !== 'undefined') {
            // This would need the user object from auth store
            console.log('Deadline reminders would be scheduled here');
          }
        } catch (error) {
          console.warn('Failed to schedule deadline reminders:', error);
        }
      },

      updateDeadline: (id, updates) => {
        const { currentCase } = get();
        if (!currentCase) return;

        const updatedDeadlines = currentCase.deadlines.map(deadline =>
          deadline.id === id ? { ...deadline, ...updates } : deadline
        );

        const updatedCase = {
          ...currentCase,
          deadlines: updatedDeadlines,
          updatedAt: new Date()
        };

        set({ currentCase: updatedCase });
      },

      completeDeadline: (id) => {
        get().updateDeadline(id, { completed: true });
        
        get().addNotification({
          title: 'Deadline Completed',
          message: 'You have successfully completed a deadline.',
          type: 'SUCCESS',
          read: false,
          actionRequired: false
        });
      },

      addDocument: (document) => {
        const { currentCase } = get();
        if (!currentCase) return;

        const newDocument = {
          ...document,
          id: generateId(),
          uploadDate: new Date()
        };

        const updatedCase = {
          ...currentCase,
          documents: [...currentCase.documents, newDocument],
          updatedAt: new Date()
        };

        set({ currentCase: updatedCase });
      },

      removeDocument: (id) => {
        const { currentCase } = get();
        if (!currentCase) return;

        const updatedDocuments = currentCase.documents.filter(doc => doc.id !== id);

        const updatedCase = {
          ...currentCase,
          documents: updatedDocuments,
          updatedAt: new Date()
        };

        set({ currentCase: updatedCase });
      },

      addH1BAttempt: (attempt) => {
        const { currentCase } = get();
        if (!currentCase) return;

        const newAttempt = {
          ...attempt,
          id: generateId()
        };

        const updatedCase = {
          ...currentCase,
          h1bAttempts: [...currentCase.h1bAttempts, newAttempt],
          updatedAt: new Date()
        };

        set({ currentCase: updatedCase });
      },

      updateH1BAttempt: (id, updates) => {
        const { currentCase } = get();
        if (!currentCase) return;

        const updatedAttempts = currentCase.h1bAttempts.map(attempt =>
          attempt.id === id ? { ...attempt, ...updates } : attempt
        );

        const updatedCase = {
          ...currentCase,
          h1bAttempts: updatedAttempts,
          updatedAt: new Date()
        };

        set({ currentCase: updatedCase });
      },

      updateEmployer: (employer) => {
        const { currentCase } = get();
        if (!currentCase) return;

        const updatedCase = {
          ...currentCase,
          currentEmployer: employer,
          updatedAt: new Date()
        };

        set({ currentCase: updatedCase });
      },

      addEducation: (education) => {
        const { currentCase } = get();
        if (!currentCase) return;

        const newEducation = {
          ...education,
          id: generateId()
        };

        const updatedCase = {
          ...currentCase,
          education: [...currentCase.education, newEducation],
          stemOptEligible: education.isSTEMDegree || currentCase.stemOptEligible,
          updatedAt: new Date()
        };

        set({ currentCase: updatedCase });
      },

      updateUnemploymentDays: (days) => {
        const { currentCase } = get();
        if (!currentCase) return;

        const updatedCase = {
          ...currentCase,
          unemploymentDays: days,
          updatedAt: new Date()
        };

        set({ currentCase: updatedCase });

        // Check if approaching limit
        const daysRemaining = currentCase.maxUnemploymentDays - days;
        if (daysRemaining <= 30 && daysRemaining > 0) {
          get().addNotification({
            title: 'Unemployment Limit Warning',
            message: `You have ${daysRemaining} days remaining before reaching your unemployment limit.`,
            type: 'WARNING',
            read: false,
            actionRequired: true
          });
        }
      },

      addNotification: (notification) => {
        const newNotification = {
          ...notification,
          id: generateId(),
          date: new Date()
        };

        set(state => ({
          notifications: [newNotification, ...state.notifications]
        }));
      },

      markNotificationRead: (id) => {
        set(state => ({
          notifications: state.notifications.map(notif =>
            notif.id === id ? { ...notif, read: true } : notif
          )
        }));
      },

      getUpcomingDeadlines: (days = 30) => {
        const { currentCase } = get();
        if (!currentCase) return [];

        const now = new Date();
        const futureDate = addDays(now, days);

        return currentCase.deadlines
          .filter(deadline => 
            !deadline.completed && 
            isAfter(deadline.dueDate, now) && 
            isBefore(deadline.dueDate, futureDate)
          )
          .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
      },

      getOverdueDeadlines: () => {
        const { currentCase } = get();
        if (!currentCase) return [];

        const now = new Date();
        return currentCase.deadlines
          .filter(deadline => !deadline.completed && isBefore(deadline.dueDate, now))
          .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
      },

      getCriticalNotifications: () => {
        const { notifications } = get();
        return notifications
          .filter(notif => !notif.read && (notif.actionRequired || notif.type === 'ERROR'))
          .slice(0, 5);
      },

      generateAutomaticDeadlines: () => {
        const { currentCase } = get();
        if (!currentCase) return;

        const now = new Date();
        const newDeadlines: Deadline[] = [];

        // Generate deadlines based on current status
        switch (currentCase.currentStatus) {
          case ImmigrationStatus.F1_STUDENT:
            // Add graduation preparation deadlines
            newDeadlines.push({
              id: generateId(),
              title: 'Prepare for Post-Completion OPT',
              description: 'Start preparing documents for OPT application 90 days before graduation',
              dueDate: addDays(now, 60),
              priority: Priority.MEDIUM,
              completed: false,
              category: DeadlineCategory.APPLICATION,
              reminderDays: [30, 14, 7]
            });
            break;

          case ImmigrationStatus.POST_COMPLETION_OPT:
            // Add STEM OPT preparation if eligible
            if (currentCase.stemOptEligible) {
              newDeadlines.push({
                id: generateId(),
                title: 'Apply for STEM OPT Extension',
                description: 'Apply for STEM OPT extension up to 90 days before current OPT expires',
                dueDate: addDays(now, 90),
                priority: Priority.HIGH,
                completed: false,
                category: DeadlineCategory.APPLICATION,
                reminderDays: [60, 30, 14, 7],
                associatedForm: 'I-765'
              });
            }
            break;

          case ImmigrationStatus.STEM_OPT_EXTENSION:
            // Add biannual reporting deadlines
            newDeadlines.push({
              id: generateId(),
              title: '6-Month STEM OPT Validation Report',
              description: 'Submit validation report to DSO every 6 months',
              dueDate: addDays(now, 180),
              priority: Priority.HIGH,
              completed: false,
              category: DeadlineCategory.REPORTING,
              reminderDays: [30, 14, 7, 1]
            });
            break;
        }

        // Add H-1B season deadlines if appropriate
        const currentYear = now.getFullYear();
        const h1bRegistrationStart = new Date(currentYear, 2, 7); // March 7
        const h1bRegistrationEnd = new Date(currentYear, 2, 24); // March 24

        if (isAfter(h1bRegistrationStart, now)) {
          newDeadlines.push({
            id: generateId(),
            title: 'H-1B Registration Period Opens',
            description: 'H-1B electronic registration period opens - prepare documents',
            dueDate: h1bRegistrationStart,
            priority: Priority.CRITICAL,
            completed: false,
            category: DeadlineCategory.REGISTRATION,
            reminderDays: [60, 30, 14, 7, 1]
          });
        }

        // Add new deadlines to existing ones (avoid duplicates)
        const existingTitles = new Set(currentCase.deadlines.map(d => d.title));
        const uniqueNewDeadlines = newDeadlines.filter(d => !existingTitles.has(d.title));

        if (uniqueNewDeadlines.length > 0) {
          const updatedCase = {
            ...currentCase,
            deadlines: [...currentCase.deadlines, ...uniqueNewDeadlines],
            updatedAt: new Date()
          };

          set({ currentCase: updatedCase });
        }
      },

      exportData: () => {
        const { currentCase, notifications } = get();
        return JSON.stringify({ currentCase, notifications }, null, 2);
      },

      importData: (data) => {
        try {
          const parsed = JSON.parse(data);
          set({
            currentCase: parsed.currentCase,
            notifications: parsed.notifications || []
          });
        } catch (error) {
          console.error('Failed to import data:', error);
        }
      }
    }),
    {
      name: 'immigration-tracker-storage',
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
      }
    }
  )
); 