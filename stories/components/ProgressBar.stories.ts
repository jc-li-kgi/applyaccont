import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { KgiStepBar } from '../../app/kgi'

const meta = {
  title: 'Components/Progress Bar',
  component: KgiStepBar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen', docs: { description: { component: 'Guideline 2026/10 更新。流程步驟條：第 N 步 + 步驟名稱 / 共 M 步，`index` 從 0 開始。放在頁首下方（`KgiFlowPage` 的 `step` 會自動帶入）。' } } },
  args: { index: 0, total: 3, label: '填寫資料' },
  argTypes: { index: { control: { type: 'range', min: 0, max: 4 } }, total: { control: { type: 'range', min: 2, max: 5 } } },
  decorators: [() => ({ template: '<div class="py-16"><story /></div>' })],
} satisfies Meta<typeof KgiStepBar>
export default meta

export const Step1: StoryObj<typeof meta> = { name: '第 1 步' }
export const Step3: StoryObj<typeof meta> = { name: '最後一步', args: { index: 2, label: '確認申請' } }
