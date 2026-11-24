import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { KgiButton, KgiIcon, KgiIconAction } from '../../app/kgi'

const meta = {
  title: 'Components/Button',
  component: KgiButton,
  subcomponents: { KgiIconAction },
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: { description: { component: 'Guideline 2026/10 更新。主要按鈕滿版直角；膠囊用在卡片 / 列表內；文字按鈕用在次要操作。圓形圖示捷徑用 `KgiIconAction`。' } },
  },
  args: { variant: 'primary', size: 'md' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'text', 'capsule'] },
    tone: { control: 'inline-radio', options: [undefined, 'active', 'caution'] },
    size: { control: 'inline-radio', options: ['md', 'sm'] },
  },
  render: (args) => ({ components: { KgiButton }, setup: () => ({ args }), template: '<KgiButton v-bind="args">下一步</KgiButton>' }),
} satisfies Meta<typeof KgiButton>
export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = { name: '主要' }
export const PrimaryDisabled: Story = { name: '主要（停用）', render: () => ({ components: { KgiButton }, template: '<KgiButton disabled>下一步</KgiButton>' }) }
export const Capsule: Story = { name: '膠囊', args: { variant: 'capsule' } }
export const CapsuleSmall: Story = { name: '膠囊（小）', args: { variant: 'capsule', size: 'sm' } }
export const Text: Story = { name: '文字', args: { variant: 'text' } }
export const TextCaution: Story = { name: '文字（警示）', args: { variant: 'text', tone: 'caution' } }
export const TextWithIcon: Story = {
  name: '文字 + icon',
  render: () => ({ components: { KgiButton, KgiIcon }, template: '<KgiButton variant="text">前往申請<KgiIcon name="forward-16.svg" level="body" tint /></KgiButton>' }),
}
export const IconAction: Story = {
  name: '圓形圖示捷徑（KgiIconAction）',
  render: () => ({
    components: { KgiIconAction },
    template: '<div class="flex justify-around"><KgiIconAction icon="add.svg" label="借款" /><KgiIconAction icon="refresh.svg" label="還款" /><KgiIconAction icon="book-info.svg" label="紀錄" /></div>',
  }),
}
