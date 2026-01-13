# AI 全栈项目

## 技能点
### react 开发全家桶
- react + typescript(JS超级)
- react-router-dom(前端路由)
- zustand(中央状态管理)
- axios(http请求库)
### 后端
- node + ts
- nestjs 企业级别后端开发框架
- psql 数据库
- redis 缓存数据库
### AI
- langchain 
- coze/n8n
- llm 
- tare/cursor
### 项目安排
- frontend 
- backend
- ai_server
- admin 后台管理系统

## git操作
- 全新的实战项目 
  git init
- 提交的时机
  每次完成一个相对独立的模块化后，就提交一次。
  提交信息要清晰准确完整，方便后续查看。

## react 全家桶
### react-router-dom
- 前端路由
早期前端没有路由，路由由后端控制，前端是切图仔。
前后端分离后，前端有独立的，基于html5的路由，实现页面切换。
- 两种形式
  - hash路由 #/ 丑一点 很温柔 兼容性好 url里的一部分 锚点
  - browser路由 / 和后端路由一样 需要使用到html5的history api 兼容差，
    ie11之前不兼容(vue3之前)，现在的浏览器都支持
- as Router 增强可读性 取别名
- 性能，要快 页面组件的懒加载
  / 访问Home 时不需要用到 About，所以延迟一下About的加载。 动态引入
  /About 访问About 时才加载About

### 路由有多少种
- 普通路由
- 动态路由(带参数)
- 通配路由(/*) 匹配所有路由 404 页面
- 嵌套路由 Outlet 子路由占位符 
    <Outlet> 是 React Router DOM 中的组件，用于在父路由元素中渲染其子路由匹配到的内容。
- 鉴权路由(路由守卫) ProtectRouter 
  鉴权路由是指在路由中添加一个中间件，用于判断用户是否登录。
  如果用户未登录，就跳转到登录页面。
  如果用户已登录，就继续渲染路由匹配到的组件。
- 重定向路由 redirect Navigate 

### 路由生成访问历史 
  访问历史 history 使用一个栈存储history 先进后出
  replace redirect 跳转，会替换废弃的旧的历史记录

### 单页应用
- 传统的开发是多页的，基于http请求，每次url改变时，就去服务器重新请求整个页面、
  体验差，页面会白一下
- 移动端时代，单页应用 react-router-dom html5 history 模式
  前端路由
  路由改变后，页面不会全部重新刷新，前端收到一个事件，将其配的新路由显示在页面上
