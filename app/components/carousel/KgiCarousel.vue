<script setup lang="ts" generic="T">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// 橫向滑動卡片 + 指示點。與 ui-kit 的差別：用 items + 具名 slot，不直接塞子元素
//   <Carousel :items="list" item-width="17.5rem"><template #default="{ item }"><StockPickCard v-bind="item" /></template></Carousel>
// 每張卡片寬度由 item-width 控制（預設 280px），左右露出相鄰卡片
defineProps<{ items: T[]; label?: string; itemWidth?: string }>()
defineSlots<{ default(props: { item: T; index: number }): unknown }>()

const track = ref<HTMLElement>()
const active = ref(0)

const onScroll = () => {
  const el = track.value
  if (!el) return
  const center = el.scrollLeft + el.clientWidth / 2
  const kids = [...el.children] as HTMLElement[]
  const dist = (k: HTMLElement) => Math.abs(k.offsetLeft + k.offsetWidth / 2 - center)
  let best = 0
  kids.forEach((k, i) => {
    const cur = kids[best]
    if (!cur || dist(k) < dist(cur)) best = i
  })
  active.value = best
}
onMounted(() => track.value?.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => track.value?.removeEventListener('scroll', onScroll))

const goTo = (i: number) => {
  const el = track.value
  const kid = el?.children[i] as HTMLElement | undefined
  if (el && kid) el.scrollTo({ left: kid.offsetLeft - (el.clientWidth - kid.offsetWidth) / 2, behavior: 'smooth' })
}
</script>

<template>
  <div class="flex flex-col items-center gap-16" role="region" :aria-label="label ?? '輪播'" :style="itemWidth ? { '--carousel-item-width': itemWidth } : undefined">
    <div ref="track" class="flex w-full snap-x snap-mandatory scroll-px-16 gap-12 overflow-x-auto px-16 pt-4 pb-12 scrollbar-hidden">
      <div v-for="(item, i) in items" :key="i" class="flex carousel-item snap-center first:snap-start last:snap-end"><slot :item="item" :index="i" /></div>
    </div>
    <div v-if="items.length > 1" class="-mt-12 flex gap-4">
      <button
        v-for="(_, i) in items" :key="i" type="button" class="h-4 rounded-xs transition-all duration-200" :aria-label="`第 ${i + 1} 張`"
        :class="i === active ? 'w-dot-active bg-content-general-active' : 'w-4 bg-blue-100'" data-lint-allow="指示點底色：Guideline 無對應語意 token，用 Graphic Blue 色票"
        @click="goTo(i)"
      />
    </div>
  </div>
</template>
