/**
 * Form Resources and URLs
 * Centralized location for all USCIS forms, guides, and external resources
 */

import { FormType } from '../models/Forms';
import { ResourceType } from '../models/Timeline';

/**
 * Resource link interface
 */
export interface ResourceInfo {
  readonly title: string;
  readonly url: string;
  readonly type: ResourceType;
  readonly description: string;
}

/**
 * USCIS Official URLs
 */
export const USCIS_URLS = {
  // Main Sites
  HOMEPAGE: 'https://www.uscis.gov',
  CASE_STATUS: 'https://egov.uscis.gov/casestatus/landing.do',
  MYUSCIS_ACCOUNT: 'https://myaccount.uscis.gov',
  
  // Forms
  FORM_I765: 'https://www.uscis.gov/i-765',
  FORM_I765_PDF: 'https://www.uscis.gov/sites/default/files/document/forms/i-765.pdf',
  FORM_I983: 'https://www.uscis.gov/i-983',
  FORM_I129: 'https://www.uscis.gov/i-129',
  FORM_I20: 'https://studyinthestates.dhs.gov/students/prepare-for-life-in-the-us/obtaining-your-form-i-20',
  FORM_I94: 'https://i94.cbp.dhs.gov',
  FORM_AR11: 'https://www.uscis.gov/ar-11',
  
  // Guides and Information
  OPT_OVERVIEW: 'https://studyinthestates.dhs.gov/opt',
  STEM_OPT_OVERVIEW: 'https://studyinthestates.dhs.gov/stem-opt-extension',
  H1B_OVERVIEW: 'https://www.uscis.gov/working-in-the-united-states/temporary-workers/h-1b-specialty-occupations',
  F1_VISA_INFO: 'https://studyinthestates.dhs.gov/students',
  
  // Processing Times
  PROCESSING_TIMES: 'https://egov.uscis.gov/processing-times/',
  
  // Contact
  CONTACT_USCIS: 'https://www.uscis.gov/about-us/contact-us',
  USCIS_HELPLINE: 'tel:1-800-375-5283',
} as const;

/**
 * Other Government URLs
 */
export const GOVERNMENT_URLS = {
  SSA_HOMEPAGE: 'https://www.ssa.gov',
  SSA_APPLICATION: 'https://www.ssa.gov/number-card',
  SSA_OFFICE_LOCATOR: 'https://secure.ssa.gov/ICON/main.jsp',
  STUDY_IN_STATES: 'https://studyinthestates.dhs.gov',
  CBP_HOMEPAGE: 'https://www.cbp.gov',
  DOS_VISA_INFO: 'https://travel.state.gov/content/travel/en/us-visas.html',
} as const;

/**
 * Form-specific resources
 */
export const FORM_RESOURCES: Record<FormType, ResourceInfo[]> = {
  [FormType.I765_OPT]: [
    {
      title: 'Form I-765 (Application for Employment Authorization)',
      url: USCIS_URLS.FORM_I765,
      type: ResourceType.USCIS_FORM,
      description: 'Official USCIS form for applying for Optional Practical Training (OPT)',
    },
    {
      title: 'I-765 Instructions',
      url: `${USCIS_URLS.FORM_I765}/i-765-instructions`,
      type: ResourceType.USCIS_GUIDE,
      description: 'Step-by-step instructions for completing Form I-765',
    },
    {
      title: 'OPT Overview and Eligibility',
      url: USCIS_URLS.OPT_OVERVIEW,
      type: ResourceType.USCIS_GUIDE,
      description: 'Learn about OPT eligibility requirements and application process',
    },
  ],
  
  [FormType.I765_STEM]: [
    {
      title: 'Form I-765 (STEM OPT Extension)',
      url: USCIS_URLS.FORM_I765,
      type: ResourceType.USCIS_FORM,
      description: 'Application for 24-month STEM OPT extension',
    },
    {
      title: 'STEM OPT Extension Overview',
      url: USCIS_URLS.STEM_OPT_OVERVIEW,
      type: ResourceType.USCIS_GUIDE,
      description: 'Information about the STEM OPT extension program',
    },
  ],
  
  [FormType.I983]: [
    {
      title: 'Form I-983 (Training Plan for STEM OPT)',
      url: USCIS_URLS.FORM_I983,
      type: ResourceType.USCIS_FORM,
      description: 'Training plan required for STEM OPT extension',
    },
  ],
  
  [FormType.I129]: [
    {
      title: 'Form I-129 (Petition for Nonimmigrant Worker)',
      url: USCIS_URLS.FORM_I129,
      type: ResourceType.USCIS_FORM,
      description: 'H-1B petition form filed by employer',
    },
    {
      title: 'H-1B Visa Overview',
      url: USCIS_URLS.H1B_OVERVIEW,
      type: ResourceType.USCIS_GUIDE,
      description: 'Information about H-1B specialty occupation visa',
    },
  ],
  
  [FormType.LCA]: [
    {
      title: 'Labor Condition Application (LCA)',
      url: 'https://www.dol.gov/agencies/eta/foreign-labor/programs/h-1b',
      type: ResourceType.EXTERNAL_GUIDE,
      description: 'Department of Labor application required before H-1B filing',
    },
  ],
  
  [FormType.I20]: [
    {
      title: 'Form I-20 Information',
      url: USCIS_URLS.FORM_I20,
      type: ResourceType.USCIS_GUIDE,
      description: 'Certificate of Eligibility for F-1 student status',
    },
  ],
  
  [FormType.I94]: [
    {
      title: 'I-94 Arrival/Departure Record',
      url: USCIS_URLS.FORM_I94,
      type: ResourceType.USCIS_FORM,
      description: 'View and print your I-94 arrival/departure record',
    },
  ],
  
  [FormType.AR11]: [
    {
      title: 'Form AR-11 (Change of Address)',
      url: USCIS_URLS.FORM_AR11,
      type: ResourceType.USCIS_FORM,
      description: 'Required within 10 days of moving to new address',
    },
  ],
  
  [FormType.SSN_APPLICATION]: [
    {
      title: 'Apply for Social Security Number',
      url: GOVERNMENT_URLS.SSA_APPLICATION,
      type: ResourceType.EXTERNAL_GUIDE,
      description: 'Information on applying for SSN with EAD card',
    },
    {
      title: 'Find SSA Office',
      url: GOVERNMENT_URLS.SSA_OFFICE_LOCATOR,
      type: ResourceType.EXTERNAL_GUIDE,
      description: 'Locate your nearest Social Security office',
    },
  ],
  
  [FormType.CUSTOM]: [],
};

/**
 * Topic-specific resource collections
 */
export const TOPIC_RESOURCES = {
  OPT: [
    {
      title: 'OPT Overview',
      url: USCIS_URLS.OPT_OVERVIEW,
      type: ResourceType.USCIS_GUIDE,
      description: 'Complete guide to Optional Practical Training',
    },
    {
      title: 'OPT Timeline and Deadlines',
      url: `${USCIS_URLS.OPT_OVERVIEW}/timeline`,
      type: ResourceType.USCIS_GUIDE,
      description: 'Important dates and deadlines for OPT application',
    },
  ],
  
  STEM_OPT: [
    {
      title: 'STEM OPT Extension',
      url: USCIS_URLS.STEM_OPT_OVERVIEW,
      type: ResourceType.USCIS_GUIDE,
      description: '24-month extension for STEM degree holders',
    },
    {
      title: 'STEM Designated Degree Programs',
      url: 'https://www.ice.gov/sevis/stemlist',
      type: ResourceType.EXTERNAL_GUIDE,
      description: 'List of STEM designated degree programs',
    },
  ],
  
  H1B: [
    {
      title: 'H-1B Specialty Occupations',
      url: USCIS_URLS.H1B_OVERVIEW,
      type: ResourceType.USCIS_GUIDE,
      description: 'Information about H-1B visa process',
    },
    {
      title: 'H-1B Cap and Lottery',
      url: `${USCIS_URLS.H1B_OVERVIEW}/h-1b-cap`,
      type: ResourceType.USCIS_GUIDE,
      description: 'Understanding the H-1B lottery system',
    },
  ],
  
  F1_STUDENT: [
    {
      title: 'Study in the States',
      url: GOVERNMENT_URLS.STUDY_IN_STATES,
      type: ResourceType.USCIS_GUIDE,
      description: 'Official DHS portal for F-1 students',
    },
    {
      title: 'F-1 Student Visa Information',
      url: USCIS_URLS.F1_VISA_INFO,
      type: ResourceType.USCIS_GUIDE,
      description: 'Guide for F-1 student visa holders',
    },
  ],
  
  SSN: [
    {
      title: 'Social Security Number Application',
      url: GOVERNMENT_URLS.SSA_APPLICATION,
      type: ResourceType.EXTERNAL_GUIDE,
      description: 'How to apply for SSN with work authorization',
    },
  ],
  
  CASE_STATUS: [
    {
      title: 'Check Case Status Online',
      url: USCIS_URLS.CASE_STATUS,
      type: ResourceType.USCIS_GUIDE,
      description: 'Track your USCIS application status',
    },
    {
      title: 'Processing Times',
      url: USCIS_URLS.PROCESSING_TIMES,
      type: ResourceType.USCIS_GUIDE,
      description: 'Current USCIS processing times by form and service center',
    },
  ],
} as const;

/**
 * Helper function to get resources for a form type
 */
export function getFormResources(formType: FormType): ResourceInfo[] {
  return FORM_RESOURCES[formType] || [];
}

/**
 * Helper function to get resources for a topic
 */
export function getTopicResources(topic: keyof typeof TOPIC_RESOURCES): readonly ResourceInfo[] {
  return TOPIC_RESOURCES[topic] || [];
}

/**
 * Contact information
 */
export const CONTACT_INFO = {
  USCIS: {
    phone: '1-800-375-5283',
    phoneDisplay: '1-800-375-5283 (1-800-375-LAVE)',
    hours: 'Monday-Friday, 8am-8pm ET',
    website: USCIS_URLS.CONTACT_USCIS,
  },
  SSA: {
    phone: '1-800-772-1213',
    phoneDisplay: '1-800-772-1213',
    hours: 'Monday-Friday, 8am-7pm local time',
    website: GOVERNMENT_URLS.SSA_HOMEPAGE,
  },
} as const;

/**
 * Export all resources
 */
export default {
  USCIS_URLS,
  GOVERNMENT_URLS,
  FORM_RESOURCES,
  TOPIC_RESOURCES,
  CONTACT_INFO,
  getFormResources,
  getTopicResources,
};

