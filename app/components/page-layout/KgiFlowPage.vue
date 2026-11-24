<script setup lang="ts">
import KgiPageHeader from '../top-navigation/KgiPageHeader.vue'
import KgiStepBar from '../progress-bar/KgiStepBar.vue'
import KgiBottomActions from './KgiBottomActions.vue'
import KgiStickyFooter from './KgiStickyFooter.vue'

// <FlowPage title="個人信貸" :step="{ index: 0, total: 3, label: '試算' }" @back="…">
//   內容…
//   <template #actions><KgiButton>下一步</KgiButton></template>      內容下方的按鈕（距內容至少 32，不滿一屏時置底）
//   <template #sticky>…總計 + 下一步…</template>               固定在畫面底部的操作區（和 #actions 擇一）
// </FlowPage>
// 間距：頁首→內容 24、內容區塊之間 24（Guideline：流程申請）
defineProps<{ title: string; step?: { index: number; total: number; label: string }; actionsClass?: string }>()
const emit = defineEmits<{ back: [] }>()
</script>

<template>
  <div class="relative mx-auto flex min-h-dvh max-w-app flex-col gap-24 overflow-x-hidden bg-surface-blue pt-safe">
    <div>
      <KgiPageHeader :title="title" @back="emit('back')" />
      <KgiStepBar v-if="step" v-bind="step" />
    </div>
    <div class="flex flex-1 flex-col">
      <div class="flex flex-col gap-24"><slot /></div>
      <KgiBottomActions v-if="$slots.actions" :class="actionsClass"><slot name="actions" /></KgiBottomActions>
    </div>
    <KgiStickyFooter v-if="$slots.sticky"><slot name="sticky" /></KgiStickyFooter>
  </div>
</template>
