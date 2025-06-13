# University Activities Platform

A comprehensive platform for managing university activities, enabling students to discover and register for various events, and administrators to manage activities and track student engagement.

## Project Overview

The University Activities Platform is a web application built with React that allows:

- **Students** to browse, search, and register for university activities across different categories
- **Administrators** to create, manage, and analyze student participation in activities
- **Multilingual support** with English and Arabic languages

## Table of Contents

- [Architecture](#architecture)
- [Frontend Structure](#frontend-structure)
- [Data Models](#data-models)
- [API Requirements](#api-requirements)
- [Authentication](#authentication)
- [Features](#features)
- [Backend Development Guide](#backend-development-guide)
- [Installation](#installation)

## Architecture

The application follows a client-server architecture:

- **Frontend**: React application with React Router for navigation and Tailwind CSS for styling
- **Backend**: To be implemented (this README provides specifications)
- **Database**: To be implemented (schema recommendations provided)

### Frontend Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable UI components
│   └── admin/      # Admin-specific components
├── contexts/       # React context providers
├── data/           # Mock data (to be replaced with API calls)
└── pages/          # Page components
    ├── admin/      # Admin pages
    ├── auth/       # Authentication pages
    └── student/    # Student pages
```

## Data Models

### User

```json
{
  "id": "string",
  "type": "student|admin",
  "name": "string",
  "email": "string (admin only)",
  "studentId": "string (student only)"
}
```

### Activity

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "category": "Sports|Cultural|Scientific|Extracurricular",
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "location": "string",
  "duration": "string",
  "image": "string (URL)",
  "attendeeCount": "number"
}
```

### ActivityResponse

```json
{
  "id": "string",
  "activityId": "string",
  "userId": "string",
  "responseType": "attend|not_attend|time_conflict",
  "createdAt": "datetime"
}
```

### ActivityCategory

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "count": "number",
  "upcoming": "number"
}
```

## Database Schema

The following database tables are required for implementing the backend:

### 1. users

| Column     | Type         | Description                                |
|------------|-------------|--------------------------------------------|
| id         | UUID/String  | Primary key                                |
| type       | String      | User type: 'student' or 'admin'            |
| name       | String      | User's full name                           |
| email      | String      | Email address (required for admins)        |
| student_id | String      | 9-digit student ID (required for students) |
| password   | String      | Hashed password (for admin users)          |
| created_at | Timestamp   | Account creation timestamp                 |
| updated_at | Timestamp   | Last update timestamp                      |

### 2. activities

| Column       | Type         | Description                             |
|--------------|-------------|-----------------------------------------|
| id           | UUID/String  | Primary key                             |
| title        | String      | Activity title                          |
| description  | Text        | Detailed description                    |
| category     | String      | Category: Sports, Cultural, etc.        |
| date         | Date        | Event date                              |
| time         | Time        | Event start time                        |
| location     | String      | Event location                          |
| duration     | String      | Event duration                          |
| image        | String      | URL to activity image                   |
| created_by   | UUID/String  | Foreign key to users (admin)            |
| created_at   | Timestamp   | Creation timestamp                      |
| updated_at   | Timestamp   | Last update timestamp                   |

### 3. activity_responses

| Column        | Type         | Description                                      |
|---------------|-------------|--------------------------------------------------|
| id            | UUID/String  | Primary key                                      |
| activity_id   | UUID/String  | Foreign key to activities                        |
| user_id       | UUID/String  | Foreign key to users (student)                   |
| response_type | String      | Response: 'attend', 'not_attend', 'time_conflict'|
| created_at    | Timestamp   | Response timestamp                               |
| updated_at    | Timestamp   | Last update timestamp                            |

### 4. activity_categories

| Column      | Type         | Description                             |
|-------------|-------------|-----------------------------------------|
| id          | UUID/String  | Primary key                             |
| title       | String      | Category title                          |
| description | Text        | Category description                    |
| created_at  | Timestamp   | Creation timestamp                      |
| updated_at  | Timestamp   | Last update timestamp                   |

### 5. activity_analytics (Optional - for performance optimization)

| Column           | Type         | Description                             |
|------------------|-------------|-----------------------------------------|
| id               | UUID/String  | Primary key                             |
| activity_id      | UUID/String  | Foreign key to activities               |
| attendee_count   | Integer     | Number of 'attend' responses            |
| registration_count| Integer     | Total number of responses               |
| completion_rate  | Float       | Percentage of attendees who completed   |
| last_calculated  | Timestamp   | Last calculation timestamp              |

## API Requirements

The backend should implement the following API endpoints:

### Authentication

- `POST /api/auth/student/login` - Student login with student ID
- `POST /api/auth/admin/login` - Admin login with email/password
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user information

### Activities

- `GET /api/activities` - Get all activities (with optional filters)
- `GET /api/activities/:id` - Get activity details
- `GET /api/activities/category/:category` - Get activities by category
- `POST /api/activities` - Create new activity (admin only)
- `PUT /api/activities/:id` - Update activity (admin only)
- `DELETE /api/activities/:id` - Delete activity (admin only)

### Activity Responses

- `POST /api/activities/:id/responses` - Register response to activity
- `GET /api/activities/:id/responses` - Get responses for an activity (admin only)
- `GET /api/students/:id/responses` - Get student's activity responses

### Analytics (Admin)

- `GET /api/analytics/overview` - Get dashboard overview statistics
- `GET /api/analytics/monthly` - Get monthly registration data
- `GET /api/analytics/categories` - Get category distribution data
- `GET /api/analytics/top-activities` - Get top performing activities

## Authentication

The system uses two authentication flows:

1. **Student Authentication**: Simple ID-based authentication
   - Students log in using their 9-digit university ID
   - No password required for demo purposes (implement proper authentication in production)

2. **Admin Authentication**: Email/password authentication
   - Admins log in with email and password
   - Demo credentials: admin@university.edu / admin123

## Features

### Student Features

- Browse activities by category
- Search and filter activities
- Register for activities with response options
- View personal activity history
- Track participation statistics

### Admin Features

- Comprehensive dashboard with analytics
- Create, edit, and delete activities
- View student registrations and participation
- Filter and search activities
- Track performance metrics

### Multilingual Support

- English and Arabic language support
- Right-to-left (RTL) layout for Arabic

## Backend Development Guide

### Technology Recommendations

- **Node.js with Express** or equivalent backend framework
- **MongoDB** or **PostgreSQL** for database (schema provided for relational databases)
- **JWT** for authentication
- **Multer** for image uploads
- **Sequelize** or **TypeORM** for ORM if using SQL databases
- **Mongoose** if using MongoDB

### Implementation Steps

1. Set up database with tables defined in the Database Schema section
2. Create database relationships:
   - One-to-many between users and activities (admin creates activities)
   - One-to-many between users and activity_responses (students respond to activities)
   - One-to-many between activities and activity_responses
3. Implement authentication endpoints with JWT
4. Create RESTful API endpoints for activities
5. Implement analytics data aggregation
6. Add validation and error handling
7. Implement image upload functionality
8. Add language localization support for API responses (optional)

### Security Considerations

- Implement proper authentication with password hashing
- Use JWT with appropriate expiration
- Validate all inputs
- Implement role-based access control
- Sanitize data to prevent XSS
- Use HTTPS in production

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```

## Next Steps

1. Implement the backend API following the specifications in this document
2. Replace the mock data in `src/data/` with actual API calls
3. Implement proper authentication
4. Add image upload functionality
5. Deploy the application

---

This project was built with React, React Router, Tailwind CSS, and other modern web technologies.
