# 现代前端开发**工程化**

- npm init vite
  新建项目
  vite ?
  vue作者尤雨溪开发的现代前端**构建**工具,他利用浏览器原生的es模块实现极速的冷启动和热更新，大幅提升开发体验(快)
  - 得到一个比较标准的项目开发模版
    优秀的架构

## 优秀架构
- vite 会将根目录下index.html作为首页启动
  #root组件的挂载点
  App.vue
- vite 为了构建,是具体业务开发之前的基石
  - 返回了一个项目开发模版
  - npm i 安装依赖
    package.json
    vite 构建的大管家
    - 开发的是前端项目 vue3 src/ 前端开发目录
    - vite 基于node的
      npm i vite
      npm run dev
    - localhost:5173 启动项目
    - 自动打开浏览器 node操作os
    - 热更新 监听任何文件修改 浏览器自动刷新

- src/ 前端开发目录
  - main.js 入口文件
  - App.vue 根组件
  - components/ 组件目录
    - HelloWorld.vue 组件
  - style.css 全局样式
  
- volar是vue官方的vscode插件，提供了vue3的语法高亮和智能提示，以及代码补全功能
- vue devtool chrome插件

## 多个页面呢？
  vue-router 
  npm i vue-router
  - 配置路由
  - 新建页面
    views/
  - 切换
