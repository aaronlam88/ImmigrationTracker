# Immigration Tracker 📋

A comprehensive web and mobile application to help international students navigate the complex immigration process, track critical deadlines, and maintain compliance for OPT, H1B, and other visa categories.

## 🎯 Project Overview

This application serves **20,000+ international students** annually, helping them:

- Track critical immigration deadlines with 95% compliance rate
- Manage sensitive immigration documents securely
- Navigate complex visa processes (F-1 → OPT → H1B)
- Coordinate job search with work authorization requirements
- Maintain compliance with immigration regulations

## 🏗️ Project Structure

```
ImmigrationTracker/
├── frontend/                  # Client-side applications
│   ├── mobile/                # React Native mobile app
│   │   ├── src/
│   │   │   ├── components/    # Reusable UI components
│   │   │   ├── screens/       # App screens/pages
│   │   │   ├── services/      # API services & business logic
│   │   │   ├── utils/         # Utility functions
│   │   │   ├── context/       # React Context providers
│   │   │   ├── navigation/    # Navigation configuration
│   │   │   └── assets/        # Images, fonts, etc.
│   │   ├── android/           # Android-specific files
│   │   ├── ios/               # iOS-specific files
│   │   └── __tests__/         # Mobile app tests
│   ├── web/                   # React web application
│   │   ├── src/
│   │   │   ├── components/    # Web UI components
│   │   │   ├── pages/         # Web pages
│   │   │   ├── services/      # API services
│   │   │   ├── utils/         # Web utilities
│   │   │   ├── context/       # Context providers
│   │   │   └── assets/        # Web assets
│   │   ├── public/            # Static assets
│   │   └── __tests__/         # Web app tests
│   └── shared/                # Shared code between mobile/web
│       ├── src/
│       │   ├── types/         # TypeScript type definitions
│       │   ├── validators/    # Input validation schemas
│       │   ├── utils/         # Common utilities
│       │   └── api/           # API client configurations
│       └── __tests__/         # Shared code tests
├── backend/                   # Spring Boot API server
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/immigrationtracker/
│   │   │   │   ├── controllers/    # REST API controllers
│   │   │   │   ├── services/       # Business logic services
│   │   │   │   ├── repositories/   # Data access layer
│   │   │   │   ├── models/         # JPA entities
│   │   │   │   ├── dto/            # Data transfer objects
│   │   │   │   ├── security/       # Security configuration
│   │   │   │   ├── config/         # Application configuration
│   │   │   │   ├── exceptions/     # Custom exceptions
│   │   │   │   ├── jobs/           # Scheduled jobs
│   │   │   │   └── utils/          # Utility classes
│   │   │   └── resources/          # Configuration files
│   │   └── test/                   # Backend tests
│   └── target/                     # Maven build artifacts
├── database/                  # Database related files
│   ├── migrations/            # Database migration scripts
│   ├── seeds/                 # Sample data for development
│   └── schemas/               # Database schema documentation
├── docs/                      # Project documentation
│   ├── api/                   # API documentation
│   ├── architecture/          # System architecture docs
│   └── security/              # Security documentation
├── infrastructure/            # Infrastructure as Code
│   ├── docker/                # Docker configurations
│   ├── kubernetes/            # K8s deployment files
│   └── aws/                   # AWS CloudFormation/CDK
├── scripts/                   # Utility scripts
│   ├── dev/                   # Development scripts
│   ├── deploy/                # Deployment scripts
│   └── backup/                # Backup scripts
├── tests/                     # Integration & E2E tests
│   ├── unit/                  # Unit test suites
│   ├── integration/           # Integration tests
│   └── e2e/                   # End-to-end tests
├── monitoring/                # Monitoring & observability
│   ├── logs/                  # Log configurations
│   └── metrics/               # Metrics & dashboards
├── .github/                   # GitHub workflows
│   └── workflows/             # CI/CD workflows
└── PROJECT_REQUIREMENTS.md    # Detailed project requirements
```

## 🛠️ Technology Stack

### Frontend

- **Mobile**: React Native with Expo SDK
- **Web**: React with Vite
- **Shared**: Monorepo with TypeScript
- **UI**: React Native Elements (mobile), Tailwind CSS (web)
- **State Management**: React Hooks (useState, useContext)

### Backend

- **Framework**: Spring Boot 3.x with Java 17+
- **Architecture**: REST API (Controller → Service → Repository)
- **Database**: PostgreSQL 15+ with JPA/Hibernate
- **Security**: Spring Security with JWT authentication
- **Build Tool**: Maven

### Infrastructure

- **Development**: Docker containers
- **Production**: AWS (EC2, RDS, S3, CloudFront)
- **CI/CD**: GitHub Actions
- **Monitoring**: AWS CloudWatch

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18+)
- **Java** (17+)
- **Maven** (3.8+)
- **PostgreSQL** (15+)
- **Docker** (optional for containerized development)

### Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/ImmigrationTracker.git
   cd ImmigrationTracker
   ```

2. **Backend Setup**

   ```bash
   cd backend
   # Create application.properties from template
   cp src/main/resources/application.properties.template src/main/resources/application.properties
   # Edit database configuration
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```

3. **Database Setup**

   ```bash
   # Create database
   createdb immigration_tracker
   # Run migrations (will be automated later)
   psql -d immigration_tracker -f database/schemas/initial_schema.sql
   ```

4. **Frontend Setup**

   ```bash
   # Install shared dependencies
   cd frontend/shared
   npm install
   npm run build
   
   # Web app setup
   cd ../web
   npm install
   npm run dev
   
   # Mobile app setup
   cd ../mobile
   npm install
   npx expo start
   ```

### Environment Variables

Create `.env` files in appropriate directories:

**Backend (.env in backend/)**

```
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=immigration_tracker
DB_USERNAME=your_username
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=86400

# File Storage
FILE_STORAGE_PATH=./uploads
```

**Frontend (.env in frontend/web/ and frontend/mobile/)**

```
# API Configuration
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_ENV=development
```

## 📱 Development Workflow

### 1. Feature Development

1. **Create feature branch**

   ```bash
   git checkout -b feature/deadline-tracking
   ```

2. **Backend Development**
   - Create JPA entities in `models/`
   - Implement repositories in `repositories/`
   - Add business logic in `services/`
   - Create REST controllers in `controllers/`
   - Write unit tests

3. **Frontend Development**
   - Add shared types in `frontend/shared/src/types/`
   - Implement API services in `services/`
   - Create UI components in `components/`
   - Add screens/pages
   - Write component tests

4. **Testing**

   ```bash
   # Backend tests
   cd backend && ./mvnw test
   
   # Frontend tests
   cd frontend/web && npm test
   cd frontend/mobile && npm test
   ```

### 2. Code Quality

- **ESLint/Prettier**: Automatic code formatting
- **Java Checkstyle**: Backend code style enforcement
- **SonarQube**: Code quality analysis
- **Security**: Regular dependency vulnerability scans

### 3. Git Workflow

```bash
# Feature development
git checkout -b feature/your-feature
git add .
git commit -m "feat: add deadline tracking functionality"
git push origin feature/your-feature

# Create Pull Request
# After review and approval, merge to main
```

## 🧪 Testing Strategy

### Unit Tests

- **Backend**: JUnit 5 with MockMvc
- **Frontend**: Jest with React Testing Library
- **Coverage**: Minimum 80% code coverage

### Integration Tests

- **API Testing**: Postman/Newman collections
- **Database Testing**: Testcontainers with PostgreSQL
- **End-to-End**: Cypress for web, Detox for mobile

### Test Commands

```bash
# Run all tests
npm run test:all

# Backend tests
cd backend && ./mvnw test

# Frontend tests
cd frontend/web && npm test
cd frontend/mobile && npm test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e
```

## 📊 Monitoring & Observability

### Development

- **Logs**: Console logging with structured format
- **Metrics**: Basic performance metrics
- **Health Checks**: Spring Boot Actuator

### Production

- **APM**: AWS X-Ray for distributed tracing
- **Logs**: CloudWatch Logs with structured logging
- **Metrics**: CloudWatch Metrics and custom dashboards
- **Alerts**: CloudWatch Alarms for critical issues

## 🔐 Security Guidelines

### Data Protection

- **Encryption**: AES-256 for sensitive data
- **Authentication**: JWT with refresh tokens
- **Authorization**: Role-based access control
- **File Storage**: Encrypted file uploads

### Development Security

- **Secrets**: Never commit secrets to version control
- **Dependencies**: Regular security updates
- **API Security**: Input validation and rate limiting
- **HTTPS**: Enforced in production

## 🤝 Contributing

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Write tests for new functionality**
5. **Run the test suite**
6. **Submit a pull request**

### Contribution Guidelines

#### Code Style

- **JavaScript/TypeScript**: Follow Prettier configuration
- **Java**: Follow Google Java Style Guide
- **Commits**: Use conventional commit messages
- **Documentation**: Update docs for new features

#### Pull Request Process

1. **Description**: Clear description of changes
2. **Testing**: All tests must pass
3. **Review**: At least one code review required
4. **Documentation**: Update relevant documentation
5. **Changelog**: Add entry to CHANGELOG.md

#### Issue Reporting

- **Bug Reports**: Include reproduction steps
- **Feature Requests**: Describe use case and benefit
- **Security Issues**: Report privately to maintainers

### Development Best Practices

#### Backend (Spring Boot)

- Use dependency injection
- Implement proper error handling
- Follow REST API conventions
- Write comprehensive tests
- Use DTOs for API responses

#### Frontend (React/React Native)

- Use TypeScript for type safety
- Follow React hooks patterns
- Implement proper error boundaries
- Use consistent naming conventions
- Write accessible components

#### Database

- Use migrations for schema changes
- Index frequently queried columns
- Follow naming conventions
- Write efficient queries
- Implement proper constraints

## 📈 Performance Guidelines

### Backend Performance

- **Database**: Optimize queries and use proper indexing
- **Caching**: Implement Redis for session and data caching
- **API**: Use pagination for large datasets
- **Background Jobs**: Process heavy tasks asynchronously

### Frontend Performance

- **Bundle Size**: Keep JavaScript bundles under 1MB
- **Images**: Optimize and use appropriate formats
- **Loading**: Implement skeleton screens and lazy loading
- **Caching**: Use service workers for offline support

## 🚀 Deployment

### Development Environment

```bash
# Using Docker Compose
docker-compose up -d

# Manual setup
./scripts/dev/setup.sh
```

### Production Deployment

- **Infrastructure**: AWS with Terraform/CDK
- **CI/CD**: GitHub Actions
- **Monitoring**: CloudWatch, X-Ray
- **Security**: WAF, Security Groups, IAM

## 📚 Additional Resources

### Documentation

- [API Documentation](docs/api/README.md)
- [Architecture Overview](docs/architecture/README.md)
- [Security Guidelines](docs/security/README.md)
- [Project Requirements](PROJECT_REQUIREMENTS.md)

### Learning Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://reactjs.org/docs)
- [React Native Documentation](https://reactnative.dev/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 🆘 Support

### Getting Help

- **GitHub Issues**: For bug reports and feature requests
- **Discussions**: For general questions and community support
- **Email**: [maintainers@immigrationtracker.com](mailto:maintainers@immigrationtracker.com)

### Community Guidelines

- Be respectful and inclusive
- Help others learn and grow
- Follow the code of conduct
- Contribute constructively

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- International student communities for requirements feedback
- Immigration attorneys for legal guidance
- Open source contributors and maintainers
- University international student offices

---

**Happy Coding! 🚀**

For detailed project requirements and specifications, see [PROJECT_REQUIREMENTS.md](PROJECT_REQUIREMENTS.md).
