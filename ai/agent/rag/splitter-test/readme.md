# Splitter 理解
   RecursiveCharacterTextSplitter 是怎么在维持chunk_size，且不丢失语义的？
- loader 加载的大Document @langchain/community
  pdf doc 的loader类型不一样 
- RecursiceCharaterTextSplitter 递归字符文本分割器 @langchain/core
  - Text 文本型的切割器
- splitter 
  character 按这个切 本身就是符合语义
  [。？！，]
  越前面 优先级越高 “。” 最优先
  随着这一段字符长度逐渐靠近 chunk_size ，他会递归的尝试用下一个字符切
  当用“，” 之类的切割时，就会造成 句子被切断，导致语义不完整
  那么Overlap 牺牲一定空间(chunk_size 10%) 在下一个chunk重复
    一句话少了 两句话多了，就用！ ， 等 字更少的话加上，尽量接近chunk_size,并在下一个chunk 开始重叠 这一小句(保持语义)(ChunkOverlap)

  先character 切 再 chunkSize 最后Overlap

- RAG 问题
  - 流程 RAG
    - Retriver 检索
    - Augented 增强
    - Generation 生成
  - loader
  - splitter 细节 三个参数
  - splitter 面向对象体系和关系
    父类 TextSplitter 切割的文本 MP3等就不适合
    一系列的子类 CharaterTextSplitter 按照字符切割
        TokenTextSplitter  按token切割
        RecursiceCharaterTextSplitter 语义的完整性特别好
          MarkdownTextSplitter 为什么属于 RecursiceCharaterTextSplitter 的子类？
          因为 Markdown 文档中 有很多的 标题# 列表 等 特殊的字符，这些字符在 RecursiceCharaterTextSplitter 中是符合语义的。

- CharacterTextSplitter 
  直接按照 Character separator 切割
- RecursiveCharacterTextSplitter
  更人性化 更努力 会尝试用其他符号切割保持接近 chunk_size
  尝试其他符号时，语义就弱下来了， overlap 来弥补一下