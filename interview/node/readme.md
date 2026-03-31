# node 了解多少

相比于java/go，node 借助于v8引擎在服务器端，将js带到了后端开发，轻量(express/koa),高效(中间件)生态丰富，稳居大前端全栈(BFF层 Backend For Frontend)主流。适合接口转发、实时通信、ai网关与管理后台开发

node 特性是单线程高并发、异步无阻塞 （单线程简单，IO、网络请求等耗时任务，不会卡住等待，立即放入event loop，然后马上切换处理新需求，少量线程就能抗成千上万的并发连接），服务器开销是java的一半
51506
我对node的核心模块比较熟悉 如 fs文件模块，path路径模块，http模块等。对node的事件循环机制、异步模型(Promise/async-await) 有比较多的实操。

在后端开发上，我是基于Restful 思想做服务设计，熟悉MVC分层。最近再使用nestjs做后端开发，天然支持模块化和依赖注入

数据库主要使用Mysql和PostgreSQL，使用过prisma orm开发。 

我会基于langchain做ai接口开发，比如封装了llm调用、构建工具调用(Tool类) ，可以实现Agent开发流程。

我写了一个Rag项目，了解文档切分、向量化、向量数据库存储、检索、增强的细节，完成了对知识库的rag。

我从node基础能力到nestjs工程化及企业级开发，再到ai和agent都有学习和项目经验，我相信可以较快速的加入公司的Ai agent或openclaw相关项目中

- readFile/writeFile Promisify thenable 不用调用回调
  readFileSync 阻塞式
- createReadStream   pipe 流式输出

- BFF层
  mockjs/express/koa 前端自己做
  基于go/java 的接口，针对自己的业务做调整...

## nodejs event loop 
- event loop 是JS执行机制，node和前端的event loop本质相同，都是基于事件驱动的异步模型，但实现细节不同。
  
- 前端(浏览器)的event loop 主要分为宏任务(script\setTimeout\setInterval)和微任务(Promise),
  每轮循环先执行宏任务，在清空微任务队列，并去渲染更新或响应用户。
  宏任务(script开始) -> 清空微任务队列 -> 渲染 -> 取出一个宏任务执行 

- nodejs (服务器、操作系统、文件系统、数据库) 更复杂，事件循环分为多个阶段：
  timers(定时器)、poll(文件、网络)、check(poll之后都会来核查)，同时也有promise、process.nextTick 微任务(属于每个阶段)。
  timers -> poll(轮询IO，文件，网络，数据库) -> check(poll 空闲结束后，强制进入此阶段核查执行)  每个阶段后 都会清空微任务 microtask

  node 偏多阶段调度，前段更偏宏微任务模型。