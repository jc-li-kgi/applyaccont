<script setup lang="ts">
import { iconUrl } from '../../lib/assets'
// 搜尋 icon（圓圈 + 握把，Figma 為組合圖層）
withDefaults(defineProps<{ size?: number }>(), { size: 24 })
</script>

<template>
  <span class="relative inline-block shrink-0" :style="{ width: `${size}px`, height: `${size}px` }" aria-hidden="true">
    <img class="absolute top-2 left-2" :src="iconUrl('search-circle.svg')" width="17.52" height="17.52" alt="" />
    <i class="search-handle bg-content-general-primary" />
  </span>
</template>
