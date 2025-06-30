import * as Notifications from 'expo-notifications';
import * as Calendar from 'expo-calendar';
import * as MailComposer from 'expo-mail-composer';
import { Platform } from 'react-native';
import { format, addDays, addMinutes } from 'date-fns';
import { Deadline, ImmigrationStatus } from '../types/immigration';
import { User, CalendarEvent, EventReminder, NotificationType } from '../types/user';

// Configure notifications only if we're not in SSR
if (typeof window !== 'undefined') {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
}

// Helper function to check if we're in a browser environment
const isBrowser = () => typeof window !== 'undefined';

export class NotificationService {
  private static instance: NotificationService;
  private notificationPermissions: boolean = false;
  private calendarPermissions: boolean = false;
  private initialized: boolean = false;

  private constructor() {
    // Only initialize if we're in a browser environment
    if (isBrowser()) {
      this.initializeNotifications();
    }
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private async initializeNotifications() {
    if (this.initialized) return;
    
    try {
      await this.requestNotificationPermissions();
      await this.requestCalendarPermissions();
      this.initialized = true;
    } catch (error) {
      console.warn('Failed to initialize notifications:', error);
    }
  }

  async requestNotificationPermissions(): Promise<boolean> {
    if (!isBrowser()) {
      return false;
    }

    try {
      if (Platform.OS === 'web') {
        // Web push notifications
        if ('Notification' in window && 'serviceWorker' in navigator) {
          const permission = await Notification.requestPermission();
          this.notificationPermissions = permission === 'granted';
        }
      } else {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        
        this.notificationPermissions = finalStatus === 'granted';
      }
    } catch (error) {
      console.warn('Error requesting notification permissions:', error);
      this.notificationPermissions = false;
    }
    
    return this.notificationPermissions;
  }

  async requestCalendarPermissions(): Promise<boolean> {
    if (!isBrowser() || Platform.OS === 'web') {
      return false;
    }

    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      this.calendarPermissions = status === 'granted';
    } catch (error) {
      console.warn('Error requesting calendar permissions:', error);
      this.calendarPermissions = false;
    }
    
    return this.calendarPermissions;
  }

  // Schedule deadline reminders
  async scheduleDeadlineReminders(deadline: Deadline, user: User): Promise<void> {
    if (!isBrowser()) return;
    
    const { preferences } = user;
    
    if (!preferences.reminderDefaults.deadlineReminders.length) return;

    for (const daysBeforeDeadline of preferences.reminderDefaults.deadlineReminders) {
      const reminderDate = addDays(deadline.dueDate, -daysBeforeDeadline);
      const now = new Date();
      
      if (reminderDate > now) {
        // Schedule push notification
        if (preferences.pushNotifications && preferences.reminderDefaults.pushReminders) {
          await this.schedulePushNotification({
            title: `Deadline Reminder: ${deadline.title}`,
            body: `${daysBeforeDeadline} day${daysBeforeDeadline > 1 ? 's' : ''} remaining`,
            data: { deadlineId: deadline.id, type: NotificationType.DEADLINE_REMINDER },
            trigger: reminderDate
          });
        }

        // Schedule email reminder
        if (preferences.emailNotifications && preferences.reminderDefaults.emailReminders) {
          await this.scheduleEmailReminder(deadline, user, daysBeforeDeadline, reminderDate);
        }

        // Add to calendar
        if (preferences.calendarIntegration && preferences.reminderDefaults.calendarEvents) {
          await this.addToCalendar(deadline, user, daysBeforeDeadline);
        }
      }
    }
  }

  private async schedulePushNotification(notification: {
    title: string;
    body: string;
    data: any;
    trigger: Date;
  }): Promise<void> {
    if (!isBrowser() || !this.notificationPermissions) return;

    try {
      if (Platform.OS === 'web') {
        // Web push notification - only if service worker is available
        if ('serviceWorker' in navigator) {
          const registration = await navigator.serviceWorker.ready;
          // Note: showTrigger is not widely supported, so we'll just show immediately for demo
          await registration.showNotification(notification.title, {
            body: notification.body,
            data: notification.data,
            icon: '/icon-192x192.png'
          });
        }
      } else {
        // Mobile push notification
        await Notifications.scheduleNotificationAsync({
          content: {
            title: notification.title,
            body: notification.body,
            data: notification.data,
          },
          trigger: notification.trigger,
        });
      }
    } catch (error) {
      console.warn('Error scheduling push notification:', error);
    }
  }

  private async scheduleEmailReminder(
    deadline: Deadline, 
    user: User, 
    daysBeforeDeadline: number,
    reminderDate: Date
  ): Promise<void> {
    const subject = `Immigration Deadline Reminder: ${deadline.title}`;
    const body = this.generateEmailBody(deadline, user, daysBeforeDeadline);

    // For web, we'll use a background service or webhook
    // For mobile, we'll use MailComposer to prepare the email
    if (Platform.OS !== 'web') {
      // Store email to send later (would need a background service)
      console.log('Email reminder scheduled:', { subject, body, sendDate: reminderDate });
    }
  }

  private generateEmailBody(deadline: Deadline, user: User, daysBeforeDeadline: number): string {
    return `
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
            <h2 style="color: #333;">Immigration Deadline Reminder</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2196F3;">${deadline.title}</h3>
              <p><strong>Due Date:</strong> ${format(deadline.dueDate, 'MMM dd, yyyy')}</p>
              <p><strong>Days Remaining:</strong> ${daysBeforeDeadline}</p>
              <p><strong>Priority:</strong> ${deadline.priority}</p>
              <p><strong>Description:</strong> ${deadline.description}</p>
              
              ${deadline.associatedForm ? `<p><strong>Associated Form:</strong> ${deadline.associatedForm}</p>` : ''}
            </div>
            
            <div style="background: #fff3e0; padding: 15px; border-radius: 8px; border-left: 4px solid #ff9800;">
              <h4 style="margin: 0; color: #e65100;">Action Required</h4>
              <p style="margin: 5px 0;">Please take action on this deadline to avoid missing important immigration requirements.</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://your-app-domain.com/deadlines" 
                 style="background: #2196F3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
                View All Deadlines
              </a>
            </div>
            
            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              This is an automated reminder from Immigration Tracker. 
              You can manage your notification preferences in your account settings.
            </p>
          </div>
        </body>
      </html>
    `;
  }

  async addToCalendar(deadline: Deadline, user: User, daysBeforeDeadline?: number): Promise<void> {
    if (!isBrowser() || !this.calendarPermissions || Platform.OS === 'web') return;

    try {
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      const defaultCalendar = calendars.find(cal => cal.source.name === 'Default') || calendars[0];

      if (!defaultCalendar) return;

      const eventTitle = daysBeforeDeadline 
        ? `Reminder: ${deadline.title} (${daysBeforeDeadline} days remaining)`
        : deadline.title;

      const eventDetails = {
        title: eventTitle,
        startDate: daysBeforeDeadline ? addDays(deadline.dueDate, -daysBeforeDeadline) : deadline.dueDate,
        endDate: daysBeforeDeadline ? addDays(deadline.dueDate, -daysBeforeDeadline) : addMinutes(deadline.dueDate, 60),
        notes: deadline.description,
        alarms: [
          { relativeOffset: -60 * 24 }, // 1 day before
          { relativeOffset: -60 * 4 },  // 4 hours before
          { relativeOffset: -30 },      // 30 minutes before
        ],
      };

      await Calendar.createEventAsync(defaultCalendar.id, eventDetails);
    } catch (error) {
      console.error('Error adding to calendar:', error);
    }
  }

  async sendImmediateNotification(
    title: string, 
    body: string, 
    data: any,
    user: User
  ): Promise<void> {
    if (!isBrowser() || !user.preferences.pushNotifications || !this.notificationPermissions) return;
    
    try {
      if (Platform.OS === 'web') {
        new Notification(title, { body, data });
      } else {
        await Notifications.scheduleNotificationAsync({
          content: { title, body, data },
          trigger: null, // Send immediately
        });
      }
    } catch (error) {
      console.warn('Error sending immediate notification:', error);
    }
  }

  async sendStatusUpdateNotification(
    newStatus: ImmigrationStatus, 
    user: User
  ): Promise<void> {
    const title = 'Immigration Status Updated';
    const body = `Your status has been updated to ${newStatus.replace(/_/g, ' ')}`;
    
    await this.sendImmediateNotification(title, body, { 
      type: NotificationType.STATUS_UPDATE,
      status: newStatus 
    }, user);
  }

  async composeEmail(
    recipient: string,
    subject: string,
    body: string,
    attachments?: string[]
  ): Promise<void> {
    if (!isBrowser() || Platform.OS === 'web') return;
    
    try {
      const isAvailable = await MailComposer.isAvailableAsync();
      
      if (isAvailable) {
        await MailComposer.composeAsync({
          recipients: [recipient],
          subject,
          body,
          isHtml: true,
          attachments: attachments?.map(uri => ({ uri, name: 'attachment' }))
        });
      }
    } catch (error) {
      console.warn('Error composing email:', error);
    }
  }

  // Batch operations for efficiency
  async scheduleMultipleDeadlineReminders(deadlines: Deadline[], user: User): Promise<void> {
    if (!isBrowser()) return;
    
    const promises = deadlines.map(deadline => this.scheduleDeadlineReminders(deadline, user));
    await Promise.all(promises);
  }

  async cancelAllScheduledNotifications(): Promise<void> {
    if (!isBrowser() || Platform.OS === 'web') return;
    
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.warn('Error cancelling notifications:', error);
    }
  }

  async cancelNotificationsForDeadline(deadlineId: string): Promise<void> {
    if (!isBrowser() || Platform.OS === 'web') return;
    
    try {
      const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
      const notificationsToCancel = scheduledNotifications.filter(
        notification => notification.content.data?.deadlineId === deadlineId
      );
      
      for (const notification of notificationsToCancel) {
        await Notifications.cancelScheduledNotificationAsync(notification.identifier);
      }
    } catch (error) {
      console.warn('Error cancelling deadline notifications:', error);
    }
  }

  // Web-specific methods
  async registerForWebPushNotifications(user: User): Promise<void> {
    if (!isBrowser() || Platform.OS !== 'web' || !('serviceWorker' in navigator)) return;

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'YOUR_VAPID_PUBLIC_KEY'
      });

      // Store subscription in user preferences
      const subscriptionData = {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('p256dh')!))),
          auth: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('auth')!)))
        },
        createdAt: new Date()
      };

      // Update user subscriptions (this would need to be implemented in the auth store)
      console.log('Web push subscription:', subscriptionData);
    } catch (error) {
      console.error('Error registering for web push:', error);
    }
  }

  // Initialize method that can be called safely from components
  async initialize(): Promise<void> {
    if (!isBrowser() || this.initialized) return;
    
    await this.initializeNotifications();
  }
}

// Create instance but don't initialize immediately
let notificationServiceInstance: NotificationService | null = null;

export const notificationService = {
  getInstance: (): NotificationService => {
    if (!notificationServiceInstance) {
      notificationServiceInstance = NotificationService.getInstance();
    }
    return notificationServiceInstance;
  },
  
  // Safe initialization method
  initialize: async (): Promise<NotificationService> => {
    const instance = notificationService.getInstance();
    await instance.initialize();
    return instance;
  }
}; 