# 字节面试

## web socket 和sse 区别

- 面试官心理
  - sse 是llm流式输出 当下业务热点
  - 408 计算机网络 协议底层的理解
  - 类比
    共同点
    都有多次信息反馈 实时推送数据
    均基于长连接
  - 前端熟悉的是http协议，但还需要跨协议开发的经验
  - web socket 是html5的用于即时通讯
    适合聊天 游戏场景 socket 协议 （qq 微信 端游） 
    Client/Server 架构 实时通讯
    Browser/Server 架构 浏览器

### web socket 
- web + socket 
  Socket 基于tcp/ip 的实时通讯双工（两端都可以发送和接收）协议 
  web + html5 提供的新特性 在web也可以进行实时通讯了
  websocket 是一种浏览器和服务区之间的建立“长连接”的协议，可以实现双向实时通讯 

### 项目的需求分析
chat-app 聊天应用 
- http协议不适合
  是基于请求(一次)响应(一次)的，要获得最新的聊天内容，必须重新访问服务器(刷新页面)
- sse也不适合 
    服务器推送，单向持续推送，没办法做到用户端的持续推送
    只适合用户和llm聊天，prompt一次，llm流式输出
- socket协议 多对多
  双工协议 
  - 实时的接受消息
  - 实时的发消息 
  - 多人同步
- 如果硬要基于http协议 可以实时通信吗？
  一定要遵守 拿新内容 一定要走服务器
  fetch/ajax dom 动态更新
  使用轮询 setInterval() 性能差 复杂
  http + loop ajax 类实时聊天的功能
- websocket 一次连接 持续通信
  服务器端和用户端都可以主动推动

  - websocket 细节
    - koa + koa-websocket 中间件
    - new Koa() listen 3000
    - app.use(middleware 就是一个函数 在用户请求进来时执行)
    - ctx 是请求响应上下文 
    - 第一次和服务器之间的通信用http协议，拿到页面
    - 之后就是socket 协议
        client new websocket('ws://localhost:3000/ws')
    - 消息机制 实时通讯 (广播 服务器端维护了连接数组) 
      on
      send
    - 101 Switching Protocols 
      new websocket() 以后切换成socket 协议 

- 基于请求和相应的http 短连接 是要断开的
  keepAlive 不断开 其他的同domain资源可以复用通道
  http 2.0 多路复用 tcp/ip 连接是有开销的
- websocekt 长连接 持久化双向通道
- SSE 长连接 持久化单行通道
- 通信方式
  HTTP（客户端发起，服务端响应）
  SSE（仅服务端向客户端推送）都是单向的
  websocket 双向 (全双工 客户端和服务器均可主动发送)
- 数据格式
  HTTP无限制（文本、二进制、JSON等）
  ws 二进制或文本帧 
  sse 仅限文本 通常为 json或纯文本
- 协议类型 
  HTTP/1.1, HTTP/2, HTTP/3 
  WebSocket 协议(ws:// 或 wss://)
  SSE HTTP 协议 (text/event-stream)
- 浏览器兼容性 
  HTTP 完美支持所有浏览器
  WS 支持所有现代浏览器
  SSE 不支持 IE，现代浏览器支持良好(fetch + readStream blob) 

## 介绍心跳机制
- 长连接开销大
- 客户端和服务端互相定期报平安 ，用来检测连接是否活着。
  打个比方 异地恋 两个人打电话
  你在吗？ 心跳  不在 断开
  为什么需要心跳？ 因为websocket/sse 都是长连接
  - 网络断了
  - 用户掉线
  - 必须主动检测连接状态 ping/pong 心跳机制的测试

- 实现的方式
  - 客户端发送
    setInterval(()=>{
        ws.send(JSON.stringify({type:'ping'}))
    },3000) 30秒
  - 服务器端收到
    if(msg.type === 'ping'){
        ws.send(JSON.stringify({type:'pong'}))
    }
  - 三步
    定时发送ping
    接收响应pong
    超时判断 + 重建机制

## 了解SSR吗？ 
- CSR  
  Client Side Render（客户端 渲染react component）
  致命缺点 对SEO 不友好 只有一个 #root 挂载点 没有html内容
  会先返回一个空壳的html(#root) 由浏览器通过js渲染页面
  优点是交互流畅(路由，单页应用SPA，局部更新无刷新交互，避免了页面重载) 
  前后端分离 开发简单 (mockjs + spa + zustand) 
  缺点也很明显 首屏加载慢 (CSR 需要下载解析js并请求后端数据后渲染，过程串行阻塞导致首屏白屏时间长 相对于ssr 服务器端编译和取数据)
  优化 可以通过路由懒加载 骨架屏 二次之后有缓存秒杀ssr
  seo不友好，因为初始html几乎没有内容
- SSR
  Server Side Render（服务端渲染掉）  
  react本质为 js node运行
  react component state + jsx 在服务器node运行，事件、生命周期到时候再在前端运行
  SSR是指React在服务器端将组件和数据渲染为完整的html字符串后再返回给浏览器
  ssr优点是首屏加载快，seo友好 缺点是服务器压力大 开发复杂度高
  hydration 水合 把静态页面变成可交互的页面 
  拿着已有的html，让js重新跑一遍 把事件等粘上去

- 业务场景的选择
  CSR 适合做后台管理系统(自己人用，不需要seo)、强交互应用(canvas,工作流)、IOS/Android(原生做壳子，硬件支持 拍照 蓝牙 陀螺仪，性能要求极高，不用适配两套) 很多页面是用WebView (chrom 内核)
  移动端时代流量入口不再是百度等搜索引擎

### 手写SSR
- index.html
  #root 用 <!-- app-html --> 注释 
- express httpserver 董事长
- vite 擅长react工程化 包工头 
  fs.readFileSync(index.html)
  vite.transformIndexHTML  
  vite.ssrLoadModule()
  调用render方法得到组件html字符串，替换注释标记 
- react
  服务器端运行 编写各个组件
- react-dom
  react-dom/server renderToString 方法 把组件渲染为字符串
  react-dom/client hydrateRoot 方法 水合渲染
- App.jsx 组件本身 
- entry-client.jsx 
  调用react-dom/client hydrateRoot 方法 水合渲染
  将服务器返回的静态页面变成动态的可交互的页面
- entry-server.jsx 
  提供render方法 给server.js 调用
  不会执行时间监听等前端任务

- 水合就是浏览器把服务端生成的HTML“接管”过来，
  React再跑一遍对比结构，不重建DOM，只绑定事件和状态，让页面变成可交互。 
  发生在浏览器,浏览器并行下载 `<script>` 标签指向的 React 代码。执行水合

- SSR开发框架 next.js 