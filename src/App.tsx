import './App.css';
import TodoList, { PriorityType, TodoItemData } from '@/components/TodoList/TodoList';
import TodoForm from '@/components/TodoForm/TodoForm';
import Header from '@/components/Header/Header';
import { useEffect, useState } from 'react';
import Filter from '@/components/Filter/Filter';
import Sort from '@/components/Sort/Sort';

function App() {
  const storageData = localStorage.getItem('todos');
  const initialTodoList: TodoItemData[] = storageData ? JSON.parse(storageData) : [];

  const [todos, setTodos] = useState(initialTodoList);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentSort, setCurrentSort] = useState('default');

  // todos が変更されるたびに実行される
  useEffect(() => {
    // localStorageに保存
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: Omit<TodoItemData, 'id' | 'date'>) => {
    const newTodo = {
      ...todo,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };

    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const changeStatus = (id: string, isCompleted: boolean) => {
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
  };

  // todoをフィルター条件でフィルタリングして値を返す
  const getFilteredTodos = (filter: string) => {
    return todos.filter((todo) => {
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
  };

  const filterTodos = (filter: string) => {
    setCurrentFilter(filter); // 状態だけ更新する
  };

  // 渡された配列をソート条件でソートして値を返す
  const getSortedTodos = (todoArray: TodoItemData[], sort: string) => {
    return [...todoArray].sort((a, b) => {
      if (sort === 'priority-high') {
        return a.priority - b.priority; // 1,2,3順 = 高→低
      }
      if (sort === 'priority-low') {
        return b.priority - a.priority; // 3,2,1順 = 低→高
      }
      if (sort === 'created-new') {
        return b.date.localeCompare(a.date);
      }
      return 0;
    });
  };

  const sortTodos = (sort: string) => {
    setCurrentSort(sort); // 状態だけ更新する
  };

  const editTodo = (id: string, newText: string, newPriority: PriorityType) => {
    const newTodos = todos.map((todo) => {
      if (id === todo.id) {
        return {
          ...todo,
          title: newText,
          priority: newPriority,
        };
      }
      return todo;
    });

    setTodos(newTodos);
  };

  // フィルタリングを実行（フィルタリングされた値が返ってくる）
  const filtered = getFilteredTodos(currentFilter);

  // フィルタリングされた値を元にソートを実行
  const sorted = getSortedTodos(filtered, currentSort);

  return (
    <>
      <div className="container mx-auto">
        <Header />
        <TodoForm onSubmit={addTodo} />
        <div className="flex gap-4">
          <Filter onFilterChange={filterTodos} />
          <Sort onSortChange={sortTodos} />
        </div>

        <TodoList
          items={sorted}
          onClickDelete={deleteTodo}
          onClickChange={changeStatus}
          onClickEdit={editTodo}
        />
      </div>
    </>
  );
}

export default App;
