import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { KgiNoticeBar } from '../../app/kgi'

const meta = {
  title: 'Components/System Message',
  component: KgiNoticeBar,
  tags: ['autodocs'],
  parameters: { layout: 'padded', docs: { description: { component: '頁面內的提示條（淡黃底 Surface Yellow、置中、Caption）。可點擊的公告請看 **Banner**，短暫提示請看 **Toast & Snackbar**。' } } },
  render: () => ({ components: { KgiNoticeBar }, template: '<KgiNoticeBar>動用不受限，最快 1 小時撥款</KgiNoticeBar>' }),
} satisfies Meta<typeof KgiNoticeBar>
export default meta

export const Notice: StoryObj<typeof meta> = { name: '提示條' }
