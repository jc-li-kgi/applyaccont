<script setup lang="ts">
import { computed, ref } from 'vue'
import KgiIcon from '../icon/KgiIcon.vue'
import KgiButton from '../button/KgiButton.vue'
import { clampAmount } from '../../lib/kit'
import { num } from '../../lib/format'

// 金額 / 數量輸入框（含 − ＋）。v-model 為數字或 null（未填，顯示 placeholder）
// 直接輸入時，離開欄位會自動修正到 min～max 並對齊 step
const props = withDefaults(
  defineProps<{
    label: string; min: number; max: number; step?: number
    prefix?: string; suffix?: string; placeholder?: string
    action?: { label: string; onClick: () => void }
    hints?: string[]; error?: string; disabled?: boolean
  }>(),
  { step: 1, hints: () => [], disabled: false },
)
const model = defineModel<number | null>({ required: true })

const text = ref<string | null>(null) // 編輯中的字串；null = 沒在編輯
const range = computed(() => ({ min: props.min, max: props.max, step: props.step }))
const filled = computed(() => model.value != null)
const shown = computed(() => text.value ?? (model.value != null ? num(model.value) : ''))
const empty = computed(() => shown.value === '')
const inputWidth = computed(() => (empty.value ? `${(props.placeholder ?? '').length}em` : `${Math.max(1, shown.value.length) + 0.5}ch`))

const change = (delta: number) => {
  model.value = model.value != null ? clampAmount(model.value + delta, range.value) : delta > 0 ? props.min : null
}
const commit = () => {
  if (text.value !== null) {
    const digits = text.value.replace(/\D/g, '')
    model.value = digits ? clampAmount(digits, range.value) : null
  }
  text.value = null
}
const onFocus = () => (text.value = model.value != null ? String(model.value) : '')
const onInput = (e: Event) => (text.value = (e.currentTarget as HTMLInputElement).value)
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex items-center justify-between gap-20">
      <p class="t-body-bold text-content-general-primary">{{ label }}</p>
      <KgiButton v-if="action" variant="text" @click="action.onClick">{{ action.label }}</KgiButton>
    </div>

    <div class="-mb-4 flex items-center gap-12 pt-4">
      <button type="button" class="size-20 text-content-general-primary disabled:cursor-default disabled:text-content-general-disabled" aria-label="減少" :disabled="disabled || !filled || model! <= min" @click="change(-step)">
        <KgiIcon name="minus.svg" :width="16.25" :height="1.25" tint />
      </button>
      <label class="flex flex-1 items-baseline justify-center gap-char text-content-general-primary" :class="empty ? 't-subtitle-regular' : 'n-title'">
        <span v-if="prefix && !empty">{{ prefix }}</span>
        <input
          class="min-w-0 border-0 bg-transparent p-0 text-left text-inherit outline-none placeholder:text-content-general-tertiary"
          inputmode="numeric" :readonly="disabled" :value="shown" :placeholder="placeholder"
          :maxlength="text !== null ? String(max).length : undefined" :style="{ width: inputWidth }"
          @focus="onFocus" @input="onInput" @blur="commit" @keydown.enter="($event.currentTarget as HTMLInputElement).blur()"
        />
        <span v-if="suffix && !empty">{{ suffix }}</span>
      </label>
      <button type="button" class="size-20 text-content-general-primary disabled:cursor-default disabled:text-content-general-disabled" aria-label="增加" :disabled="disabled || (filled && model! >= max)" @click="change(step)">
        <KgiIcon name="add.svg" :width="16.25" :height="16.25" tint />
      </button>
    </div>
    <span class="-mt-4 block h-px" :class="error ? 'bg-content-semantic-caution' : 'bg-container-general-input-line'" />

    <p v-if="error" class="-mt-4 t-caption-regular text-content-semantic-caution">{{ error }}</p>
    <div v-if="hints.length" class="t-caption-regular text-content-general-secondary">
      <p v-for="h in hints" :key="h">{{ h }}</p>
    </div>
  </div>
</template>
