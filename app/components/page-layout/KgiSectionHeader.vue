<script setup lang="ts">
import KgiButton from '../button/KgiButton.vue'
import type { TextAction } from '../../lib/types'
// 區塊標題。action：右側文字連結；desc：標題下方說明。標題左邊要放勾選框時改用 KgiCheckboxHeader。不含左右邊距
withDefaults(defineProps<{ title: string; action?: TextAction; desc?: string; descClass?: string }>(), { descClass: 't-body-regular' })
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex items-center gap-8">
      <p class="flex-1 t-subtitle-bold text-content-general-primary">{{ title }}</p>
      <KgiButton v-if="action" variant="text" @click="action.onClick">{{ action.label }}</KgiButton>
    </div>
    <p v-if="desc" :class="descClass" class="text-content-general-secondary">{{ desc }}</p>
  </div>
</template>
