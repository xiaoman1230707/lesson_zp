import { ChatDeepSeek } from '@langchain/deepseek';
import{ ChatPromptTemplate } from '@langchain/core/prompts';
//带上历史记录的可运行对象
import { RunnableWithMessageHistory } from '@langchain/core/runnables';
// 存放在内存中
import { InMemoryChatMessageHistory } from '@langchain/core/chat_history';
import 'dotenv/config';

const model = new ChatDeepSeek({
    modelName:'deepseek-chat',
    temperature:0.7,
});
// chat模式，数组
const prompt = ChatPromptTemplate.fromMessages([
    ['system','你是一个有记忆的问答助手'],
    ['placeholder','{history}'],
    ['human','{input}'],
]);

const runnable = prompt
.pipe((input)=>{//debug节点
    console.log('>>>>最终传给llm的message（prompt 在内存）');
    console.log(input);
    return input;
})
.pipe(model);
//对话历史实例
const messageHistory = new InMemoryChatMessageHistory();
const chain = new RunnableWithMessageHistory({
    runnable,
    getMessageHistory: async ()=>messageHistory,
    inputMessagesKey:'input',
    historyMessagesKey:'history',
})

const res1 = await chain.invoke({
        input:'我叫张三，喜欢吃橙子',
    },
    {   
        configurable:{
            sessionId:'makefriend'
        }
    }
)

console.log(res1.content);

const res2 = await chain.invoke({
        input:'我叫什么名字',
    },
    {   
        configurable:{
            sessionId:'makefriend'
        }
    }
)

console.log(res2.content);
