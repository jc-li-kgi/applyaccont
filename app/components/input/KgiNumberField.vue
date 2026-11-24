<script setup lang="ts">
// 數字輸入框（標題 + 輸入 + 單位 + 底線）。v-model 為數字或 null（未填，顯示 placeholder）。只接受整數；超過 max 時自動改成 max
const props = defineProps<{ label?: string; placeholder?: string; suffix?: string; max?: number }>()
const model = defineModel<number | null>({ required: true })

const onInput = (e: Event) => {
  const el = e.currentTarget as HTMLInputElement
  const digits = el.value.replace(/\D/g, '')
  const n = digits ? Number(digits) : null
  const next = n != null && props.max != null ? Math.min(n, props.max) : n
  el.value = next == null ? '' : String(next)
  model.value = next
}
</script>

<template>
  <label class="flex flex-col gap-8">
    <span v-if="label" class="t-body-bold text-content-general-primary">{{ label }}</span>
    <span class="-mb-4 flex items-center gap-4 pt-4 text-left">
      <input class="w-0 min-w-0 flex-1 border-0 bg-transparent p-0 t-subtitle-regular text-content-general-primary outline-none placeholder:text-content-general-tertiary" inputmode="numeric" :value="model ?? ''" :placeholder="placeholder" @input="onInput" />
      <span v-if="suffix" class="t-subtitle-regular text-content-general-primary">{{ suffix }}</span>
    </span>
    <span class="-mt-4 block h-px bg-container-general-input-line" />
  </label>
</template>
