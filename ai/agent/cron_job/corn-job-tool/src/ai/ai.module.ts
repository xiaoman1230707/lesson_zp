import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { ChatOpenAI } from '@langchain/openai';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { z } from 'zod';
import { tool } from '@langchain/core/tools';

@Module({
  controllers: [AiController],
  providers: [AiService,UserService,
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
    },
    {
        provide: 'QUERY_USER_TOOL',
        useFactory: (userService: UserService) => {
            const queryUserArgsSchema = z.object({
                userId: z.string().describe('用户ID,例如： 001， 002， 003')
            });
            return tool(
                async ({userId}: {userId: string}) => {
                    const user = userService.findOne(userId);
                    if (!user) {
                        const availableIds = userService
                            .findAll()
                            .map(u => u.id)
                            .join(', ');
                        return `用户${userId}不存在。可用的ID: ${availableIds}`
                    }
                    return `用户信息：\n- ID: ${user.id} \n- 姓名：${user.name}
                    \n- 邮箱: ${user.email}\n- 角色 ${user.role}
                    `
                },
                {
                    name: 'query_user',
                    description: `查询数据库中的用户信息。输入用户ID，
                    返回该用户的详细信息（姓名、邮箱、角色）`,
                    schema: queryUserArgsSchema
                }
            )
        },
        inject: [UserService]
    }
  ],
})
export class AiModule {}
