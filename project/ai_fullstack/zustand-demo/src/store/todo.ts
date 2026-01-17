import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Todo{
    id: number,
    text: string,
    completed: boolean,
}

export interface TodoState{
    todos:Todo[];
    addTodo: (text:string)=>void;
    toggleTodo:(id:number)=>void;
    removeTodo:(id:number)=>void;
}

export const useTodoStore = create<TodoState>()(
    persist(
                  (set)=>({
    todos:[],
    addTodo:(text:string)=>set((state)=>
        ({todos:
            [...state.todos,{id:Date.now(),text,completed:false}]
        })),
    removeTodo:(id:number)=>set((state)=>({
        todos:state.todos.filter((todo)=>todo.id!==id)
    })),
    toggleTodo:(id:number)=>set((state)=>({
        todos:state.todos.map((todo)=>
            todo.id===id?{...todo,completed:!todo.completed}:todo
        )
    }))
}),{
    name:'todo-storage',
}
))



