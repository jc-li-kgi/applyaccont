import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { defineComponent, h, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  KgiPage, KgiGrid, KgiDetailCard, KgiDetailRow, KgiAmountHero, KgiPickerField, KgiAmountField, KgiCheckbox, KgiButton,
  KgiAccordion, KgiListTable, KgiListRow, KgiSheet, KgiSheetOptions, KgiDialog, KgiTag, KgiToc,
} from '../../app/kgi'

/** 網格疊圖 + 即時資訊（只在 Storybook 用） */
const GridOverlay = defineComponent({
  props: { show: { type: Boolean, default: true } },
  setup(props) {
    const info = ref('')
    const update = () => {
      const s = getComputedStyle(document.documentElement)
      const w = window.innerWidth
      const size = w >= 1024 ? '大版・桌機' : w >= 768 ? '中版・平板' : '小版・手機'
      const grid = document.querySelector('[data-grid-probe]') as HTMLElement | null
      info.value = `${size}｜視窗 ${w}｜${s.getPropertyValue('--grid-cols').trim()} 欄｜欄間距 ${s.getPropertyValue('--grid-gutter').trim().replace('var(--spacing-', '').replace(')', '')}｜容器 ${grid ? Math.round(grid.getBoundingClientRect().width) : '—'}px`
    }
    onMounted(() => { update(); window.addEventListener('resize', update) })
    onBeforeUnmount(() => window.removeEventListener('resize', update))
    return () => [
      props.show
        ? h('div', { class: 'pointer-events-none fixed inset-0 z-40 mix-blend-multiply', 'aria-hidden': 'true' }, [
            h(KgiGrid, { class: 'h-full', 'data-grid-probe': '' }, () =>
              Array.from({ length: 12 }, (_, i) => h('span', { class: ['bg-container-general-light-active-red opacity-40', i >= 6 ? 'hidden desktop:block' : i >= 4 ? 'hidden tablet:block' : ''] })),
            ),
          ])
        : h(KgiGrid, { class: 'h-0', 'data-grid-probe': '' }),
      h('p', { class: 'fixed bottom-16 left-16 z-50 rounded-small bg-content-general-primary px-12 py-4 n-caption-regular text-content-general-light-active shadow-popover' }, info.value),
    ]
  },
})

const meta = {
  title: 'Foundations/Grid System',
  component: KgiPage,
  subcomponents: { KgiGrid, KgiToc },
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    kgiFrame: false,
    docs: {
      story: { inline: false, height: '720px' },
      description: {
        component: [
          '來源：Figma **MDS_Foundation › Grid System/App & Web RWD** 與「GridSystem 樣式模擬」。**變化方式依樣式模擬，數值用 Guideline token。**',
          '工具列的 **viewport** 可切換 375 / 768 / 1024 / 1366；右下角顯示目前版型、欄數與容器寬度；`showGrid` 開關網格疊圖。',
          '',
          '| | 小版・手機 | 中版・平板 | 大版・桌機 |',
          '|---|---|---|---|',
          '| 畫面寬度 | < 768 | 768–1023 | ≥ 1024 |',
          '| 欄數 / 欄間距 | 4 / 16 | 6 / 16 | 12 / 28 |',
          '| 容器 | 左右各 16 | 92%（左右各 4%） | 86%（左右各 7%），最寬 1175 |',
          '| 字級、icon | mWeb | Web | Web |',
          '| 填寫型 `layout="form"` | 滿版 | 滿版 | 最寬 570、置中 |',
          '| 閱讀型 `layout="read"` | 目錄收合在內容上方 | 同左 | 有目錄：目錄 3 欄（固定）+ 內容 8 欄；無目錄：內容 8 欄置中 |',
          '| 列表型 `layout="list"` | 撐滿 | 撐滿 | 撐滿，最寬 1175 |',
          '| Action Sheet `KgiSheet` | 底部抽屜 | 置中，寬 92% | 置中，最寬 570 |',
          '| Dialog `KgiDialog` | 最寬 382 | 最寬 570 | 最寬 570 |',
          '',
          '- 斷點 768 / 1024 對應 Tailwind 的 `tablet:` / `desktop:`（預設的 `sm:` `md:` `lg:` 已移除）。',
          '- 區塊間距依頁面類型，**各尺寸相同**：`type="flow"` 流程申請 24、`type="browse"` 資訊瀏覽 32。內容 → 按鈕 32、頁尾 48。',
          '- 自己排版時用 `<KgiGrid>` 搭配 `col-span-full`、`desktop:col-start-4 desktop:col-span-8` 等 class。',
          '- 底部固定按鈕、總計列、底部導覽：尚未依 RWD 調整（待元件規則）。',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    layout: { control: 'inline-radio', options: ['form', 'read', 'list'] },
    type: { control: 'inline-radio', options: ['flow', 'browse'] },
  },
} satisfies Meta<typeof KgiPage>
export default meta
type Story = StoryObj<typeof meta> & { args?: Record<string, unknown> }

export const Form: Story = {
  name: '填寫型',
  args: { showGrid: true } as never,
  render: (args) => ({
    components: { KgiPage, KgiDetailCard, KgiDetailRow, KgiAmountHero, KgiPickerField, KgiAmountField, KgiCheckbox, KgiButton, KgiSheet, KgiSheetOptions, GridOverlay },
    setup: () => ({ args, method: ref('定期定額'), amount: ref<number | null>(null), agree: ref(false), sheet: ref(false) }),
    template: `<GridOverlay :show="args.showGrid" />
      <KgiPage layout="form" type="flow" title="申購基金" :step="{ index: 0, total: 2, label: '填寫申購資料' }" @back="() => {}">
        <KgiDetailCard>
          <KgiAmountHero label="申購金額" :amount="10000" />
          <KgiDetailRow label="基金名稱" value="安聯美國收益基金" value-class="t-body-regular" />
        </KgiDetailCard>
        <section class="flex flex-col gap-24 rounded-medium bg-container-card-white p-24">
          <KgiPickerField v-model="method" label="申購方式" :options="['單筆申購', '定期定額', '母子基金']" />
          <KgiAmountField v-model="amount" label="投資金額" prefix="TWD" :min="3000" :max="1000000" :step="1000" placeholder="輸入金額" :hints="['最低申購金額 TWD 3,000']" />
          <label class="flex items-start gap-8"><KgiCheckbox v-model="agree" label="同意" /><span class="t-body-regular text-content-general-primary">本人已詳閱並同意公開說明書</span></label>
        </section>
        <template #actions>
          <KgiButton :disabled="!agree">下一步</KgiButton>
          <KgiButton variant="text" block @click="sheet = true">注意事項（開啟 Action Sheet）</KgiButton>
        </template>
      </KgiPage>
      <KgiSheet :open="sheet" title="選擇客服類型" @close="sheet = false"><KgiSheetOptions chevron :options="['智能客服', '語音客服']" @select="sheet = false" /></KgiSheet>`,
  }),
}

const readBody = `
  <section id="s-summary" class="flex flex-col gap-16 bg-surface-yellow p-24">
    <p class="t-title text-content-general-primary">重點摘要</p>
    <ol class="flex list-decimal flex-col gap-8 pl-24 t-body-regular text-content-general-primary"><li>活存可隨時存取，個人與法人皆可開立。</li><li>活儲僅限個人開立，利率通常略高於活存。</li><li>定存、定儲需約定存款期間。</li></ol>
  </section>
  <h2 id="s-what" class="t-title text-content-general-primary">活存是什麼？</h2>
  <p class="t-body-regular text-content-general-primary">活存的全名為「活期存款」，沒有存款期限，隨時可以提領與存入。活存最大的特色是資金流動性高，可用於日常支付與資金周轉，但利率一般低於定存。</p>
  <h2 id="s-compare" class="t-title text-content-general-primary">銀行儲蓄方式比較</h2>
  <p class="t-body-regular text-content-general-primary">四種儲蓄方式的主要差別，在於開戶對象、能否隨時存提，以及利率高低。</p>
  <h2 id="s-calc" class="t-title text-content-general-primary">利息試算範例</h2>
  <p class="t-body-regular text-content-general-primary">以存款 10 萬元、存滿一年為例，若年利率為 1%，一年的利息約為 1,000 元。</p>`
const readHead = `<template #head>
  <p class="t-caption-regular text-content-general-secondary">首頁 / 個人金融 / 活存文章</p>
  <h1 class="mt-24 t-headline text-content-general-primary">活存是什麼：「活存、活儲、定存、定儲」介紹與比較</h1>
  <p class="mt-12 t-body-regular text-content-general-secondary">王大明・凱基證券投資研究員｜於 2026/05/01 更新</p>
</template>`
const readFoot = `<template #foot><KgiAccordion :items="[{ q: '活存跟定存差在哪裡？', a: '活存可以隨時存取，但利率較低；定存需約定存款期間。' }, { q: '活存利息多久給一次？', a: '多數銀行每半年結算一次。' }]" /></template>`

export const ReadWithToc: Story = {
  name: '閱讀型・有目錄',
  args: { showGrid: true } as never,
  render: (args) => ({
    components: { KgiPage, KgiAccordion, GridOverlay },
    setup: () => ({ args, toc: [{ id: 's-summary', label: '重點摘要' }, { id: 's-what', label: '活存是什麼？' }, { id: 's-compare', label: '銀行儲蓄方式比較' }, { id: 's-calc', label: '利息試算範例' }] }),
    template: `<GridOverlay :show="args.showGrid" /><KgiPage layout="read" type="browse" title="活存介紹" :toc="toc" @back="() => {}">${readHead}${readBody}${readFoot}</KgiPage>`,
  }),
}

export const ReadNoToc: Story = {
  name: '閱讀型・無目錄',
  args: { showGrid: true } as never,
  render: (args) => ({
    components: { KgiPage, KgiAccordion, GridOverlay },
    setup: () => ({ args }),
    template: `<GridOverlay :show="args.showGrid" /><KgiPage layout="read" type="browse" title="活存介紹" @back="() => {}">${readHead}${readBody}${readFoot}</KgiPage>`,
  }),
}

export const List: Story = {
  name: '列表型',
  args: { showGrid: true } as never,
  render: (args) => ({
    components: { KgiPage, KgiListTable, KgiListRow, KgiButton, KgiTag, GridOverlay },
    setup: () => ({
      args,
      rows: [
        { t: '【EP102】產業大白話：Non-Tech 產業關稅追蹤！關稅風暴下的傳產選股策略！', d: '2025.04.14' },
        { t: '【EP101】產業大白話：電子硬體產業關稅追蹤！', d: '2025.04.14' },
        { t: '【EP100】產業大白話：DDI 產業鏈大局展望！', d: '2025.03.31' },
      ],
    }),
    template: `<GridOverlay :show="args.showGrid" />
      <KgiPage layout="list" type="browse" title="產業大白話" @back="() => {}">
        <KgiListTable flush :columns="[{ label: '節目' }, { label: '', align: 'right', width: 'var(--spacing-80)' }]">
          <KgiListRow v-for="r in rows" :key="r.t" :cell-count="2" :align="['left', 'right']">
            <template #cell-0><p class="t-body-bold text-content-general-primary">{{ r.t }}</p><p class="n-caption-regular text-content-general-secondary">{{ r.d }}</p></template>
            <template #cell-1><KgiButton variant="text">播放</KgiButton></template>
          </KgiListRow>
        </KgiListTable>
      </KgiPage>`,
  }),
}

export const Overlays: Story = {
  name: '彈窗 RWD',
  args: { showGrid: true } as never,
  render: (args) => ({
    components: { KgiPage, KgiButton, KgiSheet, KgiSheetOptions, KgiDialog, GridOverlay },
    setup: () => ({ args, sheet: ref(false), dialog: ref(false) }),
    template: `<GridOverlay :show="args.showGrid" />
      <KgiPage layout="form" type="flow" title="彈窗">
        <p class="t-body-regular text-content-general-secondary">Action Sheet：手機底部抽屜 → 平板置中 92% → 桌機置中 570。Dialog：手機 382 → 平板以上 570。</p>
        <template #actions>
          <KgiButton @click="sheet = true">開啟 Action Sheet</KgiButton>
          <KgiButton variant="text" block @click="dialog = true">開啟 Dialog</KgiButton>
        </template>
      </KgiPage>
      <KgiSheet :open="sheet" title="選擇客服類型" @close="sheet = false"><KgiSheetOptions chevron :options="['智能客服', '語音客服']" @select="sheet = false" /></KgiSheet>
      <KgiDialog :open="dialog" title="注意事項" body="投資一定有風險，基金投資有賺有賠，申購前應詳閱公開說明書。" @close="dialog = false" />`,
  }),
}
