# Firestore Database Structure for Immigration Tracker

## 📊 **Database Schema**

```
/users/{userId}
  - email: string
  - name: string
  - createdAt: timestamp
  - preferences: {
      emailNotifications: boolean
      pushNotifications: boolean
      calendarIntegration: boolean
      reminderDefaults: {
        deadlineReminders: [30, 14, 7, 1]
        pushReminders: boolean
        emailReminders: boolean
        calendarEvents: boolean
      }
    }

/immigration-cases/{caseId}
  - userId: string (reference to user)
  - currentStatus: string (enum: F1_STUDENT, POST_COMPLETION_OPT, etc.)
  - personalInfo: {
      firstName: string
      lastName: string
      country: string
      passportNumber: string
      i94Number: string
    }
  - statusHistory: [
      {
        id: string
        status: string
        startDate: timestamp
        endDate: timestamp
        notes: string
      }
    ]
  - unemploymentDays: number
  - maxUnemploymentDays: number
  - stemOptEligible: boolean
  - createdAt: timestamp
  - updatedAt: timestamp

/immigration-cases/{caseId}/deadlines/{deadlineId}
  - title: string
  - description: string
  - dueDate: timestamp
  - priority: string (CRITICAL, HIGH, MEDIUM, LOW)
  - category: string (APPLICATION, INTERVIEW, DOCUMENT, etc.)
  - completed: boolean
  - associatedForm: string (optional)
  - reminderDays: [30, 14, 7, 1]
  - createdAt: timestamp

/immigration-cases/{caseId}/documents/{documentId}
  - name: string
  - type: string
  - category: string
  - filePath: string (Cloud Storage reference)
  - size: number
  - uploadDate: timestamp
  - expirationDate: timestamp (optional)

/immigration-cases/{caseId}/h1b-attempts/{attemptId}
  - year: number
  - employer: {
      name: string
      address: string
      size: string
    }
  - result: string (PENDING, SELECTED, NOT_SELECTED)
  - applicationDate: timestamp
  - resultDate: timestamp (optional)
  - notes: string

/immigration-cases/{caseId}/notifications/{notificationId}
  - title: string
  - message: string
  - type: string (SUCCESS, WARNING, ERROR, INFO)
  - read: boolean
  - actionRequired: boolean
  - date: timestamp
```

## 🔐 **Security Rules**

Users can only access their own data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can read/write their own immigration cases
    match /immigration-cases/{caseId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      
      // Allow creation if the userId matches the authenticated user
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
      
      // Subcollections inherit parent permissions
      match /{subcollection}/{docId} {
        allow read, write: if request.auth != null && 
          request.auth.uid == get(/databases/$(database)/documents/immigration-cases/$(caseId)).data.userId;
      }
    }
  }
}
```

## 🚀 **Database Indexes**

For optimal performance, create these indexes:

1. **immigration-cases**
   - userId (ascending)
   - currentStatus (ascending) 
   - updatedAt (descending)

2. **deadlines** (subcollection)
   - dueDate (ascending)
   - completed (ascending)
   - priority (ascending)

3. **notifications** (subcollection)
   - read (ascending)
   - date (descending)

## 💾 **Storage Usage Estimates**

- **User document**: ~1KB
- **Immigration case**: ~10-50KB  
- **Deadline**: ~1KB each
- **Document metadata**: ~2KB each
- **H-1B attempt**: ~3KB each
- **Notification**: ~0.5KB each

**Total per user**: ~100-500KB (very efficient!) 