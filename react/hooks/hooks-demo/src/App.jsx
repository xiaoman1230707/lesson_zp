import{
    useState,//响应式状态
    useEffect//副作用
} from 'react';
import Demo from './components/Demo.jsx'

async function queryDate(){
    const data = await new Promise(resolve=>{
    setTimeout(()=>{
      resolve(666)
    },2000)
  })
  return data;
}

export default function App(){
  const [num,setNum] = useState(0);

  useEffect(()=>{
    console.log('xxxx')//执行一次
    //挂载后执行,类似vue生命周期onMounted
    //更新时也执行,类似vue中的onUpdated
    queryDate().then(data=>{
        setNum(data)
    })
  },[])//依赖项为空 谁也不依赖
  useEffect(()=>{
    console.log('zzz')//只要状态发生改变就执行
  },[num])
  useEffect(()=>{
    console.log('ddd')
  })//不传依赖项 每次渲染后和状态更新时都执行
    console.log('yyy')//只要状态发生改变就执行
    useEffect(()=>{
        console.log('effect')
        //每次都在新建定时器
        //如何取消定时器?
        //定时器副作用
        const timer = setInterval(()=>{
            console.log(num)
        },1000)
        return()=>{
            // 重新执行effect之前 需要清除上一次的定时器
            //不清除则会导致内存泄漏
            // 会先执行return函数
            console.log('remove')
            clearInterval(timer)
        }
    },[num])
  return(
    <>
        <div onClick={()=>setNum(preNum => preNum + 1)}>{num}</div>
        {num % 2 === 0 && <Demo/>}
    </>
  )
}