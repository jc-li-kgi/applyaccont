<script setup lang="ts">
import { DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, VisuallyHidden } from 'reka-ui'
import { COPY } from '../../lib/kit'

// 對話框（Reka UI Dialog：焦點鎖定、Esc 關閉、點遮罩關閉、SSR 安全的 Portal）
// 說明（一顆「我知道了」）：<KgiDialog :open="open" title="…" body="…" @close="open = false" />
// 確認（兩顆按鈕，左次要、右主要）：:actions="[{ label: '返回', secondary: true }, { label: '確認送出', onClick: go }]"
// 沒有 onClick 的按鈕 = 關閉
// RWD：手機最寬 382（App 寬 430 − 48）；平板以上最寬 570
export interface DialogAction { label: string; secondary?: boolean; onClick?: () => void }
withDefaults(defineProps<{ open: boolean; title?: string; body?: string; bodyAlign?: 'left' | 'center'; actions?: DialogAction[] }>(), {
  bodyAlign: 'left',
  actions: () => [{ label: COPY.common.gotIt }],
})
const emit = defineEmits<{ close: [] }>()
const onOpenChange = (v: boolean) => { if (!v) emit('close') }
</script>

<template>
  <DialogRoot :open="open" @update:open="onOpenChange">
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-overlay px-24 backdrop-blur-overlay">
        <DialogContent
          class="flex max-h-dialog w-full max-w-dialog flex-col overflow-hidden rounded-small tablet:max-w-form bg-container-card-white text-left whitespace-normal shadow-popover outline-none"
          :aria-describedby="body ? undefined : ''"
        >
          <div class="flex flex-col gap-16 overflow-y-auto px-24 py-32">
            <DialogTitle v-if="title" as="p" class="text-center t-subtitle-bold text-content-general-primary">{{ title }}</DialogTitle>
            <VisuallyHidden v-else><DialogTitle>{{ body ?? '' }}</DialogTitle></VisuallyHidden>
            <DialogDescription v-if="body" as="p" class="t-body-regular text-content-general-primary" :class="bodyAlign === 'center' ? 'text-center' : 'text-left'">{{ body }}</DialogDescription>
            <slot />
          </div>
          <div class="flex border-t border-container-general-divider">
            <button
              v-for="a in actions" :key="a.label" type="button"
              class="flex-1 px-24 py-16 text-center t-body-regular not-first:border-l not-first:border-container-general-divider"
              :class="a.secondary ? 'text-content-general-secondary' : 'text-content-general-active'"
              @click="a.onClick ? a.onClick() : emit('close')"
            >{{ a.label }}</button>
          </div>
        </DialogContent>
      </DialogOverlay>
    </DialogPortal>
  </DialogRoot>
</template>
