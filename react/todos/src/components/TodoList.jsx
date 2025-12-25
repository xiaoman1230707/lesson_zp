export default function TodoList(props){
  const {todos, onDelete, onCompleted} = props
  return(
    <ul className="todo-list">
     {
    todos.length === 0 ? (
      <li className="empty">暂无待办事项</li>
    ):(
      todos.map(todo=>(
        <li key={todo.id} 
        className={todo.completed ? 'completed' : ''}>
          <label>
            <input 
            type="checkbox"
            checked={todo.completed}
            onChange={()=>onCompleted(todo.id)}
            />
            <span>{todo.text}</span>
            </label>
          <button onClick={()=>onDelete(todo.id)}>X</button>
        </li>
      )
      )
    )
      }
    </ul>
  )
}