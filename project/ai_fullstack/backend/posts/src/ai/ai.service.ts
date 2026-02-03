import {
    Injectable
} from '@nestjs/common';
import type {
    Message
} from './dto/chat.dto';
import {
    ChatDeepSeek
} from '@langchain/deepseek';
import { SystemMessage, HumanMessage, AIMessage } from 'langchain';

export function convertToLangChainMessages(messages:Message[])
:(HumanMessage | AIMessage | SystemMessage)[]{
    return messages.map(msg=>{
        switch(msg.role){
            case 'user':
                 return new HumanMessage(msg.content);
            case 'assistant':
                 return new AIMessage(msg.content);
            case 'system':
                 return new SystemMessage(msg.content);
            default:
                 throw new Error(`Unsupported role: ${msg.role}`);
        }
    })
}

@Injectable()
export class AIService{
    private chatModel:ChatDeepSeek; // 让 llm成为一个service 私有属性
    constructor(){
        this.chatModel = new ChatDeepSeek({
            configuration:{
                apiKey:process.env.DEEPSEEK_API_KEY,
                baseURL:process.env.DEEPSEEK_BASE_URL,
            },
            model:'deepseek-chat',
            temperature:0.7,
            streaming:true,
        })
    }

    async chat(messages:Message[],onToken:(token:string)=>void){
        const langChainMessages = convertToLangChainMessages(messages);
        console.log(langChainMessages,'????????');
        const stream = await this.chatModel.stream(langChainMessages);
        for await (const chunk of stream){
            const content = chunk.content as string; // 断言 内容一定为字符串
            // console.log(content,'///////');
            // 用模块化，回调传递 
            // service 层负责 数据处理(获取)
            // controller 层负责 响应(输出) res
            if(content){
                onToken(content);
            }
        }
    }
}