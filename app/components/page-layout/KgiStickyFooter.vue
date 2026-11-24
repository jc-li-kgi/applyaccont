<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// 置底操作區（固定在畫面底部，可放總計 + 按鈕）。會自動在頁面底部留出同高度的空白，內容不會被擋住
// plain：透明底、無分隔線與陰影（只有一顆按鈕時使用）
defineProps<{ plain?: boolean }>()
const el = ref<HTMLElement>()
const height = ref(0)
let ro: ResizeObserver | undefined
onMounted(() => {
  if (!el.value) return
  ro = new ResizeObserver(() => (height.value = el.value!.offsetHeight))
  ro.observe(el.value)
})
onBeforeUnmount(() => ro?.disconnect())
</script>

<template>
  <div :style="{ height: `${height}px` }" aria-hidden="true" />
  <div
    ref="el" class="fixed bottom-0 left-1/2 z-20 flex max-h-sticky w-full max-w-app -translate-x-1/2 flex-col px-16 pb-sticky"
    :class="plain ? 'bg-transparent' : 'border-t border-container-general-divider bg-surface-white shadow-popover'"
  ><slot /></div>
</template>
