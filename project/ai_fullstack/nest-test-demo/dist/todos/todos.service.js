"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosService = void 0;
const common_1 = require("@nestjs/common");
let TodosService = class TodosService {
    todos = [
        {
            id: 1,
            title: '周五狂欢',
            completed: false,
        },
        {
            id: 2,
            title: 'LOL win',
            completed: true,
        }
    ];
    findAll() {
        return this.todos;
    }
    addTodo(title) {
        const newTodo = {
            id: Date.now(),
            title,
            completed: false,
        };
        this.todos.push(newTodo);
        return newTodo;
    }
    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        return {
            message: 'Todo deleted',
            code: 200
        };
    }
};
exports.TodosService = TodosService;
exports.TodosService = TodosService = __decorate([
    (0, common_1.Injectable)()
], TodosService);
//# sourceMappingURL=todos.service.js.map