<script setup lang="ts">
// 無資料提示（置中、次要色）。列表沒有資料時 KgiListTable 會自動使用（傳 empty 與 :has-rows="false"）
defineProps<{ text: string }>()
</script>

<template>
  <p class="px-16 py-40 text-center t-body-regular text-content-general-secondary">{{ text }}</p>
</template>
