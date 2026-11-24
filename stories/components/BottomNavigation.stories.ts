import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { KgiBottomNav, KgiToast, BOTTOM_NAV_ITEMS } from '../../app/kgi'

const meta = {
  title: 'Components/Bottom Navigation',
  component: KgiBottomNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: '底部導覽。綁 `@navigate` 自己換頁（沒綁就用 app 的 router）；沒有 `to` 的項目顯示「未開放」Toast。預設是證券 App 的 6 個項目，新專案傳自己的 `items`。' } },
  },
  args: { active: 'account', items: BOTTOM_NAV_ITEMS },
  argTypes: { active: { control: 'inline-radio', options: BOTTOM_NAV_ITEMS.map((i) => i.key) } },
} satisfies Meta<typeof KgiBottomNav>
export default meta

export const Default: StoryObj<typeof meta> = {
  name: '證券 App',
  render: (args) => ({
    components: { KgiBottomNav, KgiToast },
    setup: () => ({ args, active: ref(args.active) }),
    template: '<div class="min-h-result"><KgiBottomNav v-bind="args" :active="active" @navigate="(i) => (active = i.key)" /><KgiToast /></div>',
  }),
}
