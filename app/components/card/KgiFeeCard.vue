<script setup lang="ts">
import KgiDetailRow from './KgiDetailRow.vue'
import type { InfoContent } from '../../lib/types'

// 費用卡：標題→內容 12、詳情條列 20、內距 24×24。row 有 info 時標題旁出現 ⓘ
// full：滿版（貼齊畫面左右、無圓角）
defineProps<{ title?: string; rows: { label: string; value: string; info?: InfoContent }[]; note?: string; full?: boolean }>()
</script>

<template>
  <section class="flex flex-col gap-12 bg-container-card-white p-24" :class="full ? 'rounded-none' : 'rounded-medium'">
    <p v-if="title" class="t-body-bold text-content-general-primary">{{ title }}</p>
    <div class="flex flex-col gap-20">
      <KgiDetailRow v-for="r in rows" :key="r.label" :label="r.label" :value="r.value" :info="r.info" />
      <p v-if="note" class="t-body-regular text-content-general-secondary">{{ note }}</p>
    </div>
  </section>
</template>
