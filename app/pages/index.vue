<script setup lang="ts">
// 元件總覽（playground / SSR 驗證）：npm run dev → http://localhost:3000/
import { ref } from 'vue'
import { useToast } from '../lib/kit'

useHead({ title: 'KGI UI Kit' })
const { show } = useToast()
const info = { title: '借款手續費', body: '每筆借款收取手續費 TWD 2，於撥款時扣除。' }
const dialog = ref(false)
const confirm = ref(false)
const sheet = ref(false)
const checked = ref(true)
const selectable = ref(false)
const radio = ref<'partial' | 'full' | null>('partial')
const term = ref<string | null>(null)
const amount = ref<number | null>(null)
const qty = ref(1)
const lots = ref<number | null>(null)
const keyword = ref('')
const tab = ref('loans')
const seg = ref('a')
const sort = ref<string | null>(null)
const openRow = ref(false)
const total = ref(false)
const picks = [
  { name: '元大台灣50', code: '0050', stats: [{ label: '預估可借', value: '106', unit: '萬', highlight: true }, { label: '參考利率', value: '2.8', unit: '%' }] },
  { name: '台積電', code: '2330', stats: [{ label: '預估可借', value: '320', unit: '萬' }, { label: '參考利率', value: '2.6', unit: '%' }] },
]
</script>

<template>
  <KgiFlowPage title="KGI UI Kit" :step="{ index: 1, total: 3, label: '元件總覽' }" @back="show('返回')">
    <div class="flex flex-col gap-12 px-16">
      <KgiNoticeBar>動用不受限，最快 1 小時撥款</KgiNoticeBar>
      <KgiNoticeCard text="有 2 筆借款，即將到期" @click="show('前往借款紀錄')" />
      <KgiSummaryCard label="整戶維持率" value="405%" :rows="[['擔保品市值', 'TWD 1,621,300'], ['即將到期金額', 'TWD 240,000', 'caution']]" @bell="show('通知設定')">
        <template #actions><KgiButton variant="capsule">再借一筆</KgiButton></template>
      </KgiSummaryCard>
      <KgiDetailCard>
        <KgiAmountHero label="借款金額" :amount="400000" />
        <KgiDetailRow label="參考利率" value="2.8 %" />
        <KgiDetailRow label="借款手續費" value="TWD 2" :info="info" />
        <KgiDetailRow label="申請日" :value="['2025/12/28', '11:45:11']" />
      </KgiDetailCard>
      <KgiFeeCard title="借款費用" :rows="[{ label: '參考利率', value: '2.8%' }, { label: '借款手續費', value: 'TWD 2', info }]" note="費用僅供參考" />
      <KgiStatementCard title="TWD 240,000" tag="借款" :rows="[{ label: '起息日', value: '2026/06/09' }]" :detail="[{ label: '利率', value: '2.8 %' }]" />
      <KgiCollapsibleCard title="擔保品匯入明細"><KgiDetailRow label="元大台灣50" value="5 張" /></KgiCollapsibleCard>
    </div>

    <div class="flex flex-col gap-24 bg-surface-white px-16 py-24">
      <KgiSectionHeader title="表單" desc="Reka UI：Checkbox、RadioGroup、Dialog、Tabs" />
      <KgiAmountField v-model="amount" label="借款金額" prefix="TWD" :min="10000" :max="600000" :step="1000" placeholder="請輸入借款金額" :hints="['可借款金額 TWD 10,000～TWD 600,000']" />
      <KgiPickerField v-model="term" label="借款期數" :options="['6 個月', '12 個月', '24 個月']" />
      <KgiNumberField v-model="lots" label="擔保張數" placeholder="請輸入數字" suffix="張" :max="9999" />
      <KgiQtyStepper v-model="qty" :min="1" :max="5" unit="張" />
      <KgiRadioGroup v-model="radio" label="還款額度" :options="[{ value: 'partial', label: '部分' }, { value: 'full', label: '全部' }]" />
      <KgiCheckboxHeader v-model="checked" title="可借貸 (2)" desc="勾選要匯入的擔保品" />
      <KgiSelectableItem v-model="selectable" label="元大台灣50">
        <KgiStockName inline name="元大台灣50" code="0050" />
        <KgiDetailRow label="可擔保張數" value="5" />
      </KgiSelectableItem>
      <KgiSearchField v-model="keyword" placeholder="搜尋產品關鍵字或代碼" />
      <div class="flex flex-wrap items-center gap-8">
        <KgiTag>撥款中</KgiTag><KgiTag variant="caution">即將到期</KgiTag><KgiTag variant="info">經驗一</KgiTag><KgiTag variant="highlight">借款</KgiTag><KgiTag variant="success">已完成</KgiTag>
        <KgiFilterPill label="近一年" @click="sheet = true" />
        <KgiInfoLabel label="可借額度總計" :info="info" />
      </div>
      <div class="flex gap-16">
        <KgiButton variant="text" @click="dialog = true">說明 Dialog</KgiButton>
        <KgiButton variant="text" @click="confirm = true">確認 Dialog</KgiButton>
        <KgiButton variant="text" tone="caution" @click="show('已移除')">Toast</KgiButton>
      </div>
      <KgiAccordion :default-open="0" :items="[{ q: '誰可以申請？', a: '年滿 20 歲並已開立證券戶的客戶。' }, { q: '多久撥款？', a: '最快 1 小時。' }]" />
    </div>

    <KgiTextTabs v-model="tab" :tabs="[{ key: 'loans', label: '借還款紀錄' }, { key: 'fee', label: '費用' }, { key: 'col', label: '擔保品' }]" />
    <div class="px-16"><KgiSegmentedTabs v-model="seg" :tabs="[{ key: 'a', label: '借款' }, { key: 'b', label: '還款' }]" /></div>
    <KgiListTable v-model:sort="sort" expandable :columns="[{ label: '股票', sortKey: 'name' }, { label: '日期', align: 'center' }, { label: '金額', align: 'right' }]">
      <KgiListRow :cell-count="3" :align="['left', 'center', 'right']" :expanded="openRow" @toggle="openRow = !openRow">
        <template #cell-0><KgiStockName name="台積電" code="2330" /></template>
        <template #cell-1><KgiDateTimeLines value="2025-12-28T03:45:11Z" text-class="n-caption-regular text-content-general-secondary" /></template>
        <template #cell-2><KgiAmountCell :amount="128280" /></template>
        <template #detail><KgiDetailRow label="利率" value="2.8 %" /></template>
      </KgiListRow>
    </KgiListTable>
    <KgiCarousel :items="picks" label="精選擔保品">
      <template #default="{ item }"><KgiStockPickCard v-bind="item" @click="show(item.name)" /></template>
    </KgiCarousel>
    <div class="flex justify-around px-16">
      <KgiIconAction icon="add.svg" label="借款" @click="show('借款')" />
      <KgiIconAction icon="refresh.svg" label="還款" @click="show('還款')" />
    </div>
    <div class="px-16"><KgiServiceCardList :items="[{ icon: 'service-learn.png', title: '認識股票借貸', desc: '3 分鐘了解借貸流程' }]" /></div>

    <template #sticky>
      <KgiTotalBar label="借款總額" value="TWD 400,000" :info="info" :expanded="total" @toggle="total = !total">
        <KgiDetailRow label="手續費" value="TWD 2" />
      </KgiTotalBar>
      <KgiButton @click="show('下一步')">下一步</KgiButton>
    </template>
  </KgiFlowPage>

  <KgiDialog :open="dialog" title="借款手續費" :body="info.body" @close="dialog = false" />
  <KgiDialog :open="confirm" title="確認送出？" body="送出後無法修改。" body-align="center" :actions="[{ label: '返回', secondary: true }, { label: '確認送出', onClick: () => { confirm = false; show('已送出') } }]" @close="confirm = false" />
  <KgiSheet :open="sheet" title="期間" @close="sheet = false">
    <KgiSheetOptions :options="['近一個月', '近三個月', '近一年']" value="近一年" @select="sheet = false" />
  </KgiSheet>
</template>
