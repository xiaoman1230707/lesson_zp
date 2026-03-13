import { config } from 'dotenv';
config({ path: path.join(process.cwd(), '.env') });
import { ChatOpenAI } from '@langchain/openai';
import {
    SystemMessage,
    HumanMessage,
    AIMessage
} from '@langchain/core/messages';
import { FileSystemChatMessageHistory } from '@langchain/community/stores/message/file_system';
import path from 'node:path';

const model = new ChatOpenAI({
    modelName: process.env.OPENAI_MODEL_NAME,
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL
    }
})

async function fileHistoryDemo(){
    // 项目运行目录
    const filePath = path.join(process.cwd(),"chat-history.json");
    const sessionId = "user_session_001";// 新一轮会话的ID

    const systemMessage = new SystemMessage(
        "你是一个友好、幽默的做菜助手，喜欢分享美食和烹饪技巧。"
    );
    console.log('第一轮对话')
    const history = new FileSystemChatMessageHistory({
        filePath,
        sessionId,
    });
    const userMessage1 = new HumanMessage(
        "红烧肉怎么做？"
    );
    await history.addMessage(userMessage1);
    const messages1 = [systemMessage, ...(await history.getMessages())];
    // console.log(messages1,'/////');
    const response1 = await model.invoke(messages1);
    await history.addMessage(response1);
    console.log(response1,'/////');

    const userMessage2 = new HumanMessage(
        "好吃吗？"
    );
    await history.addMessage(userMessage2);
    const messages2 = [systemMessage, ...(await history.getMessages())];
    const response2 = await model.invoke(messages2);
    await history.addMessage(response2);
    console.log(response2,'/////');
}

fileHistoryDemo()
    .catch(console.error);
