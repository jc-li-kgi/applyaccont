import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { KgiFilterPill, KgiSheet, KgiSheetOptions } from '../../app/kgi'

const meta = {
  title: 'Components/Filter',
  component: KgiFilterPill,
  tags: ['autodocs'],
  parameters: { layout: 'padded', docs: { description: { component: '篩選 / 排序下拉膠囊（文字 + ▼）。點擊後通常開 Action Sheet 選擇條件。' } } },
  args: { label: '近一年' },
} satisfies Meta<typeof KgiFilterPill>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: '膠囊' }
export const WithSheet: Story = {
  name: '搭配 Action Sheet',
  render: () => ({
    components: { KgiFilterPill, KgiSheet, KgiSheetOptions },
    setup: () => ({ open: ref(false), v: ref('近一年'), sort: ref('依日期排序') }),
    template: `<div class="flex gap-8"><KgiFilterPill :label="v" @click="open = true" /><KgiFilterPill :label="sort" /></div>
      <KgiSheet :open="open" title="期間" @close="open = false"><KgiSheetOptions :options="['近一個月', '近三個月', '近一年']" :value="v" @select="(x) => { v = x; open = false }" /></KgiSheet>`,
  }),
}
