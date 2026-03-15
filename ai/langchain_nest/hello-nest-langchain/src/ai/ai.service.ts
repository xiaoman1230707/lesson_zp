import { Injectable,Inject } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import type { Runnable } from '@langchain/core/runnables';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiService {
    //  链式调用对象 私有的
    private readonly chain: Runnable;
    constructor(@Inject(ConfigService) configService: ConfigService){
        const prompt = PromptTemplate.fromTemplate(
            `请回答以下问题： \n\n{query}`
        );
        const model = new ChatOpenAI({
            modelName: configService.get<string>('MODEL_NAME'),
            temperature: 0.7,
            apiKey: configService.get<string>('OPENAI_API_KEY'),
            configuration: {
                baseURL: configService.get<string>('OPENAI_BASE_URL'),
            }
        });
        this.chain = prompt.pipe(model).pipe(new StringOutputParser());
    }

    async runCahin(query:string):Promise<string>{
        return this.chain.invoke({query});
    }
}
