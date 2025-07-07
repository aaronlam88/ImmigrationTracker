# Contributing to Immigration Tracker

Thank you for your interest in contributing to the Immigration Tracker project! This guide will help you understand how to contribute effectively to our mission of helping international students navigate their immigration journey.

## 🎯 Project Mission

We're building a comprehensive platform to help **20,000+ international students** annually manage their immigration processes, track critical deadlines, and maintain compliance with visa requirements. Your contributions directly impact real people's lives and career opportunities.

## 🤝 How to Contribute

### Types of Contributions

We welcome various types of contributions:

- **Bug fixes** - Fixing issues in existing functionality
- **New features** - Implementing features from our roadmap
- **Documentation** - Improving guides, API docs, and code comments
- **Testing** - Adding test coverage and improving test quality
- **Performance** - Optimizing application performance
- **Security** - Identifying and fixing security vulnerabilities
- **UX/UI** - Improving user experience and interface design

### Getting Started

1. **Fork the repository** to your GitHub account
2. **Clone your fork** locally:

   ```bash
   git clone https://github.com/your-username/ImmigrationTracker.git
   cd ImmigrationTracker
   ```

3. **Set up the development environment** (see [README.md](README.md))
4. **Create a feature branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📋 Development Guidelines

### Code Standards

#### Backend (Java/Spring Boot)

**Style Guide:**

- Follow [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html)
- Use meaningful variable and method names
- Maximum line length: 120 characters
- Use proper Javadoc comments for public methods

**Architecture Patterns:**

- **Controller → Service → Repository** layered architecture
- Use DTOs for API requests/responses
- Implement proper exception handling
- Use dependency injection consistently

**Example:**

```java
@RestController
@RequestMapping("/api/deadlines")
@Validated
public class DeadlineController {
    
    private final DeadlineService deadlineService;
    
    public DeadlineController(DeadlineService deadlineService) {
        this.deadlineService = deadlineService;
    }
    
    @GetMapping
    public ResponseEntity<List<DeadlineDto>> getUserDeadlines(
            @AuthenticationPrincipal UserDetails userDetails) {
        // Implementation
    }
}
```

#### Frontend (React/TypeScript)

**Style Guide:**

- Use TypeScript for all new code
- Follow React Hooks patterns
- Use functional components over class components
- Implement proper error boundaries

**Component Structure:**

```typescript
interface ComponentProps {
  title: string;
  onSubmit: (data: FormData) => void;
}

export const Component: React.FC<ComponentProps> = ({ title, onSubmit }) => {
  // Component implementation
};
```

**File Naming:**

- Components: `PascalCase.tsx`
- Services: `camelCase.ts`
- Types: `types.ts`
- Tests: `Component.test.tsx`

### Database Guidelines

**Schema Changes:**

- Always use migration scripts in `database/migrations/`
- Include rollback scripts for each migration
- Test migrations on a copy of production data
- Document breaking changes

**Query Performance:**

- Use proper indexing for frequently queried columns
- Avoid N+1 queries
- Use `@Query` annotations for complex queries
- Implement pagination for large datasets

### Security Guidelines

**Authentication & Authorization:**

- Use JWT tokens with proper expiration
- Implement role-based access control
- Validate all inputs server-side
- Use HTTPS in production

**Data Protection:**

- Encrypt sensitive data at rest
- Use parameterized queries to prevent SQL injection
- Implement rate limiting on APIs
- Log security events

**File Uploads:**

- Validate file types and sizes
- Scan files for malware
- Store files with restricted permissions
- Use secure file naming conventions

## 🧪 Testing Requirements

### Test Coverage

We maintain **80%+ code coverage** across all components:

- **Unit Tests**: Test individual methods and components
- **Integration Tests**: Test API endpoints and database interactions
- **End-to-End Tests**: Test complete user workflows

### Backend Testing

**JUnit 5 with MockMvc:**

```java
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Testcontainers
class DeadlineServiceTest {
    
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
            .withDatabaseName("test_db")
            .withUsername("test")
            .withPassword("test");
    
    @Test
    void shouldCreateDeadlineSuccessfully() {
        // Test implementation
    }
}
```

**Test Commands:**

```bash
# Run all backend tests
cd backend && ./mvnw test

# Run specific test class
./mvnw test -Dtest=DeadlineServiceTest

# Run with coverage
./mvnw test jacoco:report
```

### Frontend Testing

**Jest with React Testing Library:**

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { DeadlineForm } from './DeadlineForm';

describe('DeadlineForm', () => {
  it('should submit form with valid data', async () => {
    const mockSubmit = jest.fn();
    render(<DeadlineForm onSubmit={mockSubmit} />);
    
    fireEvent.change(screen.getByLabelText('Deadline Date'), {
      target: { value: '2024-12-31' }
    });
    
    fireEvent.click(screen.getByText('Submit'));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      date: '2024-12-31'
    });
  });
});
```

**Test Commands:**

```bash
# Run web tests
cd frontend/web && npm test

# Run mobile tests
cd frontend/mobile && npm test

# Run with coverage
npm test -- --coverage
```

### API Testing

**Postman Collections:**

- Create/update Postman collections for new endpoints
- Include authentication examples
- Document expected responses and error cases
- Test edge cases and error conditions

## 📝 Pull Request Process

### Before Creating a PR

1. **Test your changes thoroughly**
2. **Update documentation** if needed
3. **Add/update tests** for new functionality
4. **Run the full test suite**
5. **Check code coverage** meets requirements

### PR Description Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Fixes #123

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots for UI changes.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes (or breaking changes documented)
```

### Review Process

1. **Automated Checks**: All CI/CD checks must pass
2. **Code Review**: At least one maintainer review required
3. **Testing**: All tests must pass with 80%+ coverage
4. **Documentation**: Updates to docs if needed
5. **Approval**: Maintainer approval required for merge

## 🐛 Bug Reports

### Bug Report Template

```markdown
## Bug Description
A clear description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
What should happen.

## Actual Behavior
What actually happens.

## Screenshots
Add screenshots if applicable.

## Environment
- OS: [e.g., macOS, Windows]
- Browser: [e.g., Chrome, Firefox]
- Version: [e.g., 1.0.0]

## Additional Context
Any other relevant information.
```

### Security Issues

**⚠️ Do not report security vulnerabilities in public issues.**

For security-related bugs, please email: `security@immigrationtracker.com`

Include:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if known)

## 🚀 Feature Requests

### Feature Request Template

```markdown
## Feature Summary
Brief description of the feature.

## Problem Statement
What problem does this solve?

## Proposed Solution
Detailed description of the proposed feature.

## User Impact
How will this benefit users?

## Technical Considerations
Any technical challenges or requirements.

## Alternatives Considered
Other solutions you considered.
```

### Feature Development Process

1. **Discussion**: Feature requests are discussed with maintainers
2. **Planning**: Technical design and implementation plan
3. **Development**: Feature development with tests
4. **Review**: Code review and testing
5. **Documentation**: Update docs and guides
6. **Release**: Feature included in next release

## 📚 Documentation Standards

### Code Documentation

**Backend (Javadoc):**

```java
/**
 * Creates a new deadline for the specified user.
 * 
 * @param userId the unique identifier of the user
 * @param deadline the deadline information to create
 * @return the created deadline with generated ID
 * @throws UserNotFoundException if the user doesn't exist
 * @throws ValidationException if the deadline data is invalid
 */
public DeadlineDto createDeadline(UUID userId, CreateDeadlineDto deadline) {
    // Implementation
}
```

**Frontend (JSDoc):**

```typescript
/**
 * Validates immigration deadline data
 * @param deadline - The deadline data to validate
 * @returns Validation result with errors if any
 */
export const validateDeadline = (deadline: DeadlineData): ValidationResult => {
  // Implementation
};
```

### API Documentation

- Use OpenAPI/Swagger for REST API documentation
- Include request/response examples
- Document error responses
- Provide authentication examples

## 🔄 Git Workflow

### Branch Naming

- `feature/deadline-tracking` - New features
- `bugfix/fix-notification-bug` - Bug fixes
- `hotfix/security-patch` - Critical fixes
- `docs/api-documentation` - Documentation updates

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format: <type>[optional scope]: <description>

feat(auth): add JWT token refresh functionality
fix(deadlines): resolve timezone calculation bug
docs(api): update authentication endpoint documentation
test(integration): add deadline service integration tests
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `test`: Test additions/changes
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `chore`: Maintenance tasks

## 🎯 Development Priorities

### High Priority

- Security vulnerabilities
- Critical bug fixes
- Performance issues
- Data integrity problems

### Medium Priority

- New feature development
- User experience improvements
- API enhancements
- Documentation updates

### Low Priority

- Code refactoring
- Minor UI improvements
- Non-critical optimizations

## 📞 Getting Help

### Community Support

- **GitHub Discussions**: General questions and community help
- **GitHub Issues**: Bug reports and feature requests
- **Email**: `developers@immigrationtracker.com` for development questions

### Development Resources

- [Project Requirements](PROJECT_REQUIREMENTS.md)
- [API Documentation](docs/api/README.md)
- [Architecture Overview](docs/architecture/README.md)
- [Security Guidelines](docs/security/README.md)

## 🏆 Recognition

### Contributor Recognition

- Contributors are acknowledged in release notes
- Significant contributors are listed in the README
- Community contributions are highlighted on our website

### Maintainer Path

Regular contributors may be invited to become maintainers with:

- Commit access to the repository
- Ability to review and merge PRs
- Participation in project roadmap decisions

## 📄 License

By contributing to Immigration Tracker, you agree that your contributions will be licensed under the project's MIT License.

## 🙏 Thank You

Your contributions help thousands of international students navigate their immigration journey successfully. Every bug fix, feature addition, and documentation improvement makes a real difference in people's lives.

**Happy Contributing! 🚀**

---

For questions about contributing, please reach out to our maintainers or open a discussion in GitHub Discussions.
