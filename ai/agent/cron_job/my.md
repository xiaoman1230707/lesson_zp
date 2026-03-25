# concat

## 1. 每个 chunk 都有 `tool_call_chunks` 吗？

**是的。** 在 LangChain 设计中，`AIMessageChunk` 拥有与 `AIMessage` 几乎相同的结构，但它的字段（如 `content` 和 `tool_call_chunks`）是**碎片化**的。

当 LLM 决定调用工具时，由于是流式输出，它发出的数据看起来像这样：

- **Chunk 1:** `{ content: "", tool_call_chunks: [{ index: 0, name: "query", id: "call_1" }] }`
- **Chunk 2:** `{ content: "", tool_call_chunks: [{ index: 0, args: '{"user' }] }`
- **Chunk 3:** `{ content: "", tool_call_chunks: [{ index: 0, args: 'Id": "001"}' }] }`

注意看，`args` 在 Chunk 2 和 Chunk 3 中是断开的。**单独看任何一个 chunk，你都无法解析出完整的 JSON。** 这就是为什么我们需要 `concat`。

------

## 1. for await 是怎么接到 chunk 的？
在 RxJS 中，你会用 .subscribe()，但在异步生成器（Async Generator）中，我们使用 for await...of。

机制： this.modelWithTools.stream(messages) 返回的是一个 AsyncIterable（异步可迭代对象）。它像是一个传送带，LLM 并不是一次性把结果给你，而是生成一点、往传送带上放一点。

挂起与恢复： 当 stream 中还没有新数据时，代码会停在 for await 这一行（不阻塞主线程）；一旦 LLM 生成了新的字符碎片（chunk），这个循环就会执行一次。

## 2. 详细讲讲 `concat` 的魔法

在 LangChain 内部，`AIMessageChunk` 重写了合并逻辑。当你执行 `fullAIMessage.concat(chunk)` 时，它并不是简单地把两个对象塞进数组，而是执行了**字段级**的累加。

#### A. 文本内容的合并 (`content`)

这是最简单的字符串拼接：

$$fullAIMessage.content = fullAIMessage.content + chunk.content$$

#### B. 工具调用的合并 (`tool_call_chunks`) —— 核心难点

这是 `concat` 最聪明的地方。它会根据 `index` 字段来匹配碎片：

1. 如果 `index` 相同，它会将 `args` 字符串进行拼接。
2. 它会自动处理 `name` 和 `id`（通常只在第一个碎片中出现）。
3. 它会将这些碎片组合成一个完整的 **`ToolCall`** 对象。

------

## 3. 为什么代码里要判断 `fullAIMessage.tool_call_chunks`？

回到你之前的代码逻辑：


这里的判断逻辑实际上是在问：**“到目前为止，累积的所有碎片里，有没有出现过工具调用的意图？”**

- **如果 AI 想说话：** 它的第一个 chunk 就会包含 `content` 而没有 `tool_call_chunks`。此时 `hasToolCallChunk` 为 `false`，代码立即 `yield chunk.content`。
- **如果 AI 想调工具：** 它的第一个 chunk 通常就会带上 `tool_call_chunks` 的起始信息。此时 `hasToolCallChunk` 瞬间变为 `true`。**一旦变为 true，后续所有的 chunk 都会被拦截**，因为逻辑进入了“工具收集模式”，直到整个 `for await` 循环结束，拿到完整的 JSON。

------

## 4. 为什么会有 `tool_calls` 和 `tool_call_chunks` 两个属性？

你可能注意到了，代码后面用的是 `fullAIMessage.tool_calls`。这涉及到 LangChain 的一个自动转换：

**总结流程：**

1. **收割：** `for await` 拿到每一个 `chunk`。
2. **融合：** `fullAIMessage.concat(chunk)` 把 `tool_call_chunks` 拼成一个完整的 JSON 字符串。
3. **解析：** 当循环结束，`fullAIMessage.tool_calls` 就会自动根据拼接好的字符串生成可以直接使用的参数对象。

------

## 避坑指南

由于 LLM 的不确定性，有时候它会**先说一段话，然后再调用工具**。

- 你的代码目前处理得很好：在它还没决定调工具前，文字会流式出来。
- 一旦它决定调工具，文字流会停止，代码转入后台执行工具逻辑。

