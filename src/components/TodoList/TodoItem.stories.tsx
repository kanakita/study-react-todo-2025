import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TodoItem } from './TodoList';

const meta = {
  title: 'Components/TodoItem',
  component: TodoItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Todo項目を表示・編集するためのテーブル行コンポーネントです。チェックボックス、タイトル編集、優先度変更、削除機能を持ちます。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    priority: {
      control: { type: 'select' },
      options: [1, 2, 3],
      mapping: {
        1: '高',
        2: '中',
        3: '低',
      },
      description: '優先度（1: 高, 2: 中, 3: 低）',
    },
    completed: {
      control: { type: 'boolean' },
      description: '完了状態',
    },
    title: {
      control: { type: 'text' },
      description: 'Todo項目のタイトル',
    },
    id: {
      control: { type: 'text' },
      description: '一意のID',
    },
  },
  decorators: [
    (Story) => (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
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
            <Story />
          </tbody>
        </table>
      </div>
    ),
  ],
} satisfies Meta<typeof TodoItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: '1',
    title: '買い物に行く',
    priority: 2,
    completed: false,
    onClickDelete: fn(),
    onClickChange: fn(),
    onClickEdit: fn(),
  },
};

export const Completed: Story = {
  args: {
    id: '2',
    title: 'プロジェクトの企画書を作成',
    priority: 1,
    completed: true,
    onClickDelete: fn(),
    onClickChange: fn(),
    onClickEdit: fn(),
  },
};

export const HighPriority: Story = {
  args: {
    id: '3',
    title: '重要な会議の準備',
    priority: 1,
    completed: false,
    onClickDelete: fn(),
    onClickChange: fn(),
    onClickEdit: fn(),
  },
};

export const LowPriority: Story = {
  args: {
    id: '4',
    title: '本を読む',
    priority: 3,
    completed: false,
    onClickDelete: fn(),
    onClickChange: fn(),
    onClickEdit: fn(),
  },
};

export const LongTitle: Story = {
  args: {
    id: '5',
    title:
      'とても長いタイトルのTodo項目で、テキストの折り返しやレイアウトの確認を行うためのサンプルです',
    priority: 2,
    completed: false,
    onClickDelete: fn(),
    onClickChange: fn(),
    onClickEdit: fn(),
  },
};
