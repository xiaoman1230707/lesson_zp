import {
    createContext,
    // useContext//hooks
} from 'react'
import Page from './views/Page'
//跨层级通信 数据状态的容器
//直接export可以多次
export const UserContext = createContext(null)
//默认export 只能有一次导出 
export default function App(){
    const user ={name:'Andrew'}
    return(
        <>
        {/* context 提供给page组件树共享 数据容器
        Provider 组件 数据提供者
        value 就是context上下文里面的值
        */}
        <UserContext.Provider value={user} >
        <Page />
        </UserContext.Provider>
        </>
    )
}