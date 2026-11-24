<script setup lang="ts">
import { ToastDescription, ToastProvider, ToastRoot, ToastViewport } from 'reka-ui'
import { TOAST_DURATION, useToast } from '../../lib/kit'

// 輕提示（Reka UI Toast）。版面放一個 <KgiToast />，任何地方呼叫 useToast().show('訊息')，1.8 秒後自動消失
const { message, clear } = useToast()
const onOpenChange = (v: boolean) => { if (!v) clear() }
</script>

<template>
  <ToastProvider :duration="TOAST_DURATION" swipe-direction="down">
    <ToastRoot
      :open="!!message" type="foreground"
      class="animate-fade-in rounded-medium bg-content-general-primary px-16 py-12 text-center shadow-popover data-closed:animate-fade-out"
      @update:open="onOpenChange"
    >
      <ToastDescription class="t-body-regular text-content-general-light-active">{{ message }}</ToastDescription>
    </ToastRoot>
    <ToastViewport class="fixed left-1/2 z-60 m-0 flex max-w-toast -translate-x-1/2 list-none flex-col items-center p-0 outline-none bottom-toast" />
  </ToastProvider>
</template>
