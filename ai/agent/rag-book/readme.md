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