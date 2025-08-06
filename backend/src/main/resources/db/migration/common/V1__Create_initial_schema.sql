-- Immigration Tracker - Universal Schema (Works for SQLite and PostgreSQL)
-- This migration creates the core tables using database-agnostic SQL

-- ===============================
-- Users and Authentication Tables
-- ===============================

-- Users table - Only require essential fields for registration
CREATE TABLE users (
    id BIGINT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),                    -- Optional during registration
    last_name VARCHAR(100),                     -- Optional during registration
    phone_number VARCHAR(20),
    date_of_birth DATE,
    country_of_birth VARCHAR(100),
    passport_number VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    is_email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token VARCHAR(255),
    password_reset_token VARCHAR(255),
    password_reset_expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Roles table
CREATE TABLE roles (
    id BIGINT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User roles junction table
CREATE TABLE user_roles (
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- ===============================
-- Immigration Status Tables
-- ===============================

-- Immigration status types - Use days for better granularity
CREATE TABLE immigration_status_types (
    id BIGINT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(500),
    typical_duration_days INTEGER,              -- Changed from months to days
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Immigration statuses
CREATE TABLE immigration_statuses (
    id BIGINT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    status_type_id BIGINT NOT NULL,
    start_date DATE,                            -- Made optional - user might not know exact date initially
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (status_type_id) REFERENCES immigration_status_types(id)
);

-- ===============================
-- Document Management Tables
-- ===============================

-- Document categories
CREATE TABLE document_categories (
    id BIGINT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(500),
    is_required BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Documents
CREATE TABLE documents (
    id BIGINT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expiry_date DATE,
    is_verified BOOLEAN DEFAULT FALSE,
    verification_date TIMESTAMP,
    verified_by BIGINT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES document_categories(id),
    FOREIGN KEY (verified_by) REFERENCES users(id)
);

-- ===============================
-- Deadline Management Tables
-- ===============================

-- Deadline types
CREATE TABLE deadline_types (
    id BIGINT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(500),
    default_reminder_days INTEGER DEFAULT 7,
    is_critical BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Deadlines - More flexible for user input
CREATE TABLE deadlines (
    id BIGINT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    deadline_type_id BIGINT,                   -- Made optional - user can create custom deadlines
    title VARCHAR(255) NOT NULL,
    description TEXT,
    deadline_date DATE,                        -- Made optional - user might set "approximate" deadlines
    is_completed BOOLEAN DEFAULT FALSE,
    completed_date TIMESTAMP,
    reminder_sent BOOLEAN DEFAULT FALSE,
    last_reminder_sent TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (deadline_type_id) REFERENCES deadline_types(id)
);

-- ===============================
-- Notification Tables
-- ===============================

-- Notifications
CREATE TABLE notifications (
    id BIGINT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    data TEXT, -- JSON as TEXT for SQLite compatibility
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ===============================
-- Employment Tracking Tables
-- ===============================

-- Companies
CREATE TABLE companies (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(50),
    country VARCHAR(100) DEFAULT 'United States',
    zip_code VARCHAR(20),
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    is_h1b_sponsor BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employment records - More flexible for job tracking
CREATE TABLE employments (
    id BIGINT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    company_id BIGINT,                         -- Made optional - user can enter company name without creating company record
    company_name VARCHAR(255),                 -- Alternative to company_id for quick entry
    position_title VARCHAR(255) NOT NULL,
    start_date DATE,                           -- Made optional - might be planned employment
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    employment_type VARCHAR(50),               -- Full-time, Part-time, Internship, CPT, OPT
    work_authorization VARCHAR(100),           -- F-1 OPT, H1B, etc.
    salary DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(id)
);

-- ===============================
-- Indexes for Performance
-- ===============================

-- User table indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(is_active);

-- Immigration status indexes
CREATE INDEX idx_immigration_statuses_user_id ON immigration_statuses(user_id);
CREATE INDEX idx_immigration_statuses_current ON immigration_statuses(is_current);

-- Document indexes
CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_documents_category ON documents(category_id);
CREATE INDEX idx_documents_expiry ON documents(expiry_date);

-- Deadline indexes
CREATE INDEX idx_deadlines_user_id ON deadlines(user_id);
CREATE INDEX idx_deadlines_date ON deadlines(deadline_date);
CREATE INDEX idx_deadlines_completed ON deadlines(is_completed);

-- Notification indexes
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_created ON notifications(created_at);

-- Employment indexes
CREATE INDEX idx_employments_user_id ON employments(user_id);
CREATE INDEX idx_employments_current ON employments(is_current);