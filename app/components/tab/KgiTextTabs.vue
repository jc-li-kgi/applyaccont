<script setup lang="ts">
import { TabsList, TabsRoot, TabsTrigger } from 'reka-ui'

// 文字型頁籤（Reka UI Tabs，方向鍵切換）。選中項下方藍線。放在卡片內時加 flush（不留左右邊距），置中加 center
// 內容區由外層依 v-model 自行切換
defineProps<{ tabs: { key: string; label: string }[]; flush?: boolean; center?: boolean }>()
const model = defineModel<string>({ required: true })
</script>

<template>
  <TabsRoot v-model="model" activation-mode="manual">
    <TabsList class="flex items-end gap-16 pt-4" :class="[flush ? 'px-0' : 'px-16', center && 'justify-center']">
      <TabsTrigger
        v-for="t in tabs" :key="t.key" :value="t.key"
        class="flex flex-col gap-8 t-body-regular whitespace-nowrap"
        :class="t.key === model ? 'text-content-general-active' : 'pb-tab text-content-general-secondary'"
      >
        {{ t.label }}<i v-if="t.key === model" class="block h-2 bg-container-general-active-primary" />
      </TabsTrigger>
    </TabsList>
  </TabsRoot>
</template>
