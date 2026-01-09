# Git 提交AI神器 

- 需求 
  - 规范的git 提交信息是很重要的
    - 项目的日志
    - 工作业绩的审核， 给leader看的
    - 新手可以向高手一样 高质量提交代码 (git 高级规范)

- 技术构成
  - 全栈项目
  - 前端 react + tailwindcss + axios
  - 后端 node + express 
  
- 前后端分离
  - server
    - 运行在服务器上
    - 提供api 接口，3000 端口 伺服
  
  - frontend
    在用户浏览器上运行(v8引擎，js运行的宿主)
    http://loclhost:5173 Web
  - AI 
    - ollama 本地部署开源大模型 deepseek-r1:8b GPU   reasoning 推理能力 
    - 像openAI 一样的API接口
     :11434 

## express
- node 老牌的敏捷开发框架
- app 后端应用 
- listen 3000 端口伺服 
- 后端路由 path
  网站本质是提供资源和服务的
  app.get('/hello',()=>{})
  http 是基于请求响应的简单协议
  http://localhost:3000/hello
  根据ip 找到服务器
  端口对应的是应用 express 
  此应用提供路由 path /htllo
  GET 资源的操作 CRUD 
  req 请求对象
  res 响应对象

- apifox/postman 测试api接口
  nodemon 边调试 边开发
- express 默认不支持解析json res.body
  - 加一个json解析中间件
  请求---中间件1---中间件2---...---响应 
- get 和 post 区别 
  - get 没有请求体
  - post 有请求体
- 中间件 
  - app.use(express.json());//解析json 格式的请求体 
- 响应头、响应体 
  - 1XX 请求中...
  - 200 OK 成功
  - 201 Created 资源创建成功
  - 3XX 重定向 redirect 
  - 400 Bad Request 合适的状态码 
  - 404 Not Found 资源不存在
  - 401 Unauthorized 未授权
  - 500 Internal Server Error 服务器内部错误

## 跨域
有风险
- 缅甸 跨域了
    www.baidu.com(用户安全) -> www.dy.com 
    http: (协议)  www.baidu.com (域名) :5173 (端口) 
  - 同源策略 直接放弃请求CORS Cross-Origin Resource Sharing 跨域资源共享
  - 端口不一样 也会跨域 非常的严格
    协议 端口 域名都要一样
    否则浏览器会 block 阻止请求
  - 解决跨域 日常问题 办护照
    pnpm i cors 
    // 引入跨域模块
    import cors from 'cors';
    // 配置跨域中间件
    app.use(cors());
  - 前端发起跨域接口请求(端口 port)， 需要数据
  - 浏览器为了普通用户安全 www.baidu.com 根据同源策略，如果跨域会block 阻止请求
  - 后端默认不开启跨域允许
    如果允许呢？就好像办了签证，浏览器放行  .use(cors())
