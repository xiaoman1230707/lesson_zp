# 定时任务

明早九点 帮我把最新关于open claw 的新闻 整理成一篇日报 发到我的邮箱。

- 日历安排的能力交给小龙虾 
- 网络搜索tool
- 写文章
- 发邮件

## 生成器

普通函数，进入调用栈，开始调用，就从头跑到尾
生成器函数 跑一些之后 遇到yield 就停下来，promise解决后 可以从暂停的地方继续跑 async await 的前身，也比较复杂

## RxJS  
用数据流的方式来处理异步事件
- JS里常见的异步方式
  - callback 回调地狱
  - Promise
  - generator/yield
  - event listener
  - async/await
以上是适合一次性的异步任务 
但是有很多异步任务是连续发生的事件 连续的异步事件
   - SSE 
   - 输入框输入
   - 鼠标移动
   - AI 流式
事件一 -> 事件二 -> 事件三 -> ... 
像一条河流 

## 流式输出
- nest.js + rxjs 实现服务器端 sse接口 
  - nest.js 以@Sse 装饰器模式 /ai/chat/stream
  - 本质是 设置了 Content-Type: text/event-stream Cache-Control: no-cache Connection: keep-alive Transfer-Encoding: chunked 等
  - Service 模块根据 langchain stream：true llm 流式响应
  - 使用rxjs from api 将llm流式响应转成一个Observable 对象
    pipe 一下mcp转成前端需要的data：chunk 格式
  - service 使用langchain tool 定义了 queryUserTool 等tool
  - llm 流式大模型响应 for await chunk of stream
  - chunk 不断地concat 合并
  - 判断fullAIMessageChunk.tool_call_chunks
    - 如果有 则调用 tool 调用
    - 没有 yield输出
  - 进入Agent loop 
    如果要调用工具 ，执行tool（args）
  - 直到结束 无工具调用

- 从llm流式拿到的chunk，我也要流式推送给前端，那么controller使用@Sse装饰器返回from 后的Observable 对象。
  service使用langchain提供的流式请求，得到一个AsyncIterable 对象，作为llm回复。
  for await of 他，每次都拿到一个chunk，并把他concat拼接起来得到完整的回复，每次得到chunk时可以判断，到此为止的回复里是否有工具调用请求，如果有，那就只做拼接；如果没有，那就直接yield立即推送给前端，实现流式输出。(一次llm的完整回复里的所有chunk，要么是普通文本，字段都有content；要么是工具调用请求，字段都有tool_call_chunks)
  此时拿到整个回复，他可能是工具请求，tool-calls 里的是json字符串，不是则为空。
  将此消息push进message数组，开始工具调用请求，为空则不调用，得到结果push进message数组。
  结束当前Agent loop循环，继续下一次循环。直到回复为空或者工具调用完成。
  

## Event Source
- html5 特性 
  - 语义化标签 seo
  - video/audio 标签 哔哩哔哩
  - canvas 游戏和3D 页游
  - 定位 Geolocation 经纬度 美团的点外卖
  - 表单增强能力 placeholder required type=’range‘ 范围 input 类型 
  - llm 流式输出 EventSource 自动接收服务器推送的的文本数据流
  - localStorage(几兆，长期存储)/sessionStorage(页面关闭就没了) 本地存储 cookie容量小
  - Web Worker JS 多线程
  - WebSocket 实时通信 双向通信
  - 拖放 API drag and drop
  - getUserMedia 摄像头 web 直播/视频
  - history API 前端路由 

## 深化Tool

- query_user
  把tool作为provide在module 里声明，和原有的service解耦
  再使用依赖注入的方式注入module.bindTools() 

## 邮件tool 
- 邮件服务
  服务器 提供http服务 (web server 3000|nginx 80 代理)，也提供邮件服务，数据库服务(3306) 监听在不同的端口上 
  pnpm i nodemailer(邮件npm) @nestjs-modules/mailer(nest接入nodemailer，生态很好) 
  - 发送的内容是邮件，不是text/html 
  - 传输？ 不用http，qq邮箱提供的SMTP服务 408 