
class ClerkOAuthClient {
    private clientId: string;
    private clientSecret: string;
    private redirectUri: string;
    private authorizeUrl: string;
    private tokenUrl: string;
    private userInfoUrl: string;
    private discoveryUrl: string;
  
    constructor(config: {
      clientId: string;
      clientSecret: string;
      redirectUri: string;
      authorizeUrl: string;
      tokenUrl: string;
      userInfoUrl: string;
      discoveryUrl: string;
    }) {
      this.clientId = config.clientId;
      this.clientSecret = config.clientSecret;
      this.redirectUri = config.redirectUri;
      this.authorizeUrl = config.authorizeUrl;
      this.tokenUrl = config.tokenUrl;
      this.userInfoUrl = config.userInfoUrl;
      this.discoveryUrl = config.discoveryUrl;
    }
  
    startAuthFlow(): string {
      const params = new URLSearchParams({
        client_id: this.clientId,
        redirect_uri: this.redirectUri,
        response_type: 'code',
        scope: 'openid profile email',
        // You can add additional parameters if needed
      });
  
      return `${this.authorizeUrl}?${params.toString()}`;
    }
  
    async handleCallback(callbackParams: { code?: string }): Promise<AuthToken> {
      if (!callbackParams.code) {
        throw new Error('Authorization code is missing');
      }
  
      try {
        const response = await fetch(this.tokenUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: this.clientId,
            client_secret: this.clientSecret,
            code: callbackParams.code,
            grant_type: 'authorization_code',
            redirect_uri: this.redirectUri,
          }),
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Token exchange failed: ${errorText}`);
        }
  
        return await response.json() as AuthToken;
      } catch (error) {
        console.error('OAuth callback error:', error);
        throw error;
      }
    }
  
    async fetchUserInfo(accessToken: string) {
      try {
        const response = await fetch(this.userInfoUrl, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }
  
        return await response.json();
      } catch (error) {
        console.error('User info fetch error:', error);
        throw error;
      }
    }
  
    async refreshToken(refreshToken: string): Promise<AuthToken> {
      try {
        const response = await fetch(this.tokenUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: this.clientId,
            client_secret: this.clientSecret,
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Token refresh failed');
        }
  
        return await response.json() as AuthToken;
      } catch (error) {
        console.error('Token refresh error:', error);
        throw error;
      }
    }
  }
  
  // Updated types
  interface AuthToken {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    id_token?: string;
  }
  
  export { ClerkOAuthClient, AuthToken };