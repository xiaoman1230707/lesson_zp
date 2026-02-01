// 流式输出 本质是边算(llm token 生成)边给，而不是等全部结束再一次性返回
// 在AI场景里 模型生成文本是逐个token 产生的 (模型每次基于已生成的token序列
// 通过自回归的方式预测下一个最可能的token)
// streaming : true
// http chunked 数据块来穿，res.end()不用 就不会结束
// res.write(chunk) 写入数据块
// SSE text/event-stream 模式去发送 token
import { config } from 'dotenv'
config();

export default [
    {
        url: '/api/ai/chat',
        method: 'post',
        rawResponse: async (req, res) => {
            // node 原生的拿到请求体
            // console.log(req.body,'/////////');
            // chunk 数据块 (buffer)
            // tcp/ip 协议 找到ip即可发送数据 ip负责通信连接 tcp负责管理调度组装
            // tcp 可靠的传输协议 会将不同时到达的数据包 按排序组装，失败重传
            // on data 事件，数据包到达时触发
            let body = '';
            // chunk 二进制流 buffer
            // += 自动转换为字符串
            req.on('data', (chunk) => body += chunk.toString())
            req.on('end', async () => {
                // 都到位了
                // console.log(body,'/////////');
                try {
                    const { messages } = JSON.parse(body);
                    // console.log(messages,'/////////');
                    res.setHeader('Content-Type', 'text/plain;charset=utf-8');// 设置响应体为文本流
                    // 响应头先告诉浏览器 这是流式的内容，数据会分块传输
                    res.setHeader('Transfer-Encoding', 'chunked');// 设置为分块传输编码
                    res.setHeader('x-vercel-ai-data-stream', 'v1');// vercel ai sdk 特制头
                    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
                        // response 为请求llm的响应体
                        // res 为返回前端的响应体
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            model: 'deepseek-chat',
                            messages,
                            stream: true// 启用流式输出
                        })
                    })
                    if (!response.body) throw new Error('response body is null');
                    // SSE 二进制流 buffer 会有reader对象 接管子一样 
                    const reader = response.body.getReader();
                    const decoder = new TextDecoder()
                    while (true) {
                        const { done, value } = await reader.read();
                        // console.log(done,value,'------------')
                        if (done) {
                            break;
                        }
                        const chunk = decoder.decode(value);
                        // console.log(chunk,'------------')
                        const lines = chunk.split('\n');
                        for (let line of lines) {
                            if (line.startsWith('data: ') && line !== 'data: [DONE]') {
                                try {
                                    const data = JSON.parse(line.slice(6));
                                    const content = data.choices[0]?.delta?.content || '';
                                    if (content) {
                                        res.write(`0:${JSON.stringify(content)}\n`)
                                    }
                                } catch (err) { }
                            }
                        }

                    }
                    res.end();
                } catch (err) {
                    console.error('chatbot error', err);
                }
            })
        }
    }
]