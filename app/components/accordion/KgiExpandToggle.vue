<script setup lang="ts">
import KgiIcon from '../icon/KgiIcon.vue'
// 展開 / 收起箭頭（收起朝下、展開朝上，有旋轉動畫）。只負責圖示，點擊行為由外層按鈕處理
defineProps<{ expanded?: boolean }>()
</script>

<template>
  <span class="inline-flex transition-transform duration-200" :class="expanded ? 'rotate-0' : 'rotate-180'" aria-hidden="true"><KgiIcon name="chevron-up.svg" /></span>
</template>
