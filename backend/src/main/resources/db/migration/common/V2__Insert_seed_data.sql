-- Immigration Tracker - Universal Seed Data (Works for SQLite and PostgreSQL)
-- This migration inserts initial reference data

-- ===============================
-- Roles Seed Data
-- ===============================

INSERT INTO roles (id, name, description) VALUES
(1, 'ADMIN', 'System administrator with full access'),
(2, 'USER', 'Regular user with standard access'),
(3, 'ADVISOR', 'Immigration advisor with extended access to user data');

-- ===============================
-- Immigration Status Types Seed Data (with days instead of months)
-- ===============================

INSERT INTO immigration_status_types (id, name, description, typical_duration_days, is_active) VALUES
(1, 'F-1', 'Student visa for academic studies', NULL, TRUE),                   -- Duration varies by program
(2, 'F-1 OPT', 'Optional Practical Training for F-1 students', 365, TRUE),     -- 12 months
(3, 'F-1 STEM OPT', 'STEM extension for Optional Practical Training', 730, TRUE), -- 24 months  
(4, 'H-1B', 'Specialty occupation work visa', 1095, TRUE),                     -- 3 years
(5, 'H-4', 'Dependent visa for H-1B spouse/children', 1095, TRUE),             -- 3 years
(6, 'L-1', 'Intracompany transfer visa', 1825, TRUE),                          -- 5 years
(7, 'O-1', 'Extraordinary ability visa', 1095, TRUE),                          -- 3 years
(8, 'TN', 'NAFTA professional visa', 1095, TRUE),                              -- 3 years
(9, 'Green Card', 'Permanent resident status', NULL, TRUE),                    -- Permanent
(10, 'Citizenship', 'U.S. Citizenship', NULL, TRUE);                           -- Permanent

-- ===============================
-- Document Categories Seed Data
-- ===============================

INSERT INTO document_categories (id, name, description, is_required, sort_order) VALUES
(1, 'Passport', 'Valid passport from country of origin', TRUE, 1),
(2, 'Visa', 'Current U.S. visa documents', TRUE, 2),
(3, 'I-20/DS-2019', 'Certificate of eligibility for student status', FALSE, 3),
(4, 'I-94', 'Arrival/departure record', TRUE, 4),
(5, 'EAD Card', 'Employment Authorization Document', FALSE, 5),
(6, 'I-797', 'Notice of Action from USCIS', FALSE, 6),
(7, 'Diploma/Transcript', 'Educational credentials', FALSE, 7),
(8, 'Employment Letter', 'Letter from employer', FALSE, 8),
(9, 'Tax Documents', 'W-2, 1099, tax returns', FALSE, 9),
(10, 'Medical Records', 'Vaccination records, medical exams', FALSE, 10),
(11, 'Other', 'Other immigration-related documents', FALSE, 99);

-- ===============================
-- Deadline Types Seed Data
-- ===============================

INSERT INTO deadline_types (id, name, description, default_reminder_days, is_critical) VALUES
(1, 'Visa Expiration', 'Visa expires and needs renewal', 30, TRUE),
(2, 'I-94 Expiration', 'Authorized stay expires', 30, TRUE),
(3, 'OPT Application', 'Apply for Optional Practical Training', 90, TRUE),
(4, 'OPT EAD Expiration', 'OPT work authorization expires', 60, TRUE),
(5, 'H-1B Registration', 'H-1B lottery registration period', 14, TRUE),
(6, 'H-1B Filing', 'H-1B petition filing deadline', 7, TRUE),
(7, 'Status Change', 'Change of status application', 30, FALSE),
(8, 'Address Update', 'Update address with USCIS/SEVP', 10, FALSE),
(9, 'Travel Document', 'Apply for travel document', 60, FALSE),
(10, 'Medical Exam', 'Required medical examination', 30, FALSE),
(11, 'Document Renewal', 'Renew expiring documents', 30, FALSE),
(12, 'Interview', 'USCIS interview appointment', 3, TRUE);

-- ===============================
-- Companies Seed Data (Sample H-1B Sponsors)
-- ===============================

INSERT INTO companies (id, name, city, state, country, is_h1b_sponsor) VALUES
(1, 'Google LLC', 'Mountain View', 'CA', 'United States', TRUE),
(2, 'Microsoft Corporation', 'Redmond', 'WA', 'United States', TRUE),
(3, 'Amazon.com Inc.', 'Seattle', 'WA', 'United States', TRUE),
(4, 'Apple Inc.', 'Cupertino', 'CA', 'United States', TRUE),
(5, 'Meta Platforms Inc.', 'Menlo Park', 'CA', 'United States', TRUE),
(6, 'Tesla Inc.', 'Austin', 'TX', 'United States', TRUE),
(7, 'Netflix Inc.', 'Los Gatos', 'CA', 'United States', TRUE),
(8, 'Uber Technologies Inc.', 'San Francisco', 'CA', 'United States', TRUE),
(9, 'Airbnb Inc.', 'San Francisco', 'CA', 'United States', TRUE),
(10, 'Salesforce Inc.', 'San Francisco', 'CA', 'United States', TRUE);