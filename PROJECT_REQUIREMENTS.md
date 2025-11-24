# Immigration Tracker - Project Requirements

**Target Users**: International students (F-1 visa holders) navigating OPT, STEM OPT, and H1B processes  
**Core Problem**: Complex immigration deadlines, document management, and compliance tracking  
**Solution**: Mobile-first offline app → Cloud-enabled platform

---

## 🎯 User Personas & Journey

### Primary Persona: Sarah - STEM Graduate

- **Demographics**: 24, MS Computer Science, International student
- **Current Status**: Recent graduate applying for OPT
- **Goals**: Secure job, navigate OPT → H1B transition successfully
- **Pain Points**: Confused timelines, missed deadlines, document chaos

### Immigration Journey

```
F-1 Student → Graduate → OPT Application → EAD Card → Employment → H1B Registration → H1B Approval
```

**Critical Periods**:

- 90 days before graduation (OPT application)
- 60-day grace period after program end
- H1B registration season (March)
- Employment start date coordination

---

## ⚡ Core Features

### Phase 1: MVP Mobile Features (Offline-First)

#### **Immigration Status Tracking**

- F-1 status monitoring (SEVIS ID, program dates)
- OPT application progress and timeline
- H1B process tracking (registration, lottery, petition)
- Status change notifications and guidance

#### **Deadline Management**

- Critical deadline tracking with local notifications
- 90-day OPT application reminder
- Address change requirements (10-day rule)
- Employment reporting deadlines
- Document expiration alerts

#### **Document Management**

- Secure local document storage and organization
- Smart categorization (Passport, Visa, I-20, EAD, etc.)
- Document expiration tracking
- Photo capture and basic editing

#### **Employment Coordination**

- Job search tracking (applications, interviews, offers)
- Start date coordination with EAD timeline
- Employer information management
- Work authorization verification

### Phase 3: Cloud-Enhanced Features

#### **Multi-Device Sync**

- Secure cloud data synchronization
- Cross-device access and updates
- Backup and restore capabilities

#### **Advanced Notifications**

- Email and SMS alerts
- Escalation system for critical deadlines
- Personalized guidance and tips

#### **Collaboration Features**

- Advisor/attorney access (with permission)
- Document sharing capabilities
- Progress sharing with family/friends

---

## 🛠️ Technical Architecture

### Phase 1: Mobile-First Offline Stack

- **Platform**: React Native CLI (iOS first, Android Phase 2)
- **Language**: TypeScript with strict mode
- **Database**: Local SQLite with react-native-sqlite-storage
- **Navigation**: React Navigation 6+
- **State**: React Hooks with offline-first patterns
- **Storage**: Local file system for documents
- **Notifications**: Local push notifications

### Phase 3: Backend Integration Stack

- **API**: Spring Boot 3.x + Java 17+
- **Database**: PostgreSQL (prod) / SQLite (dev)
- **Authentication**: JWT with offline capability
- **File Storage**: AWS S3 or local filesystem
- **Email**: JavaMailSender for notifications
- **Migration**: RESTful → GraphQL planned

### Database Schema (Core Entities)

```sql
-- User and authentication
users (id, email, password_hash, first_name, last_name, created_at)
user_roles (user_id, role_id)

-- Immigration tracking  
immigration_statuses (id, user_id, status_type_id, start_date, end_date, is_current)
immigration_status_types (id, name, description, typical_duration_days)

-- Document management
documents (id, user_id, category_id, name, file_path, upload_date, expiry_date)
document_categories (id, name, description, is_required)

-- Deadline tracking
deadlines (id, user_id, deadline_type_id, title, deadline_date, is_completed)
deadline_types (id, name, description, default_reminder_days, is_critical)

-- Employment tracking
employments (id, user_id, company_id, position_title, start_date, work_authorization)
companies (id, name, address, is_h1b_sponsor)

-- Notifications
notifications (id, user_id, type, title, message, is_read, created_at)
```

---

## 🔒 Security & Compliance

### Data Protection

- **Local Encryption**: AES-256 for sensitive documents on device
- **Transmission**: TLS 1.3 for all network communication (Phase 3+)
- **Access Control**: User-based authorization, no cross-user data access
- **Audit Logging**: Track all data access and modifications

### Privacy Compliance

- **GDPR/CCPA**: Right to access, rectification, erasure, portability
- **Data Minimization**: Collect only necessary information
- **Retention Policies**: Configurable data retention periods
- **Consent Management**: Clear opt-in/opt-out for data collection

### Immigration Law Compliance

- **No Automated Scraping**: Manual data entry only
- **Official Sources**: Reference publicly available information only
- **Legal Disclaimers**: Clear disclaimers about information accuracy
- **No Legal Advice**: Tool provides information, not legal counsel

---

## 📊 Success Metrics

### User Engagement (Phase 1)

- **App Store Rating**: Target 4.5+ stars
- **User Retention**: 80% retention through critical periods
- **Feature Adoption**: 70% use of core deadline tracking
- **Session Quality**: 10+ minute average sessions

### Business Impact

- **Deadline Compliance**: 95% on-time completion rate
- **User Satisfaction**: 90% satisfaction in surveys  
- **Employment Success**: Track job placement rates
- **Market Validation**: 1000+ active users by Phase 1 end

### Technical Performance

- **App Performance**: <3 second app launch time
- **Offline Capability**: 100% core features work offline
- **Data Sync**: <5 second sync when online (Phase 3)
- **Crash Rate**: <0.1% crash rate

---

## ⚠️ Key Risks & Mitigation

### Technical Risks

- **Data Loss**: Local storage corruption
  - *Mitigation*: Regular local backups, cloud sync (Phase 3)
- **Platform Changes**: iOS/Android API changes
  - *Mitigation*: Stay current with React Native updates

### Business Risks  

- **Regulatory Changes**: Immigration law updates
  - *Mitigation*: Flexible data model, legal monitoring
- **Market Competition**: Similar apps launched
  - *Mitigation*: Focus on offline-first, superior UX

### Operational Risks

- **Seasonal Usage**: Peak during graduation periods
  - *Mitigation*: Performance testing, scalable architecture
- **Support Volume**: High user support needs
  - *Mitigation*: Comprehensive in-app help, FAQ system

---

## 📈 Current Status

**✅ Foundation Complete**:

- Backend architecture designed (ready for Phase 3)
- Database schema finalized
- Mobile-first strategy defined

**🔄 Phase 1 In Progress**:

- React Native project setup
- iOS development environment
- Core mobile features development

**📅 Next Milestones**:

- iOS app MVP completion (Month 2)
- App Store submission (Month 3)
- User feedback and iteration (Month 3)

---

*This document defines what to build. See PROJECT_PLAN.md for how and when to build it. See AGENTS.md for development guidelines.*
