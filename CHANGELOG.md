# Changelog

@kgi/ui-kit 的變更紀錄，新的在最上面。標 ⚠️ 的是**不相容變更**：舊頁面搬過來要跟著改。
Guideline 數值的修改另外記在「規範」，每一項都是逐項確認後才改的。

## 2026-11-20

### 新增
- **Grid System（RWD）**：依 Figma「Grid System/App & Web RWD」與 GridSystem 樣式模擬。變化方式照樣式模擬，數值用 Guideline token。
  - 小版 < 768：4 欄、欄間距 16、左右 16；中版 768–1023：6 欄、欄間距 16、容器 92%；大版 ≥ 1024：12 欄、欄間距 28、容器 86%，最寬 1175。
  - `KgiGrid`：頁面網格容器。
  - `KgiPage`：`layout="form | read | list"`（填寫型桌機最寬 570 置中；閱讀型桌機目錄 3 欄 + 內容 8 欄；列表型撐滿），`type="flow | browse"`（區塊間距 24 / 32，各尺寸相同）。
  - `KgiToc`：文章目錄，手機、平板收合在內容上方，桌機固定在左側並標示目前段落。
- `KgiPageHeader`、`KgiStepBar`、`KgiListTable` 新增 `flush`：放進網格時去掉自己的左右 16。
- Storybook › Foundations › Grid System：5 個範例、網格疊圖、viewport 375 / 768 / 1024 / 1366。
- Storybook 最上方新增 **Changelog** 頁（讀 `CHANGELOG.md`）。
- **元件清單自動產生**（`npm run components`）：從元件原始碼產生 `components.json` 與 kgi-page 用的 `components-api.md`（props、v-model、事件、slot、說明、Figma 分類）。`components.md` 改成只放叫法對照與選用規則，不再手抄 props；`npm run theme:check` 會檢查清單是否最新。

### 變更
- kgi-ui-kit plugin **0.3.0**：新增 **sync-figma** skill（從 Figma 補充 Foundation、元件：差異逐項回報、由使用者決定，只在 kit repo 執行）。`rules.md` 的「Figma 讀稿」只留兩個 skill 共用的讀法，「只有使用者說才改 guideline、記 CHANGELOG」移到 sync-figma。
- kgi-ui-kit plugin **0.2.1**：`rules.md` 的「Figma 讀稿」移除「排除凱銀（KGIB）內容」這條規則。新增 `docs/handbook.html`（工作手冊：第一次安裝、開新專案、每次做畫面、交付、kit 維護與發版）。
- ⚠️ **plugin 改名**：`kgi-page` → **`kgi-ui-kit`**（0.2.0），skill `kgi-page` → **`generate-ui`**（斜線指令 `/kgi-ui-kit:generate-ui`）。資料夾改為 `plugins/kgi-ui-kit/skills/generate-ui/`，`rules.md` 的路徑跟著改（`CLAUDE.md`、腳本、Storybook、`docs/WORKFLOW.md` 已更新）。skill 說明補上「用 ui kit 生成介面」「做 UI」「設計稿」等觸發詞。已裝舊的 `kgi-page` 的人改裝 `kgi-ui-kit`。
- **使用規範只留一份**：`plugins/kgi-page/skills/kgi-page/rules.md`（補上色彩用法、交易狀態、Figma 讀稿）。`CLAUDE.md` 改用 `@` 載入、`SKILL.md` 改成引用，不再各抄一份；Storybook 新增 Foundations › Rules 頁直接顯示它。`npm run theme:check` 新增 `scripts/check-rules.mjs`：擋重抄，並比對間距、圓角、陰影清單與 `guideline/`。工作流盤點見 `docs/WORKFLOW.md`。
- `docs/WORKFLOW.md` 新增 §6–8：用 git 共用 kit（kit repo + 專案畫面 repo）、每個新專案的建置步驟、套件與資安守則。
- `check-tokens.mjs` 可以檢查其他專案：`node node_modules/@kgi/ui-kit/scripts/check-tokens.mjs .`（畫面專案的 `npm run check:tokens`）。
- **元件資料夾改成依 Figma / Storybook 分類**：`app/components/{ui,form,layout,overlay}/` → `app/components/<分類>/`（28 個資料夾，例如 `button/`、`card/`、`picker/`、`page-layout/`）。元件名稱與用法不變；Nuxt 自動註冊、`@kgi/ui-kit/components` 匯入都不受影響。⚠️ 直接 import 元件檔案路徑的程式要改路徑。`npm run components` 會檢查元件是否放在正確的資料夾。
- `KgiSheet`：手機底部抽屜 → 平板置中、寬 92% → 桌機置中、最寬 570。
- `KgiDialog`：平板以上最寬 570（手機維持 382）。
- ⚠️ Tailwind 斷點改為 `tablet:`（768）、`desktop:`（1024），移除 `sm:` `md:` `lg:` `xl:`。
- ⚠️ 字級、icon 尺寸改為 **≥ 768 用 Web**（原本 > 768），與網格同一個斷點。

### 尚未調整
- 底部固定按鈕、總計列、底部導覽（`KgiBottomActions`、`KgiStickyFooter`、`KgiTotalBar`、`KgiBottomNav`）與 `KgiFlowPage`、`KgiResultPage` 仍是手機寬 430，待元件規則。

## 2026-11-19

### 新增
- **@kgi/ui-kit 第一版**：Nuxt 4.5 Layer（Vue 3.5 + Reka UI 2.10 + Tailwind CSS 3.4 + TypeScript 5.8 + Storybook 10，Node 22）。56 個元件，全部 `Kgi` 前綴。
- Dialog、Action Sheet、Toast、Checkbox、RadioGroup、Tabs、Accordion、Collapsible 改用 Reka UI（焦點鎖定、鍵盤操作、ARIA、SSR 安全）。
- Storybook 依 Figma 元件庫分類：Foundations（Color、Typography、Icon、Illustration、Grid System、Spacing / Radius / Shadow）、Components（33 類，8 類尚未實作）、Patterns。
- Color、Typography 說明頁：依 Figma MDS_Foundation 整理，數值直接讀 `guideline/`。
- **kgi-page**（生成頁面的 skill）：先檢查頁面描述，缺資訊一次追問完再生成。已發佈到組織的 plugin 庫（0.1.0）。

### 變更
- ⚠️ `KgiTag` 的 `variant="warning"` → `variant="caution"`；`KgiDetailRow`、`KgiSummaryCard` 的 `tone="warning"` → `tone="caution"`；`KgiButton` 的 `tone="negative"` → `tone="caution"`。
- ⚠️ 元件名稱全部加 `Kgi` 前綴（`Button` → `KgiButton`）。
- Token 流程簡化：直接載入 Guideline 原檔，只產生 hover 色與字級 class；字級變數改為 Guideline 名稱去掉平台段（`--font-body-r-en-weight`）。
- Google Fonts：Noto Sans TC 只載入 300–500（中文最粗用到 500）。

### 規範（Guideline 數值，逐項確認後修改）
- `--color-container-semantic-buy-in-expenditure`（Light）：red-400 `#DD4F2C` → **red-600 `#B01700`**（依 Figma）。
- `--color-chart-red-4th`：red-400（與 3rd 重複）→ **red-300 `#E57C5C`**。
- ⚠️ `--color-content-tag-error` 改名 **`--color-content-tag-caution`**（依 Figma 名稱）；`KgiTag` 的 `variant="error"` 一併改為 `variant="caution"`。
- Caption-R：Mobile web / iOS / Android **14 → 13**，加大字級 17 → 16（依 Figma Typography Scale；Android 與 iOS 相同）。
- 頁尾與內容間距（資訊瀏覽、App & mWeb）：**40 → 48px**（依 Figma Spacing）。
