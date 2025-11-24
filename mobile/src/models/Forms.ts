/**
 * Forms and Document Models
 * Immigration forms and document metadata (no file storage in Phase 1)
 */

import { ImmigrationStatus } from './ImmigrationStatus';

/**
 * USCIS and immigration form types
 */
export enum FormType {
  // OPT Forms
  I765_OPT = 'I765_OPT',                    // Application for Employment Authorization (OPT)
  I765_STEM = 'I765_STEM',                  // Application for STEM OPT Extension
  I983 = 'I983',                             // STEM OPT Training Plan
  
  // H1B Forms
  I129 = 'I129',                             // Petition for Nonimmigrant Worker (H1B)
  LCA = 'LCA',                               // Labor Condition Application
  
  // General Forms
  I20 = 'I20',                               // Certificate of Eligibility (F-1 Student)
  I94 = 'I94',                               // Arrival/Departure Record
  AR11 = 'AR11',                             // Change of Address
  SSN_APPLICATION = 'SSN_APPLICATION',       // Social Security Number Application
  
  // Other
  CUSTOM = 'CUSTOM',
}

/**
 * Document categories for organization
 */
export enum DocumentCategory {
  IDENTITY = 'IDENTITY',                     // Passport, National ID
  IMMIGRATION = 'IMMIGRATION',               // Visa, I-20, I-94, EAD
  EDUCATION = 'EDUCATION',                   // Diploma, Transcripts
  EMPLOYMENT = 'EMPLOYMENT',                 // Offer Letter, Employment Verification
  FINANCIAL = 'FINANCIAL',                   // Bank Statements, Tax Returns
  OTHER = 'OTHER',
}

/**
 * Document status
 */
export enum DocumentStatus {
  VALID = 'VALID',
  EXPIRING_SOON = 'EXPIRING_SOON',          // Within 90 days of expiry
  EXPIRED = 'EXPIRED',
  PENDING = 'PENDING',                       // Waiting for document to arrive
  NOT_APPLICABLE = 'NOT_APPLICABLE',
}

/**
 * Form information interface
 */
export interface FormInfo {
  readonly type: FormType;
  readonly name: string;
  readonly description: string;
  readonly uscisUrl: string;
  readonly filingFee: number;                // in USD
  readonly processingTime: string;           // e.g., "3-5 months"
  readonly relatedStatuses: ImmigrationStatus[];
  readonly requiredDocuments: string[];
  readonly instructions: string[];
  readonly isOnlineFilingAvailable: boolean;
}

/**
 * Document metadata interface (no actual file in Phase 1)
 */
export interface DocumentMetadata {
  readonly id: string;
  readonly category: DocumentCategory;
  readonly name: string;
  readonly description?: string;
  readonly status: DocumentStatus;
  readonly expiryDate?: Date | string;
  readonly issueDate?: Date | string;
  readonly documentNumber?: string;          // Passport number, EAD number, etc.
  readonly relatedStatus?: ImmigrationStatus;
  readonly isRequired: boolean;
  readonly notes?: string;
  readonly createdAt: Date | string;
  readonly updatedAt: Date | string;
}

/**
 * Form submission tracking
 */
export interface FormSubmission {
  readonly id: string;
  readonly formType: FormType;
  readonly submissionDate: Date | string;
  readonly receiptNumber?: string;           // USCIS receipt number
  readonly status: FormSubmissionStatus;
  readonly expectedDecisionDate?: Date | string;
  readonly actualDecisionDate?: Date | string;
  readonly result?: FormSubmissionResult;
  readonly notes?: string;
  readonly createdAt: Date | string;
  readonly updatedAt: Date | string;
}

export enum FormSubmissionStatus {
  PREPARING = 'PREPARING',
  SUBMITTED = 'SUBMITTED',
  IN_REVIEW = 'IN_REVIEW',
  RFE_RECEIVED = 'RFE_RECEIVED',             // Request for Evidence
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
  WITHDRAWN = 'WITHDRAWN',
}

export enum FormSubmissionResult {
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
  WITHDRAWN = 'WITHDRAWN',
  PENDING = 'PENDING',
}

/**
 * Helper to create document metadata
 */
export const createDocument = (params: {
  category: DocumentCategory;
  name: string;
  description?: string;
  expiryDate?: Date;
  issueDate?: Date;
  documentNumber?: string;
  isRequired: boolean;
  relatedStatus?: ImmigrationStatus;
}): DocumentMetadata => {
  const now = new Date().toISOString();
  const status = params.expiryDate 
    ? getDocumentStatus(params.expiryDate)
    : DocumentStatus.NOT_APPLICABLE;
  
  return {
    id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    category: params.category,
    name: params.name,
    description: params.description,
    status,
    expiryDate: params.expiryDate?.toISOString(),
    issueDate: params.issueDate?.toISOString(),
    documentNumber: params.documentNumber,
    relatedStatus: params.relatedStatus,
    isRequired: params.isRequired,
    createdAt: now,
    updatedAt: now,
  };
};

/**
 * Helper to determine document status based on expiry date
 */
export const getDocumentStatus = (expiryDate: Date): DocumentStatus => {
  const now = new Date();
  const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysUntilExpiry < 0) {
    return DocumentStatus.EXPIRED;
  } else if (daysUntilExpiry <= 90) {
    return DocumentStatus.EXPIRING_SOON;
  } else {
    return DocumentStatus.VALID;
  }
};

/**
 * Check if document is expired
 */
export const isDocumentExpired = (doc: DocumentMetadata): boolean => {
  if (!doc.expiryDate) return false;
  return new Date(doc.expiryDate) < new Date();
};

/**
 * Check if document is expiring soon (within 90 days)
 */
export const isDocumentExpiringSoon = (doc: DocumentMetadata, daysThreshold: number = 90): boolean => {
  if (!doc.expiryDate) return false;
  const expiryDate = new Date(doc.expiryDate);
  const now = new Date();
  const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return daysUntilExpiry > 0 && daysUntilExpiry <= daysThreshold;
};

/**
 * Get days until document expires
 */
export const getDaysUntilExpiry = (doc: DocumentMetadata): number | null => {
  if (!doc.expiryDate) return null;
  const expiryDate = new Date(doc.expiryDate);
  const now = new Date();
  return Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
};

/**
 * Filter expired documents
 */
export const getExpiredDocuments = (documents: DocumentMetadata[]): DocumentMetadata[] => {
  return documents.filter(isDocumentExpired);
};

/**
 * Filter documents expiring soon
 */
export const getExpiringSoonDocuments = (
  documents: DocumentMetadata[],
  daysThreshold: number = 90
): DocumentMetadata[] => {
  return documents.filter(doc => isDocumentExpiringSoon(doc, daysThreshold));
};

/**
 * Sort documents by expiry date (soonest first)
 */
export const sortDocumentsByExpiry = (documents: DocumentMetadata[]): DocumentMetadata[] => {
  return [...documents]
    .filter(doc => doc.expiryDate)
    .sort((a, b) => {
      if (!a.expiryDate || !b.expiryDate) return 0;
      return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
    });
};

/**
 * Common document checklist for immigration statuses
 */
export const getRequiredDocuments = (status: ImmigrationStatus): string[] => {
  switch (status) {
    case ImmigrationStatus.F1_STUDENT:
      return ['Passport', 'F-1 Visa', 'I-20', 'I-94'];
    
    case ImmigrationStatus.OPT_PENDING:
    case ImmigrationStatus.OPT_APPROVED:
      return ['Passport', 'F-1 Visa', 'I-20', 'I-94', 'I-765 Receipt', 'EAD Card'];
    
    case ImmigrationStatus.STEM_OPT_PENDING:
    case ImmigrationStatus.STEM_OPT_APPROVED:
      return ['Passport', 'F-1 Visa', 'I-20', 'EAD Card', 'I-983 Training Plan', 'STEM Degree Proof'];
    
    case ImmigrationStatus.H1B_PETITION_FILED:
    case ImmigrationStatus.H1B_APPROVED:
    case ImmigrationStatus.H1B_ACTIVE:
      return ['Passport', 'H-1B Visa', 'I-129 Approval Notice', 'I-94', 'LCA'];
    
    case ImmigrationStatus.EMPLOYED:
      return ['Passport', 'EAD Card', 'Employment Authorization Document', 'Job Offer Letter'];
    
    default:
      return ['Passport', 'Visa', 'I-94'];
  }
};

