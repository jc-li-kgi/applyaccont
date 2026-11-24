<script setup lang="ts">
import KgiIcon from '../icon/KgiIcon.vue'
// 篩選 / 排序下拉膠囊（文字 + ▼）
defineProps<{ label: string }>()
</script>

<template>
  <button type="button" class="inline-flex h-32 items-center gap-4 rounded-full bg-container-general-active-secondary px-16 py-4 whitespace-nowrap text-content-general-primary active:bg-container-general-active-secondary-hover">
    <span class="t-body-regular">{{ label }}</span>
    <KgiIcon name="triangle-down.svg" level="body" tint />
  </button>
</template>
