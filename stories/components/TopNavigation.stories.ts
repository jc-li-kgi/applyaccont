import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { KgiPageHeader } from '../../app/kgi'

const meta = {
  title: 'Components/Top Navigation',
  component: KgiPageHeader,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen', docs: { description: { component: '子頁標題列：返回 / 標題 / 分享。綁 `@back` 才顯示返回鍵；`show-share` 控制分享鍵。頁首與內容間距 24。' } } },
  args: { title: '申請借款', showShare: true },
} satisfies Meta<typeof KgiPageHeader>
export default meta
type Story = StoryObj<typeof meta>

export const WithBack: Story = {
  name: '返回 + 分享',
  render: (args) => ({ components: { KgiPageHeader }, setup: () => ({ args }), template: '<KgiPageHeader v-bind="args" @back="() => {}" />' }),
}
export const TitleOnly: Story = { name: '只有標題', args: { showShare: false } }
