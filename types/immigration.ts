export enum ImmigrationStatus {
  F1_STUDENT = 'F1_STUDENT',
  POST_COMPLETION_OPT = 'POST_COMPLETION_OPT',
  STEM_OPT_EXTENSION = 'STEM_OPT_EXTENSION',
  H1B_REGISTRATION = 'H1B_REGISTRATION',
  H1B_LOTTERY_PENDING = 'H1B_LOTTERY_PENDING',
  H1B_SELECTED = 'H1B_SELECTED',
  H1B_NOT_SELECTED = 'H1B_NOT_SELECTED',
  H1B_PETITION_FILED = 'H1B_PETITION_FILED',
  H1B_APPROVED = 'H1B_APPROVED',
  H1B_DENIED = 'H1B_DENIED',
  H1B_ACTIVE = 'H1B_ACTIVE',
  GREEN_CARD_PROCESS = 'GREEN_CARD_PROCESS',
  PERMANENT_RESIDENT = 'PERMANENT_RESIDENT'
}

export enum VisaType {
  F1 = 'F1',
  H1B = 'H1B',
  GREEN_CARD = 'GREEN_CARD'
}

export enum Priority {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: Date;
  expirationDate?: Date;
  url?: string;
  category: DocumentCategory;
}

export enum DocumentCategory {
  PASSPORT = 'PASSPORT',
  VISA = 'VISA',
  I20 = 'I20',
  EAD = 'EAD',
  I94 = 'I94',
  DEGREE = 'DEGREE',
  TRANSCRIPT = 'TRANSCRIPT',
  LCA = 'LCA',
  I129 = 'I129',
  I765 = 'I765',
  I983 = 'I983',
  OTHER = 'OTHER'
}

export interface Deadline {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: Priority;
  completed: boolean;
  category: DeadlineCategory;
  reminderDays: number[];
  associatedForm?: string;
}

export enum DeadlineCategory {
  APPLICATION = 'APPLICATION',
  REGISTRATION = 'REGISTRATION',
  REPORTING = 'REPORTING',
  RENEWAL = 'RENEWAL',
  RESPONSE = 'RESPONSE'
}

export interface EmployerInfo {
  id: string;
  name: string;
  address: string;
  isEVerifyEnrolled: boolean;
  eVerifyNumber?: string;
  contactPerson: string;
  contactEmail: string;
  isH1BSponsor: boolean;
}

export interface EducationInfo {
  id: string;
  institution: string;
  degree: string;
  major: string;
  graduationDate: Date;
  isSTEMDegree: boolean;
  isUSInstitution: boolean;
  cipCode?: string;
}

export interface ImmigrationCase {
  id: string;
  userId: string;
  currentStatus: ImmigrationStatus;
  statusHistory: StatusHistoryEntry[];
  personalInfo: PersonalInfo;
  education: EducationInfo[];
  currentEmployer?: EmployerInfo;
  documents: Document[];
  deadlines: Deadline[];
  unemploymentDays: number;
  maxUnemploymentDays: number;
  stemOptEligible: boolean;
  h1bAttempts: H1BAttempt[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryOfBirth: string;
  passportNumber: string;
  passportExpiration: Date;
  currentAddress: string;
}

export interface StatusHistoryEntry {
  id: string;
  status: ImmigrationStatus;
  startDate: Date;
  endDate?: Date;
  notes?: string;
  documents?: string[];
}

export interface H1BAttempt {
  id: string;
  fiscalYear: number;
  registrationDate?: Date;
  lotteryResult?: 'SELECTED' | 'NOT_SELECTED' | 'PENDING';
  petitionFilingDate?: Date;
  petitionResult?: 'APPROVED' | 'DENIED' | 'PENDING' | 'RFE';
  startDate?: Date;
  endDate?: Date;
  employer: EmployerInfo;
  notes?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';
  date: Date;
  read: boolean;
  actionRequired: boolean;
  relatedDeadline?: string;
}

export interface FormTemplate {
  id: string;
  name: string;
  description: string;
  category: DocumentCategory;
  fields: FormField[];
  requiredDocuments: string[];
  estimatedTime: number;
  fee?: number;
  filingLocation?: string;
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'date' | 'select' | 'checkbox' | 'file' | 'number';
  required: boolean;
  options?: string[];
  validation?: any;
} 