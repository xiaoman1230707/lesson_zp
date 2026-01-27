import {
    useState,
    useRef,
    useEffect
} from 'react'

const KeepAlive = ({activeId,children})=>{
    const [cache,setCache] = useState({});// 缓存组件
    // console.log(children,'------')
    useEffect(()=>{
        //activeId update 切换显示 从缓存中取出组件渲染
        // children update 保存组件 新子组件加入缓存
        if(!cache[activeId]){ //第一次进来 添加缓存
            setCache((prev)=>{
                return {...prev,[activeId]:children}
            })
        }
        console.log(cache,'cache')
    },[activeId,children,cache])
    return (
        <>
        {
            // console.log(Object.entries(cache)); 对象编程数组
            // cache 是一个对象，而我们想要遍历他的每个键值，方便使用
            // Object.entries 就是把一个对象的键值对“拆”成一个由 [key, value] 组成的数组。
            Object.entries(cache).map(([id,component])=>(// 遍历所有缓存组件
                <div
                key={id}
                style={{display:id===activeId?'block':'none'}}
                // 只有当前 activeId 匹配时才显示组件
                // 设置display 属性为 none 不显示
                >
                    {component}
                </div>
            ))
        }
        </>
    )
}

export default KeepAlive