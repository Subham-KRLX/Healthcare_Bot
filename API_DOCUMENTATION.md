# API Documentation

## Overview
This document provides comprehensive documentation for the Healthcare Bot API endpoints.

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require authentication using session-based cookies with CSRF protection.

## Endpoints

### Authentication

#### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user_id": "integer"
}
```

#### POST /api/auth/login
Login to an existing account.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "integer",
    "username": "string",
    "email": "string"
  }
}
```

#### POST /api/auth/logout
Logout from the current session.

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### Health Predictions

#### POST /api/predict
Get health predictions based on symptoms.

**Request Body:**
```json
{
  "symptoms": ["symptom1", "symptom2", "symptom3"]
}
```

**Response:**
```json
{
  "success": true,
  "prediction": {
    "disease": "string",
    "confidence": "float",
    "recommendations": ["string"]
  }
}
```

### User Profile

#### GET /api/user/profile
Get the current user's profile information.

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "integer",
    "username": "string",
    "email": "string",
    "created_at": "datetime"
  }
}
```

#### PUT /api/user/profile
Update user profile information.

**Request Body:**
```json
{
  "email": "string (optional)",
  "password": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully"
}
```

### Medical History

#### GET /api/history
Get user's medical consultation history.

**Response:**
```json
{
  "success": true,
  "history": [
    {
      "id": "integer",
      "symptoms": ["string"],
      "diagnosis": "string",
      "date": "datetime"
    }
  ]
}
```

#### POST /api/history
Add a new medical consultation record.

**Request Body:**
```json
{
  "symptoms": ["string"],
  "diagnosis": "string",
  "notes": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "record_id": "integer"
}
```

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "success": false,
  "error": "Error message description"
}
```

### Common HTTP Status Codes
- `200` - Success
- `400` - Bad Request (validation error)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (CSRF token invalid)
- `404` - Not Found
- `500` - Internal Server Error

## CSRF Protection

All POST, PUT, and DELETE requests require a valid CSRF token in the request headers:

```
X-CSRF-Token: <token>
```

The CSRF token can be obtained from the `csrf_token` cookie after authentication.

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- Authentication endpoints: 5 requests per minute
- Prediction endpoints: 10 requests per minute
- Other endpoints: 30 requests per minute

## Security Considerations

1. All passwords are hashed using bcrypt
2. Sessions are stored securely with httpOnly cookies
3. CSRF protection is enabled on all state-changing operations
4. Input validation is performed on all user inputs
5. SQL injection protection through parameterized queries
