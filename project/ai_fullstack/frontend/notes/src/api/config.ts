import { useUserStore } from '@/store/useUserStore'
import axios from 'axios';
// 接口地址都以/api开头 
axios.defaults.baseURL = 'http://localhost:5173/api'
//axios.defaults.baseURL = 'http://localhost:3000/api'
// 拦截器 interceptors
// axios api 请求大管家 关于请求的椅子都会给我们
// data 只是其中一项

// useUserStore()  是 Zustand 提供的React 自定义钩子，
// 而钩子有严格的使用规则：只能在 React 组件/自定义钩子的顶层执行，
// 不能在普通函数、if/for、异步代码里用。


axios.interceptors.request.use(config =>{
    const token = useUserStore.getState().token;
    // console.log(token,'//////')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    // console.log(config); //请求的配置项
    // if(token){
    // }
    return config;
})

axios.interceptors.response.use(res=>{
    // console.log('111');
    if(res.status != 200){
       console.error('网络错误', res);
    return Promise.reject(res);
    }
    return res.data;
},
  error => {
    console.error('网络错误', error);
    return Promise.reject(error);
  })

export default axios 