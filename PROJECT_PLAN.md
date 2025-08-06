# Immigration Tracker - Project Plan

## 📋 Project Overview

A comprehensive web and mobile application to help international students navigate immigration processes, track critical deadlines, and maintain compliance for OPT, H1B, and other visa categories.

**Tech Stack**: Spring Boot (Java) + React Web + React Native Mobile  
**Database**: SQLite (dev) / PostgreSQL (prod)  
**Build**: Gradle

> 🔍 **For implementation details**: Explore the codebase - `backend/`, `frontend/`, database migrations, and configuration files contain all technical specifications.

---

## 🎯 Project Roadmap

### ✅ Foundation (Complete)

- **Backend Setup**: Spring Boot + Gradle + dual database (SQLite/PostgreSQL)
- **Database Schema**: Complete entity model with migrations
- **Development Environment**: Auto-setup with profiles

### 🔄 Phase 1: Infrastructure Setup (Current)

- **Frontend Setup**: React web + React Native mobile apps
- **Testing Framework**: Unit and integration test foundation
- **Development Tools**: Scripts and automation

### 📅 Phase 2: Core Features

- **Backend APIs**: Authentication, CRUD operations, file uploads
- **Frontend UI**: Login, dashboard, and core user flows
- **API Integration**: Connect frontend to backend services

### 🚀 Phase 3: User Experience

- **Dashboard**: Status tracking, deadline alerts, document management
- **Mobile Features**: Cross-platform React Native functionality
- **Notifications**: Email alerts and deadline reminders

### 🔧 Phase 4: Advanced Features

- **File Management**: Secure document storage and processing
- **Analytics**: Immigration status insights and reporting
- **Compliance**: Automated deadline tracking and validation

### 🚀 Phase 5: Production Ready

- **DevOps**: CI/CD pipeline, containerization, monitoring
- **Security**: Enhanced authentication, data encryption
- **Performance**: Optimization, caching, scalability

---

## 🤝 Contributor Guidelines

**This PROJECT_PLAN.md is the starting point for all contributors and AI agents working on this project.**

> 🤖 **For AI Agents**: This plan provides the project direction and available tasks. Explore the codebase to understand current implementation details, then pick a task and start contributing. The existing code structure will guide your implementation approach.

### How Contributors Should Use This Plan

#### **🎯 Before Starting Work:**

- **Read this plan thoroughly** to understand current status and priorities
- **Pick an available task** marked with `[ ]` (not already assigned)
- **Assign yourself** by changing `[ ]` to `[🔄 @your-username]`
- **Break down complex tasks** if needed

#### **💻 While Working:**

- **Update progress** in the task description with notes or blockers
- **Document decisions** that affect other contributors
- **Add sub-tasks** if you discover the work is more complex
- **Communicate blockers** using `🚧` prefix in the task

#### **✅ When Completing Work:**

- **Mark task complete** with `[✅ @your-username]`
- **Update related documentation** (README, KNOWLEDGE.md, etc.)
- **Create pull request** with reference to the task
- **Add follow-up tasks** if new work is discovered

### Task Management Rules

- **Keep tasks small** - break down if too complex
- **Update the plan** - add new tasks as you discover them
- **Parallel work** - multiple workstreams can run simultaneously
- **Dependencies** - mark tasks that depend on others with `🔗 Depends on: Task X`

### Workstream Categories

- **🏗️ Backend**: API, database, business logic
- **🎨 Frontend**: Web and mobile UI/UX
- **🗄️ Database**: Schema, migrations, data management
- **🔧 DevOps**: Build, deploy, monitoring
- **📝 Documentation**: Guides, APIs, architecture
- **🧪 Testing**: Unit, integration, e2e tests

---

## 📝 Current Sprint - Foundation & Core Features

### Sprint 1: Backend Project Setup (CURRENT FOCUS)

#### Phase 1.1: Gradle Project Structure Setup

- [✅] **Initialize Gradle project structure**
  - [✅] Create backend directory structure
  - [✅] Set up build.gradle with dependencies
  - [✅] Configure gradle.properties  
  - [✅] Set up settings.gradle
  - [✅] Create application main class
  - [✅] Create basic package structure

#### Phase 1.2: Database Configuration Setup  

- [✅] **Configure dual database support (SQLite/PostgreSQL)**
  - [✅] Create application.yml files for different profiles
  - [✅] Set up database configuration classes
  - [✅] Configure Hibernate dialects
  - [✅] Set up Flyway migration configuration
  - [✅] Test database auto-selection logic

#### Phase 1.3: Development Environment ✅

- [✅] **Set up development foundation**
  - [✅] Project structure and build system
  - [✅] Database configuration and migrations
  - [✅] Application profiles and configuration

---

## 🎯 Available Tasks - Pick and Assign Yourself

### 🏗️ Backend Workstream

**🎯 Task BE-001: JPA Entity Models** `[ ]`

- Create JPA entities based on database schema (check migration files)
- Add validation annotations and entity relationships

**🎯 Task BE-002: Repository Layer** `[ ]`

- 🔗 Depends on: BE-001
- Implement Spring Data JPA repositories with custom queries

**🎯 Task BE-003: Service Layer Foundation** `[ ]`

- 🔗 Depends on: BE-002
- Create business logic services (User, Document, Deadline)

**🎯 Task BE-004: Authentication System** `[ ]`

- Implement JWT-based authentication with Spring Security

**🎯 Task BE-005: File Upload API** `[ ]`

- 🔗 Depends on: BE-003
- Create secure file upload/download REST endpoints

### 🎨 Frontend Workstream

**🎯 Task FE-001: React Web App Setup** `[ ]`

- Initialize React project with TypeScript and modern tooling

**🎯 Task FE-002: React Native App Setup** `[ ]`

- Initialize React Native project for iOS/Android

**🎯 Task FE-003: Shared API Client** `[ ]`

- Create shared TypeScript types and API client utilities

**🎯 Task FE-004: Authentication UI (Web)** `[ ]`

- 🔗 Depends on: FE-001, FE-003
- Create login/register forms and authentication flow

**🎯 Task FE-005: Authentication UI (Mobile)** `[ ]`

- 🔗 Depends on: FE-002, FE-003  
- Create login/register screens and authentication flow

### 🔧 DevOps Workstream

**🎯 Task DO-001: Development Scripts** `[ ]`

- Create database and development utility scripts

**🎯 Task DO-002: GitHub Actions CI/CD** `[ ]`

- Set up automated testing and deployment pipeline

**🎯 Task DO-003: Docker Development Setup** `[ ]`

- Create Docker configuration for development and production

### 🧪 Testing Workstream

**🎯 Task TE-001: Backend Unit Tests** `[ ]`

- 🔗 Depends on: BE-002
- Set up comprehensive unit testing for repositories and services

**🎯 Task TE-002: API Integration Tests** `[ ]`

- 🔗 Depends on: BE-004
- Create integration tests for REST endpoints

### 📝 Documentation Workstream

**🎯 Task DOC-001: API Documentation** `[ ]`

- 🔗 Depends on: BE-004
- Set up Swagger/OpenAPI documentation for REST endpoints

**🎯 Task DOC-002: Development Guide** `[ ]`

- Create comprehensive setup and contribution guide

---

## 🚀 Quick Start

1. **Explore the codebase** - Check `README.md` for setup instructions
2. **Pick a task** from the available tasks above
3. **Assign yourself** by updating the task status to `[🔄 @your-username]`
4. **Start contributing** - the existing code structure will guide your approach

> **Foundation Complete**: Backend infrastructure with Gradle, dual database support (SQLite/PostgreSQL), and database schema is ready. Pick any task and start building!
