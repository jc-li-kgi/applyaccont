import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { KgiCarousel, KgiStockPickCard } from '../../app/kgi'
import { picks } from '../_data'

const meta = {
  title: 'Components/Carousel',
  component: KgiCarousel,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen', docs: { description: { component: '橫向滑動卡片 + 指示點。用 `:items` + `#default="{ item }"` slot；卡片寬度 `item-width`（預設 280px），左右露出相鄰卡片。' } } },
  args: { items: picks, label: '精選擔保品' },
  render: (args) => ({
    components: { KgiCarousel, KgiStockPickCard },
    setup: () => ({ args }),
    template: '<div class="py-16"><KgiCarousel v-bind="args"><template #default="{ item }"><KgiStockPickCard v-bind="item" /></template></KgiCarousel></div>',
  }),
} satisfies Meta<typeof KgiCarousel>
export default meta

export const Default: StoryObj<typeof meta> = { name: '精選標的' }
