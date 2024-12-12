# Clerk OAuth Client Library

## Overview
This is a flexible JavaScript OAuth 2.0 client library designed to work with Clerk's authentication system. The library supports both server-side and client-side environments and provides a simple interface for managing OAuth flows.

## Features
- OAuth 2.0 authorization flow implementation
- Support for both browser and server environments
- Methods for:
  - Initiating authorization
  - Handling callback and token exchange
  - Refreshing tokens
  - Fetching user information

## Installation

```bash
npm install @shrak/clerk-oauth-client
```

## Usage

### Initialization
```typescript
import { ClerkOAuthClient } from '@shrak/clerk-oauth-client';

const oauthClient = new ClerkOAuthClient({
  clientId: 'your_client_id',
  clientSecret: 'your_client_secret',
  redirectUri: 'http://localhost:3000/callback',
  authorizeUrl: 'https://your-clerk-domain.clerk.accounts.dev/oauth/authorize',
  tokenUrl: 'https://your-clerk-domain.clerk.accounts.dev/oauth/token',
  userInfoUrl: 'https://your-clerk-domain.clerk.accounts.dev/oauth/userinfo',
  discoveryUrl: 'https://your-clerk-domain.clerk.accounts.dev/.well-known/openid-configuration'
});
```

### Starting Authorization Flow
```typescript
const authorizationUrl = oauthClient.startAuthFlow();
window.location.href = authorizationUrl;
```

### Handling Callback
```typescript
const tokens = await oauthClient.handleCallback({ code: authorizationCode });
```

### Fetching User Information
```typescript
const userInfo = await oauthClient.fetchUserInfo(tokens.access_token);
```

### Refreshing Token
```typescript
const newTokens = await oauthClient.refreshToken(tokens.refresh_token);
```

## Security Considerations
- Always keep `clientSecret` confidential
- Use HTTPS for all communications
- Validate and sanitize all callback parameters
- Implement proper token storage mechanisms

## Environment Variables
Recommended environment variables:
- `CLERK_CLIENT_ID`
- `CLERK_CLIENT_SECRET`
- `CLERK_REDIRECT_URI`

## Error Handling
The library throws descriptive errors for:
- Missing authorization code
- Token exchange failures
- User info fetch errors
- Token refresh errors

