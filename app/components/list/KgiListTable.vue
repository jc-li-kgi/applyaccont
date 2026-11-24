<script setup lang="ts">
import { computed, provide } from 'vue'
import KgiInfoLabel from '../tooltips/KgiInfoLabel.vue'
import KgiEmptyState from '../empty-state/KgiEmptyState.vue'
import { iconUrl } from '../../lib/assets'
import { CELL_ALIGN, LIST_COLS_KEY, type CellAlign } from '../../lib/list'
import type { InfoContent } from '../../lib/types'

// 列表（表頭 + 排序 + 分隔線 + 列）。欄寬：沒給 width 的欄平分剩餘寬度；全部都有 width 時，多出的寬度平均分到欄與欄之間。width 可用 'var(--spacing-80)' 這類 token
//   窄螢幕要能縮的欄用 'minmax(0, 71px)'。表頭文字用 \n 換行。v-model:sort 綁排序欄位（再點一次取消）
//   <ListTable :columns="[…]" expandable v-model:sort="sort" empty="目前沒有資料" :has-rows="rows.length > 0"><ListRow … /></ListTable>
interface Column { label: string; width?: string; align?: CellAlign; sortKey?: string; info?: InfoContent }
const props = withDefaults(defineProps<{ columns: Column[]; expandable?: boolean; empty?: string; headAlign?: 'center' | 'end'; hasRows?: boolean; flush?: boolean }>(), { headAlign: 'center', hasRows: true, flush: false })
const sort = defineModel<string | null>('sort', { default: null })

const cols = computed(() => props.columns.map((c) => c.width || 'minmax(0, 1fr)').join(' ') + (props.expandable ? ' var(--spacing-24)' : ''))
provide(LIST_COLS_KEY, cols)
</script>

<template>
  <div class="flex flex-col" :class="flush ? 'px-0' : 'px-16'">
    <div class="grid justify-between gap-4 border-b border-container-general-divider pb-8 t-caption-regular text-content-general-secondary *:whitespace-nowrap" :class="headAlign === 'end' ? 'items-end' : 'items-center'" :style="{ gridTemplateColumns: cols }">
      <span v-for="c in columns" :key="c.label" :class="CELL_ALIGN[c.align ?? 'left']">
        <button v-if="c.sortKey" type="button" class="inline-flex items-end gap-4 text-left text-inherit" :aria-pressed="sort === c.sortKey" @click="sort = sort === c.sortKey ? null : c.sortKey!">
          <span><template v-for="(line, i) in c.label.split('\n')" :key="i">{{ line }}<br v-if="i < c.label.split('\n').length - 1" /></template></span>
          <span class="inline-flex h-caption-line items-center"><img :src="iconUrl('sort.svg')" width="6" height="11" alt="" /></span>
        </button>
        <KgiInfoLabel v-else-if="c.info" :label="c.label" label-class="" level="caption" :info="c.info" />
        <template v-else><template v-for="(line, i) in c.label.split('\n')" :key="i">{{ line }}<br v-if="i < c.label.split('\n').length - 1" /></template></template>
      </span>
    </div>
    <slot />
    <KgiEmptyState v-if="!hasRows && empty" :text="empty" />
  </div>
</template>
