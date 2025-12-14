//根组件
//jsx
//组件树
//为什么函数适合做组件  将JSX + 逻辑封装成了一个组件
//组件是由js/css/html组合起来 完成一个相对独立的功能
//JS 负责UI
//State  数据状态 相当于 ref
import { useState ,createElement} from 'react';
import './App.css';

function App(){

    // const name = 'React';
    //useState会返回一个数组
    //数组的第一个元素 是状态值
    //数组的第二个元素 是更新状态值的函数
    const [name,setName] = useState('React')
    const [todos,setTodos] = useState([
        {
            id:1,
            title:'学习React',
            done:false
        },
        {
            id:2,
            title:'学习node',
            done:false
        }
    ])
    //语法糖 主要是简化模版开发，提升代码的可读性
    const element = <h1>JSX是react中用于描述界面的语法拓展</h1>
    const element2 = createElement('h2',null,'JSX是react中用于描述界面的语法拓展');

    const [isLonggerIn,setIsLonggerIn] = useState(false);
    
    setTimeout(() =>{
      setName('Vue')  
    },3000)

    const toggleLogin = () =>{
        setIsLonggerIn(!isLonggerIn);
    }
    //组件的数据业务逻辑 交互等
    //JSX js里面的 class 是js 关键字 不能用 用className
    return(
        //文档碎片标签
        <>
        {element}
        {element2}
            <h1>Hello <span className="title">{name}!</span></h1>
            {
                todos.length > 0 ?(
                    <ul>
                        {
                           //原生js react 能不用新语法就不用
                        //xml in js
                            todos.map((todo) =>{
                                return(
                                    <li key={todo.id}>
                                        {todo.title}
                                    </li>
                                )
                            })
                        }
                    </ul>
                ):(<p>暂无待办事项</p>)
            }
            {isLonggerIn? <div>已登录</div>:<div>未登录</div>}
            <button onClick={toggleLogin}>
                {isLonggerIn?'退出登录':'登录'}
            </button>
        </>
    )
}
export default App




