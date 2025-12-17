# React 项目架构
- npm init vite
  - 从github上拉取项目模板
  - npm run dev  development 开发阶段
    vite 就是开发阶段的脚手架
    test 测试阶段
    production 上线阶段
    dev -> test -> production -> dev -> ...
    devDependencies 开发阶段的依赖 像 vite stylus 开发期间使用
      npm i -D ...安装在devDependencies 开发阶段
    dependencies 项目依赖 像 react react-dom
  - react 基建也交给vite
    - esm模块化 极致的冷启动
  
- 项目依赖
  vue 3.5.24
  react 19.2.0 第一的现代前端开发框架 响应式 组件化 数据绑定...
  react-dom 19.2.0
  vue = react(核心) + react-dom(component render dom)

- 引入路由
  - 安装路由
    npm i react-router-dom
  - 路由配置
  - 导航 页面级别组件
  