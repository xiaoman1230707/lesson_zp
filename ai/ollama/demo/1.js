// ollama 11434端口 开源大模型API服务
// v1/chat/competions 兼容openAI接口
const OLLAMA_URL = 'http://localhost:11434/v1/chat/completions';

const headers = {
    'Authorization': 'Bearer ollama',
    'Content-Type': 'application/json'
}

const data = {
    model:'qwen2.5:0.5b',
    messages:[
        {
            role:'user',
            content:'你好,你是谁？'
        }
    ]
}

fetch(OLLAMA_URL,{
    method:'POST',
    headers,
    body:JSON.stringify(data)
})
.then(res=>res.json())
.then(json=>console.log(json.choices[0].message))
.catch(err=>console.log('Error:',err))

