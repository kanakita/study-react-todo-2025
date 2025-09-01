import './App.css';
import TodoList, { TodoItemProps } from '@/components/TodoList/TodoList';
import TodoForm from '@/components/TodoForm/TodoForm';
import Header from '@/components/Header/Header';
import { useEffect, useState } from 'react';
import Filter from '@/components/Filter/Filter';

function App() {
  const storageData = localStorage.getItem('todos');
  const initialTodoList: TodoItemProps[] = storageData ? JSON.parse(storageData) : [];

  const [todos, setTodos] = useState(initialTodoList);

  // todosが変更されるたびにlocalStorageに保存
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function addTodo(todo: Omit<TodoItemProps, 'id'>) {
    const newTodo = {
      ...todo,
      id: crypto.randomUUID(),
    };

    setTodos([...todos, newTodo]);
  }

  function deleteTodo(id: string) {
    const newTodo = todos.filter((todo) => todo.id !== id);
    setTodos(newTodo);
  }

  function changeStatus(id: string, isCompleted: boolean) {
    const newTodos = todos.map((todo) => {
      if (id === todo.id) {
        return {
          ...todo,
          completed: isCompleted,
        };
      }
      return todo;
    });

    setTodos(newTodos);
  }

  function filterStatus(filter: string) {
    console.log(filter);
  }

  return (
    <>
      <div className="container mx-auto">
        <Header />
        <TodoForm onSubmit={addTodo} />
        <Filter onFilterChange={filterStatus} />
        <TodoList items={todos} onClickDelete={deleteTodo} onClickChange={changeStatus} />
      </div>
    </>
  );
}

export default App;
