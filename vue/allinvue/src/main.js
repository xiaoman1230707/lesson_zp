//vue createApp  创建一个App
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//现代前端应用
//组件化 响应式...
//和DOM编程say babye
import router from './router'
createApp(App)
.use(router)//启用路由
//挂载在根节点#app上
.mount('#app')
