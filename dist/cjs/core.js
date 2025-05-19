"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSdk = getSdk;
const casdoor_js_sdk_1 = __importDefault(require("casdoor-js-sdk"));
class CasdoorHidden {
    constructor(config) {
        Object.defineProperty(this, "loginCallback", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "sdk", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // config.redirectPath = config.redirectPath + '?'
        this.loginCallback = config.loginCallback;
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
    listenerLogin() {
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
                this.loginCallback(token, result.payload);
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
    getSigninUrl() {
        return this.sdk.getSigninUrl();
    }
}
function getSdk(config) {
    return new CasdoorHidden(config);
}
