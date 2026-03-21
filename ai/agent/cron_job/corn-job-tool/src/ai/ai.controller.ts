import {
  Controller,
  Get,
  Query,
  Sse, // Server Sent Events
} from '@nestjs/common';
import { AiService } from './ai.service';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  // @Get('chat')
  // async chat(@Query("query") query:string){
  //   const answer = await this.aiService.runChain(query)
  //   return{
  //     answer,
  //   }
  // }
  // 装饰器模式 
  // 什么叫做 sse server sent events
  // 设置的几个响应头 
  // Content-Type: text/event-stream
  // Connection: keep-alive
  // Cache-Control: no-cache 别缓存 有很多 
  // Transfer-Encoding: chunked 分块传输
  @Sse('chat/stream')
  chatStream(@Query("query") query:string):Observable<MessageEvent>{
    const stream = this.aiService.runChainStream(query);
    // 将llm stream 转换为一个 Observable 对象 
    return from(stream).pipe(
      map((chunk) => ({
        // 前端需要的chunk格式约定
        data: chunk
      })),
    ) as Observable<MessageEvent>;
  }
}
