console.log('hello client');
import React from "react";
// 水合的过程 服务器端的静态html 字符串 变成可交互的页面
// 在前端在执行一次 会比较一下 有无改变 ，如果一样，只需要事件绑定
import { hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
// 水合渲染
hydrateRoot(document.getElementById('root'),<App />);