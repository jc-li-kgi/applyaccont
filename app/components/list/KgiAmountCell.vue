<script setup lang="ts">
import { num } from '../../lib/format'
// 列表金額欄：幣別一行、金額一行，靠右
withDefaults(defineProps<{ amount: number; currency?: string }>(), { currency: 'TWD' })
</script>

<template>
  <div class="n-body-regular text-right text-content-general-primary">
    <p>{{ currency }}</p>
    <p>{{ num(amount) }}</p>
  </div>
</template>
