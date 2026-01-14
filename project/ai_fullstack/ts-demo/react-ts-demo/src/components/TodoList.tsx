// 组件参数接口 父子组件对接
// props接口可以确保子组件的正常运行
import type { Todo } from "../types/todo"
import  TodoItem  from "./TodoItem"
import * as React from 'react';//esm 
interface Props{
    todos:Todo[];
    onDelete:(id:number)=>void;
    onToggle:(id:number)=>void;
}

const TodoList: React.FC<Props> = (
    {todos,onDelete,onToggle}:Props
)=>{
    return(
        <>
        <ul>
            {todos.map(todo => (
                 <TodoItem 
                 key={todo.id} 
                 todo={todo} 
                 onDelete={onDelete} 
                 onToggle={onToggle} />
            ))}
        </ul>
        </>
    )
}

export default TodoList