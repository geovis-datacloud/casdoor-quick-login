import type { JwtPayload } from "casdoor-js-sdk/lib/cjs/sdk";
export type CasdoorHiddenConfig = {
    serverUrl: string;
    clientId: string;
    appName: string;
    organizationName: string;
    redirectPath?: string;
};
declare class CasdoorHidden {
    private sdk;
    private config;
    constructor(config: CasdoorHiddenConfig);
    listenerLogin(loginCallback: (accessToken: string, user: JwtPayload) => void): boolean;
    start(): void;
    logout(): void;
    getSigninUrl(): string;
}
export declare function getSdk(config: CasdoorHiddenConfig): CasdoorHidden;
export {};
