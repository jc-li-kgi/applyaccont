<script setup lang="ts">
import { computed, ref } from 'vue'
import KgiIcon from '../icon/KgiIcon.vue'
import KgiInfoDialog from '../dialog/KgiInfoDialog.vue'
import { hasListener } from '../../lib/listener'
import type { IconLevel, InfoContent } from '../../lib/types'

// 文字 + ⓘ 說明
// <KgiInfoLabel label="可借額度總計" :info="{ title, body }" />   自己開說明彈窗
// <KgiInfoLabel label="…" @info="…" />                            由外部處理
const props = withDefaults(defineProps<{ label: string; info?: InfoContent; labelClass?: string; level?: IconLevel }>(), { labelClass: 't-body-regular' })
const emit = defineEmits<{ info: [] }>()
const external = hasListener('onInfo')
const lv = computed<IconLevel>(() => props.level ?? (props.labelClass.includes('caption') ? 'caption' : props.labelClass.includes('subtitle') ? 'subtitle' : 'body'))
const open = ref(false)
const showIcon = computed(() => !!props.info || external)
</script>

<template>
  <span class="inline-flex items-center gap-4">
    <span :class="labelClass">{{ label }}</span>
    <button v-if="showIcon" type="button" class="inline-flex shrink-0 items-center justify-center" :aria-label="`${label}說明`" @click="external ? emit('info') : (open = true)">
      <KgiIcon name="info.svg" :level="lv" />
    </button>
    <KgiInfoDialog v-if="info" :info="open ? info : null" @close="open = false" />
  </span>
</template>
