import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [num, setNum] = useState(()=>{
    //初始值需要经过复杂计算时 用函数来计算
    //同步函数,不支持异步的操作，异步不确定 状态一定是确定的
    //纯函数是指相同输入始终返回相同输出，且无副作用的函数.
    const num1 = 1 + 2;
    const num2 = 2 + 3;
    return num1 + num2;
  })
  // 数据 -> setNum 变成另一种数据，不是固定的 状态state
  //hook useState为程序带来了关键的响应式状态
  //状态是变化的数据 组件的核心是状态
  // 1 是数据 也是状态的初始值 
  return (
  
    // <div onClick={()=>setNum(num+1)}> 
    //    {num}
    //  </div>
     //修改函数中可以直接传新的值 也可以传入一个函数
     //这个函数的参数是上一次的state
     <div onClick={() => setNum(prevNum => {console.log(prevNum);return prevNum + 1})}>
       {num}
     </div>

    
  )
}

export default App
