<script setup lang="ts">
import { computed } from 'vue'
import { iconUrl } from '../../lib/assets'
import type { IconLevel } from '../../lib/types'

// <KgiIcon name="info.svg" level="body" />   ← 尺寸跟著文字層級（caption 16 / body 16→20 / subtitle 20→24，手機→電腦）
// <KgiIcon name="add.svg" tint />            ← 顏色跟著文字色（currentColor，用 CSS mask）
// 沒給 level 時用 size（預設 24，Figma 圖層的原始尺寸）
const props = withDefaults(
  defineProps<{ name: string; size?: number; width?: number; height?: number; alt?: string; tint?: boolean; level?: IconLevel }>(),
  { size: 24, alt: '', tint: false },
)

// 完整 class 名稱要以字面出現，Tailwind 才會產出（不能用 `icon-${level}` 拼接）
const LEVEL_CLASS = { caption: 'icon-caption', body: 'icon-body', subtitle: 'icon-subtitle' } as const
const levelClass = computed(() => (props.level ? LEVEL_CLASS[props.level] : undefined))
const url = computed(() => iconUrl(props.name))
const w = computed(() => props.width ?? props.size)
const h = computed(() => props.height ?? props.size)
const maskStyle = computed(() => ({
  ...(props.level ? {} : { width: `${w.value}px`, height: `${h.value}px` }),
  maskImage: `url('${url.value}')`,
  WebkitMaskImage: `url('${url.value}')`,
  maskSize: 'contain',
  maskRepeat: 'no-repeat',
  maskPosition: 'center',
}))
</script>

<template>
  <span v-if="tint" class="inline-block shrink-0 bg-current" :class="levelClass" :style="maskStyle" :role="alt ? 'img' : undefined" :aria-label="alt || undefined" :aria-hidden="alt ? undefined : 'true'" />
  <img v-else :src="url" :width="level ? undefined : w" :height="level ? undefined : h" :alt="alt" class="block" :class="levelClass" />
</template>
