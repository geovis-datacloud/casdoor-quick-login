
## Quick Use
```javascript
import { getSdk } from './geovisearth-offline-users';

const sdk = getSdk({
    serverUrl: "http://192.168.0.1:8000",
    clientId: "clientId",
    organizationName: "organizationName",
    appName: "appName",
    loginCallback(accessToken, user) {
        // 存储accessToken
        console.log('拿到token了', accessToken, user)
        // 展示用户信息
        console.log('这是用户信息', user)
    },
})
// 监听页面加载完成，自动处理登录回调
window.addEventListener('load', () => {
    sdk.listenerLogin()
});
// 启动登录流程
sdk.start()


```

