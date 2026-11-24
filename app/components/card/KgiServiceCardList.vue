<script setup lang="ts">
import KgiIcon from '../icon/KgiIcon.vue'
import { iconUrl } from '../../lib/assets'

// 服務卡片清單（圖示 + 標題 + 說明 + 前往箭頭）。icon 為彩色插圖（36px），不換色
defineProps<{ items: { icon: string; title: string; desc?: string; onClick?: () => void }[] }>()
</script>

<template>
  <div class="flex flex-col rounded-medium bg-container-card-white">
    <button v-for="s in items" :key="s.title" type="button" class="flex min-h-service items-start gap-16 px-16 py-24 text-left" @click="s.onClick?.()">
      <img class="shrink-0" :src="iconUrl(s.icon)" width="36" height="36" alt="" />
      <span class="flex min-w-0 flex-1 flex-col gap-4">
        <span class="flex items-center gap-4">
          <span class="flex-1 t-subtitle-bold text-content-general-primary">{{ s.title }}</span>
          <KgiIcon name="chevron-forward-24.svg" level="subtitle" />
        </span>
        <span v-if="s.desc" class="t-caption-regular text-content-general-secondary">{{ s.desc }}</span>
      </span>
    </button>
  </div>
</template>
