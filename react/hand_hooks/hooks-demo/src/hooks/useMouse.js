import { useState, useEffect } from 'react'
// 封装响应式mouse业务
// UI 组件更简单 html + css,维护性好
// 复用 和组件一样，是前端团队的核心资产
export default function useMouse(){
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  

  useEffect(()=>{
    const update = (e) => {
    console.log('///////')
    setX(e.pageX)
    setY(e.pageY)
  }
    window.addEventListener('mousemove', update)
    console.log('||||')
    return () => {
      console.log('||||||清除')
      window.removeEventListener('mousemove', update)
    }
  },[])
  //把向外暴露的状态和方法返回
  return{
    x,
    y,
  }
}