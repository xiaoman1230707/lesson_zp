//严格模式(StrictMode) 执行两次 console.log(count)
//一次执行 一次测试 review代码
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//vite可以帮我们做 编译styl为css
import './index.styl'//全局样式 stylus
//将App组件挂载到root元素中 渲染 render
import App from './App.jsx'//引入了组件

createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <App />,//jsx 函数组件的名字 类html标签 自定义组件
  //</StrictMode>
)
