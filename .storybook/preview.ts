import type { Preview } from '@storybook/vue3-vite'
import '../app/assets/css/kgi.css'

// 工具列：Theme（data-theme）、Platform（WebView 的 data-platform）、Surface（元件放在藍底或白底）
const preview: Preview = {
  globalTypes: {
    theme: { description: 'Guideline 色彩模式', toolbar: { title: 'Theme', icon: 'mirror', items: ['light', 'dark'], dynamicTitle: true } },
    platform: { description: 'WebView 平台字型 / 字重', toolbar: { title: 'Platform', icon: 'mobile', items: ['web', 'ios', 'android'], dynamicTitle: true } },
    surface: { description: '頁面底色', toolbar: { title: 'Surface', icon: 'paintbrush', items: ['blue', 'white'], dynamicTitle: true } },
  },
  initialGlobals: { theme: 'light', platform: 'web', surface: 'blue' },
  decorators: [
    (story, ctx) => {
      const html = document.documentElement
      ctx.globals.theme === 'dark' ? html.setAttribute('data-theme', 'dark') : html.removeAttribute('data-theme')
      ctx.globals.platform === 'web' ? html.removeAttribute('data-platform') : html.setAttribute('data-platform', ctx.globals.platform)
      // parameters.kgiFrame === false：不套手機寬（430）外框，給 RWD / Grid System 的 story 用整個視窗寬度
      if (ctx.parameters.kgiFrame === false) return { components: { story }, template: '<story />' }
      const fullscreen = ctx.parameters.layout === 'fullscreen'
      return {
        components: { story },
        data: () => ({ cls: [fullscreen ? '' : 'p-16', ctx.globals.surface === 'white' ? 'bg-surface-white' : 'bg-surface-blue'] }),
        template: '<div class="mx-auto min-h-full max-w-app" :class="cls"><story /></div>',
      }
    },
  ],
  parameters: {
    options: {
      // 側欄順序：Foundations → Components（照 Figma 元件庫順序）→ Patterns
      storySort: {
        order: [
          'Changelog',
          'Foundations', ['Overview', 'Rules', 'Color', 'Typography', 'Icon', 'Illustration', 'Grid System', 'Spacing, Radius, Shadow'],
          'Components', [
            'Overview', 'Action Sheet', 'Accordion', 'Avatar', 'Badge', 'Banner', 'Bottom Navigation', 'Button', 'Calculation', 'Card',
            'Carousel', 'Chart', 'Checkbox', 'Credit Card Picker', 'Coach Mark Hint', 'Dialog', 'Divider', 'Empty State', 'FAQ',
            'Filter', 'Input', 'List', 'Picker', 'Progress Bar', 'Radio Button', 'Search', 'Snowflake', 'System Message',
            'Toast & Snackbar', 'Tab', 'Tag', 'Tooltips', 'Top Navigation', 'Toggle',
          ],
          'Patterns',
        ],
      },
    },
    layout: 'fullscreen',
    // 工具列的 viewport：Grid System 的三個版型（小版 375、中版 768、大版 1024 / 1366）
    viewport: {
      options: {
        kgiMobile: { name: '小版・手機 375', styles: { width: '375px', height: '812px' } },
        kgiTablet: { name: '中版・平板 768', styles: { width: '768px', height: '1024px' } },
        kgiDesktop: { name: '大版・桌機 1024', styles: { width: '1024px', height: '768px' } },
        kgiDesktopL: { name: '大版・桌機 1366', styles: { width: '1366px', height: '900px' } },
      },
    },
    controls: { expanded: true, matchers: { color: /(background|color)$/i } },
    a11y: { test: 'todo' },
  },
}
export default preview
