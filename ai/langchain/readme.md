# langchain

2022 hatGPT 横空出世 ransformer 架构 aigc
langchain 比chatGPT 还早 推出了 1.0+版本
AI 应用开发框架

## langchain = lang + chain
language LLM 
chain ?  n8n coze node 链接起来

node 开发的

- 项目使用esm
  package.json  type: module
  - pnpm i @langchain/deepseek llm 变得可拔插
    llm 性价比、更新换代频繁
    适配器
  - langchain 统一接口
    completion
    chat
  - pnpm i @langchain/core 许多 核心类、工具 都在这个包中

## prompt
  - Prompt 是连接人类意图与大模型能力的桥梁 可以决定模型输出质量
  - 模版化管理
  - langchain中
    - PromptTemplate
    - ChatPromptTemplate

## outputParser
  - llm 输出的结果不是我们想要的格式(json)，我们需要对其进行解析
  - 确保 LLM 输出符合预期格式，并能被代码安全使用。
    - zod 校验输出格式
      - 运行时验证输出是否合法
      - 使用 Schema 自动解析+抛出清晰错误
      - 编译期类型+运行时校验统一
      - 支持对象、数组、联合、递归等复杂结构
    - 转换为 JSON Schema 并用于 Prompt
  - 最终你得到的是一个类型安全、经过验证的对象，可以直接用于后续业务逻辑

## memory
- llm api 调用和http请求一样，都是无状态的 ，两次请求无关联
- Memory 是构建真正智能对话系统的基础
- 怎么让llm 有记忆 ？
  维护一个对话历史记录，每次请求都带上历史记录，llm 就会根据历史记录生成下一个回复
  message = [
    {
      role:'user',
      content:'我叫张三，喜欢吃橙子'
    },
    {
      role:'assistant',
      content:'好的，张三，我会记住你喜欢吃橙子'
    }
    {
        role:'user',
        content:'我叫什么名字'
    }
    {
        role:'assistant',
        content:'你叫张三'
    }
  ]

- 多轮会话 维护一个历史记录message，每次调用llm时，都带上历史记录
  - 维护对话
  - 滚雪球一样，token 开销变大
  
- memory AI 应用模块 langchain 提供
  - RunnableWithMessageHistory
  - InMemoryChatMessageHistory



