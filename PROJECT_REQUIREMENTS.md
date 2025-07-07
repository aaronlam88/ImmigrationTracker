# Immigration Tracker App - Project Requirements

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Business Requirements](#business-requirements)
3. [User Requirements & Personas](#user-requirements--personas)
4. [Functional Requirements](#functional-requirements)
5. [Technical Requirements](#technical-requirements)
6. [Implementation Roadmap](#implementation-roadmap)
7. [Risk & Compliance](#risk--compliance)
8. [Appendices](#appendices)

---

## Executive Summary

### Project Vision

A comprehensive web and mobile application to help international students navigate the complex immigration process, track critical deadlines, and maintain compliance for OPT, H1B, and other visa categories.

### Key Problems Solved

- **Deadline Management**: Automated tracking of critical immigration deadlines
- **Document Organization**: Secure storage and management of sensitive immigration documents
- **Process Guidance**: Step-by-step guidance through complex immigration processes
- **Compliance Monitoring**: Real-time monitoring of visa status and compliance requirements
- **Job Market Coordination**: Managing job search timeline with work authorization requirements

### Target Users

International students (F-1 visa holders) pursuing OPT, STEM OPT extensions, and H1B visa transitions.

### Success Metrics

- 95% deadline compliance rate among active users
- 85% user retention through critical transition periods
- 90% user satisfaction score
- 80% successful H1B sponsorship rate for engaged users

---

## Business Requirements

### Market Need

- **20,000+ international students** graduate annually with complex immigration requirements
- **Critical deadline management** with severe consequences for non-compliance
- **Fragmented information** across multiple government websites and portals
- **High stress periods** during status transitions and job searches

### Business Objectives

1. **Primary**: Reduce immigration compliance failures and status violations
2. **Secondary**: Improve employment outcomes for international students
3. **Tertiary**: Generate sustainable revenue through advertising

### Revenue Model

- **Free App**: All core features free for users - no paid subscriptions
- **Advertising Revenue**: Primary revenue through targeted ads (Google Ads, Facebook Ads)
- **Partnerships**: Revenue sharing with immigration attorneys, employers, and service providers
- **Sponsored Content**: Educational content sponsored by immigration law firms and employers

---

## User Requirements & Personas

### Primary Personas

#### **Persona 1: Sarah - STEM Graduate**

- **Demographics**: 24, MS Computer Science, India
- **Status**: Recent graduate applying for OPT
- **Goals**: Secure software engineering job, prepare for H1B
- **Pain Points**: Confused about timeline, nervous about job search timing
- **Timeline**: 36-month journey (OPT → STEM OPT → H1B)

#### **Persona 2: Miguel - Business Student**

- **Demographics**: 26, MBA Finance, Mexico
- **Status**: 8 months remaining on OPT
- **Goals**: Find H1B sponsor quickly, no extension available
- **Pain Points**: Time pressure, employer education needed
- **Timeline**: 24-month journey (OPT → H1B, critical timing)

#### **Persona 3: Li Wei - PhD Student**

- **Demographics**: 29, PhD Biomedical Engineering, China
- **Status**: STEM OPT extension, second H1B attempt
- **Goals**: Final H1B attempt, backup plan needed
- **Pain Points**: Previous lottery loss, final deadline pressure
- **Timeline**: 12 months remaining, last opportunity

### User Journey Overview

1. **Graduate** → Apply for OPT → Receive EAD Card
2. **Job Search** → Receive Offers → Coordinate Start Date
3. **Employment Setup** → Apply for SSN → Begin Work
4. **Status Maintenance** → STEM Extension (if eligible) → H1B Application
5. **Long-term Planning** → H1B Approval → Status Change

---

## Functional Requirements

### MVP Features (Must-Have)

#### **1. User Management**

- **Authentication**: Email/password registration, email verification
- **Profile Management**: Personal info, education, immigration status
- **Security**: Multi-factor authentication, secure password reset

#### **2. Immigration Status Tracking**

- **F-1 Status**: SEVIS ID, program dates, DSO contact
- **OPT Tracking**: Application status, employment authorization period
- **EAD Card Management**: Application tracking, delivery status
- **H1B Process**: Registration, lottery, petition status

#### **3. Document Management**

- **Upload & Storage**: Secure document upload with encryption
- **Organization**: Smart categorization by document type
- **Access Control**: Role-based access for sharing with employers/attorneys
- **Version Control**: Track document updates and revisions

#### **4. Deadline Management**

- **Critical Deadlines**: OPT applications, address changes, employment reporting
- **Notification System**: Email, SMS, push notifications
- **Escalation**: Multiple reminder levels with increasing urgency
- **Compliance Tracking**: Monitor adherence to deadlines

#### **5. Employment Coordination**

- **Job Search Tracking**: Applications, interviews, offers
- **Start Date Coordination**: EAD timeline integration
- **Employer Communication**: Professional templates and tracking
- **SSN Application**: Eligibility checking, application tracking

### Phase 2 Features (Should-Have)

#### **Enhanced Features**

- **STEM OPT Extension**: I-983 form management, validation reports
- **Advanced Analytics**: Personal timeline optimization
- **Employer Portal**: Limited access for HR teams
- **Legal Integration**: Attorney collaboration tools

#### **Improved User Experience**

- **Offline Support**: Critical information available offline
- **Advanced Notifications**: Smart scheduling based on user behavior
- **Mobile Optimization**: Full-featured mobile experience
- **Bulk Operations**: Mass document upload and organization

### Phase 3 Features (Nice-to-Have)

#### **Advanced Features**

- **Predictive Analytics**: Deadline risk assessment
- **Employer Matching**: H1B-friendly employer database
- **Alternative Visa Research**: O-1, L-1, EB-1 options
- **Community Features**: User forums and peer support

#### **AI/ML Features**

- **Document Analysis**: Automated document validation
- **Timeline Optimization**: Personalized recommendations
- **Risk Prediction**: Proactive compliance alerts
- **Success Probability**: H1B lottery and sponsorship likelihood

---

## Technical Requirements

### MVP Architecture (Single Server)

#### **Frontend Stack**

- **Mobile**: React Native with Expo SDK
- **Web**: React DOM with Vite
- **Shared Code**: Monorepo with common validation and API clients
- **UI Framework**: React Native Elements (mobile), Tailwind CSS (web)
- **State Management**: React Hooks (useState, useContext)

#### **Backend Stack**

- **Framework**: Spring Boot 3.x with Java 17+
- **Architecture**: REST API (Controller → Service → Repository)
- **Database**: PostgreSQL 15+ with JPA/Hibernate
- **Security**: Spring Security with JWT authentication
- **File Storage**: Local filesystem (MVP), S3 (Phase 2)
- **Email**: JavaMailSender for notifications

#### **Database Design**

```sql
-- Core tables for MVP
users (id, email, password_hash, name, created_at)
immigration_status (id, user_id, status_type, start_date, end_date)
documents (id, user_id, category, file_path, uploaded_at)
deadlines (id, user_id, type, date, status)
notifications (id, user_id, type, sent_at, delivered_at)
```

#### **Security (MVP)**

- **Authentication**: JWT tokens with refresh mechanism
- **Storage**: SecureStore (mobile), encrypted localStorage (web)
- **Password**: BCrypt hashing with salt
- **File Access**: User-based authorization for all files

### Phase 2: Cloud Deployment

#### **Infrastructure**

- **Platform**: AWS EC2 with Docker containers
- **Database**: RDS PostgreSQL with Multi-AZ
- **Storage**: S3 buckets with encryption
- **CDN**: CloudFront for static assets
- **Monitoring**: CloudWatch logs and metrics

#### **Enhanced Security**

- **Encryption**: AES-256 for sensitive data
- **Access Control**: Role-based permissions (RBAC)
- **Audit Logging**: Comprehensive access logs
- **Backup**: Automated backups with point-in-time recovery

### Phase 3: Advanced Features

#### **Scalability**

- **Auto Scaling**: Application Load Balancer with Auto Scaling Groups
- **Caching**: Redis for session and data caching
- **Background Jobs**: SQS for asynchronous processing
- **API Gateway**: AWS API Gateway for rate limiting

#### **Advanced Security**

- **Zero-Knowledge Architecture**: Client-side encryption
- **Hardware Security**: AWS HSM for key management
- **Compliance**: SOC 2 Type II, GDPR/CCPA compliance
- **Multi-Factor Auth**: TOTP and SMS-based 2FA

---

## Advertising Integration Strategy

### **Revenue Model Overview**

Your app will generate revenue through strategic advertising placement while maintaining user experience quality. Here's a comprehensive guide to implementing ads:

### **Primary Ad Networks**

#### **1. Google AdSense (Recommended Primary)**

- **Best For**: Web application, high-quality ads, reliable payments
- **Revenue Share**: Google keeps 32%, you get 68%
- **Minimum Payout**: $100
- **Ad Types**: Display ads, responsive ads, native ads
- **Implementation**: Simple JavaScript integration

#### **2. Google AdMob (Mobile)**

- **Best For**: React Native mobile app
- **Revenue Share**: Google keeps 32%, you get 68%
- **Ad Types**: Banner ads, interstitial ads, rewarded video ads
- **Implementation**: React Native AdMob SDK

#### **3. Meta Audience Network (Facebook)**

- **Best For**: Additional revenue stream, high-quality ads
- **Revenue Share**: Facebook keeps 30%, you get 70%
- **Ad Types**: Banner, interstitial, native ads
- **Implementation**: Facebook SDK integration

### **Strategic Ad Placement**

#### **Web Application Ad Placements**

**📱 Dashboard Header (728x90 - Leaderboard)**

```jsx
// Strategic placement at top of dashboard
<div className="bg-gray-50 border-b border-gray-200 p-4">
  <GoogleAdSense adSlot="1234567890" adFormat="horizontal" />
</div>
```

**📋 Sidebar (300x250 - Rectangle)**

```jsx
// Right sidebar on main content pages
<div className="w-80 sticky top-4">
  <div className="bg-white rounded-lg shadow p-4 mb-6">
    <GoogleAdSense adSlot="0987654321" adFormat="rectangle" />
  </div>
</div>
```

**📄 Content Native Ads (Responsive)**

```jsx
// Between document sections, looks like content
<div className="my-8 p-4 bg-blue-50 rounded-lg">
  <p className="text-sm text-gray-600 mb-2">Advertisement</p>
  <GoogleAdSense adSlot="1122334455" adFormat="responsive" />
</div>
```

#### **Mobile App Ad Placements**

**📱 Banner Ads (320x50)**

```jsx
// Bottom of screens, non-intrusive
<View style={styles.bannerContainer}>
  <AdMobBanner adSize="banner" adUnitID="ca-app-pub-xxxxx" />
</View>
```

**📱 Interstitial Ads (Full Screen)**

```jsx
// Between major actions (after document upload)
const showInterstitial = () => {
  AdMobInterstitial.setAdUnitID('ca-app-pub-xxxxx');
  AdMobInterstitial.requestAd();
  AdMobInterstitial.showAd();
};
```

### **User Experience Considerations**

#### **✅ Best Practices**

1. **Non-Intrusive**: Ads should enhance, not interrupt the user journey
2. **Relevant**: Immigration-related ads (legal services, job boards, education)
3. **Timing**: Show ads after successful actions (document uploads, deadline completions)
4. **Frequency**: Limit interstitial ads to once per session
5. **Loading States**: Ensure ads don't delay critical functionality

#### **❌ What to Avoid**

1. **Critical Path Blocking**: Never show ads during deadline-sensitive actions
2. **Document Upload Interruption**: No ads during file uploads
3. **Notification Blocking**: Don't show ads over important alerts
4. **Excessive Frequency**: Avoid ad fatigue with too many placements

### **Revenue Optimization Strategy**

#### **Phase 1: Basic Implementation (Months 1-6)**

**Google AdSense Setup:**

```javascript
// Add to your web app's HTML head
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: "ca-pub-xxxxxxxxxxxxxxxx",
    enable_page_level_ads: true
  });
</script>
```

**React Native AdMob Setup:**

```bash
npm install react-native-admob
# iOS
cd ios && pod install
```

**Expected Revenue (Conservative):**

- **1,000 MAU**: $200-500/month
- **5,000 MAU**: $1,500-3,000/month
- **10,000 MAU**: $4,000-8,000/month

#### **Phase 2: Advanced Targeting (Months 7-12)**

**User Segmentation for Ads:**

```javascript
const adTargeting = {
  visaStatus: user.immigrationStatus, // OPT, H1B, etc.
  graduationDate: user.graduationDate,
  fieldOfStudy: user.major,
  location: user.city,
  employmentStatus: user.hasJob
};
```

**Dynamic Ad Placement:**

```jsx
const AdComponent = ({ userStatus, pageType }) => {
  const adConfig = {
    'opt-waiting': 'job-search-ads',
    'h1b-preparation': 'legal-service-ads',
    'document-upload': 'storage-service-ads'
  };
  
  return <AdUnit type={adConfig[userStatus]} />;
};
```

#### **Phase 3: Premium Placements (Months 13-18)**

**Sponsored Content Integration:**

```jsx
const SponsoredContent = ({ userProfile }) => (
  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
    <div className="flex items-center mb-4">
      <span className="text-xs text-gray-500 uppercase">Sponsored</span>
    </div>
    <h3 className="font-semibold mb-2">H1B Sponsorship Opportunities</h3>
    <p className="text-gray-600 mb-4">
      Companies actively hiring international students in your field
    </p>
    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
      View Opportunities
    </button>
  </div>
);
```

### **Technical Implementation**

#### **Database Schema for Ad Tracking**

```sql
-- Ad performance tracking
CREATE TABLE ad_impressions (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    ad_network VARCHAR(50), -- 'google', 'facebook', 'sponsored'
    ad_unit_id VARCHAR(100),
    page_location VARCHAR(100),
    impression_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    clicked BOOLEAN DEFAULT FALSE,
    revenue DECIMAL(10,4) DEFAULT 0.00
);

-- User ad preferences
CREATE TABLE ad_preferences (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    opt_out_personalized BOOLEAN DEFAULT FALSE,
    preferred_categories TEXT[], -- array of ad categories
    blocked_advertisers TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **Privacy-Compliant Ad Serving**

```javascript
const AdManager = {
  // GDPR compliant ad serving
  serveAd: (adSlot, userConsent) => {
    const adRequest = {
      adUnitId: adSlot,
      requestNonPersonalizedAds: !userConsent.personalized,
      targeting: userConsent.personalized ? getUserTargeting() : null
    };
    
    return GoogleAds.requestAd(adRequest);
  },
  
  // Track revenue while respecting privacy
  trackRevenue: (adId, revenue) => {
    // Only track aggregated, non-personal data
    analytics.track('ad_revenue', {
      amount: revenue,
      network: 'google',
      date: new Date().toISOString().split('T')[0]
    });
  }
};
```

### **Compliance & Legal Requirements**

#### **Privacy Compliance**

- **GDPR**: Explicit consent for personalized ads
- **CCPA**: Option to opt-out of ad targeting
- **COPPA**: No personalized ads for users under 13
- **Data Minimization**: Only collect necessary targeting data

#### **Ad Content Policies**

- **No Misleading Claims**: Especially about immigration services
- **Legal Service Ads**: Only certified immigration attorneys
- **Job Board Ads**: Legitimate employment opportunities only
- **Educational Content**: Accurate immigration information only

### **Revenue Projections**

#### **Conservative Estimates (Monthly)**

| Users | Page Views | CTR | CPC | Revenue |
|-------|------------|-----|-----|---------|
| 1,000 | 50,000 | 2% | $0.50 | $500 |
| 5,000 | 250,000 | 2.5% | $0.60 | $3,750 |
| 10,000 | 500,000 | 3% | $0.70 | $10,500 |

#### **Optimistic Estimates (Monthly)**

| Users | Page Views | CTR | CPC | Revenue |
|-------|------------|-----|-----|---------|
| 1,000 | 80,000 | 3% | $0.80 | $1,920 |
| 5,000 | 400,000 | 3.5% | $0.90 | $12,600 |
| 10,000 | 800,000 | 4% | $1.00 | $32,000 |

**Additional Revenue Streams:**

- **Sponsored Content**: $500-2,000/month per sponsor
- **Attorney Partnerships**: 10-15% commission on referrals
- **Job Board Integration**: $1,000-5,000/month partnership fees

---

## Implementation Roadmap

### Phase 1: MVP (Months 1-6)

**Goal**: Core functionality for single-user deployment

**Deliverables**:

- User registration and authentication
- Basic document upload and storage
- Critical deadline tracking
- Email notification system
- Simple mobile and web interfaces
- **Ad Integration**: Google AdSense implementation

### Phase 2: Cloud Deployment (Months 7-12)

**Goal**: Scalable, secure cloud platform

**Deliverables**:

- AWS deployment with Docker
- Enhanced security and encryption
- Advanced notification system
- Improved user experience
- Performance optimization
- **Advanced Ad Features**: Targeted advertising and analytics

### Phase 3: Advanced Features (Months 13-18)

**Goal**: AI-powered features and analytics

**Deliverables**:

- Predictive analytics and recommendations
- Advanced document analysis
- Employer matching features
- Community and collaboration tools
- Full compliance certification
- **Premium Ad Placements**: Sponsored content and partner integrations

### Phase 4: Scale & Expand (Months 19-24)

**Goal**: Market expansion and partnership development

**Deliverables**:

- Multi-language support
- University partnerships
- Employer portal
- API for third-party integrations
- Advanced analytics dashboard
- **Ad Network Expansion**: Multiple ad networks and revenue optimization

---

## Risk & Compliance

### Technical Risks

- **Data Security**: Sensitive immigration documents require highest security standards
- **Scalability**: Rapid user growth during peak graduation periods
- **Integration**: Government systems do not provide APIs
- **Compliance**: Changing immigration regulations require system flexibility

### Business Risks

- **Regulatory Changes**: Immigration policies can change rapidly
- **Competition**: Established immigration software providers
- **Liability**: Incorrect information could impact user immigration status
- **Seasonal Usage**: Heavy usage during graduation and H1B seasons

### Compliance Requirements

#### **Data Privacy**

- **GDPR**: Full compliance for international users
- **CCPA**: California privacy rights
- **Data Retention**: Configurable retention policies
- **User Rights**: Export, correction, and deletion capabilities

#### **Security Standards**

- **SOC 2 Type II**: Annual security audits
- **ISO 27001**: Information security management
- **NIST Framework**: Cybersecurity framework implementation
- **Regular Audits**: Quarterly security assessments

#### **Government Integration**

- **No Automated Scraping**: Manual data ingestion only
- **Official Sources**: Use only publicly available information
- **Terms of Service**: Strict compliance with government ToS
- **Reference Only**: No direct integration with restricted systems

---

## Appendices

### Appendix A: Detailed User Journey Flows

#### **Complete Immigration Timeline (Non-STEM)**

```
YEAR 1 (Graduation Year)
├── Month 1: Submit OPT Application (I-765)
├── Month 4: Receive EAD Card
├── Month 5: Start Employment + SSN Application
├── Month 12: Begin H1B Preparation
└── Month 15: H1B Registration (March Year 2)

YEAR 2 (H1B Application Year)
├── Month 15: H1B Registration (March)
├── Month 16: Lottery Results + Petition Filing
├── Month 20: H1B Approval (if selected)
├── Month 24: OPT Expires (need Cap-Gap extension)
└── Month 27: H1B Status Change (October 1)
```

#### **Complete Immigration Timeline (STEM)**

```
YEAR 1 (Regular OPT)
├── Month 1: Submit OPT Application (I-765)
├── Month 4: Receive EAD Card
├── Month 5: Start Employment + SSN Application
└── Month 9: Begin STEM OPT Extension Prep

YEAR 2 (STEM OPT Extension)
├── Month 12: STEM OPT Extension Approved
├── Month 15: First H1B Registration Attempt
├── Month 24: Regular OPT Would Expire (extended)
└── Month 27: Continue on STEM OPT if H1B unsuccessful

YEAR 3 (Second H1B Attempt)
├── Month 27: Second H1B Registration
├── Month 28: Lottery Results + Petition Filing
├── Month 32: H1B Approval (if selected)
├── Month 36: STEM OPT Expires (final deadline)
└── Month 39: H1B Status Change (October 1)
```

#### **Core Process Steps**

1. **Graduate from University**
2. **Apply for OPT (I-765)** - Track submission and case status
3. **Receive OPT Approval Notice** - Upload and store documents
4. **Wait for EAD Card (2-3 months)** - Monitor USCIS case progress
5. **Job Search During Wait Period** - Track applications and interviews
6. **Receive Job Offers** - Manage multiple offers and negotiations
7. **Coordinate Start Date with EAD Receipt** - Employer communication
8. **Receive EAD Card** - Confirm receipt and notify stakeholders
9. **Apply for SSN** - Complete Social Security Number application
10. **Begin Employment** - Report to DSO and track compliance

### Appendix B: Document Dependency Matrix

#### **Critical Dependencies Table**

| **Document/Process** | **Prerequisites** | **Timeline** | **Blocking Effect** |
|---------------------|-------------------|--------------|-------------------|
| **OPT Application (I-765)** | • University Degree<br/>• Valid I-20<br/>• DSO Recommendation | 90 days before graduation | Blocks entire employment process |
| **EAD Card** | • I-765 Approval<br/>• Valid Address<br/>• Passport Photo | 2-3 months after approval | Blocks legal work authorization |
| **SSN Application** | • EAD Card (physical)<br/>• Job Offer Letter<br/>• I-94 Record | Same day application | Blocks employer onboarding |
| **STEM OPT Extension** | • STEM Degree<br/>• Current Employment<br/>• Form I-983<br/>• DSO Recommendation | 90 days before OPT expires | Blocks extended authorization |
| **H1B Registration** | • Employer Sponsorship<br/>• Basic Information<br/>• Registration Fee | March registration period | Blocks lottery participation |
| **H1B Petition** | • Lottery Selection<br/>• Approved LCA<br/>• Degree Evaluation | 90 days after selection | Blocks H1B approval |

#### **State Management Flow**

**Document States:**

- `NOT_STARTED` → `IN_PROGRESS` → `SUBMITTED` → `PROCESSING` → `APPROVED` → `RECEIVED` → `ACTIVE` → `EXPIRED`

**Process States:**

- `NOT_ELIGIBLE` → `ELIGIBLE` → `IN_PROGRESS` → `COMPLETED` → `VERIFIED`

#### **Dependency Logic**

```
IF (has_degree AND has_i20) THEN enable_opt_application
IF (has_ead_card AND has_job_offer) THEN enable_ssn_application
IF (has_stem_degree AND has_employment) THEN enable_stem_opt_prep
IF (has_employer_sponsorship) THEN enable_h1b_registration
```

### Appendix C: Technical Architecture Details

#### **System Architecture**

```
Frontend (React Native/Web)
├── Authentication Layer
├── Document Management
├── Deadline Tracking
├── Notification System
└── User Dashboard

Backend (Spring Boot)
├── REST API Controllers
├── Business Logic Services
├── Data Access Layer
├── Security Components
└── Background Jobs

Database (PostgreSQL)
├── User Management
├── Document Storage
├── Deadline Tracking
├── Notification Logs
└── Audit Trails
```

#### **Detailed Database Schema**

```sql
-- Users and Authentication
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    country VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Immigration Status Tracking
CREATE TABLE immigration_status (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    status_type VARCHAR(50) NOT NULL, -- F1, OPT, STEM_OPT, H1B
    start_date DATE,
    end_date DATE,
    sevis_id VARCHAR(20),
    uscis_case_number VARCHAR(20),
    current_status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Document Management
CREATE TABLE documents (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    category VARCHAR(50) NOT NULL, -- I20, EAD, PASSPORT, etc.
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    encryption_key VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at DATE,
    is_verified BOOLEAN DEFAULT FALSE
);

-- Deadline Management
CREATE TABLE deadlines (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    type VARCHAR(50) NOT NULL, -- OPT_APPLICATION, ADDRESS_CHANGE, etc.
    description TEXT,
    deadline_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, COMPLETED, OVERDUE
    priority VARCHAR(10) DEFAULT 'MEDIUM', -- LOW, MEDIUM, HIGH, CRITICAL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Notification System
CREATE TABLE notifications (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    type VARCHAR(50) NOT NULL, -- EMAIL, SMS, PUSH
    subject VARCHAR(255),
    message TEXT,
    sent_at TIMESTAMP,
    delivered_at TIMESTAMP,
    opened_at TIMESTAMP,
    status VARCHAR(20) DEFAULT 'PENDING' -- PENDING, SENT, DELIVERED, FAILED
);

-- Employment Tracking
CREATE TABLE employment (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    company_name VARCHAR(255),
    position VARCHAR(255),
    start_date DATE,
    end_date DATE,
    salary DECIMAL(10,2),
    is_h1b_sponsor BOOLEAN DEFAULT FALSE,
    employment_type VARCHAR(50), -- OPT, STEM_OPT, H1B
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit Logs
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50),
    resource_id UUID,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **API Endpoints**

```
Authentication:
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout

User Management:
GET /api/users/profile
PUT /api/users/profile
DELETE /api/users/account

Immigration Status:
GET /api/immigration/status
POST /api/immigration/status
PUT /api/immigration/status/{id}

Document Management:
GET /api/documents
POST /api/documents/upload
GET /api/documents/{id}
DELETE /api/documents/{id}
POST /api/documents/{id}/share

Deadline Management:
GET /api/deadlines
POST /api/deadlines
PUT /api/deadlines/{id}
DELETE /api/deadlines/{id}

Notifications:
GET /api/notifications
POST /api/notifications/settings
PUT /api/notifications/settings

Employment:
GET /api/employment
POST /api/employment
PUT /api/employment/{id}
```

### Appendix D: Security Implementation Details

#### **Encryption Standards**

**Level 1: Basic Encryption (Non-PII)**

- Filing dates and deadlines
- Status enums and milestones
- Government form references
- Standard AES-128 encryption

**Level 2: Standard Encryption (Personal Data)**

- Email addresses and phone numbers
- School and employer names
- USCIS case numbers
- AES-256 encryption

**Level 3: Maximum Encryption (Sensitive PII)**

- Full names and addresses
- SEVIS ID and SSN
- Passport and I-94 numbers
- All uploaded documents
- AES-256 with client-side encryption

#### **Key Management Strategy**

```
Master Key (User-Controlled)
├── Never stored on servers
├── Used to encrypt data encryption keys
├── Generated from user password + salt
└── Optional recovery mechanism

Data Encryption Keys
├── Rotated every 90 days
├── Encrypted with master key
├── Stored in secure key store
└── Separate keys per data type

Hardware Security Modules
├── Production key storage
├── Key generation and rotation
├── Tamper-resistant hardware
└── FIPS 140-2 Level 3 compliance
```

#### **Access Control Matrix**

| **Role** | **Read** | **Write** | **Share** | **Delete** |
|----------|----------|-----------|-----------|------------|
| **User** | Own data | Own data | Own data | Own data |
| **DSO** | Shared data | Updates only | No | No |
| **Employer** | Shared data | No | No | No |
| **Attorney** | Shared data | Updates only | No | No |
| **Admin** | Audit logs | System only | No | No |

#### **Security Monitoring**

**Real-time Alerts:**

- Failed login attempts (5+ in 15 minutes)
- Suspicious access patterns
- Document access from new devices
- Bulk document downloads
- API rate limit violations

**Audit Requirements:**

- All document access logged
- User authentication events
- System administration actions
- Data sharing activities
- Security incidents and responses

### Appendix E: Detailed Feature Specifications

#### **Document Management System**

**Upload Features:**

- **Drag-and-drop interface** for easy management
- **Batch upload** for multiple documents
- **Automatic OCR** for text extraction (client-side)
- **Format support**: PDF, JPG, PNG, DOCX
- **Client-side encryption** before upload

**Organization Features:**

- **Smart categorization** by document type
- **Custom tagging** system
- **Search on metadata** only (encrypted content)
- **Timeline view** of document history
- **Expiration tracking** with reminders

**Sharing Features:**

- **Secure sharing** with time-limited access
- **Permission levels**: view-only, download
- **Revocable access** for shared documents
- **Audit trail** of sharing activities
- **Email notifications** for sharing events

#### **Notification System**

**Delivery Methods:**

- **Email**: HTML templates with tracking
- **SMS**: Critical alerts only
- **Push notifications**: Mobile app alerts
- **In-app**: Dashboard notifications

**Escalation Levels:**

- **Level 1**: Standard reminder (7 days before)
- **Level 2**: Urgent reminder (3 days before)
- **Level 3**: Critical alert (1 day before)
- **Level 4**: Emergency escalation (deadline passed)

**Failure Recovery:**

- **Automatic retry**: 3 attempts for failed deliveries
- **Fallback channels**: Email if push fails
- **Delivery confirmation**: Track success/failure
- **User notification**: Alert when notifications are disabled

#### **Employment Coordination**

**Job Search Features:**

- **Application tracking** with company details
- **Interview scheduling** and reminders
- **Offer management**: details, deadlines, comparison
- **Salary negotiation** timeline and notes
- **Decision tracking**: acceptance/rejection

**Employer Communication:**

- **Professional templates** for common scenarios
- **Start date coordination** with EAD timeline
- **Status updates** when EAD received
- **H1B sponsorship** discussion tracking
- **Compliance reporting** to DSO

### Appendix F: Compliance & Legal Requirements

#### **Data Protection Compliance**

**GDPR Requirements:**

- **Right to Access**: User data export in JSON/CSV
- **Right to Rectification**: Update incorrect information
- **Right to Erasure**: Complete data deletion
- **Right to Portability**: Transfer data to other services
- **Data Minimization**: Collect only necessary data

**CCPA Requirements:**

- **Right to Know**: What data is collected and why
- **Right to Delete**: Remove personal information
- **Right to Opt-out**: Stop sale of personal information
- **Non-discrimination**: No penalty for exercising rights

#### **Data Retention Policies**

**Active Users**: Data retained while account active
**Inactive Users**: 2 years after last login
**Deleted Accounts**: 30 days for complete deletion
**Backup Data**: 1 year maximum retention
**Audit Logs**: 7 years for compliance

#### **Government Integration Compliance**

**Prohibited Activities:**

- Automated scraping of government websites
- Direct integration with restricted systems
- Caching of real-time government data
- Impersonation of government services

**Allowed Activities:**

- Manual data entry by users
- Reference to publicly available information
- PDF generation using public templates
- Educational content about immigration processes

### Appendix G: Success Metrics & KPIs

#### **User Engagement Metrics**

- **Monthly Active Users (MAU)**: Target 80% retention
- **Session Duration**: Average 15+ minutes
- **Feature Adoption**: 70% use core features
- **Document Uploads**: Average 10+ per user
- **Notification Engagement**: 60% open rate

#### **Immigration Success Metrics**

- **Deadline Compliance**: 95% on-time completion
- **OPT Application Success**: 98% approval rate
- **H1B Registration**: 100% completed registrations
- **Employment Placement**: 85% job placement rate
- **Status Violations**: <1% compliance violations

#### **Business Metrics**

- **Customer Acquisition Cost (CAC)**: <$50
- **Customer Lifetime Value (CLV)**: >$200
- **Churn Rate**: <5% monthly
- **Net Promoter Score (NPS)**: >70
- **Revenue per User**: $15-25/month

#### **Technical Performance**

- **System Uptime**: 99.9% availability
- **Response Time**: <200ms API responses
- **Error Rate**: <0.1% system errors
- **Security Incidents**: Zero data breaches
- **Notification Delivery**: 99% success rate

### Appendix H: Risk Assessment & Mitigation

#### **Technical Risks**

**High Risk:**

- **Data Breach**: Sensitive immigration documents
  - *Mitigation*: End-to-end encryption, security audits
- **System Downtime**: During critical deadlines
  - *Mitigation*: 99.9% uptime SLA, redundant systems

**Medium Risk:**

- **Integration Failures**: Government systems changes
  - *Mitigation*: Manual processes, user notifications
- **Scalability Issues**: Peak graduation periods
  - *Mitigation*: Auto-scaling, load testing

#### **Business Risks**

**High Risk:**

- **Regulatory Changes**: Immigration law updates
  - *Mitigation*: Flexible system design, legal monitoring
- **Competition**: Established immigration platforms
  - *Mitigation*: Unique value proposition, user experience

**Medium Risk:**

- **Liability**: Incorrect information impact
  - *Mitigation*: Disclaimers, professional insurance
- **Seasonal Usage**: Revenue fluctuations
  - *Mitigation*: Diversified pricing, recurring revenue

#### **Operational Risks**

**Medium Risk:**

- **Staff Availability**: Critical maintenance windows
  - *Mitigation*: 24/7 support, automated monitoring
- **Vendor Dependencies**: Third-party service failures
  - *Mitigation*: Multiple providers, service agreements

**Low Risk:**

- **User Support**: High volume during peak periods
  - *Mitigation*: Self-service options, knowledge base
- **Content Updates**: Immigration policy changes
  - *Mitigation*: Content management system, regular reviews

---

**Document Version**: 2.0  
**Last Updated**: [Current Date]  
**Next Review**: [Quarterly Review Date]
