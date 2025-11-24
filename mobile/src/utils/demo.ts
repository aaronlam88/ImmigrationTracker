/**
 * Demo/Integration Test Script
 * Run this to verify all components work together
 * 
 * Usage: Import and call runDemo() from App.tsx for manual testing
 */

import { UserProfileStorage } from '../storage/UserProfileStorage';
import { TimelineService } from '../services/TimelineService';
import { StatusService } from '../services/StatusService';
import { allSampleProfiles, logSampleProfiles } from './testData';

/**
 * Run full integration demo
 */
export async function runDemo(): Promise<void> {
  console.log('\n========================================');
  console.log('🚀 Immigration Tracker - Integration Demo');
  console.log('========================================\n');

  try {
    // Step 1: Show available sample profiles
    console.log('📋 Step 1: Sample Profiles\n');
    logSampleProfiles();

    // Step 2: Test storage layer
    console.log('\n💾 Step 2: Testing Storage Layer\n');
    await testStorage();

    // Step 3: Test timeline service
    console.log('\n📅 Step 3: Testing Timeline Service\n');
    await testTimelineService();

    // Step 4: Test status service
    console.log('\n🔄 Step 4: Testing Status Service\n');
    await testStatusService();

    console.log('\n========================================');
    console.log('✅ All Tests Completed Successfully!');
    console.log('========================================\n');
  } catch (error) {
    console.error('\n❌ Demo Error:', error);
  }
}

/**
 * Test storage layer
 */
async function testStorage(): Promise<void> {
  const storage = UserProfileStorage;

  // Test 1: Save a profile
  const testProfile = allSampleProfiles[0]; // F-1 Student
  console.log(`Saving profile: ${testProfile.name}...`);
  await storage.save(testProfile);
  console.log('✅ Profile saved\n');

  // Test 2: Retrieve the profile
  console.log('Retrieving profile...');
  const retrieved = await storage.get();
  console.log(`✅ Profile retrieved: ${retrieved?.name}\n`);

  // Test 3: Update specific field
  console.log('Updating email...');
  await storage.updateField('email', 'updated.email@example.com');
  console.log('✅ Email updated\n');

  // Test 4: Check if profile exists
  const exists = await storage.has();
  console.log(`✅ Profile exists: ${exists}\n`);
}

/**
 * Test timeline service
 */
async function testTimelineService(): Promise<void> {
  // Test with different profiles
  const profiles = [
    allSampleProfiles[0], // F-1 Student
    allSampleProfiles[3], // OPT with job
    allSampleProfiles[4], // STEM OPT
  ];

  for (const profile of profiles) {
    console.log(`\n--- Timeline for ${profile.name} (${profile.currentStatus}) ---\n`);

    // Generate full timeline
    const timeline = TimelineService.generateUserTimeline(profile);
    console.log(`Total events: ${timeline.events.length}`);

    // Get deadlines
    const deadlines = TimelineService.generateDeadlines(profile).slice(0, 3);
    console.log(`\nUpcoming Deadlines (${deadlines.length}):`);
    deadlines.forEach((deadline, idx) => {
      const dueDate = typeof deadline.dueDate === 'string' 
        ? new Date(deadline.dueDate) 
        : deadline.dueDate;
      console.log(`  ${idx + 1}. ${deadline.title}`);
      console.log(`     Date: ${dueDate?.toLocaleDateString() || 'TBD'}`);
      console.log(`     Priority: ${deadline.priority}`);
    });

    // Get required actions
    const actions = TimelineService.generateActionItems(profile);
    console.log(`\nRequired Actions (${actions.length}):`);
    actions.slice(0, 3).forEach((action, idx) => {
      console.log(`  ${idx + 1}. ${action.title}`);
      console.log(`     Category: ${action.category}`);
      console.log(`     Required: ${action.isRequired ? 'Yes' : 'No'}`);
    });

    console.log('');
  }
}

/**
 * Test status service
 */
async function testStatusService(): Promise<void> {
  // Test 1: Valid transitions
  console.log('Testing status transitions:\n');
  
  const testTransitions = [
    { from: 'F1_STUDENT', to: 'GRADUATED' },
    { from: 'GRADUATED', to: 'OPT_PENDING' },
    { from: 'OPT_ACTIVE', to: 'STEM_OPT_PENDING' },
    { from: 'OPT_ACTIVE', to: 'H1B_REGISTERED' },
  ];

  testTransitions.forEach(({ from, to }) => {
    const isValid = StatusService.isValidTransition(from as any, to as any);
    console.log(`  ${from} → ${to}: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
  });

  // Test 2: Next eligible status
  console.log('\n\nTesting next eligible status:\n');
  
  const profiles = [
    allSampleProfiles[0], // F-1 Student
    allSampleProfiles[3], // OPT with job
  ];

  profiles.forEach(profile => {
    const nextStatus = StatusService.getRecommendedNextStatus(profile.currentStatus);
    console.log(`  ${profile.name} (${profile.currentStatus}):`);
    console.log(`    Next eligible: ${nextStatus || 'None'}\n`);
  });

  // Test 3: Current phase
  console.log('Testing current phase:\n');
  
  allSampleProfiles.forEach(profile => {
    const phase = StatusService.getCurrentPhase(profile.currentStatus);
    console.log(`  ${profile.name}: ${phase}`);
  });
}

/**
 * Quick test for a specific profile
 */
export async function testProfile(profileIndex: number): Promise<void> {
  const profile = allSampleProfiles[profileIndex];
  
  if (!profile) {
    console.error(`❌ Invalid profile index: ${profileIndex}`);
    return;
  }

  console.log(`\n=== Testing Profile: ${profile.name} ===\n`);
  console.log(`Status: ${profile.currentStatus}`);
  console.log(`Email: ${profile.email}`);
  
  if (profile.graduationDate) {
    const gradDate = typeof profile.graduationDate === 'string' 
      ? new Date(profile.graduationDate) 
      : profile.graduationDate;
    console.log(`Graduation: ${gradDate.toLocaleDateString()}`);
  }
  
  // Timeline
  const timeline = TimelineService.generateUserTimeline(profile);
  console.log(`\nTimeline Events: ${timeline.events.length}`);
  
  // Deadlines
  const deadlines = TimelineService.generateDeadlines(profile).slice(0, 5);
  console.log(`\nUpcoming Deadlines: ${deadlines.length}`);
  deadlines.forEach((d, idx) => {
    const dueDate = typeof d.dueDate === 'string' 
      ? new Date(d.dueDate) 
      : d.dueDate;
    console.log(`  ${idx + 1}. ${d.title} - ${dueDate?.toLocaleDateString() || 'TBD'}`);
  });
  
  // Actions
  const actions = TimelineService.generateActionItems(profile);
  console.log(`\nRequired Actions: ${actions.length}`);
  actions.slice(0, 5).forEach((a, idx) => {
    console.log(`  ${idx + 1}. ${a.title} (${a.category})`);
  });
  
  // Next status
  const nextStatus = StatusService.getRecommendedNextStatus(profile.currentStatus);
  console.log(`\nNext Eligible Status: ${nextStatus || 'None'}`);
  
  // Phase
  const phase = StatusService.getCurrentPhase(profile.currentStatus);
  console.log(`Current Phase: ${phase}`);
}

/**
 * Clear all stored data (for testing)
 */
export async function clearAllData(): Promise<void> {
  console.log('🗑️  Clearing all stored data...');
  await UserProfileStorage.delete();
  console.log('✅ All data cleared');
}

/**
 * Export all demo functions
 */
export default {
  runDemo,
  testProfile,
  clearAllData,
};

