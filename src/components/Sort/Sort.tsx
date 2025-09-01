import { useState } from 'react';

interface SortProps {
  onSortChange: (value: string) => void;
}

export default function Sort({ onSortChange }: SortProps) {
  const items = [
    { value: 'default', label: '登録順（古→新）' }, // デフォルト
    { value: 'created-new', label: '登録順（新→古）' },
    { value: 'priority-high', label: '優先度（高→低）' },
    { value: 'priority-low', label: '優先度（低→高）' },
  ];

  const [selected, setSelected] = useState('default');

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSelected(event.target.value);

    onSortChange(event.target.value);
  }

  return (
    <ul className="items-center w-full text-sm font-medium my-6 text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
      {items.map((item, index) => (
        <li
          className={
            items.length - 1 === index
              ? `w-full`
              : `w-full border-b border-gray-200 sm:border-b-0 sm:border-r`
          }
          key={item.value}
        >
          <div className="flex items-center ps-3">
            <input
              id={`sort-${item.value}`}
              type="radio"
              value={item.value}
              name="sort"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              onChange={handleOnChange}
              checked={selected === item.value}
            />
            <label
              htmlFor={`sort-${item.value}`}
              className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
            >
              {item.label}
            </label>
          </div>
        </li>
      ))}
    </ul>
  );
}
