
## Quick Use

### 一、 跳转登录

1. 监听登录信息
```javascript
import { getSdk } from 'geovisearth-offline-users';

const sdk = getSdk({
    serverUrl: "http://192.168.0.1:8000",
    clientId: "clientId",
    organizationName: "organizationName",
    appName: "appName",
    // 可以省略，省略将会跳转回设定的默认callback页面
    redirectPath: "callback",

})
// 在callback页面监听页面加载完成，自动处理登录回调
window.addEventListener('load', () => {
    sdk.listenerLogin((accessToken: string, user: any) => {
        // 请自行存储user和token信息，以及后续逻辑
        console.log('拿到token了', accessToken, user)
        console.log('这是用户信息', user)
    })
});
```

2. 跳转登陆页面     
>    你可以通过登录按钮，点击后启动登录流程      
```javascript
    document.querySelector<HTMLButtonElement>('#login')!
    .ddEventListener('click', () => sdk.start())
```
>   也可以在监听登录信息之后直接启动登录流程
```javascript
    window.addEventListener('load', () => {
        const event = sdk.listenerLogin((accessToken: string,user:any) => {
            console.log('拿到token了', accessToken, user)
            console.log('这是用户信息', user)
        })
        if (event) {
            console.log('已经登录了')
        } else {
            // 将start逻辑放置于监听登录回调之后，避免陷入登录循环
            console.log('没登录，启动登录流程')
            sdk.start()
        }
    });    
```

### 二、 注销
> 请自行编写本地注销逻辑，例如清理本地存储的token等，然后再执行sdk的注销逻辑    
> 注销后会跳转到登录页面
```javascript
    // 先执行本地注销逻辑
    localLogout()
    sdk.logout()
```