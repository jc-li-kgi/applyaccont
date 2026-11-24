<script setup lang="ts">
import { computed } from 'vue'
import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger } from 'reka-ui'
import KgiIcon from '../icon/KgiIcon.vue'

// 收合問答（Reka UI Accordion，一次只展開一題）。default-open：一開始展開第幾題（不給 = 全部收合）
const props = withDefaults(defineProps<{ items: { q: string; a: string }[]; defaultOpen?: number | null }>(), { defaultOpen: null })
const defaultValue = computed(() => (props.defaultOpen == null ? undefined : String(props.defaultOpen)))
</script>

<template>
  <AccordionRoot type="single" collapsible :default-value="defaultValue" class="flex flex-col">
    <AccordionItem v-for="(it, i) in items" :key="it.q" v-slot="{ open }" :value="String(i)" class="border-b border-container-general-divider">
      <AccordionHeader as="div">
        <AccordionTrigger class="flex w-full items-center gap-4 pt-16 pr-4 pb-12 text-left">
          <span class="flex-1 t-subtitle-bold text-content-general-primary">{{ it.q }}</span>
          <KgiIcon :name="open ? 'faq-minus.svg' : 'faq-plus.svg'" level="subtitle" />
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent as="p" class="pt-12 pb-24 t-body-regular text-content-general-primary">{{ it.a }}</AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>
