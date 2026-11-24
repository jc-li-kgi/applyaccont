import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { KgiDialog, KgiInfoDialog, KgiButton } from '../../app/kgi'

const meta = {
  title: 'Components/Dialog',
  component: KgiDialog,
  subcomponents: { KgiInfoDialog },
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: { description: { component: 'Guideline 2026/10 更新。Reka UI Dialog：焦點鎖定、Esc 與點遮罩關閉，最大高度 80vh。按鈕沒有 `onClick` 就是關閉；兩顆按鈕時左邊次要、右邊主要。' } },
  },
  args: { open: false, title: '借款手續費', body: '每筆借款收取手續費 TWD 2，於撥款時扣除。', bodyAlign: 'left' },
} satisfies Meta<typeof KgiDialog>
export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {
  name: '說明（一顆按鈕）',
  render: (args) => ({
    components: { KgiDialog, KgiButton },
    setup: () => ({ args, open: ref(false) }),
    template: '<KgiButton @click="open = true">開啟</KgiButton><KgiDialog v-bind="args" :open="open" @close="open = false" />',
  }),
}
export const Confirm: Story = {
  name: '確認（兩顆按鈕）',
  render: () => ({
    components: { KgiDialog, KgiButton },
    setup: () => ({ open: ref(false) }),
    template: `<KgiButton @click="open = true">送出</KgiButton>
      <KgiDialog :open="open" title="確認送出？" body="送出後無法修改。" body-align="center" :actions="[{ label: '返回', secondary: true }, { label: '確認送出', onClick: () => (open = false) }]" @close="open = false" />`,
  }),
}
export const InfoDialog: Story = {
  name: '說明型（KgiInfoDialog）',
  render: () => ({
    components: { KgiInfoDialog, KgiButton },
    setup: () => ({ info: ref<{ title: string; body: string } | null>(null) }),
    template: `<KgiButton variant="text" @click="info = { title: '維持率', body: '擔保品市值 ÷ 借款金額。' }">什麼是維持率？</KgiButton><KgiInfoDialog :info="info" @close="info = null" />`,
  }),
}
