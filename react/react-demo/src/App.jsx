import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  BrowserRouter as Router, 
  // html5支持的前端路由  和后端路由是一样的 纯 现代化 低端的浏览器不支持
  // HashRouter as Router,
  // # 路由形式之一 as 别名 有点丑 带# 早期使用
  Link //a 不能用了 用Link 代替 内部消化
} from 'react-router-dom';
import AppRouters from './router';



function App() {
  return(
    // 路由接管一切
    <Router>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
    <AppRouters/>
    </Router>
  )
}

export default App
