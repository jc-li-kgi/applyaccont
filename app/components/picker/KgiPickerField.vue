<script setup lang="ts" generic="T extends string | number">
import { computed, ref } from 'vue'
import KgiIcon from '../icon/KgiIcon.vue'
import KgiSheet from '../action-sheet/KgiSheet.vue'
import KgiSheetOptions from '../action-sheet/KgiSheetOptions.vue'
import { hasListener } from '../../lib/listener'
import { toOptions, type Option } from '../../lib/types'

// <KgiPickerField v-model="term" label="借款期數" :options="['12', '24']" />
// 自訂選擇畫面（例如有搜尋的股票清單）：不給 options，改給 display-value + @open
const props = withDefaults(
  defineProps<{ label?: string; options?: (T | Option<T>)[]; placeholder?: string; error?: string; sheetTitle?: string; hint?: string; displayValue?: string }>(),
  { placeholder: '請選擇', options: () => [] },
)
const model = defineModel<T | null>()
const emit = defineEmits<{ open: [] }>()
const custom = hasListener('onOpen')
const open = ref(false)
const items = computed(() => toOptions(props.options))
const shown = computed(() => props.displayValue ?? items.value.find((o) => o.value === model.value)?.label)

const pick = (v: T) => {
  model.value = v
  open.value = false
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <p v-if="label" class="t-body-bold text-content-general-primary">{{ label }}</p>
    <button type="button" class="-mb-4 flex items-center gap-4 pt-4 text-left" aria-haspopup="dialog" @click="custom ? emit('open') : (open = true)">
      <span class="flex-1 t-subtitle-regular" :class="shown ? 'text-content-general-primary' : 'text-content-general-tertiary'">{{ shown ?? placeholder }}</span>
      <KgiIcon name="pull.svg" level="subtitle" />
    </button>
    <span class="-mt-4 block h-px" :class="error ? 'bg-content-semantic-caution' : 'bg-container-general-input-line'" />
    <p v-if="error" class="-mt-4 t-caption-regular text-content-semantic-caution">{{ error }}</p>
    <p v-if="hint" class="t-caption-regular text-content-general-secondary">{{ hint }}</p>

    <KgiSheet v-if="!custom" :open="open" :title="sheetTitle ?? `選擇${label ?? ''}`" @close="open = false">
      <KgiSheetOptions :options="items" :value="model" @select="pick" />
    </KgiSheet>
  </div>
</template>
