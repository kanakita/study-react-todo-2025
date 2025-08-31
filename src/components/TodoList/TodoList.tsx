export interface TodoListProps {
  items: TodoItemProps[];
}

const PriorityMap = {
  1: '高',
  2: '中',
  3: '低',
};

type PriorityItem = keyof typeof PriorityMap;

export interface TodoItemProps {
  completed: boolean;
  title: string;
  priority: PriorityItem;
  id: string;
}

export default function TodoList({ items = [] }: TodoListProps) {
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
                />
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}

export function TodoItem({ completed, id, title, priority }: TodoItemProps) {
  return (
    <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id={id}
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500  focus:ring-2"
            checked={completed}
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
        <button className="font-medium text-blue-600" type="button">
          Edit
        </button>
      </td>
      <td className="px-6 py-4">
        <button className="font-medium text-red-600" type="button">
          Remove
        </button>
      </td>
    </tr>
  );
}
