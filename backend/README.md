# Authentication API Documentation

## Base URL
```
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
```
Authorization: Bearer <token>
```
OR cookies will be used automatically

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

Redirects to Google OAuth consent screen.

### 7. Google OAuth Callback
**GET** `/google/callback`

Handles Google OAuth callback and redirects to home page (/) with cookies set.

## Cookies

The server automatically sets the following cookies on successful login/register:

- `accessToken`: JWT token (7 days expiry)
- `refreshToken`: Refresh token (30 days expiry)

Both cookies are:
- HTTPOnly
- Secure (in production)
- SameSite: lax

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

1. Update the `.env` file with your database and OAuth credentials
2. Create a PostgreSQL database
3. Run `npx prisma db push` to create tables
4. Start the server with `npm run dev`

## Environment Variables Required

```env
DATABASE_URL="postgresql://username:password@localhost:5432/mydb"
JWT_SECRET="your-super-secret-jwt-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
SESSION_SECRET="your-session-secret"
FRONTEND_URL="http://localhost:3000"
```
