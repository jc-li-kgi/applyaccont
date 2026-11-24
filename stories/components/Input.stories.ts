import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { KgiNumberField } from '../../app/kgi'
import { onWhite } from '../_data'

const meta = {
  title: 'Components/Input',
  component: KgiNumberField,
  tags: ['autodocs'],
  decorators: [onWhite],
  parameters: {
    layout: 'padded',
    docs: { description: { component: '底線輸入框：欄位標題→輸入框 8、操作欄位之間 24。目前提供數字輸入（只接受整數，超過 max 自動改成 max）。金額試算請看 **Calculation**，下拉選擇請看 **Picker**，搜尋請看 **Search**。' } },
  },
  args: { label: '擔保張數', placeholder: '請輸入數字', suffix: '張', max: 9999, modelValue: null },
  render: (args) => ({
    components: { KgiNumberField },
    setup: () => ({ args, v: ref<number | null>(null) }),
    template: '<KgiNumberField v-bind="args" v-model="v" /><p class="n-caption-regular text-content-general-secondary">v-model：{{ v }}</p>',
  }),
} satisfies Meta<typeof KgiNumberField>
export default meta

export const NumberInput: StoryObj<typeof meta> = { name: '數字' }
export const Group: StoryObj<typeof meta> = {
  name: '多個欄位（間距 24）',
  render: () => ({
    components: { KgiNumberField },
    setup: () => ({ a: ref<number | null>(null), b: ref<number | null>(3) }),
    template: '<KgiNumberField v-model="a" label="擔保張數" placeholder="請輸入數字" suffix="張" /><KgiNumberField v-model="b" label="借款天數" placeholder="請輸入天數" suffix="天" :max="180" />',
  }),
}
