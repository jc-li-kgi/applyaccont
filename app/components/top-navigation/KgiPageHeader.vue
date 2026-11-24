<script setup lang="ts">
import KgiIcon from '../icon/KgiIcon.vue'
import { COPY, useToast } from '../../lib/kit'
import { hasListener } from '../../lib/listener'

// 子頁標題列：返回 / 標題 / 分享。沒有綁 @back 就不顯示返回鍵
// flush：不加左右內距（放在 KgiGrid / KgiPage 裡時，左右邊距由網格決定）
withDefaults(defineProps<{ title: string; showShare?: boolean; flush?: boolean }>(), { showShare: true, flush: false })
const emit = defineEmits<{ back: [] }>()
const hasBack = hasListener('onBack')
const { show } = useToast()
</script>

<template>
  <header class="flex items-center gap-16 py-12" :class="flush ? 'px-0' : 'px-16'">
    <button v-if="hasBack" type="button" class="inline-flex size-24 shrink-0 items-center justify-center" :aria-label="COPY.common.back" @click="emit('back')">
      <KgiIcon name="chevron-back.svg" />
    </button>
    <span v-else class="size-24 shrink-0" />
    <p class="flex-1 text-center t-subtitle-bold text-content-general-primary">{{ title }}</p>
    <button v-if="showShare" type="button" class="inline-flex size-24 shrink-0 items-center justify-center" :aria-label="COPY.common.share" @click="show(COPY.common.notAvailable)">
      <KgiIcon name="share.svg" />
    </button>
    <span v-else class="size-24 shrink-0" />
  </header>
</template>
