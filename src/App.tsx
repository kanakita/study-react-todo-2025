import './App.css';
import TodoList, { PriorityType, TodoItemProps } from '@/components/TodoList/TodoList';
import TodoForm from '@/components/TodoForm/TodoForm';
import Header from '@/components/Header/Header';
import { useEffect, useState } from 'react';
import Filter from '@/components/Filter/Filter';
import Sort from '@/components/Sort/Sort';

function App() {
  const storageData = localStorage.getItem('todos');
  const initialTodoList: TodoItemProps[] = storageData ? JSON.parse(storageData) : [];

  const [todos, setTodos] = useState(initialTodoList);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentSort, setCurrentSort] = useState('default');
  // console.log(filteredTodos);

  // todos, currentFilter, currentSort が変更されるたびに実行される
  useEffect(() => {
    // localStorageに保存
    localStorage.setItem('todos', JSON.stringify(todos));

    applyFilterAndSort();
  }, [todos, currentFilter, currentSort]);

  const addTodo = (todo: Omit<TodoItemProps, 'id' | 'date'>) => {
    const newTodo = {
      ...todo,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };

    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: string) => {
    const newTodo = todos.filter((todo) => todo.id !== id);
    setTodos(newTodo);
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
  const getSortedTodos = (todoArray: TodoItemProps[], sort: string) => {
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

  // 現在のフィルター・ソート設定でtodosを処理し、filteredTodosを更新する
  const applyFilterAndSort = () => {
    // フィルタリングを実行（フィルタリングされた値が返ってくる）
    const filtered = getFilteredTodos(currentFilter);

    // フィルタリングされた値を元にソートを実行
    const sorted = getSortedTodos(filtered, currentSort);

    // 最終結果をfilteredTodosに設定
    setFilteredTodos(sorted);
  };

  const editTodo = (id: string, newEditText: string, newEditingPriority: PriorityType) => {
    const newTodos = todos.map((todo) => {
      if (id === todo.id) {
        return {
          ...todo,
          title: newEditText,
          priority: newEditingPriority,
        };
      }
      return todo;
    });

    setTodos(newTodos);
  };

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
          items={filteredTodos}
          onClickDelete={deleteTodo}
          onClickChange={changeStatus}
          onClickEdit={editTodo}
        />
      </div>
    </>
  );
}

export default App;
