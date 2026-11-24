import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { KgiSheet, KgiSheetOptions, KgiButton } from '../../app/kgi'

const meta = {
  title: 'Components/Action Sheet',
  component: KgiSheet,
  subcomponents: { KgiSheetOptions },
  tags: ['autodocs'],
  parameters: { layout: 'padded', docs: { description: { component: '底部彈窗（Reka UI Dialog）：點遮罩、Esc、右上 ✕ 關閉，最大高度 90vh。選項清單用 `KgiSheetOptions`。' } } },
  args: { open: false, title: '期間' },
} satisfies Meta<typeof KgiSheet>
export default meta
type Story = StoryObj<typeof meta>

export const ListPicker: Story = {
  name: '選項清單',
  render: () => ({
    components: { KgiSheet, KgiSheetOptions, KgiButton },
    setup: () => ({ open: ref(false), v: ref('近一年') }),
    template: `<KgiButton variant="capsule" @click="open = true">期間：{{ v }}</KgiButton>
      <KgiSheet :open="open" title="期間" @close="open = false">
        <KgiSheetOptions :options="['近一個月', '近三個月', '近一年']" :value="v" @select="(x) => { v = x; open = false }" />
      </KgiSheet>`,
  }),
}

export const WithDescription: Story = {
  name: '選項附說明',
  render: () => ({
    components: { KgiSheet, KgiSheetOptions, KgiButton },
    setup: () => ({ open: ref(false), v: ref<string | null>(null) }),
    template: `<KgiButton variant="capsule" @click="open = true">還款方式</KgiButton>
      <KgiSheet :open="open" title="還款方式" description="選擇後可於下一步確認金額" @close="open = false">
        <KgiSheetOptions :options="[{ value: 'cash', label: '現金還款', desc: '由交割帳戶扣款' }, { value: 'sell', label: '賣股還款', desc: '賣出擔保品償還' }]" :value="v" @select="(x) => { v = x; open = false }" />
      </KgiSheet>`,
  }),
}

export const Menu: Story = {
  name: '前往型選單（chevron）',
  render: () => ({
    components: { KgiSheet, KgiSheetOptions, KgiButton },
    setup: () => ({ open: ref(false) }),
    template: `<KgiButton variant="capsule" @click="open = true">更多操作</KgiButton>
      <KgiSheet :open="open" title="選擇操作" @close="open = false">
        <KgiSheetOptions chevron :options="[{ value: 'repay', label: '還款', desc: '現金或賣股還款' }, { value: 'add', label: '增加擔保品' }]" @select="open = false" />
      </KgiSheet>`,
  }),
}
