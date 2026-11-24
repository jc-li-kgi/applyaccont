<script setup lang="ts">
// 第 N 步 xxx ／ 共 M 步，index 從 0 開始
// flush：不加左右內距（放在 KgiGrid / KgiPage 裡時用）
defineProps<{ index: number; total: number; label: string; flush?: boolean }>()
</script>

<template>
  <div class="flex flex-col gap-12" :class="flush ? 'px-0' : 'px-16'">
    <div class="flex items-start justify-between t-body-regular">
      <div class="flex gap-8 text-content-general-active">
        <span class="whitespace-nowrap">第 {{ index + 1 }} 步</span>
        <span>{{ label }}</span>
      </div>
      <span class="whitespace-nowrap text-content-general-secondary">共 {{ total }} 步</span>
    </div>
    <div class="flex">
      <span v-for="i in total" :key="i" class="h-2 flex-1" :class="i - 1 <= index ? 'bg-content-general-active' : 'bg-content-general-tertiary opacity-20'" />
    </div>
  </div>
</template>
