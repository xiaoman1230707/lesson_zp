//封装 git diff 得到llm给我们的规范的commit message
import {chat} from '../api/index.js';
import {
    useState,
    useEffect,
} from 'react';
export const useGitDiff = ()=>{
    const [content,setContent] = useState('');
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        (async()=>{
            // if(!diff)return;
            setLoading(true);
            const {data} = await chat('你好');
            setContent(data.reply);
            setLoading(false);
        })()
    }
    )
    return {
        loading,//加载中
        content,// commit message
    }
}