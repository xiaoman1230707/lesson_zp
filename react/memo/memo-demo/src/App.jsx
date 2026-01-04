import {
    useState,
    useMemo,
    memo,
    useCallback
} from 'react'

// function Child(){
//     console.log('child渲染了');
//     return(
//         <>
//         子组件
//         </>
//     )
// }

//高阶组件
//参数是组件 返回值也是一个新的组件
const Child = memo(({count, handleClick}) => {
    console.log('child渲染了');
    return(
        <>
        <div onClick={handleClick}>子组件{count}</div>
        </>
    )
})

export default function App(){
    // 父组件负责持有数据和管理数据
    // 某一个数据改变，只想让相关的子组件重新渲染
    const [count, setCount] = useState(0);
    const [num, setNum] = useState(0);
    // 父组件可能要将函数传递给子组件
    // 每次渲染后都会是一个新函数
    // 但是父子组件通信传递函数是常态，缓存函数 useCallback 
    // const handleClick = () => {
    //     console.log('click')
    // }
    const handleClick = useCallback(()=>{
        console.log('click')
    },[count])

    return(
        <>
        {count}
        <button onClick={()=> setCount(count+1)}>count+1</button>
        <br />
        {num}
        <button onClick={()=> setNum(num+1)}>num+1</button>
        {/* 子组件 */}
        <Child count={count} handleClick={handleClick} />
        </>
    )
}