# Immigration Tracker 📋

A comprehensive web and mobile application to help international students navigate immigration processes, track critical deadlines, and maintain compliance for OPT, H1B, and other visa categories.

## 🎯 Overview

- 📅 Track critical immigration deadlines with smart reminders
- 📄 Manage sensitive immigration documents securely  
- 🔄 Navigate complex visa processes (F-1 → OPT → H1B)
- 🏢 Coordinate job search with work authorization requirements
- ✅ Maintain compliance with immigration regulations

## 🛠️ Technology Stack

### Backend

- **Framework**: Spring Boot 3.x with Java 17+
- **Database**: SQLite (dev) / PostgreSQL (prod) with JPA/Hibernate
- **Security**: Spring Security with JWT authentication
- **Build**: Gradle with profile-based configuration

### Frontend  

- **Mobile**: React Native with Expo SDK
- **Web**: React with modern tooling
- **Shared**: TypeScript monorepo structure

### Infrastructure

- **Development**: Local SQLite + Spring Boot DevTools
- **Production**: AWS (EC2, RDS, S3)
- **CI/CD**: GitHub Actions

## 🚀 Quick Start

### Prerequisites

- Java 17+
- Node.js 18+
- Gradle (included via wrapper)

### Backend Setup

1. **Clone and start backend**

   ```bash
   git clone https://github.com/aaronlam88/ImmigrationTracker.git
   cd ImmigrationTracker/backend
   ./gradlew bootRun
   ```

2. **The application will:**
   - Start on `http://localhost:8080/api`
   - Auto-create SQLite database with sample data
   - Use development profile by default

3. **Check health**

   ```bash
   curl http://localhost:8080/api/actuator/health
   ```

### Frontend Setup (Coming Soon)

```bash
cd frontend/web
npm install && npm run dev

cd ../mobile  
npm install && npx expo start
```

## 🔧 Development Features

### Dual Database Support

- **Development**: SQLite (zero setup, fast)
- **Production**: PostgreSQL (scalable, robust)
- **Automatic switching** based on Spring profiles

### Pre-loaded Sample Data

- User roles (Admin, User, Advisor)
- Immigration status types (F-1, OPT, H1B, etc.)
- Document categories (Passport, Visa, I-20, etc.)
- Deadline types (Visa expiration, OPT application, etc.)
- Sample H1B sponsor companies

### Built-in Security

- JWT-based authentication ready
- Role-based access control
- Password encryption
- Secure file upload support

## 📁 Project Structure

```text
ImmigrationTracker/
├── backend/                    # Spring Boot API
│   ├── src/main/java/com/immigrationtracker/
│   │   ├── config/             # Database & security config
│   │   ├── controllers/        # REST API endpoints
│   │   ├── services/           # Business logic
│   │   ├── repositories/       # Data access layer
│   │   └── dto/                # Data transfer objects
│   └── src/main/resources/
│       ├── application*.yml    # Profile configurations
│       └── db/migration/       # Database migrations
├── frontend/                   # React apps (planned)
│   ├── web/                    # React web app
│   ├── mobile/                 # React Native app
│   └── shared/                 # Shared code
├── docs/                       # Documentation
└── PROJECT_PLAN.md             # Detailed implementation plan
```

## 🧪 Testing

```bash
# Run tests
./gradlew test

# Build project
./gradlew build

# Clean build
./gradlew clean build
```

## 🔄 Database Profiles

### Development (Default)

```yaml
spring:
  profiles:
    active: dev
  datasource:
    url: jdbc:sqlite:./dev-database.db
```

### Production

```yaml  
spring:
  profiles:
    active: prod
  datasource:
    url: jdbc:postgresql://localhost:5432/immigration_tracker
```

## 📚 API Endpoints (Preview)

Once authentication is implemented:

- `POST /api/auth/login` - User authentication
- `GET /api/users/profile` - User profile
- `GET /api/deadlines` - Immigration deadlines
- `POST /api/documents` - Document upload
- `GET /api/immigration-status` - Status tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📖 Documentation

- [Project Requirements](PROJECT_REQUIREMENTS.md) - Detailed specifications
- [Project Plan](PROJECT_PLAN.md) - Implementation roadmap
- [Contributing Guide](CONTRIBUTING.md) - Development guidelines

---

**Status**: 🏗️ Backend foundation complete, frontend development in progress

For detailed technical specifications and development progress, see [PROJECT_PLAN.md](PROJECT_PLAN.md).
