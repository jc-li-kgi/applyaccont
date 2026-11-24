import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { KgiIcon, KgiSearchIcon } from '../../app/kgi'
import { ICONS } from '../_data'

const meta = {
  title: 'Foundations/Icon',
  component: KgiIcon,
  subcomponents: { KgiSearchIcon },
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          '圖檔在 `public/kgi/icons/`（網址 `/kgi/icons/xxx.svg`）。',
          '- 文字旁的 icon 用 `level`，尺寸跟著文字層級：Caption 16、Body 16→20、Subtitle 20→24（手機→電腦）。不要寫 px。',
          '- 獨立 icon（頁首、公告卡）不給 level，預設 24。',
          '- `tint`：顏色跟著文字色（currentColor），用在要換色的單色 icon。',
          '- 搜尋 icon 是 Figma 組合圖層，用 `<KgiSearchIcon />`。',
        ].join('\n'),
      },
    },
  },
  args: { name: 'info.svg' },
  argTypes: {
    name: { control: 'select', options: ICONS },
    level: { control: 'inline-radio', options: [undefined, 'caption', 'body', 'subtitle'] },
  },
} satisfies Meta<typeof KgiIcon>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Gallery: Story = {
  name: '全部 icon',
  render: () => ({
    components: { KgiIcon },
    setup: () => ({ icons: ICONS }),
    template: `<div class="grid grid-cols-4 gap-12">
      <div v-for="n in icons" :key="n" class="flex flex-col items-center gap-8 rounded-small bg-surface-white p-12">
        <KgiIcon :name="n" />
        <span class="break-all text-center n-caption-regular text-content-general-secondary">{{ n.replace('.svg', '') }}</span>
      </div></div>`,
  }),
}

export const Levels: Story = {
  name: '尺寸跟文字層級',
  render: () => ({
    components: { KgiIcon, KgiSearchIcon },
    template: `<div class="flex flex-col gap-12 text-content-general-primary">
      <p class="flex items-center gap-4 t-caption-regular"><KgiIcon name="info.svg" level="caption" />Caption：16（間距 4）</p>
      <p class="flex items-center gap-4 t-body-regular"><KgiIcon name="info.svg" level="body" />Body：手機 16、電腦 20（間距 4）</p>
      <p class="flex items-center gap-8 t-subtitle-bold"><KgiIcon name="info.svg" level="subtitle" />Subtitle：手機 20、電腦 24（前置間距 8）</p>
      <p class="flex items-center gap-8 t-body-regular"><KgiSearchIcon />KgiSearchIcon（24）</p></div>`,
  }),
}

export const Tinted: Story = {
  name: '換色（tint）',
  render: () => ({
    components: { KgiIcon },
    template: `<div class="flex gap-24">
      <span class="text-content-general-primary"><KgiIcon name="add.svg" tint /></span>
      <span class="text-content-general-active"><KgiIcon name="add.svg" tint /></span>
      <span class="text-content-semantic-caution"><KgiIcon name="add.svg" tint /></span>
      <span class="text-content-general-disabled"><KgiIcon name="add.svg" tint /></span></div>`,
  }),
}
