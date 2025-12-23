import './styles/app.styl'
import TodoList from './components/TodoList.jsx'
import TodoInput from './components/TodoInput.jsx'
import TodoStats from './components/TodoStats.jsx'

export default function App(){
  return(
    <div className="todo-app">
      <h1>My Todo List</h1>
        <TodoInput/>
        <TodoList/>
        <TodoStats/>
    </div>
  )
}