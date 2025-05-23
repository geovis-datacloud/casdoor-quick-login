import type { JwtPayload } from "casdoor-js-sdk/lib/cjs/sdk";
export type CasdoorHiddenConfig = {
    serverUrl: string;
    clientId: string;
    appName: string;
    organizationName: string;
    redirectPath?: string;
};
export type SilentSigninMessage = {
    tag: "Casdoor";
    type: "SilentSignin";
    success: boolean;
    user?: any;
    accessToken?: any;
};
declare class CasdoorHidden {
    private sdk;
    private config;
    constructor(config: CasdoorHiddenConfig);
    listenerLogin(loginCallback: (accessToken: string, user: JwtPayload) => void): boolean;
    start(): void;
    silentSignin(onSuccess: (msg: SilentSigninMessage) => void, onFailure: (msg: SilentSigninMessage) => void): void;
    logout(): void;
    getSigninUrl(): string;
}
export declare function getSdk(config: CasdoorHiddenConfig): CasdoorHidden;
export {};
