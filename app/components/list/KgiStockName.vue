<script setup lang="ts">
// <KgiStockName name="台積電" code="2330" />          上下兩行（列表用）：名稱粗體、代碼次要色
// <KgiStockName name="台積電" code="2330" inline />   同一行（勾選項目標題用）
defineProps<{ name: string; code: string; inline?: boolean }>()
</script>

<template>
  <p v-if="inline" class="t-body-bold">{{ name }} {{ code }}</p>
  <div v-else>
    <p class="t-body-bold text-content-general-primary">{{ name }}</p>
    <p class="n-body-regular text-content-general-secondary">{{ code }}</p>
  </div>
</template>
