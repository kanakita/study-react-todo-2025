import { useState } from 'react';

interface FilterProps {
  onFilterChange: (value: string) => void;
}

export default function Filter({ onFilterChange }: FilterProps) {
  const items = [
    {
      status: 'all',
      title: 'すべて',
    },
    {
      status: 'completed',
      title: '完了のみ',
    },
    {
      status: 'active',
      title: '未完了のみ',
    },
  ];

  const [selected, setSelected] = useState('all');

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSelected(event.target.value);

    onFilterChange(event.target.value);
  }

  return (
    <ul className="items-center w-full text-sm font-medium my-6 text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
      {items.map((item) => (
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r" key={item.status}>
          <div className="flex items-center ps-3">
            <input
              id={`filter-complete-${item.status}`}
              type="radio"
              value={item.status}
              name="filter-complete"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              onChange={handleOnChange}
              checked={selected === item.status}
            />
            <label
              htmlFor={`filter-complete-${item.status}`}
              className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
            >
              {item.title}
            </label>
          </div>
        </li>
      ))}
    </ul>
  );
}
