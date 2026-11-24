import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { KgiListTable, KgiListRow, KgiStockName, KgiAmountCell, KgiDateTimeLines, KgiDetailRow, KgiButton } from '../../app/kgi'

const columns = [{ label: '股票', sortKey: 'name' }, { label: '申請\n時間', align: 'center' as const }, { label: '金額', align: 'right' as const, info: { title: '金額', body: '以臺幣計' } }]

const meta = {
  title: 'Components/List',
  component: KgiListTable,
  subcomponents: { KgiListRow, KgiStockName, KgiAmountCell, KgiDateTimeLines },
  tags: ['autodocs'],
  decorators: [() => ({ template: '<div class="bg-surface-white py-16"><story /></div>' })],
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: '列表：表頭（可排序、可加 ⓘ）+ 列。每列用 `KgiListRow`，格子用 `#cell-0`、`#cell-1`… slot；綁 `@toggle` 時整列可展開明細。欄寬用 `width`（可用 `var(--spacing-80)`）。' } },
  },
  args: { columns, expandable: true },
} satisfies Meta<typeof KgiListTable>
export default meta
type Story = StoryObj<typeof meta>

export const Expandable: Story = {
  name: '可展開、可排序',
  render: (args) => ({
    components: { KgiListTable, KgiListRow, KgiStockName, KgiAmountCell, KgiDateTimeLines, KgiDetailRow, KgiButton },
    setup: () => ({ args, sort: ref<string | null>(null), open: ref<number | null>(null) }),
    template: `<KgiListTable v-bind="args" v-model:sort="sort">
      <KgiListRow v-for="(s, i) in [{ n: '台積電', c: '2330', a: 128280 }, { n: '元大台灣50', c: '0050', a: 56300 }]" :key="s.c"
        :cell-count="3" :align="['left', 'center', 'right']" :expanded="open === i" @toggle="open = open === i ? null : i">
        <template #cell-0><KgiStockName :name="s.n" :code="s.c" /></template>
        <template #cell-1><KgiDateTimeLines value="2025-12-28T03:45:11Z" text-class="n-caption-regular text-content-general-secondary" /></template>
        <template #cell-2><KgiAmountCell :amount="s.a" /></template>
        <template #footer><KgiButton variant="capsule" size="sm">賣股還款</KgiButton></template>
        <template #detail><KgiDetailRow label="利率" value="2.8 %" /></template>
      </KgiListRow>
    </KgiListTable>`,
  }),
}
export const Empty: Story = {
  name: '無資料',
  render: () => ({ components: { KgiListTable }, template: `<KgiListTable :columns="[{ label: '股票' }, { label: '金額', align: 'right' }]" :has-rows="false" empty="目前沒有資料" />` }),
}
