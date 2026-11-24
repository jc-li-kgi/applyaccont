<script setup lang="ts">
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle } from 'reka-ui'
import KgiIcon from '../icon/KgiIcon.vue'
import { COPY } from '../../lib/kit'

// 底部彈窗（Reka UI Dialog）。點遮罩、Esc 或右上 ✕ 關閉
// RWD（Grid System）：手機 < 768 底部抽屜；平板置中、寬 92%（與網格同寬）；桌機置中、最寬 570
defineProps<{ open: boolean; title: string; description?: string; fullHeight?: boolean }>()
const emit = defineEmits<{ close: [] }>()
const onOpenChange = (v: boolean) => { if (!v) emit('close') }
</script>

<template>
  <DialogRoot :open="open" @update:open="onOpenChange">
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-50 flex animate-fade-in items-end justify-center bg-overlay backdrop-blur-overlay tablet:items-center">
        <DialogContent
          class="max-h-sheet w-full max-w-app animate-slide-up overflow-y-auto bg-container-card-white pb-sheet text-left whitespace-normal shadow-popover outline-none tablet:w-grid tablet:max-w-none tablet:animate-fade-in tablet:rounded-medium tablet:pb-32 desktop:max-w-form"
          :class="fullHeight && 'h-sheet'" :aria-describedby="description ? undefined : ''"
        >
          <div class="flex items-center gap-8 px-16 pt-32 pb-8">
            <DialogTitle as="p" class="flex-1 t-body-regular text-content-general-secondary">{{ title }}</DialogTitle>
            <DialogClose class="inline-flex shrink-0 items-center justify-center" :aria-label="COPY.common.close"><KgiIcon name="close.svg" /></DialogClose>
          </div>
          <DialogDescription v-if="description" as="p" class="px-16 pb-8 t-caption-regular text-content-general-secondary">{{ description }}</DialogDescription>
          <slot />
        </DialogContent>
      </DialogOverlay>
    </DialogPortal>
  </DialogRoot>
</template>
