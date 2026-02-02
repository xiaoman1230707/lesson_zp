import {
    Injectable
} from '@nestjs/common';
import {
    ChatDto
} from './dto/chat.dto';

@Injectable()
export class AIService{
    // private chatModel:ChatDeepSeek; // 让 llm成为一个service 私有属性
    constructor(){}

    async chat(messages:ChatDto['messages'],onToken:(token:string)=>void){
        return onToken('hello world');
    }
}