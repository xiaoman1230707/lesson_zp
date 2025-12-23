import 'dotenv/config';
import { ChatDeepSeek } from '@langchain/deepseek';

const modal = new ChatDeepSeek({
    model:'deepseek-reasoner',
    temperature:0,
    //apiKey 帮我们适配了市面上大多数llm
    //baseURL 不用自己填 适配器模式 找到provider
})

//invoke执行
const res = await modal.invoke('用一句话解释什么是commonjs?')
console.log(res.content);
