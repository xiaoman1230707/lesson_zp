import {
    useState,
    useEffect,
    useRef,
} from 'react';
// value 频繁修改的值
// wait 延迟时间
// options 配置对象 高阶
export default function useDebounce(value,wait=3000,options={}){
    // 三个参数以上，就用对象结构赋值
    const{ leading=false,trailing = true } = options;
    // 防抖后的值，减少渲染次数 只在最后一次渲染
    const[debounceValue,setDebounceValue] = useState(value);
    // 定时器
    const timerRef = useRef(null);
    useEffect(()=>{
        if(timerRef.current){
            clearTimeout(timerRef.current);
        }
        if(leading && timerRef.current === null){
            setDebounceValue(value);
        }
        timerRef.current = setTimeout(()=>{
            if(trailing){
                setDebounceValue(value);
            }
            timerRef.current = null;
        },wait);
        return ()=>{
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    },[value,wait,leading,trailing])
    return debounceValue;
}
