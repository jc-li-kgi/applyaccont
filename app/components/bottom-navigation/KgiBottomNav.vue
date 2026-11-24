<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import KgiIcon from '../icon/KgiIcon.vue'
import { COPY, useToast } from '../../lib/kit'
import { hasListener } from '../../lib/listener'
import { useLongPress } from '../../lib/useLongPress'
import { BOTTOM_NAV_ITEMS, type NavItem } from './nav-items'

// 底部導覽。icon 一律用 tint，顏色跟著文字：選取 = content active，未選取 = primary 透明度 40%
// 換頁：綁 @navigate 自己處理；沒綁就用 app 的 router（Nuxt 內建 vue-router）push(item.to)
// 沒有 to 的項目 = 未開放（顯示 Toast）。長按「更多」2 秒觸發 @more-long-press（沒綁就不啟用）
// 預設項目是證券 App 的 6 個；新專案請傳入自己的 items
const props = withDefaults(defineProps<{ active?: string; items?: NavItem[] }>(), { active: 'account', items: () => BOTTOM_NAV_ITEMS })
const emit = defineEmits<{ moreLongPress: []; navigate: [item: NavItem] }>()
const router = getCurrentInstance()?.appContext.config.globalProperties.$router as { push: (to: string) => unknown } | undefined
const { show } = useToast()
const customNavigate = hasListener('onNavigate')
const longPressEnabled = hasListener('onMoreLongPress')
const moderator = useLongPress(() => emit('moreLongPress'), 2000)

const go = (item: NavItem) => {
  if (item.key === 'more' && moderator.fired()) return // 長按已觸發，不再顯示未開放
  if (item.key === props.active) return
  if (!item.to) return show(COPY.common.notAvailable)
  if (customNavigate) emit('navigate', item)
  else router?.push(item.to)
}
// 「選股」icon：三根柱 + 折線（Figma 為組合圖層）。數值為 [left, top, height]
const FUND_BARS = [[2.7, 10.8, 5.53], [7.79, 8.1, 8.756], [12.69, 10, 6.452]] as const
</script>

<template>
  <nav class="fixed bottom-0 left-1/2 z-10 flex w-full max-w-app -translate-x-1/2 items-center justify-between bg-surface-white px-24 pt-12 pb-nav shadow-popover">
    <button
      v-for="item in items" :key="item.key" type="button"
      class="flex w-32 flex-col items-center gap-4 whitespace-nowrap no-callout"
      :class="item.key === active ? 't-body-bold text-content-general-active' : 't-body-regular text-content-general-primary opacity-40'"
      :aria-current="item.key === active ? 'page' : undefined"
      v-on="item.key === 'more' && longPressEnabled ? moderator.handlers : {}"
      @click="go(item)"
    >
      <span class="flex size-20 items-center justify-center">
        <span v-if="item.icon === 'fund'" class="nav-fund">
          <span v-for="([l, t, h], i) in FUND_BARS" :key="i" class="nav-fund-bar" :style="{ left: `${l}px`, top: `${t}px`, height: `${h}px` }" />
          <span class="nav-fund-line"><KgiIcon name="nav-fund-line.svg" :width="15.4293" :height="6.15369" tint /></span>
        </span>
        <KgiIcon v-else v-bind="item.icon" tint />
      </span>
      <span>{{ item.label }}</span>
    </button>
  </nav>
</template>
