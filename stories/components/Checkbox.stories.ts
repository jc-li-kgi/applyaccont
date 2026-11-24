import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { KgiCheckbox, KgiCheckboxHeader, KgiSelectableItem, KgiStockName, KgiDetailRow } from '../../app/kgi'
import { onWhite } from '../_data'

const meta = {
  title: 'Components/Checkbox',
  component: KgiCheckbox,
  subcomponents: { KgiCheckboxHeader, KgiSelectableItem },
  tags: ['autodocs'],
  decorators: [onWhite],
  parameters: {
    layout: 'padded',
    docs: { description: { component: 'Guideline 2026/10 更新。Reka UI Checkbox：外框 24（含 3px 點擊留白）、方框 18。`label` 只給螢幕閱讀器；有標題時用 `KgiCheckboxHeader`，勾選項目用 `KgiSelectableItem`。Checkbox 之間間距 12。' } },
  },
  args: { label: '同意', disabled: false, modelValue: true },
} satisfies Meta<typeof KgiCheckbox>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: '勾選框' }
export const States: Story = {
  name: '狀態',
  render: () => ({
    components: { KgiCheckbox },
    template: '<div class="flex gap-16"><KgiCheckbox :model-value="false" label="未勾選" /><KgiCheckbox :model-value="true" label="已勾選" /><KgiCheckbox :model-value="false" disabled label="停用" /></div>',
  }),
}
export const Header: Story = {
  name: '勾選標題（KgiCheckboxHeader）',
  render: () => ({ components: { KgiCheckboxHeader }, setup: () => ({ v: ref(false) }), template: '<KgiCheckboxHeader v-model="v" title="可借貸 (2)" desc="勾選要匯入的擔保品" />' }),
}
export const Selectable: Story = {
  name: '可勾選項目（KgiSelectableItem）',
  render: () => ({
    components: { KgiSelectableItem, KgiStockName, KgiDetailRow },
    setup: () => ({ a: ref(true), b: ref(false) }),
    template: `<div class="flex flex-col gap-12">
      <KgiSelectableItem v-model="a" label="元大台灣50"><KgiStockName inline name="元大台灣50" code="0050" /><KgiDetailRow label="可擔保張數" value="5" /></KgiSelectableItem>
      <KgiSelectableItem v-model="b" disabled label="台積電"><KgiStockName inline name="台積電" code="2330" /><KgiDetailRow label="可擔保張數" value="0" /></KgiSelectableItem></div>`,
  }),
}
