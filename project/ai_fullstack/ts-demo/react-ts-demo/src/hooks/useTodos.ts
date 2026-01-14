import {
  useEffect,
  useState,
} from 'react';
// 引入Todo接口 esm加type
import type { Todo } from '../types/todo';
import { getStorages, setStorages } from '../utils/storages';

const STORAGE_KEY = 'todos';//便于维护

export function useTodos(){
  const [todos,setTodos] = useState<Todo[]>(getStorages<Todo[]>(STORAGE_KEY,[]));
  useEffect(()=>{
    setStorages<Todo[]>(STORAGE_KEY,todos);
  },[todos])
  // const [count,setCount] = useState<number>(0);
  const addTodo = (title:string) =>{
    const newTodo:Todo = {
      id:+Date.now(),
      title,
      completed:false,
    }
    setTodos([...todos,newTodo]);
  }

  const deleteTodo = (id:number)=>{
    setTodos(todos.filter(todo=>todo.id!=id))
  }

  const toggleTodo = (id:number)=>{
    setTodos(todos.map(todo=>todo.id==id?{...todo,completed:!todo.completed}:todo))
  }

  return{
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
  }
}