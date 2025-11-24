/**
 * Test Data & Sample Profiles
 * For development and manual testing
 */

import { ImmigrationStatus } from '../models/ImmigrationStatus';
import { UserProfile } from '../models/UserProfile';
import { addMonths, subMonths, addDays, subDays } from 'date-fns';

/**
 * Sample user profiles for different immigration stages
 */

/**
 * Scenario 1: F-1 Student about to graduate
 */
export const sampleF1Student: UserProfile = {
  id: 'sample-f1-001',
  name: 'Sarah Chen',
  email: 'sarah.chen@example.edu',
  currentStatus: ImmigrationStatus.F1_STUDENT,
  graduationDate: addMonths(new Date(), 2), // Graduating in 2 months
  hasStemDegree: true,
  hasJobOffer: false,
  createdAt: subMonths(new Date(), 24), // Account created 2 years ago
  updatedAt: new Date(),
};

/**
 * Scenario 2: Recently graduated, OPT pending
 */
export const sampleOPTPending: UserProfile = {
  id: 'sample-opt-pending-001',
  name: 'Michael Rodriguez',
  email: 'michael.rodriguez@example.edu',
  currentStatus: ImmigrationStatus.OPT_PENDING,
  graduationDate: subMonths(new Date(), 1), // Graduated 1 month ago
  hasStemDegree: false,
  hasJobOffer: false,
  optApplicationDate: subDays(new Date(), 30), // Applied 30 days ago
  programEndDate: subMonths(new Date(), 1),
  createdAt: subMonths(new Date(), 30),
  updatedAt: new Date(),
};

/**
 * Scenario 3: OPT approved, job searching
 */
export const sampleOPTApproved: UserProfile = {
  id: 'sample-opt-approved-001',
  name: 'Emily Johnson',
  email: 'emily.johnson@example.com',
  currentStatus: ImmigrationStatus.OPT_APPROVED,
  graduationDate: subMonths(new Date(), 3),
  hasStemDegree: true,
  hasJobOffer: false,
  optApplicationDate: subMonths(new Date(), 5),
  optApprovalDate: subMonths(new Date(), 1),
  eadReceivedDate: addDays(new Date(), 15), // EAD card arrives in 15 days
  eadExpiryDate: addMonths(new Date(), 12), // 12 months validity
  programEndDate: subMonths(new Date(), 3),
  createdAt: subMonths(new Date(), 36),
  updatedAt: new Date(),
};

/**
 * Scenario 4: On OPT (EAD received), employed, considering STEM extension
 */
export const sampleOPTWithJob: UserProfile = {
  id: 'sample-opt-job-001',
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@techcorp.com',
  currentStatus: ImmigrationStatus.EAD_RECEIVED, // Has EAD card, working
  graduationDate: subMonths(new Date(), 8),
  hasStemDegree: true,
  hasJobOffer: true,
  optApplicationDate: subMonths(new Date(), 10),
  optApprovalDate: subMonths(new Date(), 7),
  eadReceivedDate: subMonths(new Date(), 6),
  eadExpiryDate: addMonths(new Date(), 6), // 6 months remaining
  employmentStartDate: subMonths(new Date(), 3),
  currentEmployer: 'TechCorp Inc.',
  jobTitle: 'Software Engineer',
  programEndDate: subMonths(new Date(), 8),
  createdAt: subMonths(new Date(), 40),
  updatedAt: new Date(),
};

/**
 * Scenario 5: STEM OPT approved, employed
 */
export const sampleSTEMOPT: UserProfile = {
  id: 'sample-stem-001',
  name: 'Aisha Patel',
  email: 'aisha.patel@datatech.com',
  currentStatus: ImmigrationStatus.STEM_OPT_APPROVED,
  graduationDate: subMonths(new Date(), 18),
  hasStemDegree: true,
  hasJobOffer: true,
  optApplicationDate: subMonths(new Date(), 20),
  optApprovalDate: subMonths(new Date(), 17),
  eadReceivedDate: subMonths(new Date(), 16),
  eadExpiryDate: addMonths(new Date(), 2), // Original OPT EAD expiring soon
  stemOptApplicationDate: subMonths(new Date(), 3),
  stemOptExpiryDate: addMonths(new Date(), 26), // STEM extension: 24 months
  employmentStartDate: subMonths(new Date(), 14),
  currentEmployer: 'DataTech Solutions',
  jobTitle: 'Data Scientist',
  programEndDate: subMonths(new Date(), 18),
  createdAt: subMonths(new Date(), 48),
  updatedAt: new Date(),
};

/**
 * Scenario 6: H1B lottery selected, petition pending
 */
export const sampleH1BPending: UserProfile = {
  id: 'sample-h1b-pending-001',
  name: 'Carlos Martinez',
  email: 'carlos.martinez@cloudcorp.com',
  currentStatus: ImmigrationStatus.H1B_PETITION_FILED,
  graduationDate: subMonths(new Date(), 30),
  hasStemDegree: true,
  hasJobOffer: true,
  eadReceivedDate: subMonths(new Date(), 28),
  eadExpiryDate: subMonths(new Date(), 16), // Original OPT expired
  stemOptExpiryDate: addMonths(new Date(), 8), // STEM extension still valid
  h1bRegistrationDate: subMonths(new Date(), 3), // Registered in March
  h1bLotterySelected: true,
  h1bStartDate: addMonths(new Date(), 5), // October 1st start
  employmentStartDate: subMonths(new Date(), 24),
  currentEmployer: 'CloudCorp Technologies',
  jobTitle: 'Senior Software Engineer',
  employerWillingToSponsor: true,
  programEndDate: subMonths(new Date(), 30),
  createdAt: subMonths(new Date(), 60),
  updatedAt: new Date(),
};

/**
 * Scenario 7: H1B approved and active
 */
export const sampleH1BActive: UserProfile = {
  id: 'sample-h1b-active-001',
  name: 'Yuki Tanaka',
  email: 'yuki.tanaka@innovate.com',
  currentStatus: ImmigrationStatus.H1B_ACTIVE,
  graduationDate: subMonths(new Date(), 42),
  hasStemDegree: true,
  hasJobOffer: true,
  h1bApprovalDate: subMonths(new Date(), 6),
  h1bStartDate: subMonths(new Date(), 2),
  h1bExpiryDate: addMonths(new Date(), 34), // 3 years from start
  employmentStartDate: subMonths(new Date(), 36),
  currentEmployer: 'Innovate Labs',
  jobTitle: 'Principal Engineer',
  employerWillingToSponsor: true,
  programEndDate: subMonths(new Date(), 42),
  createdAt: subMonths(new Date(), 72),
  updatedAt: new Date(),
};

/**
 * All sample profiles for easy iteration
 */
export const allSampleProfiles: UserProfile[] = [
  sampleF1Student,
  sampleOPTPending,
  sampleOPTApproved,
  sampleOPTWithJob,
  sampleSTEMOPT,
  sampleH1BPending,
  sampleH1BActive,
];

/**
 * Helper to get sample profile by status
 */
export function getSampleProfileByStatus(status: ImmigrationStatus): UserProfile | undefined {
  return allSampleProfiles.find(profile => profile.currentStatus === status);
}

/**
 * Helper to log sample profiles for debugging
 */
export function logSampleProfiles(): void {
  console.log('=== Sample Immigration Profiles ===\n');
  
  allSampleProfiles.forEach((profile, index) => {
    console.log(`${index + 1}. ${profile.name}`);
    console.log(`   Status: ${profile.currentStatus}`);
    console.log(`   Email: ${profile.email}`);
    
    if (profile.graduationDate) {
      const gradDate = typeof profile.graduationDate === 'string' 
        ? new Date(profile.graduationDate) 
        : profile.graduationDate;
      console.log(`   Graduation: ${gradDate.toLocaleDateString()}`);
    }
    
    if (profile.currentEmployer) {
      console.log(`   Employer: ${profile.currentEmployer}`);
      console.log(`   Job Title: ${profile.jobTitle}`);
    }
    
    console.log('');
  });
}

/**
 * Test scenarios description
 */
export const TEST_SCENARIOS = {
  F1_STUDENT: {
    name: 'F-1 Student About to Graduate',
    description: 'Student needs to start OPT application process',
    expectedDeadlines: ['OPT_APPLICATION_WINDOW_START', 'GRADUATION_DATE'],
    expectedActions: ['Research OPT requirements', 'Prepare I-765 form'],
  },
  
  OPT_PENDING: {
    name: 'OPT Application Pending',
    description: 'Waiting for EAD card approval',
    expectedDeadlines: ['GRACE_PERIOD_END', 'EXPECTED_APPROVAL_DATE'],
    expectedActions: ['Check case status', 'Prepare for job search'],
  },
  
  OPT_APPROVED: {
    name: 'OPT Approved, Job Searching',
    description: 'Has EAD card, actively job hunting',
    expectedDeadlines: ['OPT_START_DATE', 'UNEMPLOYMENT_LIMIT'],
    expectedActions: ['Start job applications', 'Get SSN', 'Network'],
  },
  
  OPT_WITH_JOB: {
    name: 'Employed on OPT',
    description: 'Working, considering STEM extension',
    expectedDeadlines: ['OPT_END_DATE', 'STEM_APPLICATION_DEADLINE'],
    expectedActions: ['Report employment to DSO', 'Consider STEM OPT'],
  },
  
  STEM_OPT: {
    name: 'On STEM OPT Extension',
    description: 'Working with 24-month extension',
    expectedDeadlines: ['STEM_REPORTING_DATE', 'STEM_OPT_END_DATE'],
    expectedActions: ['Submit 6-month report', 'Consider H1B'],
  },
  
  H1B_PENDING: {
    name: 'H1B Petition Filed',
    description: 'Lottery selected, awaiting approval',
    expectedDeadlines: ['H1B_START_DATE', 'CAP_GAP_EXTENSION'],
    expectedActions: ['Monitor case status', 'Prepare for transition'],
  },
  
  H1B_ACTIVE: {
    name: 'Working on H1B',
    description: 'H1B visa holder',
    expectedDeadlines: ['H1B_END_DATE', 'H1B_EXTENSION_WINDOW'],
    expectedActions: ['Maintain status', 'Report address changes'],
  },
} as const;

/**
 * Export test helpers
 */
export default {
  allSampleProfiles,
  sampleF1Student,
  sampleOPTPending,
  sampleOPTApproved,
  sampleOPTWithJob,
  sampleSTEMOPT,
  sampleH1BPending,
  sampleH1BActive,
  getSampleProfileByStatus,
  logSampleProfiles,
  TEST_SCENARIOS,
};

