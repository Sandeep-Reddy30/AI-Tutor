-- Student Portal Database Schema
-- Run this in your MySQL database (via XAMPP phpMyAdmin)

-- Create database
CREATE DATABASE IF NOT EXISTS student_portal;
USE student_portal;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    student_id VARCHAR(50) UNIQUE NOT NULL,
    department VARCHAR(100) DEFAULT 'Computer Science',
    year VARCHAR(50) DEFAULT '1st Year',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin user
-- Password: 1234 (hashed with bcrypt)
INSERT INTO users (name, email, password, student_id, department, year) VALUES 
('Admin User', 'admin@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN001', 'Computer Science', '1st Year')
ON DUPLICATE KEY UPDATE name = VALUES(name); 