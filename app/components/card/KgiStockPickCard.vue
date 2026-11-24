<script setup lang="ts">
import KgiStatGroup, { type StatItem } from './KgiStatGroup.vue'
import { hasListener } from '../../lib/listener'

// 精選擔保品卡（股票名稱 + 並排數據）。沒有綁 @click 時是純展示卡片（不可點擊）。常搭配 <KgiCarousel> 使用
defineProps<{ name: string; code: string; stats: StatItem[] }>()
const clickable = hasListener('onClick')
</script>

<template>
  <component :is="clickable ? 'button' : 'div'" :type="clickable ? 'button' : undefined" class="flex w-full flex-col items-center gap-12 rounded-medium bg-container-card-white px-16 py-20 text-center shadow-basic">
    <p class="t-title text-content-general-primary">{{ name }} {{ code }}</p>
    <KgiStatGroup :items="stats" />
  </component>
</template>
