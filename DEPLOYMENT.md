# Deployment Guide

## Backend Deployment (Vercel)

### Environment Variables to Set in Vercel Dashboard:

1. **Database**
   - `DATABASE_URL`: Your PostgreSQL connection string from Neon/other provider

2. **JWT Configuration**
   - `JWT_SECRET`: A secure random string for JWT signing
   - `JWT_EXPIRE`: 7d

3. **URLs**
   - `APP_URL`: https://task-itto-all-qqua.vercel.app
   - `FRONTEND_URL`: https://task-itto-all.vercel.app

4. **Email Configuration**
   - `EMAIL_USER`: gdmnetwork1@gmail.com
   - `EMAIL_PASS`: yecl ofwr dvhl nuio

5. **Google OAuth**
   - `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret

6. **Other**
   - `SESSION_SECRET`: A secure random string
   - `NODE_ENV`: production

### Google OAuth Setup:

Update your Google OAuth configuration:
- Authorized JavaScript origins: https://task-itto-all.vercel.app
- Authorized redirect URIs: https://task-itto-all-qqua.vercel.app/api/auth/google/callback

## Frontend Deployment (Vercel)

### Environment Variables to Set in Vercel Dashboard:

1. **API Configuration**
   - `REACT_APP_API_URL`: https://task-itto-all-qqua.vercel.app/api

## Deployment Steps:

1. **Backend:**
   ```bash
   cd backend
   vercel --prod
   ```

2. **Frontend:**
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Set Environment Variables:**
   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add all the environment variables listed above

4. **Update Google OAuth:**
   - Go to Google Cloud Console
   - Update OAuth 2.0 Client IDs with production URLs

## Troubleshooting:

1. **CORS Issues:** Make sure FRONTEND_URL matches your frontend domain
2. **Database Connection:** Ensure DATABASE_URL is correctly set in production
3. **Email Issues:** Verify EMAIL_USER and EMAIL_PASS are set correctly
4. **OAuth Issues:** Check Google OAuth redirect URIs are correctly configured

## Testing:

After deployment, test:
1. Registration flow
2. Login flow  
3. OTP password reset flow
4. Google OAuth flow
