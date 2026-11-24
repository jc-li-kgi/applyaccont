import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { KgiCollapsibleCard, KgiExpandButton, KgiExpandToggle, KgiDetailRow } from '../../app/kgi'

const meta = {
  title: 'Components/Accordion',
  component: KgiCollapsibleCard,
  subcomponents: { KgiExpandButton, KgiExpandToggle },
  tags: ['autodocs'],
  parameters: { layout: 'padded', docs: { description: { component: '可收合的內容區（Reka UI Collapsible）。問答型收合請看 **FAQ**。' } } },
  args: { title: '擔保品匯入明細', variant: 'flow', defaultOpen: true },
  argTypes: { variant: { control: 'inline-radio', options: ['flow', 'overview'] } },
  render: (args) => ({
    components: { KgiCollapsibleCard, KgiDetailRow },
    setup: () => ({ args }),
    template: '<KgiCollapsibleCard v-bind="args"><KgiDetailRow label="元大台灣50" value="5 張" /><KgiDetailRow label="台積電" value="2 張" /></KgiCollapsibleCard>',
  }),
} satisfies Meta<typeof KgiCollapsibleCard>
export default meta
type Story = StoryObj<typeof meta>

export const Flow: Story = { name: '收合卡片（流程申請，內距 24）' }
export const Overview: Story = { name: '收合卡片（資訊瀏覽，內距 16）', args: { variant: 'overview' } }
export const Collapsed: Story = { name: '預設收起', args: { defaultOpen: false } }

export const ExpandButton: Story = {
  name: '展開明細按鈕',
  render: () => ({
    components: { KgiExpandButton, KgiExpandToggle },
    setup: () => ({ open: ref(false) }),
    template: `<div class="flex flex-col items-center gap-16">
      <KgiExpandButton :expanded="open" @click="open = !open" />
      <button type="button" class="flex items-center gap-8 t-body-regular" @click="open = !open">只有箭頭（KgiExpandToggle）<KgiExpandToggle :expanded="open" /></button></div>`,
  }),
}
