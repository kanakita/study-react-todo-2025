import { useState } from 'react';
import Edit from './assets/edit.svg?react';
import Trash from './assets/trash.svg?react';

export interface TodoListProps {
  items: TodoItemProps[];
  onClickDelete: (id: string) => void;
  onClickChange: (id: string, isCompleted: boolean) => void;
}

const PriorityMap = {
  1: '高',
  2: '中',
  3: '低',
};

export type PriorityItem = keyof typeof PriorityMap;

export interface TodoItemProps {
  completed: boolean;
  title: string;
  priority: PriorityItem;
  id: string;
}

export default function TodoList({ items = [], onClickDelete, onClickChange }: TodoListProps) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="p-4 w-14">
              完了
            </th>
            <th scope="col" className="px-6 py-3 w-3/4">
              タイトル
            </th>
            <th scope="col" className="px-6 py-3 w-28">
              優先度
            </th>
            <th scope="col" className="px-6 py-3">
              編集
            </th>
            <th scope="col" className="px-6 py-3">
              削除
            </th>
          </tr>
        </thead>
        <tbody>
          {items.length
            ? items.map(({ completed, title, priority, id }) => (
                <TodoItem
                  title={title}
                  completed={completed}
                  priority={priority}
                  id={id}
                  key={id}
                  onClickDelete={onClickDelete}
                  onClickChange={onClickChange}
                />
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}

interface TodoItemActionProps {
  onClickDelete: (id: string) => void;
  onClickChange: (id: string, isCompleted: boolean) => void;
}

type TodoItemAction = TodoItemActionProps & TodoItemProps;

export function TodoItem({
  completed,
  id,
  title,
  priority,
  onClickDelete,
  onClickChange,
}: TodoItemAction) {
  const [isCompleted, setIsCompleted] = useState(completed);

  function handleDelete() {
    onClickDelete(id);
  }

  function handleChange() {
    // 新しい値を計算する
    const newValue = !isCompleted;

    // 新しい値でisCompletedを更新する
    setIsCompleted(newValue);

    // 新しい値を渡す
    onClickChange(id, newValue);
  }

  return (
    <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id={id}
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500  focus:ring-2"
            checked={isCompleted}
            onChange={() => {
              handleChange();
            }}
          />
          <label htmlFor="checkbox-table-search-1" className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {title}
      </th>
      <td className="px-6 py-4">{PriorityMap[priority]}</td>
      <td className="px-6 py-4">
        <button className="font-medium text-blue-600 cursor-pointer" type="button">
          <Edit width={18} height={18} />
        </button>
      </td>
      <td className="px-6 py-4">
        <button
          onClick={handleDelete}
          className="font-medium text-red-600 cursor-pointer"
          type="button"
        >
          <Trash width={18} height={18} />
        </button>
      </td>
    </tr>
  );
}
