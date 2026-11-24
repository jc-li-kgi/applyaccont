import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { iconUrl } from '../../app/kgi'
import { ILLUSTRATIONS } from '../_data'

const groups = [
  { title: '服務插圖（KgiServiceCardList，36px）', prefix: 'service-' },
  { title: '功能捷徑（48px）', prefix: 'shortcut-' },
  { title: '功能操作', prefix: 'action-' },
  { title: '結果頁（KgiResultPage，160px 區域）', prefix: 'success' },
  { title: '其他', prefix: '' },
]
const pick = (prefix: string) =>
  prefix ? ILLUSTRATIONS.filter((f) => f.startsWith(prefix)) : ILLUSTRATIONS.filter((f) => !groups.some((g) => g.prefix && f.startsWith(g.prefix)))

const meta = {
  title: 'Foundations/Illustration',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '彩色插圖不換色（不要加 `tint`），尺寸依元件規格。圖檔目前與 icon 放在同一個資料夾 `public/kgi/icons/`，以副檔名（.png）與檔名前綴區分。',
      },
    },
  },
} satisfies Meta
export default meta

export const Gallery: StoryObj = {
  name: '全部插圖',
  render: () => ({
    setup: () => ({ sections: groups.map((g) => ({ ...g, files: pick(g.prefix) })).filter((g) => g.files.length), iconUrl }),
    template: `<div class="flex flex-col gap-24">
      <section v-for="s in sections" :key="s.title" class="flex flex-col gap-12">
        <p class="t-body-bold text-content-general-primary">{{ s.title }}</p>
        <div class="grid grid-cols-3 gap-12">
          <div v-for="f in s.files" :key="f" class="flex flex-col items-center gap-8 rounded-small bg-surface-white p-12">
            <img :src="iconUrl(f)" width="48" height="48" alt="" class="object-contain" />
            <span class="break-all text-center n-caption-regular text-content-general-secondary">{{ f }}</span>
          </div>
        </div>
      </section></div>`,
  }),
}
