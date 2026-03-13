# Agent 记忆模块

- Rag 太重要了 对llm的能力
  - 最低的成本 (embedding) 丰富了llm的精准(cosine)上下文
  - 大模型的微调(finetue)也可以提升LLM 的能力，但是花费巨大 巨复杂
    成本高 蒸馏 

- llm 的扩展
  llm + tool(干活) + rag(知识库 Context) + memory(记忆)

- memory  是基石
  messages 数组 最基础的memory 
  tool ? 基于memory 调用tool时 llm需要有memory 来记忆 调用的原因、过程(tool_calls)、结果， Toolmessage
  rag ?  Pormpt的增强 上下文 基于memory 来记忆 之前的对话，来提供更准确的回答。对话的历史也变成了rag的一部分，越养越聪明 能力的积累 
- 和llm的对话 是无状态的 Stateless 
  - 好处 让 llm 变得简单 因为他是会消费算力 电力 高并发的基础设施
    只要基于请求 就能 AIGC 
  - 像是http 
    http 头里 带上了 cookie Authorization 才能记住 
  - 他根本就不懂我 而是我带上了memory 来记忆 之前的对话 
    messages 数组 记录 
- ModelWithTools
  messages 数组放入了 SystemMessage 告诉他的角色，功能
  然后放入HumanMessage 用户的问题 (干什么)
  基于智能循环判断tool_calls
  将Tool 的返回结果，Too LMessage再加入message
  利用了Memory把需要多轮对话的复杂任务，无状态的大模型也能搞定

- 单纯的messages 数组很简单 当时也有问题 
  - context越来越长 ，token开销越来越多，触犯到上下文窗口最大值
  
- 解决方案
  - 截断 只保留最近的对话 ，丢弃旧的对话 slice(-max_tokens)  最近最关心的对话还在 滑动窗口 LRU 最近最少使用算法
    但是 会丢失 之前的对话 上下文
  - 将要截断的messages总结一下 (summarize) 再push进messages数组
    当前的多轮对话中 memory机制够用
  - 检索 (先存起来 数据库 文件) 之前的对话总结 (作为上下文、知识库) ，基于 rag 来增强 llm回答
    cursor 等 超越当前对话，将之前对话存储，rag 利用的场景
    AI Agent越来越懂我们 

    清空messages 重新开始 
    因为memory 有时也会是阻碍 新的任务 节省token

    - cursor 通过messages 计算toke的开销
      40%  0%
    - 自动触发总结 summarize
    - 手动触发 
      /compact
      /clean
      又能vibe coding 又能省token的 ai工程师

## FileSystemChatMessageHistory
- cursor 的messages history 实现方案
  - session 会话 代表一次交流、会话过程 有一个主题 
    - js
    - 算法
    - 手写题
    - AI
    都是一个个不同的session 
  - 全新主题，就新开一个session 
  - 持久化存储 messageHistory
  - 可以根据sessionId 恢复之前的对话 继续chat
  - 理解 实现了cursor 的memory 的持久化功能 
  
## 截断