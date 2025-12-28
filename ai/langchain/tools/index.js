import {ChatDeepSeek} from '@langchain/deepseek';
import 'dotenv/config';
import {tool} from '@langchain/core/tools';
import {z} from 'zod';//用于定义工具的输入参数的类型

const fakeWeatherDB = {
  北京: { temp: "30°C", condition: "晴", wind: "微风" },
  上海: { temp: "28°C", condition: "多云", wind: "东风 3 级" },
  广州: { temp: "32°C", condition: "阵雨", wind: "南风 2 级" },
}
    const weatherTool = tool(
        async ({city})=>{
            const weather = fakeWeatherDB[city];
            if(!weather){
                return `暂无${city}天气信息`;
            }
            return `${city}的天气是${weather.temp},${weather.condition},风力${weather.wind}`;
        },{
            name:'get_weather',
            description:'查询指定城市的今日天气情况',
            schema: z.object({
                city: z.string().describe('要查询天气的城市')
            })
        }
    )
    // console.log(weatherTool);//DynamicStructuredTool
//函数 定义一个加法工具
const addTool = tool(
    //两数相加
    //等待大模型的调用
    //参数 对象 结构 a b
    async ({a,b})=> String(a+b),
    {
        name:'add',
        description:'计算两数的和', 
        //参数 schema 
        schema: z.object({
            a: z.number(),
            b: z.number()
        })
    }
)

const model = new ChatDeepSeek({
    model:'deepseek-chat',
    temperature:0
}).bindTools([addTool,weatherTool]);

// const res = await model.invoke('3 + 5 等于多少?');
const res = await model.invoke('北京的天气怎么样?');
//  ？. 可选链 运算符 es6新增 代码的简洁优雅
// if(res.tool_calls){
//     if(res.tool_calls.length){}
// }
if(res.tool_calls?.length){
    // console.log(res.tool_calls);
    if(res.tool_calls[0].name === 'add'){
        const result = await addTool.invoke(res.tool_calls[0].args);
        console.log("最终结果",result);
    }else if(res.tool_calls[0].name === 'get_weather'){
        const result = await weatherTool.invoke(res.tool_calls[0].args);
        console.log(result);
    }
}

