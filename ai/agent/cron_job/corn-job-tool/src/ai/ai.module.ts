import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { ChatOpenAI } from '@langchain/openai';
import { ConfigService } from '@nestjs/config';



@Module({
  controllers: [AiController],
  providers: [AiService,
    // 动态创建的provide 
    // 这个provide 将model从逻辑中剥离出来 
    // llm作为provide提供 
    {
      provide:"CHAT_MODEL",
      // 工厂模式， 平时生产车 战时就生产坦克...
      useFactory:(configService:ConfigService)=>{
        return new ChatOpenAI({
          apiKey:configService.get("OPENAI_API_KEY"),
          configuration:{
            baseURL:configService.get("OPENAI_BASE_URL"),
          },
          model:configService.get("OPENAI_MODEL_NAME"),
        })
      },
      inject:[ConfigService]
    }
  ],
})
export class AiModule {}
