export interface OAuthClient {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
}
export interface AuthToken {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
}
//# sourceMappingURL=types.d.ts.map