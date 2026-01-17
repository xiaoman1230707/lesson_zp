import './App.css'
import { useTodoStore } from './store/todo'
import { useState } from 'react'

function App() {

  const {
    todos,addTodo,toggleTodo,removeTodo
  } = useTodoStore()

  const [inputValue,setInputValue] = useState<string>('')

  const handleAdd = ()=>{
    if(inputValue.trim() == '') return;
    addTodo(inputValue);
    setInputValue('');
  }

  return (
    <>
      <div>
        <input type="text"
        placeholder="Add a new todo"
        value={inputValue}
        onChange={(e)=>setInputValue(e.target.value)}
        onKeyDown={(e)=> e.key==='Enter' && handleAdd()}
        />
        <button onClick={handleAdd}>Add</button>
        <ul>
          {
            todos.map(todo=>(
              <li key={todo.id}>
                <input 
                type="checkbox"
                checked={todo.completed}
                onChange={()=>toggleTodo(todo.id)}
                 />
                 <span style={{textDecoration:todo.completed?'line-through':'none'}}>{todo.text}</span>
                 <button onClick={()=>removeTodo(todo.id)}>delete</button>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}

export default App
