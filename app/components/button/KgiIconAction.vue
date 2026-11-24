<script setup lang="ts">
import KgiIcon from '../icon/KgiIcon.vue'
// 圓形圖示 + 文字的功能捷徑（疊在 Surface Blue 上：Basic 陰影）。icon 用 tint，顏色跟著文字主色
defineProps<{ icon: string; label: string }>()
</script>

<template>
  <button type="button" class="flex flex-col items-center gap-8 text-center">
    <span class="flex size-48 items-center justify-center rounded-full bg-surface-white text-content-general-primary shadow-basic"><KgiIcon :name="icon" tint /></span>
    <span class="t-caption-regular text-content-general-primary">{{ label }}</span>
  </button>
</template>
