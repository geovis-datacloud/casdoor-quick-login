"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSdk = getSdk;
const casdoor_js_sdk_1 = __importDefault(require("casdoor-js-sdk"));
// export type SilentSigninMessage = {
//     tag: "Casdoor",
//     type: "SilentSignin",
//     success: boolean,
//     user?: any,
//     accessToken?: any
// }
class CasdoorHidden {
    constructor(config) {
        Object.defineProperty(this, "sdk", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // config.redirectPath = config.redirectPath + '?'
        this.config = config;
        if (!config.redirectPath) {
            config.redirectPath = '';
        }
        this.sdk = new casdoor_js_sdk_1.default({
            serverUrl: config.serverUrl,
            clientId: config.clientId,
            appName: config.appName,
            organizationName: config.organizationName,
            redirectPath: config.redirectPath,
        });
    }
    // 监控登陆状态
    listenerLogin(loginCallback) {
        const curr = new URL(window.location.href);
        // console.log(curr)
        const code = curr.searchParams.get('code');
        const state = curr.searchParams.get('state');
        if (code !== null && state !== null) {
            this.sdk.exchangeForAccessToken().then((resp) => {
                console.log(resp);
                if (resp.error) {
                    alert('登录出错了，请重新登录');
                    window.location.href = location.origin + location.pathname;
                    return;
                }
                const token = resp.access_token;
                const result = this.sdk.parseAccessToken(token);
                const user = result.payload;
                user.avatar && (user.avatar = this.config.serverUrl + user.avatar);
                loginCallback(token, result.payload);
            }).catch((err) => {
                console.log(err);
            });
            return true;
        }
        return false;
    }
    // 开启登录流程
    start() {
        this.sdk.signin_redirect();
    }
    // silentSignin(onSuccess: (msg: SilentSigninMessage) => void, onFailure: (msg: SilentSigninMessage) => void) {
    //     const iframe = document.createElement('iframe');
    //     iframe.style.display = 'none';
    //     iframe.src = `${this.getSigninUrl()}&silentSignin=1`;
    //     let called = false
    //     const handleMessage = (event: MessageEvent<SilentSigninMessage>) => {
    //         if (window !== window.parent) {
    //             return null;
    //         }
    //         const message = event.data;
    //         // { tag: "Casdoor", type: "SilentSignin", data: data }
    //         if (message.tag !== "Casdoor" || message.type !== "SilentSignin") {
    //             return;
    //         }
    //         // 静默登陆成功
    //         if (message.success) {
    //             message.user.avatar && (message.user.avatar = this.config.serverUrl + message.user.avatar)
    //             onSuccess(message);
    //         }
    //         // 静默登陆失败
    //         else {
    //             if (called) {
    //                 return;
    //             }
    //             called = true
    //             onFailure(message);
    //         }
    //     };
    //     window.addEventListener('message', handleMessage);
    //     document.body.appendChild(iframe);
    // }
    logout() {
        this.sdk.signin_redirect();
    }
    getSigninUrl() {
        return this.sdk.getSigninUrl();
    }
}
function getSdk(config) {
    return new CasdoorHidden(config);
}
