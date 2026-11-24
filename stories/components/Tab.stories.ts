import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { KgiTextTabs, KgiSegmentedTabs } from '../../app/kgi'

const tabs = [{ key: 'loans', label: '借還款紀錄' }, { key: 'fee', label: '費用' }, { key: 'col', label: '擔保品' }]

const meta = {
  title: 'Components/Tab',
  component: KgiTextTabs,
  subcomponents: { KgiSegmentedTabs },
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen', docs: { description: { component: 'Reka UI Tabs：方向鍵移動、Enter / Space 選取，內容區由外層依 `v-model` 切換。Tab 與上下元件間距 20。膠囊型用 `KgiSegmentedTabs`。' } } },
  args: { tabs, modelValue: 'loans', flush: false, center: false },
  decorators: [() => ({ template: '<div class="py-16"><story /></div>' })],
  render: (args) => ({
    components: { KgiTextTabs },
    setup: () => ({ args, t: ref(args.modelValue) }),
    template: '<KgiTextTabs v-bind="args" v-model="t" /><p class="px-16 pt-12 n-caption-regular text-content-general-secondary">v-model：{{ t }}</p>',
  }),
} satisfies Meta<typeof KgiTextTabs>
export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = { name: '文字頁籤' }
export const TextCenter: Story = { name: '文字頁籤（置中）', args: { center: true } }
export const Segmented: Story = {
  name: '膠囊頁籤（KgiSegmentedTabs）',
  render: () => ({
    components: { KgiSegmentedTabs },
    setup: () => ({ s: ref('a') }),
    template: `<div class="px-16"><KgiSegmentedTabs v-model="s" :tabs="[{ key: 'a', label: '借款' }, { key: 'b', label: '還款' }]" /></div>`,
  }),
}
