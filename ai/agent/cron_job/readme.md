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
