<script setup lang="ts" generic="T extends string | number">
import { computed } from 'vue'
import KgiIcon from '../icon/KgiIcon.vue'
import { toOptions, type Option } from '../../lib/types'

// 底部彈窗裡的選項清單。options 可給字串陣列或 { value, label, desc }；chevron：前往型選單（右側 ›，不標示選中項）
const props = defineProps<{ options: (T | Option<T>)[]; value?: T | null; chevron?: boolean }>()
const emit = defineEmits<{ select: [value: T] }>()
const items = computed(() => toOptions(props.options))
</script>

<template>
  <div class="flex flex-col" :role="chevron ? undefined : 'listbox'">
    <button
      v-for="o in items" :key="o.value" type="button" :role="chevron ? undefined : 'option'"
      class="flex w-full items-start gap-8 p-16 text-left active:bg-container-general-option-selected-blue"
      :class="[!chevron && o.value === value ? 'bg-container-general-option-selected-blue' : 'bg-container-card-white', chevron && 'gap-4 not-first:mt-8']"
      :aria-selected="chevron ? undefined : o.value === value"
      @click="emit('select', o.value)"
    >
      <span class="flex min-w-0 flex-1 flex-col gap-4">
        <span class="t-subtitle-regular text-content-general-primary">{{ o.label }}</span>
        <span v-if="o.desc" class="t-caption-regular text-content-general-secondary">{{ o.desc }}</span>
      </span>
      <KgiIcon v-if="chevron" name="chevron-forward-24.svg" level="subtitle" />
    </button>
  </div>
</template>
