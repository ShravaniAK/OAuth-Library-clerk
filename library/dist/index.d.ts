declare class ClerkOAuthClient {
    private clientId;
    private clientSecret;
    private redirectUri;
    private authorizeUrl;
    private tokenUrl;
    private userInfoUrl;
    private discoveryUrl;
    constructor(config: {
        clientId: string;
        clientSecret: string;
        redirectUri: string;
        authorizeUrl: string;
        tokenUrl: string;
        userInfoUrl: string;
        discoveryUrl: string;
    });
    startAuthFlow(): string;
    handleCallback(callbackParams: {
        code?: string;
    }): Promise<AuthToken>;
    fetchUserInfo(accessToken: string): Promise<any>;
    refreshToken(refreshToken: string): Promise<AuthToken>;
}
interface AuthToken {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    id_token?: string;
}
export { ClerkOAuthClient, AuthToken };
//# sourceMappingURL=index.d.ts.map