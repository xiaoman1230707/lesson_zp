// langchain 支持 ollama
import { ChatOllama } from '@langchain/ollama';
// 提示词模版
import { ChatPromptTemplate } from '@langchain/core/prompts';
// 输出格式化模块
import { StringOutputParser } from '@langchain/core/output_parsers';
import express from 'express';//引入后端框架 
import cors from 'cors';//引入跨域模块

const model = new ChatOllama({
  baseUrl: "http://localhost:11434",
  model: "deepseek-r1:8b",
  temperature: 0.1 // 严格 
})
//web server http 协议 3000 伺服 路由
const app = express(); //server App
// 跨域配置中间件
app.use(cors());

//使用 json 解析中间件
app.use(express.json());
//路由 get method path /hello
// req请求对象 res响应对象 
app.get('/hello',(req,res)=>{
    res.send('hello world');
})

app.post('/chat',async (req,res)=>{
    const {message} = req.body;//从请求体里解构用户的提问内容
    //后端稳定第一
    if(!message || typeof message !== 'string'){
        //响应头 statusCode 400 用户请求错误 
        //响应体是 json 的
        //完整的响应
        //send 文本 现代后端api数据接口格式是json
        return res.status(400).json({error:'message is required,and must be a string'}); 
    }
    try{
    const prompt =ChatPromptTemplate.fromMessages([
        ['system','you are a helpful assistant'],
        ['human','{input}'],
    ]);
    const chain = prompt
    .pipe(model)
    .pipe(new StringOutputParser());
    console.log('大模型正在调用中...');

    const result = await chain.invoke({
        input:message
    });
    res.status(200).json({
        reply:result
    });
}catch(e){
    console.error('大模型调用失败:',e);
}
    // res.send(message);
})

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})