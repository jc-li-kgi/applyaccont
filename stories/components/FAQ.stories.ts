import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { KgiAccordion } from '../../app/kgi'

const meta = {
  title: 'Components/FAQ',
  component: KgiAccordion,
  tags: ['autodocs'],
  decorators: [() => ({ template: '<div class="bg-surface-white px-16"><story /></div>' })],
  parameters: { layout: 'padded', docs: { description: { component: '常見問題（Reka UI Accordion）：＋ / － 展開，一次只展開一題。`default-open` 指定一開始展開第幾題。' } } },
  args: {
    defaultOpen: 0,
    items: [
      { q: '誰可以申請股票借貸？', a: '年滿 20 歲、已開立凱基證券帳戶的本國自然人。' },
      { q: '最快多久撥款？', a: '審核通過後最快 1 小時撥款。' },
      { q: '可以提前還款嗎？', a: '可以，隨時可部分或全部還款。' },
    ],
  },
} satisfies Meta<typeof KgiAccordion>
export default meta

export const Default: StoryObj<typeof meta> = { name: '問答' }
export const AllCollapsed: StoryObj<typeof meta> = { name: '全部收合', args: { defaultOpen: null } }
