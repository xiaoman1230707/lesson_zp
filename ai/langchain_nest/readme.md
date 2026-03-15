# Nest + langchain 实现AI 接口 
- 大多数的Agent 都是跑在后端服务上
  Nest + Langchain 开发Api 接口
- nest？
  nodejs + typescript 得主流的框架
  底层是 express 框架(轻量级)，
  提供了严谨的MVC、（前端是MVVM）DI(依赖注入 Dependency Injection)等架构特性

- 创建项目 
  - MVC 在哪里？
    后端的开发设计模式 
    Model Service 数据操作，远程RPC 调用
    View(前后端分离 后端看不到，由前端处理渲染) 
    Controller 控制器 参数校验和逻辑处理 
    module模块 会将Controller 和 Service(providers) import外部服务 rpc 调用
    组合起来 形成一个功能模块
    适合企业级开发
    - DI(依赖注入 Dependency Injection)
      是一种设计模式，用于实现松耦合的组件之间的依赖关系。
      它允许组件在运行时动态地获取其依赖的实例，而不是在编译时静态地指定。
      这样可以提高代码的可维护性、可测试性和可扩展性。
    - 装饰器模式 面向对象设计模式之一
      让函数或类快速通过装饰器增强功力
      是一种元编程技术，用于在不改变原有代码结构的情况下，为类、方法或属性添加额外的功能。
      它通过在代码中使用特殊的注解或装饰器函数，来实现对目标对象的增强。
      装饰器模式在 Nest 中得到了广泛的应用，用于定义路由、中间件、守卫等功能。
      它使得代码更加简洁、可读，并且符合面向对象的设计原则。
    - restful
      一切皆资源
      book(名词) + CURD(HTTP Method 动词) 
      GET /books 获取所有书籍

