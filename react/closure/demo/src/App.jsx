import { 
  useState,
  useEffect
 } from 'react'

export default function App(){
  const [count, setCount] = useState(0)
  useEffect(()=>{
    const timer = setInterval(()=>{
      console.log('Current count:',count)
    },1000);
    // 不只是组件卸载执行
    // 每次effect 重新执行之前，都会执行上一次的清理函数
    return ()=> clearInterval(timer);
  },[count])//如果没有依赖项，那么就算count + 1 重新挂载，定时器内的打印也仍然是0 。这就是闭包陷阱
  return(
    <>
      <p>{count}</p>
      <button onClick={()=> setCount(count+1)}>count+1</button>
    </>
  )
}