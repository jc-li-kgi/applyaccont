<script setup lang="ts">
import KgiIcon from '../icon/KgiIcon.vue'
import { hasListener } from '../../lib/listener'

// 摘要卡（大數字 + 資料列）。rows 第 3 個值 'caution' = 整列警示色（原 'warning'）
// 綁了 @bell 時，overview 版右上角出現通知鈴
// variant="flow"：大數字與標題同一行、內距 24（流程申請）／ "overview"：大數字在標題下方、內距 16（資訊瀏覽）
withDefaults(defineProps<{ label: string; value: string; rows?: [string, string, 'caution'?][]; variant?: 'flow' | 'overview'; bellLabel?: string }>(), {
  rows: () => [], variant: 'overview', bellLabel: '通知設定',
})
const emit = defineEmits<{ bell: [] }>()
const hasBell = hasListener('onBell')
</script>

<template>
  <section class="flex flex-col gap-20 rounded-medium bg-container-card-white shadow-basic" :class="variant === 'flow' ? 'p-24' : 'p-16'">
    <div v-if="variant === 'flow'" class="flex items-start gap-8">
      <span class="flex-1 t-body-bold text-content-general-primary">{{ label }}</span>
      <span class="n-title text-right whitespace-nowrap text-content-general-primary">{{ value }}</span>
    </div>
    <div v-else class="flex items-start justify-between gap-4">
      <div class="flex flex-col gap-4">
        <p class="t-body-regular text-content-general-primary">{{ label }}</p>
        <p class="n-title text-content-general-primary">{{ value }}</p>
      </div>
      <button v-if="hasBell" type="button" class="inline-flex shrink-0 items-center justify-center" :aria-label="bellLabel" @click="emit('bell')"><KgiIcon name="notification.svg" /></button>
    </div>

    <div v-for="[l, v, tone] in rows" :key="l" class="flex items-start gap-8">
      <span class="flex-1 t-body-regular" :class="tone === 'caution' ? 'text-content-semantic-caution' : 'text-content-general-secondary'">{{ l }}</span>
      <span class="n-body-regular text-right whitespace-nowrap" :class="tone === 'caution' ? 'text-content-semantic-caution' : 'text-content-general-primary'">{{ v }}</span>
    </div>
    <div v-if="$slots.actions" class="flex items-center justify-end gap-16"><slot name="actions" /></div>
  </section>
</template>
