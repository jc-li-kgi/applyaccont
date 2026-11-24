import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { KgiPickerField, KgiAccountPicker } from '../../app/kgi'
import { onWhite } from '../_data'

const meta = {
  title: 'Components/Picker',
  component: KgiPickerField,
  subcomponents: { KgiAccountPicker },
  tags: ['autodocs'],
  decorators: [onWhite],
  parameters: {
    layout: 'padded',
    docs: { description: { component: '選擇欄位：點擊開 Action Sheet 選項清單（最大高度 90vh）。自訂選擇畫面（例如有搜尋的股票清單）不給 `options`，改給 `display-value` + `@open`。帳號切換用 `KgiAccountPicker`。' } },
  },
  args: { label: '借款期數', options: ['6 個月', '12 個月', '24 個月'], placeholder: '請選擇' },
  render: (args) => ({
    components: { KgiPickerField },
    setup: () => ({ args, v: ref<string | null>(null) }),
    template: '<KgiPickerField v-bind="args" v-model="v" /><p class="n-caption-regular text-content-general-secondary">v-model：{{ v }}</p>',
  }),
} satisfies Meta<typeof KgiPickerField>
export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = { name: '文字選項' }
export const WithHint: Story = { name: '提示', args: { hint: '可隨時提前還款' } }
export const WithError: Story = { name: '錯誤', args: { error: '請選擇借款期數' } }
export const Custom: Story = {
  name: '自訂選擇畫面',
  render: () => ({ components: { KgiPickerField }, template: '<KgiPickerField label="擔保標的" display-value="元大高股息 0056" hint="收盤價 56.30" @open="() => {}" />' }),
}
export const Account: Story = {
  name: '帳號（KgiAccountPicker）',
  decorators: [],
  render: () => ({ components: { KgiAccountPicker }, template: `<KgiAccountPicker :account="{ id: '9999-999999', name: '流川楓' }" />` }),
}
