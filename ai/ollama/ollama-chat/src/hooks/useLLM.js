import { 
    useState
 } from "react"
 import { chatCompletions } from "../api/ollamaApi.js"
export const useLLM = ()=>{
    const [messages, setMessages] = useState([
        {
            role:'user',
            content:'你好,你是谁？'
        },{
            role:'assistant',
            content:'我是 Qwen 2.5 0.5b模型'
        }
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const sendMessage = ()=>{};
    const resetChat = ()=>{};

    return{
        messages,//消息列表
        loading,// 是否正在qwen通信
        error,// 错误信息
        sendMessage,//发送消息函数
        resetChat,// 重置聊天
    }
}