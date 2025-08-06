package com.immigrationtracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Main application class for Immigration Tracker.
 * 
 * This application helps international students navigate immigration processes,
 * track critical deadlines, and maintain compliance for OPT, H1B, and other visa categories.
 * 
 * Features:
 * - Dual database support: SQLite for development, PostgreSQL for production
 * - JWT-based authentication and authorization
 * - Document management and file upload
 * - Deadline tracking and notifications
 * - Immigration status management
 */
@SpringBootApplication
@EnableJpaAuditing
@EnableScheduling
public class ImmigrationTrackerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ImmigrationTrackerApplication.class, args);
    }
}