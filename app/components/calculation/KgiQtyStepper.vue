<script setup lang="ts">
import { ref } from 'vue'
import KgiIcon from '../icon/KgiIcon.vue'

// 數量加減框（有外框，− 數量 單位 ＋）。直接輸入時，離開欄位會自動修正到 min～max
const props = withDefaults(defineProps<{ min?: number; max?: number; step?: number; unit?: string; label?: string }>(), { min: 1, max: Infinity, step: 1, label: '數量' })
const model = defineModel<number>({ required: true })
const text = ref<string | null>(null)

const clamp = (n: number | string) => Math.min(props.max, Math.max(props.min, Math.round((Number(n) || 0) / props.step) * props.step))
const commit = () => {
  if (text.value !== null) model.value = clamp(text.value.replace(/\D/g, ''))
  text.value = null
}
</script>

<template>
  <div class="flex h-qty min-w-0 flex-1 items-center gap-8 rounded-small border border-container-general-divider bg-container-card-white px-8 py-4">
    <button type="button" class="size-20 text-content-general-primary disabled:cursor-default disabled:text-content-general-disabled" aria-label="減少" :disabled="model <= min" @click="model = clamp(model - step)">
      <KgiIcon name="minus.svg" :width="16.25" :height="1.25" tint />
    </button>
    <span class="h-qty-divider w-px shrink-0 bg-container-general-divider" />
    <input
      class="w-0 min-w-0 flex-1 border-0 bg-transparent p-0 text-center n-subtitle-regular text-content-general-primary outline-none"
      inputmode="numeric" :aria-label="label" :value="text ?? String(model)"
      @focus="text = String(model)" @input="text = ($event.currentTarget as HTMLInputElement).value" @blur="commit" @keydown.enter="($event.currentTarget as HTMLInputElement).blur()"
    />
    <span v-if="unit" class="t-subtitle-regular text-content-general-secondary">{{ unit }}</span>
    <span class="h-qty-divider w-px shrink-0 bg-container-general-divider" />
    <button type="button" class="size-20 text-content-general-primary disabled:cursor-default disabled:text-content-general-disabled" aria-label="增加" :disabled="model >= max" @click="model = clamp(model + step)">
      <KgiIcon name="add.svg" :width="16.25" :height="16.25" tint />
    </button>
  </div>
</template>
