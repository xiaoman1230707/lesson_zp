import { useEffect } from "react"
export default function Demo(){
    useEffect(()=>{
     console.log('123012')   
     const timer = setInterval(()=>{
        console.log('timer')
     },1000)
     //生命周期函数 onMounted onUpdated onUnmounted
     //卸载组件时 清除定时器
     return()=>{//卸载前执行回收
        clearInterval(timer)
     }
    },[])
    return(
        <>
            <div>偶数Demo</div>
        </>
    )
}