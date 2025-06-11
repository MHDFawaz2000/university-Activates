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
  "attendeeCount": "number",
  "responses": {
    "userId": "attend|not_attend|time_conflict"
  }
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
- **MongoDB** or **PostgreSQL** for database
- **JWT** for authentication
- **Multer** for image uploads

### Implementation Steps

1. Set up database with schemas matching the data models
2. Implement authentication endpoints with JWT
3. Create RESTful API endpoints for activities
4. Implement analytics data aggregation
5. Add validation and error handling
6. Implement image upload functionality
7. Add language localization support for API responses (optional)

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
