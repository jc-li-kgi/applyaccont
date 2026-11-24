<script setup lang="ts">
import KgiInfoLabel from '../tooltips/KgiInfoLabel.vue'
import KgiIcon from '../icon/KgiIcon.vue'
import { hasListener } from '../../lib/listener'
import type { InfoContent } from '../../lib/types'

// 置底總計列（標題 ⓘ ／ 金額 ^），通常放在 <KgiStickyFooter> 裡、按鈕上方
// 可展開明細（在置底區內向上推開）：<TotalBar label value :expanded="open" @toggle="open = !open">…明細…</TotalBar>
// 不綁 @toggle 就不顯示 ^。note：標題下方補充，例如「(已選取 1 筆)」
defineProps<{ label: string; note?: string; info?: InfoContent; value: string; expanded?: boolean }>()
const emit = defineEmits<{ toggle: [] }>()
const toggleable = hasListener('onToggle')
</script>

<template>
  <div class="flex items-center justify-between gap-8 py-12">
    <div class="flex flex-col">
      <KgiInfoLabel class="text-content-general-secondary" :label="label" :info="info" />
      <p v-if="note" class="t-body-regular text-content-general-secondary">{{ note }}</p>
    </div>
    <button type="button" class="inline-flex items-center gap-4 disabled:cursor-default" :disabled="!toggleable" :aria-expanded="toggleable ? expanded : undefined" :aria-label="`${label}明細`" @click="emit('toggle')">
      <span class="n-subtitle-bold text-content-general-primary">{{ value }}</span>
      <KgiIcon v-if="toggleable" :name="expanded ? 'chevron-down.svg' : 'chevron-up.svg'" level="subtitle" />
    </button>
  </div>
  <div v-if="expanded" class="flex min-h-0 flex-initial animate-push-up flex-col gap-12 overflow-y-auto overscroll-contain pb-12"><slot /></div>
</template>
