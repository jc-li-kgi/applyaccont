import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { KgiAmountField, KgiQtyStepper } from '../../app/kgi'
import { onWhite } from '../_data'

const meta = {
  title: 'Components/Calculation',
  component: KgiAmountField,
  subcomponents: { KgiQtyStepper },
  tags: ['autodocs'],
  decorators: [onWhite],
  parameters: {
    layout: 'padded',
    docs: { description: { component: '金額 / 數量試算：− ＋ 依 step 增減，直接輸入時離開欄位會自動修正到 min～max 並對齊 step。小型加減框用 `KgiQtyStepper`。' } },
  },
  args: { label: '借款金額', min: 10000, max: 600000, step: 1000, prefix: 'TWD', placeholder: '請輸入借款金額', modelValue: null },
} satisfies Meta<typeof KgiAmountField>
export default meta
type Story = StoryObj<typeof meta>

export const Amount: Story = {
  name: '金額',
  render: (args) => ({
    components: { KgiAmountField },
    setup: () => ({ args, v: ref<number | null>(null) }),
    template: `<KgiAmountField v-bind="args" v-model="v" :hints="['可借款金額 TWD 10,000～TWD 600,000']" :action="{ label: '額度限制', onClick: () => {} }" />
      <p class="n-caption-regular text-content-general-secondary">v-model：{{ v }}</p>`,
  }),
}
export const WithError: Story = {
  name: '錯誤',
  render: () => ({
    components: { KgiAmountField },
    setup: () => ({ v: ref<number | null>(700000) }),
    template: '<KgiAmountField v-model="v" label="借款金額" prefix="TWD" :min="10000" :max="900000" :step="1000" error="超過可借款金額" />',
  }),
}
export const Disabled: Story = {
  name: '停用',
  render: () => ({
    components: { KgiAmountField },
    setup: () => ({ v: ref<number | null>(100000) }),
    template: '<KgiAmountField v-model="v" label="借款金額" prefix="TWD" :min="10000" :max="600000" :step="1000" disabled />',
  }),
}
export const QtyStepper: Story = {
  name: '數量加減（KgiQtyStepper）',
  render: () => ({
    components: { KgiQtyStepper },
    setup: () => ({ q: ref(1) }),
    template: '<div class="flex"><KgiQtyStepper v-model="q" :min="1" :max="5" unit="張" /></div>',
  }),
}
