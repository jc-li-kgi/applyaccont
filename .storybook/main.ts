import type { StorybookConfig } from '@storybook/vue3-vite'
import remarkGfm from 'remark-gfm'

// Storybook 10（Vue 3 + Vite）。元件都是明確 import（不依賴 Nuxt auto-import），所以不需要 Nuxt 框架整合
const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.ts'],
  addons: [
    // remark-gfm：MDX 才能寫 Markdown 表格
    { name: '@storybook/addon-docs', options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } } },
    '@storybook/addon-a11y',
  ],
  framework: { name: '@storybook/vue3-vite', options: { docgen: 'vue-component-meta' } },
  staticDirs: ['../public'], // /kgi/icons/*
  async viteFinal(cfg) {
    const hasVue = (cfg.plugins ?? []).flat().some((p) => p && typeof p === 'object' && 'name' in p && p.name === 'vite:vue')
    if (!hasVue) {
      const vue = (await import('@vitejs/plugin-vue')).default
      cfg.plugins = [...(cfg.plugins ?? []), vue()]
    }
    return cfg
  },
}
export default config
