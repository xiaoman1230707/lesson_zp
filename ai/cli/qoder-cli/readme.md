# qoder-cli
命令行 AI coding Agent
基于阿里qwen 编程大模型 构建AI Agent的命令行框架

- 安装 
  npm i -g @qoder-ai/qodercli

- /init 初始化项目 AGENTS.md
  AI开发项目 给llm提供 项目规矩上下文

## Tare/cursor 还需要一个qoder-cli ，claude-cli
  未来的**开发界面**不会只有IDE，还会有cli，最好的是两者融合
  IDE适合深度上下文与复杂任务处理
  CLI具备速度，灵活性与自动化能力
  双AI引擎的AI编程模式
  端到端的AI自主开发模式

## mcp Model Context Protocol
  MCP让AI应用以统一的方式向大模型提供结构上下文(如工具、文档、数据库)

## context7
当llm生成的代码是老版本或不太行的时候 context7来了
context7 mcp服务，在生成代码指令发出前，带上指定版本的库的文档作为上下文