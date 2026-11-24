<script setup lang="ts">
import KgiDialog from './KgiDialog.vue'
import type { InfoContent } from '../../lib/types'
// 說明型對話框：info = { title, body }，null 時關閉
defineProps<{ info: InfoContent | null }>()
const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <KgiDialog :open="!!info" :title="info?.title" :body="info?.body" @close="emit('close')" />
</template>
