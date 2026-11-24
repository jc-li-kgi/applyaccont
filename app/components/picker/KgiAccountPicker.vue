<script setup lang="ts">
import KgiIcon from '../icon/KgiIcon.vue'
// 帳號選擇（證 徽章 + 帳號 + 姓名）。外層自行留左右邊距
withDefaults(defineProps<{ account: { id: string; name: string }; badge?: string }>(), { badge: '證' })
</script>

<template>
  <button type="button" class="flex h-40 w-full items-center gap-8 rounded-small bg-surface-white py-8 pr-8 pl-16 text-left">
    <span class="flex size-20 shrink-0 items-center justify-center rounded-small bg-red-400 t-body-bold text-content-general-light-active" data-lint-allow="紅色徽章（規範特例）">{{ badge }}</span>
    <span class="flex-1 t-body-bold text-content-general-primary">{{ account.id }} {{ account.name }}</span>
    <KgiIcon name="chevron-pull.svg" />
  </button>
</template>
