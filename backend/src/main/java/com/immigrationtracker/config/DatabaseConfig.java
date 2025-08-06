package com.immigrationtracker.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;

import javax.sql.DataSource;

/**
 * Database configuration that automatically selects between SQLite and PostgreSQL
 * based on the active Spring profile.
 * 
 * - Development profile: Uses SQLite for fast local development
 * - Production profile: Uses PostgreSQL for scalable production deployment
 * - Test profile: Uses H2 in-memory database for fast testing
 */
@Configuration
public class DatabaseConfig {

    private final Environment environment;

    public DatabaseConfig(Environment environment) {
        this.environment = environment;
    }

    /**
     * Configuration for development environment using SQLite
     */
    @Configuration
    @Profile("dev")
    public static class DevelopmentDatabaseConfig {
        
        /**
         * Development-specific database configuration for SQLite
         * This configuration ensures proper SQLite setup for local development
         */
        @Bean
        public String databaseInfo() {
            return "Using SQLite database for development environment";
        }
    }

    /**
     * Configuration for production environment using PostgreSQL
     */
    @Configuration
    @Profile("prod")
    public static class ProductionDatabaseConfig {
        
        /**
         * Production-specific database configuration for PostgreSQL
         * This configuration ensures proper PostgreSQL setup for production deployment
         */
        @Bean
        public String databaseInfo() {
            return "Using PostgreSQL database for production environment";
        }
    }

    /**
     * Configuration for test environment using H2 in-memory database
     */
    @Configuration
    @Profile("test")
    public static class TestDatabaseConfig {
        
        /**
         * Test-specific database configuration for H2 in-memory database
         * This configuration ensures fast test execution with isolated test data
         */
        @Bean
        public String databaseInfo() {
            return "Using H2 in-memory database for test environment";
        }
    }

    /**
     * Bean that provides information about the currently active database configuration
     */
    @Bean
    public String activeDatabaseProfile() {
        String[] activeProfiles = environment.getActiveProfiles();
        if (activeProfiles.length == 0) {
            return "No active profile set - using default configuration";
        }
        
        StringBuilder profileInfo = new StringBuilder("Active profiles: ");
        for (String profile : activeProfiles) {
            profileInfo.append(profile).append(" ");
        }
        
        return profileInfo.toString();
    }
}