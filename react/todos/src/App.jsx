import {useState,
  useEffect
} from 'react'
import './styles/app.styl'
import TodoList from './components/TodoList.jsx'
import TodoInput from './components/TodoInput.jsx'
import TodoStats from './components/TodoStats.jsx'

export default function App(){
  //子组件共享的数据状态
  const [todos, setTodos] = useState(()=>{
    //从本地存储中获取todos
    const todos = localStorage.getItem('todos')
    return todos ? JSON.parse(todos) : []
  })
  //子组件修改数据的方法
  const addTodo = (text) => {
    setTodos([...todos, {
      id: Date.now(),//时间戳
      text,
      completed: false,
    }])
  }
  //删除todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo=>todo.id !== id))
  }
  //完成todo
  const onCompleted = (id) => {
    setTodos(todos.map(todo=>todo.id === id ? {...todo, completed: !todo.completed} : todo))
  }
  //清除已完成的todo
  const clearCompleted=()=>{
    setTodos(todos.filter(todo=>!todo.completed))
  }
  //计算未完成的todo数量
  const activeCount = todos.filter(todo=>!todo.completed).length
  //计算已完成的todo数量
  const completedCount = todos.filter(todo=>todo.completed).length
  
  //监听todos变化 保存到本地存储中
  useEffect(()=>{
    //将todos保存到本地存储中
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])


  return(
    <div className="todo-app">
      <h1>My Todo List</h1>
      {/* 自定义事件 */}
        <TodoInput onAdd={addTodo}/>
        <TodoList 
        todos={todos} 
        onDelete={deleteTodo} 
        onCompleted={onCompleted}
        />
        <TodoStats 
        total={todos.length}
        active={activeCount}
        completed={completedCount}
        onClearCompleted={clearCompleted}
        />
    </div>
  )
}