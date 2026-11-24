<script setup lang="ts">
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from 'reka-ui'
import KgiIcon from '../icon/KgiIcon.vue'

// 可收合卡片（Reka UI Collapsible）。variant：flow（流程申請，內距 24）／ overview（資訊瀏覽，內距 16）
// 不受控：default-open；受控：v-model:open
withDefaults(defineProps<{ title: string; defaultOpen?: boolean; variant?: 'flow' | 'overview' }>(), { defaultOpen: true, variant: 'flow' })
const open = defineModel<boolean | undefined>('open', { default: undefined })
</script>

<template>
  <CollapsibleRoot
    v-slot="{ open: isOpen }" v-model:open="open" :default-open="defaultOpen" as="section"
    class="flex flex-col gap-24 rounded-medium bg-container-card-white" :class="variant === 'overview' ? 'p-16' : 'p-24'"
  >
    <CollapsibleTrigger class="flex items-center justify-between gap-24 text-left">
      <span class="t-subtitle-bold text-content-general-primary">{{ title }}</span>
      <span class="inline-flex transition-transform duration-200" :class="!isOpen && 'rotate-180'"><KgiIcon name="chevron-up.svg" level="subtitle" /></span>
    </CollapsibleTrigger>
    <CollapsibleContent class="flex flex-col gap-20"><slot /></CollapsibleContent>
  </CollapsibleRoot>
</template>
