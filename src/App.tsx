import './App.css';
import TodoList, { TodoItemProps } from '@/components/TodoList/TodoList';
import TodoForm from '@/components/TodoForm/TodoForm';
import Header from '@/components/Header/Header';
import { useState } from 'react';

function App() {
  const initialTodoList: TodoItemProps[] = [
    {
      completed: false,
      title: 'A',
      priority: 1,
      id: 'fghjik',
    },
  ];

  const [todos, setTodos] = useState(initialTodoList);

  function addTodo(todo: Omit<TodoItemProps, 'id'>) {
    const newTodo = {
      ...todo,
      id: crypto.randomUUID(),
    };
    console.log(newTodo);

    setTodos([...todos, newTodo]);
  }

  return (
    <>
      <div className="container mx-auto">
        <Header />
        <TodoForm onSubmit={addTodo} />
        <TodoList items={todos} />
      </div>
    </>
  );
}

export default App;
