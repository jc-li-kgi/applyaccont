<script setup lang="ts">
import { iconUrl } from '../../lib/assets'
import { num } from '../../lib/format'

// 確認頁大金額（標題 + 幣別 + 大數字）
withDefaults(defineProps<{ label?: string; amount: number; currency?: string; currencyName?: string; flag?: string }>(), {
  currency: 'TWD', currencyName: '臺幣', flag: 'flag-twd.png',
})
</script>

<template>
  <div class="mb-4 flex flex-col gap-12">
    <p v-if="label" class="t-body-regular text-content-general-secondary">{{ label }}</p>
    <div class="-mb-4 flex items-center justify-center gap-4 text-content-general-primary">
      <img class="rounded-full border-hairline border-container-general-divider" :src="iconUrl(flag)" width="16" height="16" alt="" />
      <span class="n-body-regular">{{ currency }}</span>
      <span class="t-body-regular">{{ currencyName }}</span>
    </div>
    <p class="n-display-s text-center text-content-general-primary">{{ num(amount) }}</p>
  </div>
</template>
