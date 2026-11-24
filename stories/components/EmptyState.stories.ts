import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { KgiEmptyState } from '../../app/kgi'

const meta = {
  title: 'Components/Empty State',
  component: KgiEmptyState,
  tags: ['autodocs'],
  parameters: { layout: 'padded', docs: { description: { component: '沒有資料時的提示文字。列表沒有資料時 `KgiListTable` 會自動使用（傳 `empty` 與 `:has-rows="false"`）。' } } },
  args: { text: '目前沒有還款紀錄' },
} satisfies Meta<typeof KgiEmptyState>
export default meta

export const Default: StoryObj<typeof meta> = { name: '無資料' }
