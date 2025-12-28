## LLM 记忆

- llm api 调用和http请求一样，都是无状态的 ，两次请求无关联
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

## 多轮会话
- llm调用是无状态的
- 多轮会话 维护一个历史记录message，每次调用llm时，都带上历史记录
  - 维护对话
  - 滚雪球一样，token 开销变大
  
## memory AI 应用模块 langchain 提供