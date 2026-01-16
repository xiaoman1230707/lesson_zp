import { TodosService } from './todos.service';
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
    getTodos(): import("./todos.service").Todo[];
    addTodo(title: string): import("./todos.service").Todo;
    deleteTodo(id: number): {
        message: string;
        code: number;
    };
}
