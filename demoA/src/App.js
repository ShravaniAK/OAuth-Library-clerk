import React, { useState, useEffect } from 'react';
import {ClerkOAuthClient} from '@shrak/clerk-oauth-client';

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  const oauthClient = new ClerkOAuthClient({
    clientId: process.env.REACT_APP_CLERK_CLIENT_ID || '',
    clientSecret: process.env.REACT_APP_CLERK_CLIENT_SECRET || '',
    redirectUri: process.env.REACT_APP_CLERK_REDIRECT_URI || 'http://localhost:3000/callback',
    authorizeUrl: 'https://enormous-muskox-25.clerk.accounts.dev/oauth/authorize'
    tokenUrl: 'https://enormous-muskox-25.clerk.accounts.dev/oauth/token',
    userInfoUrl: 'https://enormous-muskox-25.clerk.accounts.dev/oauth/userinfo',
    discoveryUrl: 'https://enormous-muskox-25.clerk.accounts.dev/.well-known/openid-configuration'
  });

  const handleLogin = () => {
    try {
      console.log('OAuth Client Configuration:', {
        clientId: oauthClient.clientId,
        redirectUri: oauthClient.redirectUri,
        authorizeUrl: oauthClient.authorizeUrl
      });
  
      const authorizationUrl = oauthClient.startAuthFlow();
      console.log('Full Authorization URL:', authorizationUrl);
      
      window.location.href = authorizationUrl;
    } catch (err) {
      console.error('Detailed Login Error:', err);
      setError(`Failed to start login process: ${err.message}`);
    }
  };
  // Handle callback when redirected back from Clerk
  useEffect(() => {
    const handleCallback = async () => {
      if (window.location.pathname === '/callback') {
        console.log('Callback route detected');
        
        try {
          const urlParams = new URLSearchParams(window.location.search);
          const code = urlParams.get('code');
          const error = urlParams.get('error');
  
          if (error) {
            console.error('OAuth Error:', error);
            setError(`Authentication failed: ${error}`);
            return;
          }
  
          if (code) {
            console.log('Received authorization code:', code);
            
            // Exchange code for tokens
            const tokens = await oauthClient.handleCallback({ code });
            console.log('Received tokens:', tokens);
  
            // Fetch user info
            
            const userInfo = await oauthClient.fetchUserInfo(tokens.access_token);
            console.log('User Info:', userInfo);
  
            setUserInfo(userInfo);
          }
        } catch (err) {
          console.error('Detailed Callback Error:', err);
          setError(`Callback processing failed: ${err.message}`);
        }
      }
    };
  
    handleCallback();
  }, []);

  // Logout function
  const handleLogout = () => {
    // Clear user info and perform any necessary logout actions
    setUserInfo(null);
    
    window.location.href = '/';
  };

  return (
    <div className="App">
      <h1>Clerk OAuth Demo</h1>
      
      {!userInfo ? (
        <div>
          <button onClick={handleLogin}>Login with Clerk</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      ) : (
        <div>
          <h2>Welcome, {userInfo.name || 'User'}!</h2>
          <p>Email: {userInfo.email || 'No email provided'}</p>
          <p>User ID: {userInfo.id}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;