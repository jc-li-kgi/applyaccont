import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import {
  KgiFlowPage, KgiResultPage, KgiBottomActions, KgiStickyFooter, KgiTotalBar, KgiSectionHeader,
  KgiDetailCard, KgiDetailRow, KgiButton, KgiAmountHero, KgiFeeCard,
} from '../../app/kgi'
import { info } from '../_data'

const meta = {
  title: 'Patterns/Page Layout',
  component: KgiFlowPage,
  subcomponents: { KgiResultPage, KgiBottomActions, KgiStickyFooter, KgiTotalBar, KgiSectionHeader },
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          '頁面版型：組合 Top Navigation、Progress Bar、卡片與按鈕，套用 Guideline 的頁面間距（見 Foundations › Grid System）。',
          '- `KgiFlowPage`：流程申請頁。內容下方按鈕放 `#actions`（距內容至少 32、不滿一屏時置底、距畫面底 48）；固定在底部的操作區放 `#sticky`。',
          '- `KgiResultPage`：完成頁。',
          '- `KgiSectionHeader`：區塊標題（標題 + 右側文字連結 + 說明）。',
        ].join('\n'),
      },
    },
  },
  args: { title: '申請借款', step: { index: 2, total: 3, label: '確認申請' } },
} satisfies Meta<typeof KgiFlowPage>
export default meta
type Story = StoryObj<typeof meta>

export const FlowWithActions: Story = {
  name: '流程頁 · 底部按鈕',
  render: (args) => ({
    components: { KgiFlowPage, KgiDetailCard, KgiDetailRow, KgiButton, KgiAmountHero, KgiFeeCard },
    setup: () => ({ args, info }),
    template: `<KgiFlowPage v-bind="args" @back="() => {}">
      <div class="flex flex-col gap-12 px-16">
        <KgiDetailCard><KgiAmountHero label="借款金額" :amount="400000" /><KgiDetailRow label="參考利率" value="2.8 %" /></KgiDetailCard>
        <KgiFeeCard title="借款費用" :rows="[{ label: '借款手續費', value: 'TWD 2', info }]" />
      </div>
      <template #actions><KgiButton>確認送出</KgiButton><KgiButton variant="text" block>取消</KgiButton></template>
    </KgiFlowPage>`,
  }),
}
export const FlowWithSticky: Story = {
  name: '流程頁 · 置底總計',
  render: () => ({
    components: { KgiFlowPage, KgiDetailCard, KgiDetailRow, KgiButton, KgiTotalBar },
    setup: () => ({ open: ref(false), info: { title: '借款總額', body: '含手續費' } }),
    template: `<KgiFlowPage title="匯入擔保品" @back="() => {}">
      <div class="px-16"><KgiDetailCard><KgiDetailRow label="元大台灣50" value="5 張" /></KgiDetailCard></div>
      <template #sticky>
        <KgiTotalBar label="借款總額" note="(已選取 1 筆)" value="TWD 400,000" :info="info" :expanded="open" @toggle="open = !open"><KgiDetailRow label="手續費" value="TWD 2" /></KgiTotalBar>
        <KgiButton>下一步</KgiButton>
      </template>
    </KgiFlowPage>`,
  }),
}
export const Result: Story = {
  name: '完成頁',
  render: () => ({ components: { KgiResultPage }, template: '<KgiResultPage header="申請借款" title="成功送出申請" desc="我們將在 1 小時內完成撥款。" primary-label="查看借款紀錄" secondary-label="完成" />' }),
}
export const SectionHeader: Story = {
  name: '區塊標題',
  render: () => ({
    components: { KgiSectionHeader },
    template: `<div class="flex flex-col gap-24 p-16">
      <KgiSectionHeader title="尚可匯入擔保品" :action="{ label: '查看全部', onClick: () => {} }" />
      <KgiSectionHeader title="借款紀錄" desc="僅顯示近一年的紀錄" /></div>`,
  }),
}
