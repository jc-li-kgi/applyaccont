<script setup lang="ts">
import { inject, unref, type Ref } from 'vue'
import KgiInfoLabel from '../tooltips/KgiInfoLabel.vue'
import { hasListener } from '../../lib/listener'
import type { InfoContent } from '../../lib/types'

// 左標題、右數值
// <KgiDetailRow label="參考利率" value="2.8%" />
// <KgiDetailRow label="借款手續費" value="TWD 2" :info="{ title, body }" />   標題旁 ⓘ
// value 預設英數樣式（金額、日期）；中文值傳 value-class="t-body-regular"；多行傳字串陣列
// tone="caution"：整列警示色（Content/Semantic/Caution；原 tone="warning"）
withDefaults(
  defineProps<{ label: string; value?: string | string[]; info?: InfoContent; labelClass?: string; valueClass?: string; tone?: 'caution' }>(),
  { labelClass: 't-body-regular', valueClass: 'n-body-regular' },
)
const emit = defineEmits<{ info: [] }>()
const external = hasListener('onInfo')
const injected = inject<Ref<boolean | undefined> | boolean>('kgiSelectableDisabled', false)
const disabled = () => !!unref(injected) // 在停用的 KgiSelectableItem 裡整列變停用色
</script>

<template>
  <div class="flex items-start gap-8">
    <KgiInfoLabel
      class="flex-1" :class="disabled() ? 'text-content-general-disabled' : tone === 'caution' ? 'text-content-semantic-caution' : 'text-content-general-secondary'"
      :label="label" :label-class="labelClass" :info="info" v-bind="external ? { onInfo: () => emit('info') } : {}"
    />
    <div class="text-right whitespace-nowrap" :class="[valueClass, disabled() ? 'text-content-general-disabled' : tone === 'caution' ? 'text-content-semantic-caution' : 'text-content-general-primary']">
      <slot name="value">
        <template v-if="Array.isArray(value)"><p v-for="line in value" :key="line">{{ line }}</p></template>
        <template v-else>{{ value }}</template>
      </slot>
    </div>
  </div>
</template>
