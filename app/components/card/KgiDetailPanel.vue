<script setup lang="ts">
// 列表展開明細（卡片 + 資料列）：內距 16×16、資料列間距 12。放在白色卡片裡時 tone="blue" 改淡藍底
withDefaults(defineProps<{ tone?: 'white' | 'blue' }>(), { tone: 'white' })
</script>

<template>
  <div class="flex flex-col gap-12 rounded-medium p-16" :class="tone === 'blue' ? 'bg-container-general-option-selected-blue' : 'bg-container-card-white'"><slot /></div>
</template>
