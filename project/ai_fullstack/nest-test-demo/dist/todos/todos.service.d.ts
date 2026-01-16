export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}
export declare class TodosService {
    private todos;
    findAll(): Todo[];
    addTodo(title: string): Todo;
    deleteTodo(id: number): {
        message: string;
        code: number;
    };
}
