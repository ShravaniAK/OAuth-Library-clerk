"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClerkOAuthClient = void 0;
class ClerkOAuthClient {
    constructor(config) {
        this.clientId = config.clientId;
        this.clientSecret = config.clientSecret;
        this.redirectUri = config.redirectUri;
        this.authorizeUrl = config.authorizeUrl;
        this.tokenUrl = config.tokenUrl;
        this.userInfoUrl = config.userInfoUrl;
        this.discoveryUrl = config.discoveryUrl;
    }
    startAuthFlow() {
        const params = new URLSearchParams({
            client_id: this.clientId,
            redirect_uri: this.redirectUri,
            response_type: 'code',
            scope: 'openid profile email',
            // You can add additional parameters if needed
        });
        return `${this.authorizeUrl}?${params.toString()}`;
    }
    async handleCallback(callbackParams) {
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
            return await response.json();
        }
        catch (error) {
            console.error('OAuth callback error:', error);
            throw error;
        }
    }
    async fetchUserInfo(accessToken) {
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
        }
        catch (error) {
            console.error('User info fetch error:', error);
            throw error;
        }
    }
    async refreshToken(refreshToken) {
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
            return await response.json();
        }
        catch (error) {
            console.error('Token refresh error:', error);
            throw error;
        }
    }
}
exports.ClerkOAuthClient = ClerkOAuthClient;
//# sourceMappingURL=index.js.map