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
import { OpenAIEmbeddings } from '@langchain/openai';
import * as fs from 'fs/promises';
import * as path from 'path';

interface Post{
    title:string;
    category:string;
    embedding:number[];
}

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

export function cosineSimilarity(v1: number[], v2: number[]): number {
    const dotProduct = v1.reduce((sum, val, i) => sum + val * v2[i], 0);
    const normV1 = Math.sqrt(v1.reduce((sum, val) => sum + val * val, 0));
    const normV2 = Math.sqrt(v2.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (normV1 * normV2);
}

@Injectable()
export class AIService{
    private posts:Post[] = [];
    private embeddings:OpenAIEmbeddings;
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
        });
        this.embeddings = new OpenAIEmbeddings({
            configuration:{
                apiKey:process.env.OPENAI_API_KEY,
                baseURL:process.env.OPENAI_BASE_URL,
            },
            model:'text-embedding-ada-002',
        });
        this.loadPosts();
    }

    private async loadPosts(){
        try{
            // nestjs 会自动编译 ts -> js 放在 dist 目录下
            // 配置 nest-cli.json 中的 assets 选项为
            // {
            //     "include": "data/**/*",
            //     "outDir": "dist"
            // }
            // 所以 这里需要 ../../ 才能找到 dist 目录下的 data 目录
            const filePath = path.join(__dirname,'../../','data','posts-embedding.json');
            const data = await fs.readFile(filePath,'utf-8');
            // console.log(data,'data');
            this.posts = JSON.parse(data);
        }catch(err){
            console.error('Error loading posts:',err);
            this.posts = [];
        }
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

    async search(keyword:string,topK:number=5){
        const vector = await this.embeddings.embedQuery(keyword);
        // console.log(vector,'vector');
        const results = this.posts.map(post=>({
            ...post,
            similarity:cosineSimilarity(vector,post.embedding),
        })).sort((a,b)=>b.similarity-a.similarity)
        .slice(0,topK)
        .map(item=>item.title);
        return {
            code:0, 
            message:'success',
            data:results,
        };
    }
}