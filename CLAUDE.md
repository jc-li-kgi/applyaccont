# @kgi/ui-kit 開發規範

Nuxt 4.5（SSR）/ Vue 3.5 / Reka UI 2.10 / Tailwind CSS 3.4 / TypeScript 5.8 / Storybook 10 / Node 22。
`guideline/` 是顏色、間距、圓角、陰影、字級的唯一來源；`guideline/` 只有使用者說要改時才改。

## 使用規範（唯一一份，在這裡載入）

class 寫法、禁止事項、顏色（含交易狀態）、字級、字體、圓角、陰影、間距表、Grid System、Icon、Figma 讀稿都在 `plugins/kgi-ui-kit/skills/generate-ui/rules.md`。
**規則只改那一份，不要抄到這裡或其他檔案**（`npm run theme:check` 會擋重複的間距清單與間距表）。

@plugins/kgi-ui-kit/skills/generate-ui/rules.md

以下只寫在 kit repo 裡開發才需要知道的事。

## Tailwind 3.4 注意

- preset 是「取代」Tailwind 預設，不是 extend。App 另外補的（Guideline 沒有）在 `tailwind.config.ts`：`max-w-app`、`bg-overlay`、`animate-fade-in` / `fade-out` / `slide-up` / `push-up`、`h-px` / `w-px`、`z-60`、`data-*` 狀態。
- **`not-first:`、`not-disabled:`** 是 `tailwind.config.ts` 的 plugin 補的（3.4 沒有 `not-*`）；其他 `not-*` 要用先在 plugin 加。
- **自訂 class**（`pb-actions`、`icon-body`、`kgi-grid`、`max-w-form`…）在 `app/assets/css/app-theme.css` 的 `@layer utilities`，只有 template 用到才會產出。
- 3.4 沒有 `@theme` / `@utility` / `@import "tailwindcss"` / `@tailwindcss/vite`；不要再寫這些。

## 字體載入

- 字體在 `app/assets/css/base.css` 設一次（`npm run check:tokens` 會擋元件裡的 `font-family`）；WebView 原生字型由 `guideline/Typography/kgi-font-family.css` 切換。
- Google Fonts 載入 Montserrat 300 / 400 / 500 / 600、Noto Sans TC 300 / 400 / 500（以 Figma Typography 為準）。Guideline 字級 token 新增字重時，`check:tokens` 會提醒補載入。

## 元件規則

- 命名：檔名與元件名都是 `Kgi` 前綴（`KgiButton.vue` → `<KgiButton>`），Nuxt 註冊時不加資料夾前綴。不要建立沒有前綴的元件（會與原生 `<button>` / `<dialog>`、`@nuxt/icon` 的 `<Icon>`、其他 UI 庫撞名）。
- 元件內一律**相對路徑明確 import**（`../icon/KgiIcon.vue`、`../../lib/kit`），不依賴 Nuxt auto-import、`~` alias、`useNuxtApp`，這樣 Storybook 與非 Nuxt 環境也能用。Nuxt 專屬的東西只放 `app/plugins/`、`app/pages/`。
- 互動元件用 Reka UI：Dialog / Sheet → `DialogRoot`、Checkbox → `CheckboxRoot`、RadioGroup → `RadioGroupRoot`、Tabs → `TabsRoot`、Accordion、Collapsible、Toast。不要自己寫 `<Teleport>`、`role="dialog"`、焦點鎖定。Reka 的狀態用 Tailwind 的 `data-open:`、`data-checked:`、`data-disabled:`（`tailwind.config.ts` 的 `data` 設定）。
- Dialog 一定要有 `DialogTitle`（沒有標題時包 `VisuallyHidden`），沒有說明文字時 `DialogContent` 加 `aria-describedby=""`，否則 Reka 會在 console 警告。
- SSR：setup 裡不可碰 `window` / `document`（放 `onMounted`）；模組層級狀態（例如 Toast）只能在瀏覽器事件中修改；日期一律用 `lib/format.ts`（固定台北時區，避免 hydration mismatch）。
- 表單元件用 `defineModel`（`v-model`）；「綁了事件才顯示」的行為用 `hasListener('onXxx')`。
- 元件資料夾依 Figma / Storybook 分類：`app/components/<分類 kebab-case>/`（例如 Components/Toast & Snackbar → `toast-snackbar/`、Patterns/Page Layout → `page-layout/`）。放錯資料夾 `npm run components` 會報錯。
- 新元件要：加到 `app/kgi.ts`、補 story（`component` / `subcomponents` 決定它在元件清單的分類）、跑 `npm run components`、`npm run check:tokens` 與 `npm run typecheck`。
- 元件開頭的 `//` 註解會變成元件清單的說明（AI 生成頁面時讀），寫清楚用途與重點用法。改了 props 後跑 `npm run components`；`npm run theme:check` 會檢查清單是否最新。
- Icon 圖檔在 `public/kgi/icons/`。

## 生成頁面

用 ui kit 生成或修改頁面時，使用 generate-ui skill（從組織 plugin 庫安裝；原始檔在 `plugins/kgi-ui-kit/skills/generate-ui/`，改完要重新發佈才會生效）：先檢查描述是否完整，缺必填項目就**一次追問完**再生成；選填用預設值，做完列出假設。描述範本、元件對照在同一個資料夾（`page-spec.md`、`components.md`）。

## 從 Figma 補充 kit

從 Figma 補充或更新 Foundation、元件時，使用 sync-figma skill（同一個 kgi-ui-kit plugin；原始檔在 `plugins/kgi-ui-kit/skills/sync-figma/`）：差異逐項回報、由使用者決定，`guideline/` 只有使用者說要改時才改。

## 元件清單與 props

看 Storybook（`npm run storybook`）的 Docs 頁，props 型別以各 `.vue` 的 `defineProps` 為準；AI 用的清單是自動產生的 `components-api.md`。與 vue-tailwind-pilot 的差異見 `CONFLICTS.md`。工作流與自動化見 `docs/WORKFLOW.md`。

## Token 流程（只有一個來源）

```
guideline/*.css ──(直接 @import)──────────────────────────► CSS 變數 --color-* / --spacing-* / --radius-* / --shadow-* / --font-*
      │
      └─ npm run theme ─► tailwind.guideline.preset.ts   class 對照（值都是 var(--…)，不複製數值）
                       ├► app/assets/css/guideline-hover.css  hover 色（HSB 運算，Guideline 沒有色票）
                       └► app/assets/css/typography.css       --font-{level}-{tc|en}-*（拿掉平台段）+ .t-* / .n-*
```

- 數值只存在 `guideline/`。產生檔不要手改，Guideline 更新後跑 `npm run theme`，CI 跑 `npm run theme:check`。
- 字級 token 名稱與 Guideline 一致，只拿掉平台段：`--font-body-r-web-en-weight` → `--font-body-r-en-weight`。
- 文字 class 沿用設計規範名稱：`subtitle-b` → `.t-subtitle-bold`、`body-r` → `.t-body-regular`（只在 `scripts/build-typography.mjs` 的 `CLASS()` 轉換）。
