# MCP 

- llm with tools
  read write listDir exec tool
  tool + tools = agent
  甜头 llm 真的能干活了

- mini-cursor 
  mcp with tools 不太满意？
  怎么把llm 能干活的甜头扩大呢？ 更多的tools 更高的tool 第三方的tool，
  向外提供tool 大厂将在自己的服务以mcp的方式向外提供
  - 80% 的app会消失 
  - 集成第三方的 mcp 服务 mcp其实就是tool
  - node 调用java/python/rust 等其他语言的tool
  - 远程的tool
  
## MCP
Model Context Protocol Anthropic
在大量的本地 跨语言 第三方的tool 集成到Agent里面的时候，让llm强大的同时，也会带来一定的复杂性(对接联调)
大家都按照一个约定来对接 

按照 MCP 协议 来开发 将我们的服务或资源输出出去
MCP 协议 还有通信部分
 - stdio 本地命令行
 - http 远程调用

MCP 最大的特点就是可以跨进程调用工具
  - 子进程 node:child-process
  - 跨进程 java/rust
  - 远程进程
  让 llm 干更强大的任务
  但是环境会比较繁杂: 本地 跨语言 远程 不同的通信方式(stdio http)
  所以 规范的提供工具和资源 非常有必要
  即诞生 MCP 协议

## 编写满足mcp协议规范的Tool

- Model Context Protocol
  本质为 tool ，返回的 result 成为 ToolMessage Context 上下文
- Anthorpic 24年底 25年 已经贡献给开源社区
- sdk @modelcontextprotocol/sdk 

- mcp怎么配置
  - cursor/trae 编程Agent 支持mcp client
  - 读取mcp.json 需要的mcp tool 
- 手写MCP tool
  - tool的基础上加上MCP 规范
  - tool需要一个server 容器 
  - @modelcontextprotocol/sdk/server/mcp 提供
  - registerTool
    description 会描述此mcp功能，方便client 调用
  - connect transport 连接

## mcp 三者关系

- mcp hosts
    cursor/vite Agent host 
- mcp clients
    mcp 规范的tools 调用者
- mcp server 
    mcp tool 运行的服务器容器

- 工作流程
  - MCP hosts 配置文件 (SDD 规范驱动编程)
  - initialize 发送一起请求
    得到mcp server 提供的 tools 列表和详情 
  - host 得到prompt 任务
  - 检索 mcp 配置文件
  - client tool 通信方式 
  - 调用mcp server 执行并返回结果
  - llm ToolMessage 

## MCP 开发流程
- new McpServer 创建了一个mcp server 实例
- server，register Tool/Resource/Prompt 名字 描述 函数
- 通信方式 StdioserverTransport HttpServerTransport 
- server connect(transport) 连接通信方式
- host mcp 配置

## mcp 直接入住Agent 程序
- 怎么把 mcp tools 集成到Agent程序里面呢？
  mcp 是可拔插的