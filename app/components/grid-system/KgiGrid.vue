<script setup lang="ts">
// 頁面網格容器（Figma Grid System/App & Web RWD），欄數、欄間距、左右邊距隨畫面寬度自動切換：
//   小版 < 768：4 欄、欄間距 16、左右各 16 ／ 中版 768–1023：6 欄、欄間距 16、容器 92% ／ 大版 ≥ 1024：12 欄、欄間距 28、容器 86%、最寬 1175
// 子元素用 Tailwind 定位：col-span-full（撐滿）、desktop:col-start-4 desktop:col-span-8 等。一般頁面直接用 <KgiPage>，不用自己排
withDefaults(defineProps<{ as?: string }>(), { as: 'div' })
</script>

<template>
  <component :is="as" class="kgi-grid"><slot /></component>
</template>
