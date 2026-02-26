import { useState, useEffect } from 'react';

function App() {
  // Todo 类型定义
  type Todo = {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
  };

  // 状态管理
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  // 从 localStorage 加载数据
  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // 转换 createdAt 字符串为 Date 对象
        const todosWithDate = parsed.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
        }));
        setTodos(todosWithDate);
      } catch (e) {
        console.error('Failed to parse todos from localStorage', e);
      }
    }
  }, []);

  // 保存到 localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 添加新 todo
  const addTodo = () => {
    if (newTodo.trim() === '') return;
    const newTodoItem: Todo = {
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false,
      createdAt: new Date(),
    };
    setTodos([newTodoItem, ...todos]);
    setNewTodo('');
  };

  // 删除 todo
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 切换完成状态
  const toggleComplete = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 开始编辑
  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  // 保存编辑
  const saveEdit = () => {
    if (editText.trim() === '') return;
    setTodos(
      todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      )
    );
    setEditingId(null);
    setEditText('');
  };

  // 取消编辑
  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  // 过滤 todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // 统计信息
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            📋 Todo List
          </h1>
          <p className="text-blue-100 text-lg">Organize your tasks with style</p>
        </header>

        {/* 添加表单 */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-xl border border-white/30">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTodo()}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-3 rounded-xl bg-white/30 border border-white/40 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/40 transition-all duration-300"
            />
            <button
              onClick={addTodo}
              className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 hover:scale-105 transition-all duration-300 transform shadow-md hover:shadow-lg"
            >
              Add
            </button>
          </div>
        </div>

        {/* 统计与筛选 */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="text-white/90">
            <span className="font-medium">{activeCount} </span>
            <span>items left</span>
          </div>
          <div className="flex gap-2 bg-white/20 backdrop-blur-sm rounded-xl p-1 border border-white/30">
            {(['all', 'active', 'completed'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  filter === f
                    ? 'bg-white text-indigo-600 shadow-md'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Todo 列表 */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-medium text-white/90 mb-2">No tasks here!</h3>
              <p className="text-white/70">
                {filter === 'all'
                  ? 'Add your first task to get started!'
                  : filter === 'active'
                  ? 'All tasks are completed! Great job!'
                  : 'No completed tasks yet.'}
              </p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className={`bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
                  todo.completed ? 'opacity-70' : ''
                }`}
              >
                {editingId === todo.id ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg bg-white/30 border border-white/40 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                      autoFocus
                    />
                    <button
                      onClick={saveEdit}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleComplete(todo.id)}
                        className="w-5 h-5 text-indigo-500 rounded focus:ring-indigo-500 cursor-pointer"
                      />
                      <span
                        className={`text-lg flex-1 ${
                          todo.completed ? 'line-through text-white/60' : 'text-white'
                        }`}
                      >
                        {todo.text}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditing(todo)}
                        className="text-white/70 hover:text-white p-1.5 rounded-full hover:bg-white/20 transition-colors"
                        aria-label="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-white/70 hover:text-red-300 p-1.5 rounded-full hover:bg-red-500/20 transition-colors"
                        aria-label="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* 底部统计 */}
        <div className="mt-8 text-center text-white/80 text-sm">
          <p>
            {todos.length} total • {activeCount} active • {completedCount} completed
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;