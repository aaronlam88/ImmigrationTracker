# Development Knowledge Notes 📚
<!-- markdownlint-disable MD036 -->
*Personal learning notes from building the Immigration Tracker project*

## SQLite Database Overview

### What is SQLite?

SQLite is a **file-based database** - not a traditional database server. It's an embedded database engine that stores data in a single file on your computer.

### Key Characteristics

#### 📁 File-Based (Not Server-Based)

- Database is just a single `.db` file (e.g., `dev-database.db`)
- No separate server process running
- No network connections or ports
- No installation of database software needed

#### 🚀 How it Works in Spring Boot

```yaml
# Configuration points to a FILE, not a server
spring:
  datasource:
    url: jdbc:sqlite:./dev-database.db  # File path
    driver-class-name: org.sqlite.JDBC
```

#### 🔄 Startup Process

1. Spring Boot starts your Java application
2. SQLite JDBC driver loads (from build.gradle dependencies)
3. Spring connects to the `.db` file (creates if doesn't exist)
4. Flyway runs migration scripts
5. Database ready to use - all embedded in your Java process

### Architecture Comparison

```text
Traditional Database (PostgreSQL):
Java App ←→ Network ←→ PostgreSQL Server ←→ Database Files

SQLite (Development):
Java App ←→ SQLite Library ←→ single .db file
```

### Development Benefits ✅

- **Zero setup** - no database server to install
- **Fast startup** - no server connection overhead
- **Portable** - database is just a file you can copy/backup
- **Isolated** - each developer gets their own database file
- **Version control friendly** - can commit sample databases

### Limitations ⚠️

- **Single writer** - only one process can write at a time
- **No network access** - can't connect remotely
- **Limited concurrency** - not suitable for production scale

### Practical Usage

#### Direct Command Line Access

```bash
# View all tables
sqlite3 dev-database.db ".tables"

# Query data
sqlite3 dev-database.db "SELECT * FROM users;"

# Check file info
file dev-database.db  # Shows it's just a binary file
ls -la *.db          # See file size and permissions
```

#### Development Workflow

```bash
# Start app (creates database automatically)
./gradlew bootRun

# Reset database (delete file and restart)
rm dev-database.db && ./gradlew bootRun
```

### Perfect For

- ✅ Local development
- ✅ Testing environments  
- ✅ Prototyping
- ✅ Single-user applications
- ✅ Learning SQL

### Not Suitable For

- ❌ Production with multiple users
- ❌ High-concurrency applications
- ❌ Remote database access
- ❌ Multi-server setups

---

## Key Learning Points

1. **SQLite = File, not Server** - The biggest mental shift from traditional databases
2. **Embedded in Your App** - No separate database process running
3. **Perfect for Development** - Zero configuration, fast, portable
4. **Production Strategy** - Use SQLite for dev, PostgreSQL for production
5. **Migration Scripts Work** - Same Flyway migrations work for both databases

---

*This knowledge base will grow as we learn more about Spring Boot, databases, and full-stack development.*
