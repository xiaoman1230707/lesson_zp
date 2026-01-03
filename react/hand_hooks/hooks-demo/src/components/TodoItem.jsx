export default function TodoItem({todo, onToggle, onDelete}){
    return(
        <li className='todo-item'>
            <input 
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            />
            <span className={todo.completed ? 'completed' : ''}>
                {todo.text}
            </span>
            <button onClick={() => onDelete(todo.id)}>delete</button>
        </li>
    )
}