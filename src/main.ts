import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
// Assuming the SDK is imported as 'Sdk' and has an 'init' method
import { getSdk } from './sdk'; // Replace with actual SDK import path
import { setupCounter } from './counter'; // Replace with actual SDK import path


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <div class="login">
      <button id="login" type="button">登录</button>
    </div>
    <div class="login">
      <button id="parse" type="button">解析登录</button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)



var sdk: any
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
    document.querySelector<HTMLButtonElement>('#login')!.addEventListener('click', () => sdk.start())
    document.querySelector<HTMLButtonElement>('#parse')!.addEventListener('click', () => sdk.listenerLogin())
    // console.log(sdk.getSigninUrl());

});
