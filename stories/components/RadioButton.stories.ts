import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { KgiRadioGroup } from '../../app/kgi'
import { onWhite } from '../_data'

const options = [{ value: 'partial', label: '部分' }, { value: 'full', label: '全部' }]

const meta = {
  title: 'Components/Radio Button',
  component: KgiRadioGroup,
  tags: ['autodocs'],
  decorators: [onWhite],
  parameters: { layout: 'padded', docs: { description: { component: '單選按鈕組（Reka UI RadioGroup）：橫排平分，方向鍵切換。' } } },
  args: { label: '還款額度', options, modelValue: 'partial' },
  render: (args) => ({
    components: { KgiRadioGroup },
    setup: () => ({ args, v: ref(args.modelValue) }),
    template: '<KgiRadioGroup v-bind="args" v-model="v" /><p class="n-caption-regular text-content-general-secondary">v-model：{{ v }}</p>',
  }),
} satisfies Meta<typeof KgiRadioGroup>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: '兩個選項' }
export const ThreeOptions: Story = { name: '三個選項', args: { label: '撥款方式', modelValue: null, options: [{ value: 'a', label: '交割帳戶' }, { value: 'b', label: '銀行帳戶' }, { value: 'c', label: '其他' }] } }
export const Disabled: Story = { name: '停用', args: { disabled: true } }
