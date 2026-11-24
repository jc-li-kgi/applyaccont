// 給 Storybook（Vite）用；Nuxt 由 @nuxtjs/tailwindcss 模組處理 PostCSS
export default {
  plugins: {
    tailwindcss: { config: './tailwind.config.ts' },
    autoprefixer: {},
  },
}
