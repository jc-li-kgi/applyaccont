<script setup lang="ts" generic="T extends string | number">
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from 'reka-ui'

// 單選按鈕組（Reka UI RadioGroup，橫排平分）
// <KgiRadioGroup v-model="mode" label="還款額度" :options="[{ value: 'partial', label: '部分' }, …]" />
defineProps<{ label?: string; options: { value: T; label: string; disabled?: boolean }[]; name?: string; disabled?: boolean }>()
const model = defineModel<T | null>()
</script>

<template>
  <div class="flex flex-col gap-8">
    <p v-if="label" class="t-body-bold text-content-general-primary" aria-hidden="true">{{ label }}</p>
    <RadioGroupRoot v-model="model" :name="name" :disabled="disabled" :aria-label="label" orientation="horizontal" class="flex gap-12">
      <label v-for="o in options" :key="o.value" class="flex flex-1 cursor-pointer items-center gap-8">
        <RadioGroupItem
          :value="o.value" :disabled="o.disabled"
          class="radio-circle flex shrink-0 items-center justify-center rounded-full border-content-general-secondary data-checked:border-content-general-active focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-content-general-active data-disabled:cursor-default data-disabled:border-content-general-disabled"
        >
          <RadioGroupIndicator class="radio-dot rounded-full bg-content-general-active" />
        </RadioGroupItem>
        <span class="t-subtitle-regular text-content-general-primary">{{ o.label }}</span>
      </label>
    </RadioGroupRoot>
  </div>
</template>
