<script setup lang="ts">
import { inject, type Ref } from 'vue'
import KgiExpandToggle from '../accordion/KgiExpandToggle.vue'
import KgiDetailPanel from '../card/KgiDetailPanel.vue'
import { hasListener } from '../../lib/listener'
import { CELL_ALIGN, LIST_COLS_KEY, type CellAlign } from '../../lib/list'

// 列表的一列。cells 用具名 slot：#cell-0、#cell-1…（對應 columns）
//   <ListRow :cell-count="3" :align="['left','center','right']" :expanded="open" @toggle="…">
//     <template #cell-0>…</template> …  <template #detail>…</template> <template #footer>…</template>
//   </ListRow>
// 綁了 @toggle 時整列可點、最右側顯示箭頭；detail 自動包在 DetailPanel（白色明細卡）裡
withDefaults(defineProps<{ cellCount: number; align?: CellAlign[]; expanded?: boolean; footerAlign?: 'end' | 'between' }>(), { align: () => [], footerAlign: 'end' })
const emit = defineEmits<{ toggle: [] }>()
const toggleable = hasListener('onToggle')
const cols = inject<Ref<string>>(LIST_COLS_KEY)
</script>

<template>
  <div class="flex flex-col gap-8 border-b border-container-general-divider py-16">
    <component :is="toggleable ? 'button' : 'div'" class="grid w-full items-center justify-between gap-4 text-left" :style="{ gridTemplateColumns: cols }" :aria-expanded="toggleable ? expanded : undefined" @click="toggleable && emit('toggle')">
      <div v-for="i in cellCount" :key="i" class="max-w-full min-w-0 list-cell-clamp" :class="CELL_ALIGN[align[i - 1] ?? 'left']"><slot :name="`cell-${i - 1}`" /></div>
      <KgiExpandToggle v-if="toggleable" :expanded="expanded" />
    </component>
    <div v-if="$slots.footer" class="flex items-center gap-8" :class="footerAlign === 'end' ? 'justify-end pr-32' : 'justify-between'"><slot name="footer" /></div>
    <div v-if="expanded && $slots.detail" class="flex flex-col"><KgiDetailPanel><slot name="detail" /></KgiDetailPanel></div>
  </div>
</template>
