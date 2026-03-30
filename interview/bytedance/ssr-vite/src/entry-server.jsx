// 只要不涉及dom操作 ，就可以在服务端解析
import React from "react";
// ReactDOM 不可以
// react-dom 提供了server模块 可以渲染React组件为html字符串
// 后端 提供 api json数据格式
// 如今可以返回 text/html 
import { renderToString } from "react-dom/server";
import App from "./App.jsx";

export function render(){
    console.log('???');
    return renderToString(<App />);
}