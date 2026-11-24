import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { KgiSearchField, KgiSearchIcon } from '../../app/kgi'

const meta = {
  title: 'Components/Search',
  component: KgiSearchField,
  subcomponents: { KgiSearchIcon },
  tags: ['autodocs'],
  parameters: { layout: 'padded', docs: { description: { component: '搜尋框（膠囊 `rounded-full`、內距 8×16、icon 與文字 8）。預設淡藍底放在白底上；放在藍底頁面上時加 `on-surface` 改白底。' } } },
  args: { placeholder: '搜尋產品關鍵字或代碼', onSurface: false, modelValue: '' },
  render: (args) => ({
    components: { KgiSearchField },
    setup: () => ({ args, k: ref('') }),
    template: '<div class="flex"><KgiSearchField v-bind="args" v-model="k" /></div><p class="mt-8 n-caption-regular text-content-general-secondary">v-model：{{ k }}</p>',
  }),
} satisfies Meta<typeof KgiSearchField>
export default meta
type Story = StoryObj<typeof meta>

export const OnWhite: Story = { name: '白底上', decorators: [() => ({ template: '<div class="bg-surface-white p-16"><story /></div>' })] }
export const OnSurface: Story = { name: '藍底上（on-surface）', args: { onSurface: true } }
