# AI 流式输出

- streaming 流式输出
LLM 交互的(新)用户体验优化 爽
streaming：true 边思考边生成边返回，没必要done后再返回
优化了等待的时间
后端负责业务

- 编码
  - 任何内容都是由二进制存储(太低效率)
  - 对内容(非文本，网络通信)进行二进制剪裁或操作
    Buffer 缓冲
  - 编码 解码
    html5 TextEncoder TextDecoder

