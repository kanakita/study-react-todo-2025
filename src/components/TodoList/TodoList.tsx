import { ChangeEvent, KeyboardEvent, useState } from 'react';
import Edit from './assets/edit.svg?react';
import Trash from './assets/trash.svg?react';

export interface TodoListProps extends TodoItemActionProps {
  items: TodoItemProps[];
}

const PriorityMap = {
  1: '高',
  2: '中',
  3: '低',
} as const; // 定数として扱うという意味

// Object.entriesでPriorityMapを[key, value]にして、mapで{ value, label }形式の配列に変換
// 優先度のselectボックスに使用する
export const priorityItems = Object.entries(PriorityMap).map(([value, label]: [string, string]) => {
  return {
    value: Number(value),
    label: label,
  };
});

// typeofは値から型を取得 -> keyofはオブジェクトからキーを取得
// 1 | 2 | 3 になる
export type PriorityType = keyof typeof PriorityMap;

export interface TodoItemProps {
  completed: boolean;
  title: string;
  priority: PriorityType;
  id: string;
  date: string;
}

export default function TodoList({
  items = [],
  onClickDelete,
  onClickChange,
  onClickEdit,
}: TodoListProps) {
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
                  onClickEdit={onClickEdit}
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
  onClickEdit: (id: string, editText: string, editPriority: PriorityType) => void;
}

interface TodoItemAction extends TodoItemActionProps, Omit<TodoItemProps, 'date'> {}

export function TodoItem({
  completed,
  id,
  title,
  priority,
  onClickDelete,
  onClickChange,
  onClickEdit,
}: TodoItemAction) {
  const [isCompleted, setIsCompleted] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(title);
  const [editingPriority, setEditingPriority] = useState(priority);

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

  // 編集ボタンを押した時の処理
  function handleEdit() {
    const newEditStatus = !isEditing;

    // 編集中ならsubmitする
    if (isEditing) {
      handleSubmit();
    } else {
      // 編集中でなければ編集状態を更新する
      setIsEditing(newEditStatus);
    }
  }

  // 変更を送信する処理
  function handleSubmit() {
    // 送信するから編集状態はfalse
    setIsEditing(false);

    setEditingText(editingText);
    setEditingPriority(editingPriority);

    onClickEdit(id, editingText, editingPriority);
  }

  // inputのキーボード入力時の処理
  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'Enter') return; // エンターキー以外は何もしない
    event.preventDefault();
    handleSubmit();
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
          <label htmlFor={id} className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      <th scope="row">
        {!isEditing ? (
          <span className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {editingText}
          </span>
        ) : (
          <input
            className="px-6 py-4 bg-gray-100 font-medium text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
            type="text"
            value={editingText}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setEditingText(event.target.value)}
            onKeyDown={handleInputKeyDown}
          />
        )}
      </th>
      <td className="px-6 py-4">
        {!isEditing ? (
          PriorityMap[priority]
        ) : (
          <select
            id="editSelect"
            value={editingPriority}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setEditingPriority(Number(event.target.value) as PriorityType)
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
          >
            {priorityItems.map(({ value, label }) => {
              return (
                <option value={value} key={value}>
                  {label}
                </option>
              );
            })}
          </select>
        )}
      </td>
      <td className="px-6 py-4">
        <button
          className="font-medium text-blue-600 cursor-pointer"
          type="button"
          onClick={handleEdit}
        >
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
