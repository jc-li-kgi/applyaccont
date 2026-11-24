<script setup lang="ts">
import KgiCheckbox from './KgiCheckbox.vue'

// 勾選標題（勾選框 + 標題 + 補充說明）：勾選框與標題第一行垂直置中。不含左右邊距
const props = defineProps<{ title: string; desc?: string; disabled?: boolean; label?: string }>()
const model = defineModel<boolean>({ default: false })
</script>

<template>
  <div class="flex items-start gap-8">
    <span class="flex h-subtitle-line items-center"><KgiCheckbox v-model="model" :disabled="disabled" :label="label ?? props.title" /></span>
    <div class="flex min-w-0 flex-1 flex-col gap-4">
      <p class="t-subtitle-bold text-content-general-primary">{{ title }}</p>
      <p v-if="desc" class="t-caption-regular text-content-general-secondary">{{ desc }}</p>
    </div>
  </div>
</template>
