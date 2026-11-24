import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { KgiInfoLabel } from '../../app/kgi'
import { info } from '../_data'

const meta = {
  title: 'Components/Tooltips',
  component: KgiInfoLabel,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: { description: { component: 'Guideline 2026/10 更新。文字 + ⓘ：點 ⓘ 開說明。目前用 Dialog 呈現說明，**尚未依 2026/10 Tooltips 規格做成氣泡**。給 `info` 自己開說明；綁 `@info` 由外部處理。icon 尺寸跟著 `label-class` 的文字層級。' } },
  },
  args: { label: '可借額度總計', info, labelClass: 't-body-regular' },
  argTypes: { labelClass: { control: 'inline-radio', options: ['t-caption-regular', 't-body-regular', 't-subtitle-bold'] } },
} satisfies Meta<typeof KgiInfoLabel>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: '文字 + ⓘ' }
export const Levels: Story = {
  name: '不同文字層級',
  render: () => ({
    components: { KgiInfoLabel },
    setup: () => ({ info }),
    template: `<div class="flex flex-col gap-12 text-content-general-primary">
      <KgiInfoLabel label="Caption" label-class="t-caption-regular" :info="info" />
      <KgiInfoLabel label="Body" :info="info" />
      <KgiInfoLabel label="Subtitle" label-class="t-subtitle-bold" :info="info" /></div>`,
  }),
}
