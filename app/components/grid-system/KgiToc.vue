<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import KgiIcon from '../icon/KgiIcon.vue'

// 文章目錄（閱讀型頁面）。手機、平板：收合在內容上方，點標題展開；桌機：固定展開（由 KgiPage 放在左側 3 欄並固定位置）
// 捲動時自動標示目前閱讀的段落（items 的 id 要對到內容區塊的 id）
const props = withDefaults(defineProps<{ items: { id: string; label: string }[]; title?: string }>(), { title: '目錄' })
const open = ref(false)
const active = ref<string | null>(null)
let observer: IntersectionObserver | undefined

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) active.value = e.target.id }),
    { rootMargin: '-96px 0px -60% 0px' }, // lint-allow 捲動偵測範圍（不是樣式）：頁面上方 96 以下、畫面上半部視為正在閱讀
  )
  props.items.forEach((it) => { const el = document.getElementById(it.id); if (el) observer!.observe(el) })
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <nav :aria-label="title" class="rounded-medium border border-container-general-divider bg-surface-white px-16 py-12 desktop:border-0 desktop:p-20">
    <button type="button" class="flex w-full items-center gap-8 text-left desktop:pointer-events-none" :aria-expanded="open" @click="open = !open">
      <span class="h-24 w-2 shrink-0 bg-content-general-primary" aria-hidden="true" />
      <span class="flex-1 t-title text-content-general-primary">{{ title }}</span>
      <span class="desktop:hidden"><KgiIcon :name="open ? 'faq-minus.svg' : 'faq-plus.svg'" level="subtitle" /></span>
    </button>
    <ol class="mt-16 flex-col gap-16" :class="open ? 'flex' : 'hidden desktop:flex'">
      <li v-for="it in items" :key="it.id">
        <a :href="`#${it.id}`" class="t-body-regular" :class="active === it.id ? 'text-content-general-active' : 'text-content-general-primary'" :aria-current="active === it.id ? 'true' : undefined">{{ it.label }}</a>
      </li>
    </ol>
  </nav>
</template>
