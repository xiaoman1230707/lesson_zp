import { 
    useState,//响应
    useRef,//默默奉献存储能力
    useEffect
 } from 'react';

export default function App() {
    const [count,setCount] = useState(0);//响应式状态
    let intervalId = useRef(null);//存储定时器id
    function start(){
        intervalId.current = setInterval(()=>{
            console.log('tick~~~')
        },1000)
        console.log(intervalId.current)
    };
    function stop(){
        clearInterval(intervalId.current)
    };
    useEffect(()=>{
        return ()=>{
            console.log(intervalId)
        }
    },[count])
    return(
        <>
        <button onClick={start}>开始</button>
        <button onClick={stop}>停止</button>
        {count}
        <button type='botton' onClick={()=>setCount(count + 1)}>count++</button>
        </>
    )
}