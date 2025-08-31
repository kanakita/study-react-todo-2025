import './App.css';
import TodoList, { TodoItemProps } from '@/components/TodoList/TodoList';
import TodoForm from '@/components/TodoForm/TodoForm';
import Header from '@/components/Header/Header';

const defaultTodoList: TodoItemProps[] = [
  {
    completed: false,
    title: 'A',
    priority: 1,
    id: 'fghjik',
  },
];
function App() {
  return (
    <>
      <div className="container mx-auto">
        <Header />
        <TodoForm />
        <TodoList items={defaultTodoList} />
      </div>
    </>
  );
}

export default App;
