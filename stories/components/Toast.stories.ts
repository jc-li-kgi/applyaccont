import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { KgiToast, KgiButton, useToast } from '../../app/kgi'

const meta = {
  title: 'Components/Toast & Snackbar',
  component: KgiToast,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: { description: { component: 'Guideline 2026/10 更新。Reka UI Toast：版面放一個 `<KgiToast />`，任何地方呼叫 `useToast().show(\'訊息\')`，1.8 秒後自動消失，可向下滑掉。目前只有單行訊息（Toast），沒有帶按鈕的 Snackbar。' } },
  },
} satisfies Meta<typeof KgiToast>
export default meta

export const Toast: StoryObj<typeof meta> = {
  name: 'Toast',
  render: () => ({
    components: { KgiToast, KgiButton },
    setup: () => ({ show: useToast().show }),
    template: `<KgiButton @click="show('此功能未開放於本次測試')">顯示 Toast</KgiButton><KgiToast />`,
  }),
}
