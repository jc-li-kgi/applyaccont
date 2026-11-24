<script setup lang="ts">
import KgiPageHeader from '../top-navigation/KgiPageHeader.vue'
import KgiBottomActions from './KgiBottomActions.vue'
import KgiButton from '../button/KgiButton.vue'
import { iconUrl } from '../../lib/assets'

// 完成頁（成功插圖 + 標題 + 說明 + 按鈕）
//   <ResultPage header="申請借款" title="成功送出申請" desc="我們將在…" primary-label="查看借款紀錄" secondary-label="完成" @primary="…" @secondary="…" />
defineProps<{ header: string; title: string; desc?: string; primaryLabel?: string; secondaryLabel?: string }>()
const emit = defineEmits<{ primary: []; secondary: [] }>()
</script>

<template>
  <div class="relative mx-auto flex min-h-dvh max-w-app flex-col overflow-x-hidden bg-surface-white pt-safe">
    <KgiPageHeader :title="header" :show-share="false" />
    <div class="flex min-h-result flex-1 flex-col items-center justify-center gap-24 px-16 pb-24">
      <div class="flex size-result-image items-center justify-center"><img :src="iconUrl('success.svg')" width="111.648" height="105.419" alt="" /></div>
      <div class="flex flex-col gap-12 px-40 text-center">
        <p class="t-headline text-content-general-primary">{{ title }}</p>
        <p v-if="desc" class="t-body-regular text-content-general-secondary">{{ desc }}</p>
      </div>
    </div>
    <KgiBottomActions>
      <KgiButton v-if="primaryLabel" @click="emit('primary')">{{ primaryLabel }}</KgiButton>
      <KgiButton v-if="secondaryLabel" variant="text" block @click="emit('secondary')">{{ secondaryLabel }}</KgiButton>
    </KgiBottomActions>
  </div>
</template>
