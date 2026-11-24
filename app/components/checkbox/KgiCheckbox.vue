<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui'
import { iconUrl } from '../../lib/assets'

// <KgiCheckbox v-model="checked" label="全選" />（Reka UI Checkbox）
// 外框 24×24（含 3px 點擊留白），方框 18px。label 只給螢幕閱讀器，畫面文字由外層自己排
defineProps<{ disabled?: boolean; label?: string; name?: string; value?: string }>()
const model = defineModel<boolean>({ default: false })
</script>

<template>
  <CheckboxRoot
    v-model="model" :disabled="disabled" :name="name" :value="value" :aria-label="label"
    class="inline-flex shrink-0 p-checkbox data-disabled:cursor-default"
  >
    <span class="checkbox-box" :class="disabled ? 'border-content-general-disabled' : ['border-container-general-active-primary', model && 'bg-container-general-active-primary']">
      <CheckboxIndicator v-if="!disabled" as-child>
        <img class="checkbox-mark" :src="iconUrl('check.svg')" width="16" height="16" alt="" />
      </CheckboxIndicator>
    </span>
  </CheckboxRoot>
</template>
