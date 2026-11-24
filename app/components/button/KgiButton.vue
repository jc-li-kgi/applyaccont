<script setup lang="ts">
import { computed } from 'vue'

// <KgiButton>下一步</KgiButton>                               主要按鈕（滿版、直角）
// <KgiButton variant="text" block>完成</KgiButton>            文字按鈕
// <KgiButton variant="text" tone="caution">移除</KgiButton>   警示文字按鈕（Content/Semantic/Caution）
// <KgiButton variant="capsule" size="sm">賣股還款</KgiButton>  膠囊（列表內用 sm）
// 傳 href 會輸出 <a>；其餘屬性（disabled、@click、aria-*）直接套在根元素
const props = withDefaults(
  defineProps<{ variant?: 'primary' | 'text' | 'capsule'; typo?: string; tone?: 'active' | 'caution'; block?: boolean; href?: string; size?: 'md' | 'sm'; type?: 'button' | 'submit' | 'reset' }>(),
  { variant: 'primary', block: false, size: 'md', type: 'button' },
)

const VARIANT = {
  primary:
    'flex w-full items-center justify-center rounded-none bg-container-general-active-primary px-16 py-12 text-content-general-light-active active:bg-container-general-active-primary-hover hover:not-disabled:bg-container-general-active-primary-hover disabled:cursor-default disabled:bg-container-general-disabled disabled:text-content-general-disabled',
  text: 'inline-flex items-center justify-center gap-4 text-content-general-active disabled:cursor-default disabled:text-content-general-disabled',
  capsule:
    'rounded-full bg-container-general-active-secondary whitespace-nowrap text-content-general-active-button-capsule active:bg-container-general-active-secondary-hover hover:bg-container-general-active-secondary-hover',
}
const TYPO = { primary: 't-subtitle-bold', text: 't-body-regular', capsule: 't-body-regular' }

const classes = computed(() => [
  VARIANT[props.variant],
  props.typo ?? TYPO[props.variant],
  props.variant === 'text' && props.tone === 'caution' && 'text-content-semantic-caution',
  props.variant === 'capsule' && (props.size === 'sm' ? 'px-16 py-4' : 'px-20 py-8'),
  props.block && 'w-full px-16 py-12',
])
</script>

<template>
  <a v-if="href" :href="href" :class="classes"><slot /></a>
  <button v-else :type="type" :class="classes"><slot /></button>
</template>
