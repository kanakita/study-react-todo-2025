import { PriorityItem, TodoItemProps } from '@/components/TodoList/TodoList';
import { ChangeEvent, useState } from 'react';

export interface SubmitProps {
  onSubmit: (todo: Omit<TodoItemProps, 'id' | 'date'>) => void;
}
export default function TodoForm({ onSubmit }: SubmitProps) {
  const [text, setText] = useState('');
  const [select, setSelect] = useState(2);

  function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const priority = formData.get('priority') as string;

    if (!title) {
      return;
    }

    const todo = {
      completed: false,
      title: title,
      priority: Number(priority) as PriorityItem,
    };
    onSubmit(todo);

    // inputの値を空にする
    setText('');

    // selectの値を空にする
    setSelect(2);
  }

  return (
    <form onSubmit={handleOnSubmit} className="flex items-end my-6 gap-5">
      <div className="grow">
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
          タイトル
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={text}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setText(event.target.value);
          }}
        />
      </div>
      <div className="w-20">
        <label
          htmlFor="priority"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          優先度
        </label>
        <select
          id="priority"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={select}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            setSelect(Number(event.target.value));
          }}
          name="priority"
        >
          <option value="1">高</option>
          <option value="2">中</option>
          <option value="3">低</option>
        </select>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
      >
        追加
      </button>
    </form>
  );
}
