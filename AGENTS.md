# AGENTS.md - AI Agent Project Guide 🤖

---

## ⚡ Agent Workflow Summary

**Quick Start for AI Agents:**

1. **📋 Read PROJECT_PLAN.md** → Find available tasks `[ ]`
2. **🎯 Pick Task** → Change to `[🔄 @agent-name]`
3. **🔍 Check Dependencies** → Ensure prerequisites are complete
4. **💻 Code** → Follow mobile-first, offline-first standards
5. **✅ Complete** → Mark `[✅ @agent-name]` and update docs

**Current Priority**: Phase 1 Mobile App (iOS first, offline-capable)

---

## 🤖 Agent-Specific Rules

### **Task Assignment Protocol**

- **ONE task at a time**: Don't assign multiple tasks to yourself
- **Update immediately**: Change task status when you start working
- **Communicate blockers**: Use `🚧 BLOCKED:` prefix if stuck
- **Break down large tasks**: Split complex work into smaller tasks
- **Respect dependencies**: Don't start tasks marked with `🔗 Depends on:`

### **Code Quality Enforcement**

- **Test offline functionality**: Every feature must work without internet
- **No hardcoded values**: Use configuration files or constants
- **TypeScript strict mode**: All mobile code must have proper typing
- **Error handling**: Graceful degradation for all failure scenarios
- **Performance first**: Optimize for mobile devices and battery life
- **Linter compliance**: After creating or modifying any code file, ALWAYS check for linter errors and fix them immediately

### **Documentation Requirements**

- **Update PROJECT_PLAN.md**: Mark tasks complete when finished
- **Add code comments**: Explain complex business logic
- **Update README.md**: If you change setup or build process
- **Create migration notes**: If you change database schema
- **Markdown formatting**: All `.md` files must be properly formatted without linter errors

#### **📋 Documentation Update Protocol (MANDATORY)**

**AFTER EVERY SUCCESSFUL STEP:**

1. **Update PROJECT_PLAN.md** - Change task status from `[ ]` to `[✅ @agent-name]`
2. **Update README.md** - If setup, dependencies, or workflow changes
3. **Update progress tracking** - Mark completed items in status sections
4. **Commit documentation changes** - Keep docs in sync with code

**WHAT TO UPDATE:**

- ✅ **Task completion** in PROJECT_PLAN.md
- ✅ **Progress checklists** in README.md  
- ✅ **Technology stack** if new dependencies added
- ✅ **Setup instructions** if process changes
- ✅ **Current status** sections

**WHEN TO UPDATE:**

- ✅ **After completing any task** from PROJECT_PLAN.md
- ✅ **After installing new dependencies**
- ✅ **After major feature implementation**
- ✅ **After setup/configuration changes**
- ✅ **Before switching to new tasks**

### **Security Mandates**

- **No sensitive data in logs**: Never log passwords, tokens, or personal info
- **Validate all inputs**: Sanitize user data before storage
- **Secure local storage**: Use proper encryption for sensitive documents
- **Follow OWASP guidelines**: Especially for mobile security practices

---

## 🎯 AI Agent Guidelines

### 🔍 Before Starting Any Task

1. **READ FIRST**: Check these files in order:
   - `PROJECT_PLAN.md` - Current roadmap and available tasks
   - `PROJECT_REQUIREMENTS.md` - Detailed specifications  
   - `README.md` - Quick start guide

2. **PICK TASKS**: Choose from PROJECT_PLAN.md available tasks `[ ]`
3. **ASSIGN YOURSELF**: Change to `[🔄 @agent-name]`
4. **UPDATE STATUS**: Mark `[✅ @agent-name]` when complete

### 🛠️ Development Standards

#### **Mobile Development (Phase 1 - Current)**

- **React Native**: Modern patterns, hooks, TypeScript strict mode
- **Offline-First**: All features work without internet connection
- **Local Storage**: SQLite with react-native-sqlite-storage
- **Performance**: Optimize for mobile devices and battery life
- **Security**: Secure local data, no sensitive data in logs

#### **Backend Development (Phase 3 - Future)**

- **Java 17+**: Modern features (records, pattern matching)
- **Spring Boot 3.x**: Best practices, clean architecture
- **Database**: SQLite (dev) / PostgreSQL (prod) compatibility
- **API**: RESTful → GraphQL migration planned
- **Security**: JWT authentication with offline capability

### 📝 Coding Conventions

#### **Naming Standards**

```java
// Java: PascalCase classes, camelCase methods
public class UserService {
    public User findUserById(Long id) { }
}

// Database: snake_case tables/columns
CREATE TABLE immigration_statuses (user_id, created_at);

// API: kebab-case URLs, camelCase JSON
GET /api/users/{id}/immigration-status
```

#### **File Organization**

```text
mobile/src/
├── components/     # Reusable UI components
├── screens/        # App screens and navigation  
├── services/       # Business logic and data
├── models/         # TypeScript interfaces
├── database/       # Local SQLite layer
└── utils/          # Helper functions
```

### 🔄 Development Workflow

1. **Select Task** from PROJECT_PLAN.md
2. **Update Status** to `[🔄 @your-name]`
3. **Follow Standards** above
4. **Write Code** - following TypeScript strict mode and best practices
5. **🔍 CHECK LINTER** (MANDATORY):
   - Run linter on all modified files
   - Fix all linter errors before proceeding
   - Ensure TypeScript type safety
6. **Test Thoroughly** - especially offline functionality
7. **Mark Complete** with `[✅ @your-name]`
8. **📋 UPDATE DOCUMENTATION** (MANDATORY):
   - Update PROJECT_PLAN.md task status
   - Update README.md progress checklist
   - Update any affected setup instructions
   - Commit documentation changes

### 🚨 Critical Agent Rules

#### ❌ **NEVER**

- Work on multiple tasks simultaneously
- Skip testing offline functionality  
- Commit code that breaks existing features
- Hardcode sensitive data or configuration
- Leave tasks in `[🔄 @agent-name]` state when switching work
- **Leave documentation outdated after completing tasks**
- **Skip updating PROJECT_PLAN.md task status**
- **Ignore linter errors or warnings**
- **Commit code without checking for linter issues**

#### ✅ **ALWAYS**

- Test on actual mobile devices when possible
- **Check linter after creating or modifying any code file**
- **Fix all linter errors immediately before moving forward**
- **Update documentation after every successful step**
- Update task status immediately when starting/completing
- Ask for clarification before making architectural changes
- Follow the mobile-first, offline-first approach
- Write code that works without internet connection
- **Keep PROJECT_PLAN.md and README.md current**

#### 🔄 **Agent Handoff Protocol**

- **Switching tasks**: Mark current task status clearly before moving
- **Incomplete work**: Document what's done and what's remaining
- **Blockers**: Clearly state what's preventing completion
- **Knowledge transfer**: Update relevant documentation for next agent
- **📋 Documentation handoff**: Ensure all docs are current before switching

#### 📋 **Documentation Maintenance Rules**

**CRITICAL**: Documentation must stay synchronized with code changes.

**Required Updates After Each Step:**

```markdown
# PROJECT_PLAN.md updates:
- [ ] Task → [🔄 @agent] → [✅ @agent]
- [ ] Add completion notes if needed
- [ ] Update dependencies or blockers

# README.md updates:
- [ ] Progress checklist items
- [ ] Technology stack changes  
- [ ] Setup instruction changes
- [ ] Current status updates
```

**Documentation Sync Checklist:**

- ✅ Task status matches actual completion
- ✅ Progress bars reflect real progress  
- ✅ Setup instructions work for new developers
- ✅ Dependencies list is current
- ✅ No outdated information remains

### 🔧 Development Environment

#### **Mobile Setup (Current Priority)**

```bash
# Install React Native CLI
npm install -g react-native-cli @react-native-community/cli

# iOS Development (Phase 1)
# Install Xcode from App Store
# Install CocoaPods: sudo gem install cocoapods

# Android Development (Phase 2)  
# Install Android Studio and SDK
```

#### **Backend Setup (Phase 3)**

```bash
# Java 17+, Gradle wrapper included
cd backend && ./gradlew bootRun
```

### 📚 Key Resources

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Spring Boot Reference](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
- [SQLite vs PostgreSQL](KNOWLEDGE.md)
- [Immigration Process Details](PROJECT_REQUIREMENTS.md)

### 🎯 Current Focus

#### Phase 1: Mobile-First Offline App

- Priority: iOS app with local SQLite storage
- Goal: Fast time-to-market, low cost validation
- Next: Android app, then backend integration

---

## 🚀 Agent Onboarding Checklist

**For new AI agents joining the project:**

## Agent Onboarding Phases

### **Phase 1: Understanding (5 minutes)**

- [ ] Read this AGENTS.md file completely
- [ ] Scan PROJECT_PLAN.md for current phase and available tasks
- [ ] Review PROJECT_REQUIREMENTS.md for user needs and features
- [ ] Check README.md for setup instructions

### **Phase 2: Environment Setup (10 minutes)**

- [ ] Verify React Native CLI and development tools installed
- [ ] Understand mobile-first, offline-first architecture
- [ ] Review existing code structure in `mobile/src/`
- [ ] Check current task dependencies and blockers

### **Phase 3: Task Selection (2 minutes)**

- [ ] Pick ONE available task marked `[ ]` from PROJECT_PLAN.md
- [ ] Verify no dependencies are blocking the task
- [ ] Update task status to `[🔄 @your-agent-name]`
- [ ] Start development following standards above

### **Phase 4: Development Loop**

- [ ] Code with offline-first approach
- [ ] Test thoroughly on mobile devices
- [ ] Update task progress regularly
- [ ] Mark complete `[✅ @your-agent-name]` when done

---

## 🎯 Agent Success Metrics

**How to measure your contribution:**

- **Task Completion**: Finish assigned tasks completely and mark them done
- **Code Quality**: Write clean, tested, offline-capable mobile code  
- **Documentation**: Update relevant docs when making changes
- **Collaboration**: Clear communication in task updates and handoffs
- **Impact**: Help real international students navigate immigration successfully

---

## 🆘 When You Need Help

**If you encounter issues:**

1. **Technical Blockers**: Document the issue in task description with `🚧 BLOCKED:`
2. **Unclear Requirements**: Check PROJECT_REQUIREMENTS.md for context
3. **Architecture Questions**: Review existing code patterns in the project
4. **Mobile-Specific Issues**: Focus on offline-first, React Native best practices

**Remember**: This is a real project helping international students with critical immigration processes. Your code impacts real people's lives and immigration status.

---

*This guide focuses on AI agent workflow. See PROJECT_PLAN.md for current tasks and PROJECT_REQUIREMENTS.md for detailed specifications.*
