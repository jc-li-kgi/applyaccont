<script setup lang="ts">
// 並排數據（標題 + 大數字 + 單位，中間直線分隔）。highlight：警示色強調。單位是中文用 t- 樣式、英文用 n- 樣式（自動判斷）
export interface StatItem { label: string; value: string; unit?: string; highlight?: boolean }
defineProps<{ items: StatItem[] }>()
const isCjk = (s: string) => /[一-鿿]/.test(s)
</script>

<template>
  <div class="flex items-center justify-center gap-20">
    <template v-for="(s, i) in items" :key="s.label">
      <span v-if="i > 0" class="h-24 w-px shrink-0 bg-container-general-divider" aria-hidden="true" />
      <div class="flex min-w-0 flex-1 flex-col items-center gap-4 whitespace-nowrap">
        <p class="t-caption-regular text-content-general-secondary">{{ s.label }}</p>
        <p class="flex items-baseline justify-center gap-4" :class="s.highlight ? 'text-content-semantic-caution' : 'text-content-general-primary'">
          <span class="n-title">{{ s.value }}</span>
          <span v-if="s.unit" :class="isCjk(s.unit) ? 't-body-bold' : 'n-body-bold'">{{ s.unit }}</span>
        </p>
      </div>
    </template>
  </div>
</template>
