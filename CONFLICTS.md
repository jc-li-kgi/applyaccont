# class / 命名衝突報告

建立 `@kgi/ui-kit` 時發現的衝突。標 **待決定** 的項目目前先照「建議做法」實作，可以改。

## A. 會影響產品專案的衝突（待決定）

### A1. Tailwind 預設值被 Guideline 取代 — **待決定**

`tailwind.guideline.preset.ts` 是**取代**（不是 extend）Tailwind 的 colors、spacing、borderRadius、boxShadow、fontSize、fontFamily、lineHeight、letterSpacing。產品專案 `extends` 這個 layer 後，整個專案都吃這套設定：

| 寫法 | Tailwind 原本 | 這個 kit |
|---|---|---|
| `p-4` / `gap-4` / `mt-4` | 16px（1rem） | **4px** |
| `p-16` | 64px | **16px** |
| `p-3`、`p-13`、`p-5` | 12px、—、20px | **沒有效果**（Guideline 沒有這個值） |
| `rounded-full` | 9999px | **100px**（Guideline `--radius-full`；超過 200px 的圓形會失真） |
| `rounded-md` / `rounded-lg` | 6px / 8px | **沒有效果**（改用 `rounded-medium` 等） |
| `text-sm` / `font-bold` / `leading-6` | 有 | **沒有效果**（改用 `.t-*` / `.n-*`） |
| `text-white` / `bg-gray-100` / `shadow-md` | 有 | **沒有效果** |

影響：產品專案既有的 Tailwind class、從 shadcn-vue / Reka UI 官方範例複製的 class 都會失效或尺寸改變。
建議：維持取代（Guideline 為唯一來源，pilot 也是這樣驗證的），並請產品專案確認沒有既有 Tailwind 頁面。
替代方案：改成 `extend` 並保留 Tailwind 預設值，但 `p-4`、`p-16` 這些數字 class 會同時存在兩種意義，無法並存，所以只能二選一。

### A2. Guideline 的 CSS 變數名稱與 Tailwind 4 撞名 — 升級時注意

`--color-*`、`--spacing-*`、`--radius-*`、`--shadow-*`、`--font-sans` 全部是 Tailwind 4 `@theme` 保留的命名空間（例如 Tailwind 4 也定義 `--radius-xs`、`--font-sans`）。Tailwind 3.4 不會衝突；之後升 Tailwind 4 時要用 `@theme static` + `initial` 清空（pilot 的 `build-theme.mjs --tailwind 4` 已有這個模式）。

### A3. 全域 class 沒有命名空間 — **待決定**

| class | 風險 |
|---|---|
| `.t-*`、`.n-*`（字級） | `n-` 是 Naive UI 的 class 前綴；與其他 UI 庫並用時可能撞名 |
| `app-theme.css` 的 utility：`.icon-body`、`.pb-actions`、`.carousel-item`、`.checkbox-box`、`.radio-dot`、`.search-handle`、`.nav-fund`… | 名稱很一般，產品專案若有同名 class 會互相覆蓋 |

建議：先維持現名（Figma / 設計規範都用 `.t-*` / `.n-*`，改名成本高）；若產品專案會並用其他 UI 庫，再把 app-theme 的 utility 加上 `kgi-` 前綴。

## B. 這次已處理的衝突

| # | 衝突 | 處理 |
|---|---|---|
| B1 | 元件名與原生標籤 / 其他套件撞名：`Button`（`<button>`）、`Dialog`（`<dialog>`）、`Icon`（`@nuxt/icon` 的 `<Icon>`）、`Tag`、`Toast`、`Checkbox`、`Accordion`；也違反 Vue 的 multi-word 元件命名規則 | 全部加 `Kgi` 前綴（`KgiButton`…），Nuxt 註冊時關掉資料夾前綴 |
| B2 | ui-kit 舊的 `.text-wrap`（`white-space: normal; overflow-wrap: anywhere`）與 Tailwind 3.4 內建的 `text-wrap`（`text-wrap: wrap`）同名、意義不同 | 不移植；改用 Tailwind 的 `whitespace-normal break-words` |
| B3 | ui-kit 的 `.c-content-general-primary` 等文字色 class 與 Tailwind `text-content-general-primary` 重複 | 不移植，只用 Tailwind 版 |
| B4 | ui-kit 的 `.page` 是很常見的 class 名 | 不移植，由 `KgiFlowPage` / `KgiResultPage` 處理版面 |
| B5 | `variant="warning"`（Tag）、`tone="warning"`（DetailRow、SummaryCard 第 3 欄）對應的 `tag-warning` / `semantic-warning` 已在 Guideline 2026-10 移除，實際用的是 `tag-caution`（2026-11 由 `tag-error` 改名，與 Figma 一致）/ `semantic-caution` | 改名為 `variant="caution"`、`tone="caution"`，與 token 名稱一致；Button 的 `tone="negative"` 也改成 `tone="caution"`。**與 pilot / ui-kit 不相容**，舊頁面搬過來要改 |
| B6 | provide/inject key 太一般：`selectableDisabled`、`listCols` | 改為 `kgiSelectableDisabled`、`kgiListCols` |
| B7 | icon 放在 `public/assets/icons/`，與產品專案的 `public/assets/` 可能撞路徑 | 改到 `public/kgi/icons/`（網址 `/kgi/icons/`） |
| B8 | Nuxt 根節點是 `#__nuxt`，pilot 的 base.css 寫 `#app` | base.css 改成 `#__nuxt, #storybook-root` |
| B9 | `components/layout/nav-items.ts` 會被 Nuxt 當成元件 `<NavItems>` 註冊 | components 設定只掃 `.vue` |
| B10 | `vue-router`：Nuxt 4.5 內建 v5，另裝 v4 會讓 `nuxt typecheck` 找不到 Volar 外掛 | devDependencies 改成 `vue-router ~5.5.1`（與 Nuxt 相同） |

## C. Guideline 本身的命名不一致（回報給設計）

| # | 狀況 | 目前做法 |
|---|---|---|
| C1 | 字級 token 用縮寫 `subtitle-b`、`body-b`、`caption-r`（`--font-subtitle-b-web-tc-size`），class 用全名 `t-subtitle-bold`、`t-body-regular` | 維持；對照在 `typography.css` 註解 |
| C2 | Tag 的 `info`（淺藍外框）、Carousel 指示點底色在 Guideline 沒有語意 token | 暫用原始色票 `sky-blue-300 / 500`、`blue-100`，以 `lint-allow` 標註 |
| C3 | Guideline 沒有 border-width、opacity、icon 尺寸、控制項尺寸的 token | 勾選框 1.5px、國旗外框 0.4px、Checkbox 18px、Radio 20px、BottomNav 未選取 `opacity-40` 等沿用 ui-kit 數值，集中在 `app-theme.css` |
| C4 | `--color-grey-0` 與 `--color-grey-0-30`、`--color-sky-blue-0` 與 `--color-sky-blue-0-75`：透明度版本用數字後綴，容易與色階數字混淆（`sky-blue-0-75` 不是 0～75 的色階） | 維持 Guideline 原名 |

## D. 版本 / 來源不同步

| # | 狀況 | 處理 |
|---|---|---|
| D1 | vue-tailwind-pilot 的 `typography-auto.css` 比 ui-kit 舊，少了 WebView `data-platform="ios｜android"` 的字重 / 行高（Guideline 本身是完整的） | 改由 `scripts/build-typography.mjs` 直接從 Guideline 產生 `typography.css`，四種情境（Web / mWeb / iOS / Android）都有 |
| D2 | 三個專案的元件名稱不同：ui-kit（Preact）`TopNavigation`、`ProgressBar`、`BottomNavigation`、`ActionSheet`、`TextPicker`、`AmountInput`、`RadioButton`、`List`、`Filter` ↔ pilot / 本 kit `PageHeader`、`StepBar`、`BottomNav`、`Sheet`、`PickerField`、`AmountField`、`RadioGroup`、`ListTable`、`FilterPill` | 沿用 pilot 的名稱（加 `Kgi` 前綴）。ui-kit 文件頁的 Vue 範例（`docs/vue-snippets.js`）需要另外更新 |
| D3 | 本機 Node 是 26，專案規格是 22 | `package.json` `engines` 與 `.nvmrc` 設為 22（`^22.19.0`，Nuxt 4.5 最低需求）；這次的 build / typecheck 是在 Node 26 跑的，建議 CI 用 Node 22 再驗一次 |

## E. 與 vue-tailwind-pilot 的行為差異

| 元件 | 差異 |
|---|---|
| `KgiBottomNav` | 不再 import `vue-router`：綁 `@navigate` 自己換頁；沒綁就用 app 的 `$router.push(item.to)` |
| `KgiDialog` / `KgiSheet` | Reka Dialog：多了 Esc 關閉、焦點鎖定、關閉後焦點回到觸發按鈕；`KgiSheet` 新增 `description` prop |
| `KgiToast` | Reka Toast：螢幕閱讀器會朗讀、可向下滑掉；呼叫方式不變（`useToast().show()`） |
| `KgiTextTabs` / `KgiSegmentedTabs` | Reka Tabs：方向鍵切換焦點、Enter / Space 選取 |
| `KgiCollapsibleCard` | 新增 `v-model:open`（受控） |
| `KgiTag` | 新增 `variant="success"`（Content/Tag/Success） |
| `KgiButton` | 新增 `type` prop（`submit` 等） |
| `KgiDateTimeLines` / `format.dateTime` | 固定台北時區（原本跟著執行環境時區，SSR 會 hydration mismatch） |

## F. 已移除的多餘轉換（重整）

| 原本 | 現在 |
|---|---|
| `guideline.tokens.css` 把 Guideline 的 200 個色票 + 間距 / 圓角 / 陰影 + Dark 再複製一份 | 刪除；`kgi.css` 直接 `@import` Guideline 原檔，只產生 Guideline 沒有的 hover 色（`guideline-hover.css`） |
| 字級三層命名：`--font-body-r-web-en-weight` → `--kgi-font-auto-body-regular-en-weight` → `.n-body-regular`（另有 `-size-rem` 後綴） | 兩層：`--font-body-r-web-en-weight` → `--font-body-r-en-weight`（只拿掉平台段）→ `.n-body-regular` |
| `typography.css` 手寫，Guideline 新增層級要記得補 class | 與 token 一起由 `build-typography.mjs` 產生 |
| `build-theme.mjs` 保留 Tailwind 4 分支與 `--tailwind` 參數 | 刪除（只支援 3.4） |
| 自訂 `state-open:` / `state-checked:` variant | 改用 Tailwind 內建 `data` 設定：`data-open:` / `data-checked:` / `data-disabled:` |
| 未使用：`animate-none`、`slide-down`、`w-app`、`min-w-app` | 刪除 |
| `ALIGN` 對照表兩份、選項正規化兩份、`{ title; body }` 型別三處、PageHeader 自己判斷 `onBack` | 合併到 `lib/list.ts`、`toOptions()`、`InfoContent`、`hasListener()` |

驗證：重整前後 20 個文字 class × 3 個屬性 × 4 種情境（Web / mWeb / iOS / Android）全部對到相同的 Guideline token；preset 與 hover 色和重整前完全相同。

仍保留的一個轉換（待決定）：文字 class 用 `.t-subtitle-bold` / `.t-body-regular`，Guideline token 用 `subtitle-b` / `body-r`。改成 `.t-subtitle-b` 就完全一致，但設計規範、Figma build rules、舊頁面都要跟著改。

## G. 依 Figma 修正 Guideline（2026-11-19）

Figma MDS_Foundation 與 `guideline/` 比對後，經逐項確認修正的 Guideline 數值**只記在 `CHANGELOG.md` 2026-11-19 的「規範」**（差異一律先回報、由設計決定採用哪一方）。這裡不再重複列出。

注意：這是直接改 `guideline/` 的 Guideline 原檔。Guideline 下次整包更新時，請確認新版已包含這些修正，否則會被覆蓋回去。`ui-kit/`（Preact 版）的同一個檔案沒有改。
