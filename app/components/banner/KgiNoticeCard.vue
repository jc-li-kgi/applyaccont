<script setup lang="ts">
import KgiIcon from '../icon/KgiIcon.vue'
// 公告卡（公告 icon + 一行訊息 + ›，整張可點）。icon 一律 24px，不跟文字層級。不含左右外距
defineProps<{ text: string }>()
</script>

<template>
  <button type="button" class="flex w-full items-center gap-16 rounded-medium bg-container-card-white p-16 text-left shadow-basic">
    <KgiIcon name="announce.svg" />
    <span class="min-w-0 flex-1 t-body-regular text-content-general-primary">{{ text }}</span>
    <KgiIcon name="chevron-forward-24.svg" />
  </button>
</template>
