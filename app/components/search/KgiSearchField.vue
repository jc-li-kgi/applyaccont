<script setup lang="ts">
import KgiSearchIcon from './KgiSearchIcon.vue'

// 搜尋框（膠囊、放大鏡 24、內距 8×16、icon 與文字 8）。預設淡藍底，放在白底上；on-surface：放在藍底頁面上時改白底
defineProps<{ placeholder?: string; onSurface?: boolean }>()
const model = defineModel<string>({ default: '' })
</script>

<template>
  <label class="flex min-w-0 flex-1 items-center gap-8 rounded-full px-16 py-8" :class="onSurface ? 'bg-surface-white' : 'bg-container-general-option-selected-blue'">
    <KgiSearchIcon />
    <input
      class="w-0 min-w-0 flex-1 border-0 bg-transparent p-0 t-body-regular text-content-general-primary outline-none placeholder:text-content-general-tertiary"
      type="search" :placeholder="placeholder" :value="model" @input="model = ($event.currentTarget as HTMLInputElement).value.trim()"
    />
  </label>
</template>
