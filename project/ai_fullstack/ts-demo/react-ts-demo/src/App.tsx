import { useTodos } from './hooks/useTodos';
import  TodoInput  from './components/TodoInput';
import  TodoList  from './components/TodoList';

export default function App(){
  const {todos,addTodo,deleteTodo,toggleTodo} = useTodos();
  return(
    <>
    <h1>TodoList</h1>
    <TodoInput onAdd={addTodo}/>
    <TodoList
      todos={todos}
      onDelete={deleteTodo}
      onToggle={toggleTodo}
    />
    </>
  )
}