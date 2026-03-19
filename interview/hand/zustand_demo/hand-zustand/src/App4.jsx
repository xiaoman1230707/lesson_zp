import {
    createStore
} from './zustand'

function App(){
    const store = createStore();
    // 添加一个订阅者 A
    store.subscribe(()=>{
        // A
        // setState 状态改变时 执行这些代码 
        console.log('通知状态发生改变最新数据',store.getState().count);
    })
    console.log(`1.开始的状态 ${store.getState().count}`)
    // 再添加一个订阅者 B
    store.subscribe(()=>{
        // B 
        console.log('第二个来了，状态发生改变',store.getState().count);
    })
    store.setState({
        count:10
    })
    return (
    <>

    </>
    )
}

export default App;