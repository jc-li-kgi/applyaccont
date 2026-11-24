import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import guideline from './tailwind.guideline.preset'

/**
 * Tailwind 3.4 設定（Nuxt layer 與 Storybook 共用）
 *   - Guideline 的色票 / 間距 / 圓角 / 陰影 / hover 色：tailwind.guideline.preset.ts（npm run theme 產生，不要手改）
 *   - 這裡只放「Guideline 沒有、但 App 需要」的東西：遮罩、版面寬度、動畫、Reka UI 狀態、not-* variant
 *   - 安全區與控制項尺寸的 class（pb-actions、icon-body…）在 app/assets/css/app-theme.css 的 @layer utilities
 */
const here = dirname(fileURLToPath(import.meta.url))

export default {
  presets: [guideline],
  content: [
    join(here, 'app/**/*.{vue,ts}'),
    join(here, 'stories/**/*.{ts,vue,mdx}'),
  ],
  theme: {
    // 斷點對齊 Figma Grid System：小版 < 768、中版（tablet）768–1023、大版（desktop）≥ 1024。取代 Tailwind 預設的 sm / md / lg / xl
    screens: { tablet: '768px', desktop: '1024px' },
    animation: {
      'fade-in': 'fade-in 0.2s ease',
      'fade-out': 'fade-out 0.15s ease',
      'slide-up': 'slide-up 0.25s ease',
      'push-up': 'push-up 0.25s ease',
    },
    keyframes: {
      'push-up': { from: { maxHeight: '0', opacity: '0' }, to: { maxHeight: '90vh', opacity: '1' } },
      'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
      'fade-out': { from: { opacity: '1' }, to: { opacity: '0' } },
      'slide-up': { from: { transform: 'translateY(100%)' }, to: { transform: 'translateY(0)' } },
    },
    blur: { overlay: '4px' },
    extend: {
      colors: { overlay: 'var(--color-surface-blue-75)' },
      spacing: { px: '1px' },
      zIndex: { 60: '60' },
      // Reka UI 用 data-state / data-disabled 表示狀態 → data-open: / data-closed: / data-checked: / data-disabled:
      data: { open: 'state="open"', closed: 'state="closed"', checked: 'state="checked"', disabled: 'disabled' },
      maxWidth: { app: 'var(--container-app)' },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('not-first', '&:not(:first-child)')
      addVariant('not-disabled', '&:not(:disabled)')
    }),
  ],
} satisfies Config
