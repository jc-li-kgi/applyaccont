<script setup lang="ts">
// <KgiTag variant="caution">即將到期</KgiTag>
//   default   淺藍底（Container/General/Active-Secondary + Content/General/Active）
//   caution   外框＋字 Content/Tag/Caution（原 variant="warning" / "error"）
//   info      外框淺藍（Guideline 無語意 token，暫用 Graphic Blue 色票 sky-blue-300 / 500）
//   highlight 外框＋字 Content/Tag/Highlight
//   success   外框＋字 Content/Tag/Success
withDefaults(defineProps<{ variant?: 'default' | 'caution' | 'info' | 'highlight' | 'success' }>(), { variant: 'default' })

const VARIANT = {
  default: 'bg-container-general-active-secondary text-content-general-active',
  caution: 'border border-content-tag-caution text-content-tag-caution',
  info: 'border border-sky-blue-300 text-sky-blue-500', // lint-allow Guideline 無對應語意 token，用 Graphic Blue 色票
  highlight: 'border border-content-tag-highlight text-content-tag-highlight',
  success: 'border border-content-tag-success text-content-tag-success',
}
</script>

<template>
  <span class="inline-flex items-center rounded-full px-8 py-2 whitespace-nowrap t-caption-regular" :class="VARIANT[variant]"><slot /></span>
</template>
