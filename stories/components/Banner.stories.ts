import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { KgiNoticeCard } from '../../app/kgi'

const meta = {
  title: 'Components/Banner',
  component: KgiNoticeCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded', docs: { description: { component: '公告卡：公告 icon + 一行訊息 + ›，整張可點。放在藍底頁面上（Basic 陰影）。' } } },
  args: { text: '有 2 筆借款，即將到期' },
} satisfies Meta<typeof KgiNoticeCard>
export default meta

export const Announcement: StoryObj<typeof meta> = { name: '公告' }
