# 手写cursor最小版本 

- 千问点奶茶 豆包 元宝
  互联网计算向 ai Agent 推理 运行的一个划时代的产品 更复杂 更智能 更强大。
- OpenClaw 养虾
  一人公司 看起来不可能
  因为有 
  虚拟数字人 多Agent
  编程Agent(cursor) ppt 算账 市场
  将任务交给OpenClaw
  会将任务拆解 计划 找到一批需要的Agent 自动完成任务
  Mauns 企业版本的Agent
  而OpenClaw 是一个开源项目
  可以免费使用 也可以自己部署
- seedance 抖音视频的数据

- 从llm prompt engineering -> Agentic(智能) Engineering (全栈)
- AI Agent 如何打造？
  - 直接调用llm？ 获得智能 生成代码 LLM
    gemini 3.1 pro
  - 上周和他聊过的消息，是不是记不住？ Memory
  - 你让他帮你访问一个网页，做一些事情 Tool 
  - 你想让它基于公司内部的私密文档做一些解答 RAG 
  AI Agent = LLM + Memory + Tool + RAG

## Agent 是什么？
其实就是给大模型拓展了Tool和Memory，他本来就可以思考 规划，你给他用Tool扩展了能力，那么他就可以**自动**做事情，用Memory管理记忆，那就可以记住你想他记住的东西，该可以使用 检索增强生成(RAG) 查询内部文档来获取信息(context)

这样的一个知道内部知识 能思考规划 有记忆 能够帮你做事情的扩大后的大模型，就是一个Agent

## Tool 工具

### 用react 创建一个todoLIst
- 任务，期待Cursor 编程Agent完成
- llm 思考(thinking)，规划(planing) aigc生成代码
- tool 让llm扩展 有读写文件的能力 ，项目完成
- tool bash 执行命令

### Langchain
AI Agent 框架 提供了memory tool rag 等功能
后端功底(node) nest.js

AI Agent 全栈开发

### LLM with Tools

- llm 选择 
  qwen-coder
- tools
  [read,write,exec]
- pnpm i @langchain/openai 适配了常见的模型

### tool-file-read.mjs
使用langchain,zod,fs

user - agent - llm
user 向 agent 提任务要求，agent 把要求给到 llm。
llm 分析需求后发现自身无法完成要求，需要调用工具，则解析出请求工具的参数，返回带上了参数 和 调用工具的请求 给 agent。
agent 从请求中找到参数 调用工具 得到工具的结果，并将所有操作一并加入到 messages 中，重新请求 llm。
往复直到请求 llm 中没有工具的调用需要，那么意味着 llm 自身就可以解决所有问题了，返回结果给 agent。
agent 跳出判断调用工具的循环，将 llm 的结果返回给 user。
