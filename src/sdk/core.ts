import Sdk from "casdoor-js-sdk";
import type { JwtPayload, } from "casdoor-js-sdk/lib/cjs/sdk";

export type CasdoorHiddenConfig = {
    serverUrl: string;
    clientId: string;
    appName: string;
    organizationName: string;
    redirectPath?: string;
    loginCallback: (
        accessToken: string,
        user: JwtPayload,
    ) => void
}

class CasdoorHidden {
    private loginCallback: (accessToken: string, user: JwtPayload) => void;
    private sdk: Sdk

    constructor(config: CasdoorHiddenConfig) {
        // config.redirectPath = config.redirectPath + '?'
        this.loginCallback = config.loginCallback
        if (!config.redirectPath) {
            config.redirectPath = ''
        }
        this.sdk = new Sdk({
            serverUrl: config.serverUrl,
            clientId: config.clientId,
            appName: config.appName,
            organizationName: config.organizationName,
            redirectPath: config.redirectPath,
        });
    }
    // 监控登陆状态
    listenerLogin() {
        const curr = new URL(window.location.href)
        // console.log(curr)
        const code = curr.searchParams.get('code')
        const state = curr.searchParams.get('state')
        if (code !== null && state !== null) {
            this.sdk.exchangeForAccessToken().then((resp) => {
                console.log(resp)
                if ((resp as any).error) {
                    alert('登录出错了，请重新登录')
                    window.location.href = location.origin + location.pathname
                    return
                }
                const token = resp.access_token;
                const result = this.sdk.parseAccessToken(token);
                this.loginCallback(token, result.payload)
            }).catch((err) => {
                console.log(err)
            })
            return true
        }
        return false
    }
    // 开启登录流程
    start() {
        this.sdk.signin_redirect()
    }

    getSigninUrl() {
        return this.sdk.getSigninUrl();
    }
}

export function getSdk(config: CasdoorHiddenConfig) {
    return new CasdoorHidden(config);
}