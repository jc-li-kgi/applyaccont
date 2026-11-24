import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { KgiTag } from '../../app/kgi'

const meta = {
  title: 'Components/Tag',
  component: KgiTag,
  tags: ['autodocs'],
  parameters: { layout: 'padded', docs: { description: { component: '狀態標籤（膠囊 `rounded-full`、Caption）。`info` 在 Guideline 沒有語意 token，暫用 Graphic Blue 色票。' } } },
  argTypes: { variant: { control: 'inline-radio', options: ['default', 'caution', 'info', 'highlight', 'success'] } },
  args: { variant: 'default' },
  render: (args) => ({ components: { KgiTag }, setup: () => ({ args }), template: '<KgiTag v-bind="args">撥款中</KgiTag>' }),
} satisfies Meta<typeof KgiTag>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { name: '單一標籤' }
export const AllVariants: Story = {
  name: '全部樣式',
  render: () => ({
    components: { KgiTag },
    template: `<div class="flex flex-wrap gap-8">
      <KgiTag>撥款中</KgiTag><KgiTag variant="caution">即將到期</KgiTag><KgiTag variant="info">經驗一</KgiTag>
      <KgiTag variant="highlight">借款</KgiTag><KgiTag variant="success">已完成</KgiTag></div>`,
  }),
}
