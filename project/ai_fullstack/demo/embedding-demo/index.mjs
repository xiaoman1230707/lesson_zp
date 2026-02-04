import {client} from './app.service.mjs'

// 不用字符匹配  keyword 专门向量表达 数学
// cosine 接近 1 相同 越小 接近 0 不同 -1 相反 
// completions.create() AIGC生成接口 
// completions.chat.create() 聊天生成
// embedding.create() 向量生成 [0.12,...] 维度 越大越精确 世界上所有东西都可以用向量来表达
// 文本嵌入 embedding 文本嵌入后的向量表达
const response =  await client.embeddings.create({
    // embedding 专有model 文本嵌入模型
    model:'text-embedding-ada-002',
    input:'你好',
})
console.log(response.data[0].embedding,'//////',response.data[0].embedding.length)
