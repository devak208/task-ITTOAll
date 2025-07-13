# Authentication API Documentation

A comprehensive REST API for user authentication with support for email/password login, Google OAuth, and JWT-based session management.

## Table of Contents

- [Base URL](#base-url)
- [Endpoints](#endpoints)
- [Cookies](#cookies)
- [Error Handling](#error-handling)
- [Setup Instructions](#setup-instructions)
- [Environment Variables Required](#environment-variables-required)

## Base URL
```text
http://localhost:5000/api/auth
```

## Endpoints

### 1. Register User
**POST** `/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": null,
    "isVerified": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "accessToken": "jwt-token"
}
```

**Error Responses:**
- 400: User already exists
- 400: Validation failed

### 2. Login User
**POST** `/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": null,
    "isVerified": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "accessToken": "jwt-token"
}
```

**Error Responses:**
- 400: Email not found
- 400: Invalid password

### 3. Get Current User
**GET** `/me`

**Headers:**
```text
Authorization: Bearer <token>
```
**Note:** If cookies are present, authentication will be handled automatically without the need for the Authorization header.

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": null,
    "isVerified": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 4. Logout User
**POST** `/logout`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### 5. Forgot Password
**POST** `/forgot-password`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password reset link has been sent to your email (Feature not implemented yet)"
}
```

### 6. Google OAuth Login
**GET** `/google`

Initiates Google OAuth flow by redirecting users to Google's consent screen.

### 7. Google OAuth Callback
**GET** `/google/callback`

Handles the Google OAuth callback after user consent. On successful authentication:
- Sets authentication cookies
- Redirects to the frontend home page (`/`)

## Cookies

The server automatically sets the following cookies on successful login/register:

- **`accessToken`**: JWT token (7 days expiry)
- **`refreshToken`**: Refresh token (30 days expiry)

### Cookie Configuration

Both cookies are configured with the following security settings:
- **HTTPOnly**: Prevents client-side JavaScript access
- **Secure**: Only sent over HTTPS (in production)
- **SameSite**: Set to `lax` for CSRF protection

## Error Handling

All endpoints return errors in this format:
```json
{
  "success": false,
  "message": "Error message",
  "errors": [] // Optional validation errors array
}
```

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env` file in the backend directory and add the required [environment variables](#environment-variables-required)

3. **Set up the database:**
   - Create a PostgreSQL database
   - Run the following command to create tables:
     ```bash
     npx prisma db push
     ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000` and the API will be available at the [base URL](#base-url).

### Additional Scripts

- **Database Studio**: `npm run db:studio` - Opens Prisma Studio for database management
- **Generate Prisma Client**: `npm run db:generate` - Regenerates the Prisma client
- **Production Build**: `npm run build` - Prepares the application for deployment

## Environment Variables Required

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/mydb"
JWT_SECRET="your-super-secret-jwt-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
SESSION_SECRET="your-session-secret"
FRONTEND_URL="http://localhost:3000"
```
