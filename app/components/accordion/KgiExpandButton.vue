<script setup lang="ts">
import KgiButton from '../button/KgiButton.vue'
import KgiIcon from '../icon/KgiIcon.vue'
import { COPY } from '../../lib/kit'

// 展開 / 收闔明細文字按鈕。預設文字「展開明細 / 收闔明細」，要換傳 :labels="['看更多', '收合']"
withDefaults(defineProps<{ expanded?: boolean; labels?: [string, string] }>(), { expanded: false, labels: () => [COPY.common.expand, COPY.common.collapse] })
</script>

<template>
  <KgiButton variant="text" class="self-center" :aria-expanded="expanded">
    {{ expanded ? labels[1] : labels[0] }}
    <KgiIcon :name="expanded ? 'chevron-up.svg' : 'chevron-down.svg'" level="body" tint />
  </KgiButton>
</template>
