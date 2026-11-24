<script setup lang="ts">
import { provide, toRef } from 'vue'
import KgiCheckbox from './KgiCheckbox.vue'

// 可勾選項目（勾選框 + 內容，可停用）。disabled 時整個項目（含裡面的 KgiDetailRow）變成停用色
const props = defineProps<{ disabled?: boolean; label?: string }>()
const model = defineModel<boolean>({ default: false })
provide('kgiSelectableDisabled', toRef(props, 'disabled'))
</script>

<template>
  <div class="flex items-start gap-8" :class="disabled && 'text-content-general-disabled'">
    <KgiCheckbox v-model="model" :disabled="disabled" :label="label" />
    <div class="flex min-w-0 flex-1 flex-col gap-8"><slot /></div>
  </div>
</template>
