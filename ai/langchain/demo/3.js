import { ChatDeepSeek } from "@langchain/deepseek";
import {PromptTemplate} from '@langchain/core/prompts'
import 'dotenv/config'
//AI 应用的编程方式
// LLM 黑盒打开 key prompt
// langchain ai应用工程化
import { RunnableSequence } from "@langchain/core/runnables";

const modal = new ChatDeepSeek({
    model:'deepseek-reasoner',
    temperature:0.7,
})

const examplePrompt = PromptTemplate.fromTemplate(`
    你是一个前端专家。
    请详细介绍以下概念：{topic},
    要求：覆盖定义、原理、使用方式,不超过300字。
    `)

const summatyPrompt = PromptTemplate.fromTemplate(`
    请将以下前端概念解释总结为三个核心要点(没点不超过20字):
    {explanation}
    `)

const explanationChain = examplePrompt.pipe(modal)
// console.log(explanationChain)
const summaryChain = summatyPrompt.pipe(modal)

const fullChain = RunnableSequence.from([
    (input) => explanationChain.invoke({topic:input.topic})
    .then(res => res.text),
    (explanation) => summaryChain.invoke({explanation})
    .then(res => `知识点：${explanation} 总结：${res.text}`)
])

const respones = await fullChain.invoke({
    topic:'什么是闭包'
})
console.log(respones);
