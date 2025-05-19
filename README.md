
## Quick Use
```javascript
import { getSdk } from './geovisearth-offline-users';

const sdk = getSdk({
    serverUrl: "http://192.168.0.1:8000",
    clientId: "clientId",
    organizationName: "organizationName",
    appName: "appName",
    // 可以省略，省略将会跳转回设定的默认callback页面
    redirectPath: "callback",
    loginCallback(accessToken, user) {
        // 存储accessToken
        console.log('拿到token了', accessToken, user)
        // 展示用户信息
        console.log('这是用户信息', user)
    },
})
// 在callback页面监听页面加载完成，自动处理登录回调
window.addEventListener('load', () => {
    sdk.listenerLogin()
});

```

你可以通过登录按钮，点击后启动登录流程
```javascript
    document.querySelector<HTMLButtonElement>('#login')!.addEventListener('click', () => sdk.start())
```
也可以在欢迎页面load之后直接启动登录流程
```javascript
    window.addEventListener('load', () => {
        sdk.start()
    });    
```
假如start和listenerLogin放在同一个页面中，请这样使用
```javascript
window.addEventListener('load', () => {
    sdk = getSdk({
        serverUrl: "http://192.168.0.1:8000",
        clientId: "clientId",
        organizationName: "organizationName",
        appName: "appName",
        loginCallback(accessToken, user) {
            console.log('拿到token了', accessToken, user)
            console.log('这是用户信息', user)
        },
    })
    // 将start逻辑放置于监听登录回调之后，避免陷入登录循环
    if (!sdk.listenerLogin()) {
        sdk.start()
    }
});
```

