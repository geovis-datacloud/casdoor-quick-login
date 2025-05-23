
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

### 二、 静默登录
>    静默登录会在后台自动同步用户的登录信息，不会跳转页面   
>    不会打断用户的正常体验流程     
>    你可以在页面加载完成后启用静默登录     
```javascript
    window.addEventListener('load', () => {
        sdk.silentSignin(
            (msg) => {
                console.log('收到成功消息', msg)
            },
            (msg) => {
                console.log('收到失败消息', msg)
            },
        )
    });
```

### 三、 联合使用
>    你可以将跳转登录与静默登录联合使用，     
>    实现当用户已经在其他平台登录时，页面可以自动登录，     
>    如果用户还未登录，也可以自动跳转登录页面。
```javascript
    window.addEventListener('load', () => {
        sdk.silentSignin(
            (msg) => {
                console.log('收到成功消息', msg)
            },
            (msg) => {
                console.log('收到失败消息', msg)
                // 静默登陆失败，启动跳转登录
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
            },
        )
    });
```

### 四、 注销
> 请自行编写本地注销逻辑，例如清理本地存储的token等，然后再执行sdk的注销逻辑    
> 注销后会跳转到登录页面
```javascript
    // 先执行本地注销逻辑
    localLogout()
    sdk.logout()
```