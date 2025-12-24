//chain 
// AI 业务时复杂的，分步骤，每一步都做到可执行可配置，
// 连起来，形成工作流，Agent
//chain 有先后顺序 流程 组织起来的
import 'dotenv/config';
import { ChatDeepSeek } from '@langchain/deepseek';
import {PromptTemplate} from '@langchain/core/prompts'

const modal = new ChatDeepSeek({
    model:'deepseek-reasoner',
    temperature:0.7,
})

const prompt = PromptTemplate.fromTemplate(`
    你是一个前端专家。
    用一句话解释：{topic}
    `)
    // prompt 模版生成节点 ->
    // modal 代表的是llm节点 ->
    // 结束节点 invoke
    // pipe 管道 连接节点 形成工作流
    // runnable sequencial wordflow 
    // SequentialChain 顺序链 按照顺序执行
const chain = prompt.pipe(modal) 
// console.log(chain instanceof RunnableSequence)
const response = await chain.invoke({
    topic:'什么是闭包'
})
console.log(response.content);
