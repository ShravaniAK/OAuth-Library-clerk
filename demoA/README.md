# Clerk OAuth Demo Application

## Overview
A React-based demo application showcasing the implementation of OAuth 2.0 authentication using the Clerk OAuth Client Library.

## Features
- Login with Clerk OAuth
- Display user information after successful authentication
- Logout functionality
- Error handling for authentication process

## Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Clerk OAuth application credentials

## Installation

1. Clone the repository

2. Install dependencies
```bash
npm install
npm install @shrak/clerk-oauth-client
```

3. Set up environment variables
Create a `.env` file in the project root with the following:
```
REACT_APP_CLERK_CLIENT_ID=your_client_id
REACT_APP_CLERK_CLIENT_SECRET=your_client_secret
REACT_APP_CLERK_REDIRECT_URI=http://localhost:3000/callback
```

## Configuration
Modify `src/App.tsx` to match your Clerk OAuth configuration:
- Update OAuth client initialization URLs
- Ensure environment variables are correctly set

## Running the Application

### Development Mode
```bash
npm start
```
The app will run on `http://localhost:3000`

### Production Build
```bash
npm run build
```

## Authentication Flow
1. Click "Login with Clerk" button
2. Redirected to Clerk's authorization page
3. Authenticate and grant permissions
4. Redirected back to application
5. User information displayed upon successful authentication

## Troubleshooting
- Ensure all environment variables are set correctly
- Check browser console for detailed error messages
- Verify Clerk OAuth application settings

## Security Notes
- Never commit sensitive credentials to version control
- Use environment variables for configuration
- Implement additional security measures as needed

## Customization
Modify `src/App.tsx` to:
- Add custom styling
- Implement additional user info display
- Add more sophisticated error handling

## Dependencies
- React
- Clerk OAuth Client Library

