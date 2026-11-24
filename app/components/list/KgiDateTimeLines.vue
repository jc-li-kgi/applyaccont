<script setup lang="ts">
import { computed } from 'vue'
import { dateTimeParts } from '../../lib/format'

// 日期＋時間（兩行，台北時區）。放在列表欄位時用 text-class 指定字級與顏色
defineOptions({ inheritAttrs: false })
const props = defineProps<{ value: string; textClass?: string }>()
const parts = computed(() => dateTimeParts(props.value))
</script>

<template>
  <p :class="textClass">{{ parts[0] }}</p>
  <p :class="textClass">{{ parts[1] }}</p>
</template>
