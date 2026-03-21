# skills

## MCP
  Model Control Protocol 标准协议 让AI连接外部世界(工具/API/PromptTemplate/文档)
    mcp 把tools伸向了外界 向了服务器
  Mcp解决的是能做什么，却无法替代人类或高级智能体所具备的复杂情景判断，创造性策略制定或领域模糊问题

  llm with tool 执行任务
  mcp将原有的服务提供给了llm 写server 用nestjs  为mcp提供的sdk
  sdk @tool 工具
  @Prompt prompt 模版
  @resource 资源

  SKILLS 技能 Anthropic
  - 文件夹 比如ppt专家
    - SKILL.md 必须的  含有复杂的Prompt 技能声明
    - scripts 文件夹
      完成任务
    - 资源
SKILLS 等于 可复用的AI专业能力包 (Prompt + 规划 + 工具 + 资源)

类比：       
  Prompt 一次性对话 无状态的 RAG 增强 TOOL 做任务
  SKILLS 可复用的工作经验 
  小龙虾安装各种Skills 自动化工作

- 为什么SKILLS 会火
  1. 传统Prompt 的问题
   帮我写一个RRD
   问题：
   - 每次都要重复描述
   - 不稳定
   - 不可复用
  2. skills 解决了什么
   - 可复用 一次写好 多次使用
   - 标准化 团队统一AI行为
   - 可组合 多个skills 组成Agent 
   - 低成本 不需要开发服务器端 和MCP的区别
   skills 是 instructions + scripts + resources 的组合 
   mcp 可以完成任务 skills 将任务怎么做的更好
   小龙虾就是 manus的开源版本 智能体管家 opc 的实例
   智能体的windows 操作系统

   skills + mcp = 完整的AI Agent

   用户：分析这个excel文件
   MCP：读取excel
   skills：按公司的规划分析excel + 输出报告 
  
### brand-guidelines
- 比如使用 gemini3 生成landing page 按照这个skill 的要求 
  那么它的颜色 风格 主题 就会像Anthropic 
  公司开发skill 有利于统一
- skills 名字和文件夹名字要一样 小写，多个单词用 - 连接
- SKILL.md prompt 文件
  - 头部 YAMA(类似json) 前置元数据
    name
    description

- 综述他的作用    
  
### ppt skills

- 渐进式的
  当技能 场景 比较复杂，进行渐进式的加载
  skill.md 模块加载别的 md文件 需要时才去加载 读取
  省token 