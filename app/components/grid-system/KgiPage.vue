<script setup lang="ts">
import { computed } from 'vue'
import KgiGrid from './KgiGrid.vue'
import KgiPageHeader from '../top-navigation/KgiPageHeader.vue'
import KgiStepBar from '../progress-bar/KgiStepBar.vue'
import KgiToc from './KgiToc.vue'
import { hasListener } from '../../lib/listener'

// RWD 頁面版型：依內容類型在 Grid System 上排版（變化方式依 GridSystem 樣式模擬，數值用 Guideline token）
//   layout="form"  填寫型：手機、平板撐滿網格；桌機最寬 570、置中（表單、確認頁、申請流程）
//   layout="read"  閱讀型：手機、平板目錄收合在內容上方；桌機有目錄 → 目錄 3 欄 + 內容 8 欄，無目錄 → 內容 8 欄置中
//   layout="list"  列表型：撐滿網格（桌機最寬 1175）
//   type="flow" 流程申請：區塊間距 24 ／ type="browse" 資訊瀏覽：區塊間距 32（各尺寸相同）
// slot：預設（內容區塊）、#actions（內容下方按鈕，與內容距 32）、#head（閱讀型標題區）、#toc（自訂目錄）、#foot（閱讀型作者、常見問題）
// 綁了 @back 才有返回鍵。底部固定按鈕、總計列不在這個元件處理（依之後的元件規則）
const props = withDefaults(
  defineProps<{
    layout?: 'form' | 'read' | 'list'
    type?: 'flow' | 'browse'
    title?: string
    step?: { index: number; total: number; label: string }
    toc?: { id: string; label: string }[]
    share?: boolean
  }>(),
  { layout: 'form', type: 'flow', share: false },
)
const emit = defineEmits<{ back: [] }>()
const hasBack = hasListener('onBack')

const GAP = { flow: 'gap-24', browse: 'gap-32' } as const
const BG = { form: 'bg-surface-blue', read: 'bg-surface-white', list: 'bg-surface-white' } as const
const hasToc = computed(() => !!props.toc?.length)

// 閱讀型桌機欄位（完整 class 字串，Tailwind 才掃得到）
const READ = computed(() =>
  hasToc.value
    ? { head: 'col-span-full', toc: 'col-span-full desktop:col-span-3 desktop:row-span-2 desktop:row-start-2 desktop:sticky desktop:top-24 desktop:self-start desktop:mb-0', body: 'col-span-full desktop:col-span-8 desktop:col-start-4 desktop:row-start-2', foot: 'col-span-full desktop:col-span-8 desktop:col-start-4 desktop:row-start-3', actions: 'col-span-full desktop:col-span-8 desktop:col-start-4 desktop:row-start-4' }
    : { head: 'col-span-full desktop:col-span-8 desktop:col-start-3', toc: 'hidden', body: 'col-span-full desktop:col-span-8 desktop:col-start-3', foot: 'col-span-full desktop:col-span-8 desktop:col-start-3', actions: 'col-span-full desktop:col-span-8 desktop:col-start-3' },
)
</script>

<template>
  <div class="relative flex min-h-dvh flex-col pt-safe pb-actions" :class="BG[layout]">
    <KgiGrid v-if="title" class="items-start">
      <div class="col-span-full">
        <KgiPageHeader flush :title="title" :show-share="share" v-bind="hasBack ? { onBack: () => emit('back') } : {}" />
      </div>
    </KgiGrid>

    <!-- 填寫型 -->
    <KgiGrid v-if="layout === 'form'" class="mt-24">
      <div class="col-span-full flex w-full flex-col justify-self-center desktop:max-w-form">
        <KgiStepBar v-if="step" flush v-bind="step" class="mb-24" />
        <div class="flex flex-col" :class="GAP[type]"><slot /></div>
        <div v-if="$slots.actions" class="mt-32 flex flex-col gap-16"><slot name="actions" /></div>
      </div>
    </KgiGrid>

    <!-- 閱讀型 -->
    <KgiGrid v-else-if="layout === 'read'" class="mt-24">
      <header v-if="$slots.head" class="mb-40" :class="READ.head"><slot name="head" /></header>
      <div v-if="hasToc || $slots.toc" class="mb-24" :class="READ.toc">
        <slot name="toc"><KgiToc :items="toc!" /></slot>
      </div>
      <article class="flex min-w-0 flex-col" :class="[READ.body, GAP[type]]"><slot /></article>
      <div v-if="$slots.foot" class="mt-48 flex flex-col gap-48" :class="READ.foot"><slot name="foot" /></div>
      <div v-if="$slots.actions" class="mt-32 flex flex-col gap-16" :class="READ.actions"><slot name="actions" /></div>
    </KgiGrid>

    <!-- 列表型 -->
    <KgiGrid v-else class="mt-24">
      <div class="col-span-full flex flex-col" :class="GAP[type]"><slot /></div>
      <div v-if="$slots.actions" class="col-span-full mt-32 flex flex-col gap-16"><slot name="actions" /></div>
    </KgiGrid>
  </div>
</template>
