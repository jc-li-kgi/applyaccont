import type { Meta, StoryObj } from '@storybook/vue3-vite'
import {
  KgiSummaryCard, KgiDetailCard, KgiDetailPanel, KgiDetailRow, KgiFeeCard, KgiStatementCard, KgiStockPickCard,
  KgiServiceCardList, KgiAmountHero, KgiStatGroup, KgiButton, KgiDateTimeLines,
} from '../../app/kgi'
import { info, picks } from '../_data'

const meta = {
  title: 'Components/Card',
  component: KgiSummaryCard,
  subcomponents: { KgiDetailCard, KgiDetailPanel, KgiDetailRow, KgiFeeCard, KgiStatementCard, KgiStockPickCard, KgiServiceCardList, KgiAmountHero, KgiStatGroup },
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          '卡片圓角 `rounded-medium`，滿版卡片（貼齊畫面左右）`rounded-none`；藍底上的卡片用 `shadow-basic`。',
          '- 內距：資訊瀏覽 16×16、流程申請（詳情概覽卡）24×24；卡片組間距 12、詳情條列 20。',
          '- 卡片內的「左標題、右數值」用 `KgiDetailRow`；值是中文時 `value-class="t-body-regular"`。',
        ].join('\n'),
      },
    },
  },
  args: { label: '整戶維持率', value: '405%', variant: 'overview', rows: [['擔保品市值', 'TWD 1,621,300'], ['即將到期金額', 'TWD 240,000', 'caution']] },
  argTypes: { variant: { control: 'inline-radio', options: ['overview', 'flow'] } },
} satisfies Meta<typeof KgiSummaryCard>
export default meta
type Story = StoryObj<typeof meta>

export const Summary: Story = {
  name: '摘要卡（資訊瀏覽）',
  render: (args) => ({
    components: { KgiSummaryCard, KgiButton },
    setup: () => ({ args }),
    template: '<KgiSummaryCard v-bind="args" @bell="() => {}"><template #actions><KgiButton variant="capsule">再借一筆</KgiButton></template></KgiSummaryCard>',
  }),
}
export const SummaryFlow: Story = { name: '摘要卡（流程申請）', args: { variant: 'flow', label: '當前參考利率', value: '2.8 %', rows: [] } }

export const Detail: Story = {
  name: '詳情概覽卡',
  render: () => ({
    components: { KgiDetailCard, KgiDetailRow, KgiAmountHero, KgiDateTimeLines },
    setup: () => ({ info }),
    template: `<KgiDetailCard>
      <KgiAmountHero label="借款金額" :amount="400000" />
      <KgiDetailRow label="參考利率" value="2.8 %" />
      <KgiDetailRow label="借款手續費" value="TWD 2" :info="info" />
      <KgiDetailRow label="借款目的" value="資金周轉" value-class="t-body-regular" />
      <KgiDetailRow label="即將到期金額" value="TWD 240,000" tone="caution" />
      <KgiDetailRow label="申請時間"><template #value><KgiDateTimeLines value="2025-12-28T03:45:11Z" /></template></KgiDetailRow>
    </KgiDetailCard>`,
  }),
}
export const DetailPanel: Story = {
  name: '明細面板',
  render: () => ({
    components: { KgiDetailPanel, KgiDetailRow },
    template: `<div class="flex flex-col gap-12">
      <KgiDetailPanel><KgiDetailRow label="利率" value="2.8 %" /><KgiDetailRow label="天數" value="180" /></KgiDetailPanel>
      <div class="rounded-medium bg-container-card-white p-16"><KgiDetailPanel tone="blue"><KgiDetailRow label="放在白卡裡" value="tone=blue" /></KgiDetailPanel></div></div>`,
  }),
}
export const Fee: Story = {
  name: '費用卡',
  render: () => ({
    components: { KgiFeeCard },
    setup: () => ({ info }),
    template: `<div class="flex flex-col gap-12">
      <KgiFeeCard title="借款費用" :rows="[{ label: '參考利率', value: '2.8%' }, { label: '借款手續費', value: 'TWD 2', info }]" note="費用僅供參考" />
      <div class="-mx-16"><KgiFeeCard full title="滿版（full）" :rows="[{ label: '參考利率', value: '2.8%' }]" /></div></div>`,
  }),
}
export const Statement: Story = {
  name: '對帳單卡',
  render: () => ({
    components: { KgiStatementCard },
    template: `<KgiStatementCard title="TWD 240,000" tag="借款"
      :rows="[{ label: '起息日', value: '2026/06/09' }, { label: '到期日', value: '2026/12/09' }]"
      :detail="[{ label: '利率', value: '2.8 %' }, { label: '借款手續費', value: 'TWD 2' }]" />`,
  }),
}
export const StockPick: Story = {
  name: '精選標的卡',
  render: () => ({
    components: { KgiStockPickCard, KgiStatGroup },
    setup: () => ({ pick: picks[0] }),
    template: '<div class="flex flex-col gap-12"><KgiStockPickCard v-bind="pick" /><div class="rounded-medium bg-container-card-white p-16"><KgiStatGroup :items="pick.stats" /></div></div>',
  }),
}
export const ServiceList: Story = {
  name: '服務卡片清單',
  render: () => ({
    components: { KgiServiceCardList },
    template: `<KgiServiceCardList :items="[{ icon: 'service-learn.png', title: '認識股票借貸', desc: '3 分鐘了解借貸流程' }, { icon: 'service-borrow.png', title: '我要借款', desc: '線上申請，最快 1 小時撥款' }]" />`,
  }),
}
