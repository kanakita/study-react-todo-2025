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
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [currentFilter, setCurrentFilter] = useState('all');
  console.log(filteredTodos);

  // todosが変更されるたびにlocalStorageに保存
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    // setFilteredTodos(todos);
    filterTodos(currentFilter);
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

  function filterTodos(filter: string) {
    const filteredTodos = todos.filter((todo) => {
      if (filter === 'all') {
        return true;
      }
      if (filter === 'completed') {
        return todo.completed;
      }
      if (filter === 'active') {
        return !todo.completed;
      }
      return false;
    });
    // console.log(filteredTodos);
    setCurrentFilter(filter);
    setFilteredTodos(filteredTodos);
  }

  return (
    <>
      <div className="container mx-auto">
        <Header />
        <TodoForm onSubmit={addTodo} />
        <Filter onFilterChange={filterTodos} />
        <TodoList items={filteredTodos} onClickDelete={deleteTodo} onClickChange={changeStatus} />
      </div>
    </>
  );
}

export default App;
