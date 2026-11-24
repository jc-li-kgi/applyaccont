# @kgi/ui-kit — One KGI Design Guideline（Nuxt 4.5 Layer）

用 One KGI Design Guideline 的 token 做成的 Vue 元件庫，技術框架對齊前端規格：

| 項目 | 版本 |
|---|---|
| Nuxt | 4.5（SSR） |
| Vue | 3.5 |
| Reka UI | 2.10 |
| Tailwind CSS | 3.4（瀏覽器支援採保守假設） |
| TypeScript | 5.8 |
| Storybook | 10 |
| Node.js | 22（`^22.19.0`，Nuxt 4.5 的最低需求） |

56 個元件（`Kgi` 前綴），來源是 `ui-kit/`（Preact 版）與 `vue-tailwind-pilot/`（Vue 版）。
對話框、底部彈窗、Toast、Checkbox、RadioGroup、Tabs、Accordion、Collapsible 改用 Reka UI 做互動與無障礙（焦點鎖定、Esc 關閉、鍵盤操作、ARIA、SSR 安全的 Portal）。

## 指令

```bash
nvm use            # Node 22
npm install
npm run dev        # 元件總覽（SSR）http://localhost:3000/
npm run storybook  # http://localhost:6006/
npm run build      # 產生主題 → Nuxt build
npm run typecheck  # vue-tsc
npm run check:tokens  # 規範檢查（寫死數值、色碼、Tailwind 預設字級 / 色名、原始色票…），交付前必跑
npm run theme         # Guideline 更新後必跑：重新產生 Tailwind preset、hover 色、字級 class
npm run theme:check   # CI 用：產生檔是否與 guideline/ 同步
```

## 在產品專案使用

多位設計師、多個專案用 git 共用 kit 的完整建置步驟（kit 用 git 網址 + tag 安裝、專案 `CLAUDE.md` 範本、`npm ci`、交付工程師、kit 升級、資安守則）見 [`docs/WORKFLOW.md`](docs/WORKFLOW.md) §6–8。

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: ['@kgi/ui-kit'], // 或相對路徑，例如 '../kgi-ui-kit'
})
```

```vue
<template>
  <KgiFlowPage title="申請借款" :step="{ index: 0, total: 3, label: '試算' }" @back="router.back()">
    <KgiAmountField v-model="amount" label="借款金額" prefix="TWD" :min="10000" :max="600000" :step="1000" />
    <template #actions><KgiButton @click="next">下一步</KgiButton></template>
  </KgiFlowPage>
  <KgiToast />
</template>
```

- 元件自動註冊，不需要 import。`useToast()` 等工具從 `@kgi/ui-kit/components` import。
- 非 Nuxt 環境（Storybook、Vitest）：`import { KgiButton } from '@kgi/ui-kit/components'`。
- Icon 放在 `public/kgi/icons/`，網址 `/kgi/icons/xxx.svg`，部署在子路徑時會跟著 `app.baseURL`。
- 已驗證：另一個 Nuxt 專案 `extends` 這個 layer 後，元件、CSS、icon、以及專案自己寫的 Tailwind class 都正常產出。

## 檔案

| 路徑 | 內容 |
|---|---|
| `guideline/` | One KGI Design Guideline（唯一來源，不要手改；更新時整包替換後跑 `npm run theme`） |
| `app/components/<分類>/Kgi*.vue` | 元件。資料夾 = Storybook / Figma 分類的 kebab-case（`button/`、`card/`、`toast-snackbar/`、`page-layout/`…），`npm run components` 會檢查 |
| `app/kgi.ts` | 元件與工具的總表（明確 import 用） |
| `app/lib/` | `kit.ts`（預設文字 COPY、Toast、金額規則）、`format.ts`（金額 / 日期，台北時區）、`assets.ts`、`listener.ts`、`useLongPress.ts` |
| `app/assets/css/` | `kgi.css`（入口：直接載入 `guideline/` 原檔）、`guideline-hover.css` 與 `typography.css`（`npm run theme` 產生）、`app-theme.css`（Guideline 沒有的 App token 與 utility）、`base.css` |
| `tailwind.guideline.preset.ts` | 產生檔：Guideline token → Tailwind theme（取代預設值） |
| `tailwind.config.ts` | App 補充：動畫、`max-w-app`、`not-first:`、Reka 狀態 variant（`data-open:`、`data-checked:`、`data-disabled:`） |
| `stories/` | Storybook：`foundations/`（顏色、字體、Icon、插畫、Grid、間距）、`components/`（依 Figma 元件庫分類，一類一檔）、`patterns/`（頁面版型） |
| `app/pages/index.vue` | 元件總覽（playground，產品專案 extends 時會被專案自己的 pages 取代） |
| `CLAUDE.md` | kit 開發規範；使用規範從 `rules.md` 載入（貼給 Claude / 新成員） |
| `CONFLICTS.md` | class / 命名衝突報告（待決定事項） |
| `CHANGELOG.md` | 變更紀錄（Storybook 最上方的 Changelog 頁直接讀這個檔） |
| `components.json` | 元件清單（自動產生：`npm run components`）：名稱、Figma 分類、props、v-model、事件、slot、說明。AI 用的 Markdown 版在 `plugins/kgi-ui-kit/skills/generate-ui/components-api.md` |
| `plugins/kgi-ui-kit/` | kgi-ui-kit plugin（兩個 skill：`generate-ui` 生成介面、`sync-figma` 從 Figma 補充 kit）：`generate-ui/SKILL.md` 流程、`rules.md` **唯一一份使用規範**（CLAUDE.md、Storybook › Foundations › Rules 都引用它）、`components.md` 元件對照、`page-spec.md` 頁面描述範本。已發佈到組織的 plugin 庫，使用者（包括在這個 repo 裡）一律從 plugin 庫安裝；改完這裡的檔案要重新發佈 |
