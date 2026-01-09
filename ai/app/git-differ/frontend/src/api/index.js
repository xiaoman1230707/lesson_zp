// http请求库
import axios from 'axios';
// 模块化
// api 目录下管理所有的请求
const api = axios.create({
    baseURL:'http://localhost:3000',
    timeout:60000,
    headers:{
        'Content-Type':'application/json'
    }
})

export const chat = (message) => api.post('/chat',{message})
