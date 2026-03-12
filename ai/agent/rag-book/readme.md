# RAG 电子书 

- 一本电子书，如何做RAG 检索增强生成
1. 知识库
2. @langchain/community 
   中 来自社区的各种 loader 
3. Splitter 
4. Document 
   pageContent 
   meta: 
5. Embedding Model 
6. Milvus 

## 开发流程
- ensureBookCollection 确保集合存在
  - 判断集合是否存在 hasCollection
  - 如果不存在，创建集合 createCollection
    schema
  - 创建索引
  - 加载集合
  
## MVP
- Vibe Coding 
  - 代码平权
  - idear 设计书等
  Minimal Viable Product 最小可执行产品
  cursor/claude code 等编程Agent 来实现一个 MVP
  产品原型是产品经理设计出来的原型稿 
- 最后认可后 正式的商业级别开发
  程序员 继续vibe coding 
- 语义搜索和文本匹配
  - 文本匹配 低级搜索 like 模糊搜索 %段誉%
  - 语义搜索更强大