<script setup lang="ts">
import { TabsList, TabsRoot, TabsTrigger } from 'reka-ui'

// 膠囊型頁籤（Reka UI Tabs，整排平分）。<KgiSegmentedTabs v-model="tab" :tabs="[{ key: 'a', label: '總覽' }, …]" />
defineProps<{ tabs: { key: string; label: string }[] }>()
const model = defineModel<string>({ required: true })
</script>

<template>
  <TabsRoot v-model="model" activation-mode="manual">
    <TabsList class="flex rounded-full bg-container-general-filter-active-blue p-4">
      <TabsTrigger
        v-for="t in tabs" :key="t.key" :value="t.key"
        class="flex-1 rounded-full px-12 py-8 text-center whitespace-nowrap"
        :class="t.key === model ? 'bg-container-general-light-active t-body-bold text-content-general-active-button-capsule shadow-light' : 't-body-regular text-content-general-secondary'"
      >{{ t.label }}</TabsTrigger>
    </TabsList>
  </TabsRoot>
</template>
