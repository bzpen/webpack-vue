// const app = document.getElementById('app')
// app.textContent = '你妈贵姓？'

import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App) // 创建一个vue实例

app.mount('#app') // 挂载到id为app的元素上
