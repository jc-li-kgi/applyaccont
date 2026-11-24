import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

/**
 * @kgi/ui-kit — Nuxt 4.5 Layer
 *
 * 在產品專案使用：
 *   // nuxt.config.ts
 *   export default defineNuxtConfig({ extends: ['@kgi/ui-kit'] })   // 或相對路徑 '../kgi-ui-kit'
 *
 * 這個 layer 提供：
 *   - 元件：app/components/**／Kgi*.vue，自動註冊為 <KgiButton>、<KgiDialog>…（檔名即元件名，不加資料夾前綴）
 *   - 樣式：One KGI Design Guideline 的 CSS 變數、.t-* / .n-* 字級、Tailwind 3.4 preset（tailwind.config.ts）
 *   - Icon：public/kgi/icons/（網址 /kgi/icons/xxx.svg）
 *   - <html lang="zh-Hant-TW"> 與 Google Fonts（Montserrat 300–600、Noto Sans TC 300–500）
 */
const here = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  ssr: true,
  devtools: { enabled: false },

  modules: ['@nuxtjs/tailwindcss'],

  css: [join(here, 'app/assets/css/kgi.css')],

  // 元件檔名本身就帶 Kgi 前綴（KgiButton.vue），所以關掉資料夾前綴：button/KgiButton.vue → <KgiButton>（資料夾依 Figma 分類）
  // 這樣 Nuxt 自動註冊、Storybook、明確 import 三種用法的元件名稱都一致
  components: [{ path: join(here, 'app/components'), pathPrefix: false, extensions: ['.vue'] }],

  tailwindcss: {
    // @tailwind 指令寫在 app/assets/css/kgi.css（要排在 Guideline 的 CSS 之後），不讓模組另外注入
    cssPath: false,
    configPath: join(here, 'tailwind.config.ts'),
    viewer: false,
  },

  app: {
    head: {
      htmlAttrs: { lang: 'zh-Hant-TW' },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        // 字重以 Figma Typography 為準：Montserrat 300–600、Noto Sans TC 300–500（中文最粗只用到 Medium 500）
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Noto+Sans+TC:wght@300;400;500&display=swap' },
      ],
    },
  },

  typescript: { strict: true },
})
