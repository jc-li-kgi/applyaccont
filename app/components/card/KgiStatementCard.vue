<script setup lang="ts">
import { ref } from 'vue'
import KgiTag from '../tag/KgiTag.vue'
import KgiDetailRow from './KgiDetailRow.vue'
import KgiDetailPanel from './KgiDetailPanel.vue'
import KgiExpandButton from '../accordion/KgiExpandButton.vue'

// 對帳單卡片（標題金額 + 類型標籤 + 資料列，可展開淡藍明細）
// rows / detail：[{ label, value（字串或字串陣列＝多行）, valueClass? }]；沒有 detail 就不顯示展開按鈕
export interface StatementRow { label: string; value: string | string[]; valueClass?: string }
withDefaults(defineProps<{ title: string; titleClass?: string; tag?: string; tagVariant?: 'default' | 'caution' | 'info' | 'highlight' | 'success'; rows?: StatementRow[]; detail?: StatementRow[] }>(), {
  titleClass: 'n-body-bold', tagVariant: 'highlight', rows: () => [], detail: () => [],
})
const open = ref(false)
</script>

<template>
  <article class="flex flex-col gap-24 rounded-medium bg-container-card-white p-16 shadow-basic">
    <div class="flex items-center justify-between gap-8">
      <p class="min-w-0 flex-1 text-content-general-primary" :class="titleClass">{{ title }}</p>
      <KgiTag v-if="tag" :variant="tagVariant">{{ tag }}</KgiTag>
    </div>
    <div class="flex flex-col gap-16">
      <div class="flex flex-col gap-12">
        <KgiDetailRow v-for="r in rows" :key="r.label" :label="r.label" :value="r.value" v-bind="r.valueClass ? { valueClass: r.valueClass } : {}" />
      </div>
      <KgiDetailPanel v-if="open && detail.length" tone="blue">
        <KgiDetailRow v-for="r in detail" :key="r.label" :label="r.label" :value="r.value" v-bind="r.valueClass ? { valueClass: r.valueClass } : {}" />
      </KgiDetailPanel>
      <KgiExpandButton v-if="detail.length" :expanded="open" @click="open = !open" />
    </div>
  </article>
</template>
