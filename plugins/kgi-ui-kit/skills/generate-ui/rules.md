# 使用規範（唯一一份）

**規則只寫在這裡。** 其他地方都是引用這份，不另外抄：
- kit repo 的 `CLAUDE.md` 用 `@plugins/kgi-ui-kit/skills/generate-ui/rules.md` 載入（在 kit 裡開發、做 Figma 同步時讀到的就是這份）。
- generate-ui skill 生成頁面時讀這份（跟 skill 一起發佈，產品專案沒有 kit 原始碼也能用）；sync-figma skill 補 kit 時也照這份。
- Storybook › Foundations › Rules 直接顯示這份。

數值來源是 One KGI Design Guideline（`guideline/`）與 Figma MDS_Foundation。這份只寫「怎麼用」；數值有出入時以 `guideline/` 為準，並回報給設計決定。`npm run theme:check` 會比對下方的間距、圓角、陰影清單與 `guideline/` 是否一致。

## class 寫法

Guideline 的 token 名稱 = Tailwind class 名稱。Tailwind 預設的色票、間距、圓角、陰影、字級**已被取代**。

| 類型 | 寫法 | 例 |
|---|---|---|
| 文字顏色 | `text-content-*` | `text-content-general-primary`、`-secondary`、`-tertiary`、`-active`、`text-content-semantic-caution` |
| 底色 / 邊框 | `bg-` / `border-` + `container-*` 或 `surface-*` | `bg-container-card-white`、`bg-surface-blue`、`border-container-general-divider` |
| hover | Guideline 沒有色票，由 HSB 規則產生 | `hover:bg-container-general-active-primary-hover` |
| 間距 | 數字就是 px | `p-16`、`px-16`、`gap-24`、`mt-32`、`size-24`（**`p-16` = 16px，不是 Tailwind 預設的 64px**） |
| 圓角 | `rounded-*` | 見下方「圓角」 |
| 陰影 | `shadow-*` | 見下方「陰影」 |
| 字級 | `t-*`（中文、中英混排）、`n-*`（純數字、英文） | 見下方「字級」 |

**只有這些間距值**：0 / 2 / 4 / 8 / 12 / 16 / 20 / 24 / 28 / 32 / 40 / 48 / 60 / 80。

## 禁止

- 任意值與寫死數值：`p-[13px]`、`text-[#fff]`、`style="margin: 8px"`、色碼、px。Guideline 沒有的值找最接近的 token，並告知使用者，不要自創。
- `text-sm`、`font-bold`、`leading-*`、`font-family`、`font-sans`（字型只在根層設定一次）。
- 原始色票（`red-500`、`navy-600d`）與 `text-container-*`；例外要以 `data-lint-allow="原因"` 標註。
- 顏色透明度修飾（`bg-x/50`）：色票是 `var(--…)`，算不出透明度；半透明色是獨立 token（例如 `surface-blue-75`）。
- `dark:` 前綴（深色模式由 `<html data-theme="dark">` 自動切換）。
- 拼接 class 名稱（`` `icon-${level}` ``）：Tailwind 掃不到，要寫成完整字串的對照表。
- `sm:` `md:` `lg:` `xl:` 斷點；用 JS 判斷寬度（SSR 會閃）。

## 顏色

- 文字用 `content-*`，元件容器與邊框用 `container-*`，頁面底色用 `surface-*`。
- **對比度**：文字與背景符合 WCAG 2.0 AA，文字 < 19px 至少 4.5:1、≥ 19px 至少 3:1；元件容器與背景至少 3:1。
- **比例**：約 70% 背景、30% 元素；以白與淺藍為基調，藍色做強調，綠、橘只用於插圖與圖表。
- **停用**：容器 `container-general-disabled`、文字 `content-general-disabled`，不做 hover。

### 交易狀態顏色

先看畫面 / 元件是否**同時**顯示「交易動作」（買進、賣出、支出、收入）與其他狀態：

| 情境 | 規則 | 例 |
|---|---|---|
| A：有交易動作 | 交易動作優先上色，其他狀態一律降階為中性色（`content-general-primary` / `-secondary`） | 買進 `text-content-semantic-buy-in-expenditure`、賣出 `text-content-semantic-sell-off-income`、委託失敗 → secondary |
| B：沒有交易動作 | 警示（委託失敗、系統異常）用 `content-semantic-caution`，其他狀態（成功、處理中…）用中性色 | 委託失敗 caution、扣款成功 primary、處理中 secondary |

### 狀態色對照

| 狀態 | 文字 | 容器 / 標籤底 |
|---|---|---|
| 成功（申購成功、扣款成功） | `content-semantic-positive` | `container-semantic-positive` |
| 錯誤、警示、特殊提示 | `content-semantic-caution` | `container-semantic-caution`；區塊底色 `container-general-light-active-red` |
| 上漲 / 下跌 | `content-semantic-ascend` / `-descend` | `container-semantic-ascend` / `-descend` |
| 買進、支出 / 賣出、收入 | `content-semantic-buy-in-expenditure` / `-sell-off-income` | `container-semantic-buy-in-expenditure` / `-sell-off-income` |
| 持平、一般說明 | `content-semantic-default` | `container-semantic-default` |

### 常用畫面元素

| 元素 | token |
|---|---|
| 頁面底色 | `surface-blue`（次級背景、網頁 Footer：`surface-grey`；遮罩：`surface-blue-75`） |
| 主標、主要文字 / 次級文字、未選中頁籤 | `content-general-primary` / `content-general-secondary` |
| 卡片 | `container-card-white` |
| 主要按鈕、已選中膠囊頁籤、選中日期 | `container-general-active-primary` |
| 膠囊按鈕底 / 文字 | `container-general-active-secondary` / `content-general-active-button-capsule` |
| 文字頁籤選中（文字與底線） | `content-general-active` |
| 分段切換選中項 | `container-general-light-active` |
| 第三層小按鈕、單一篩選條件選中 | `container-general-light-active-blue` |
| 篩選下拉、膠囊頁籤底 | `container-general-filter-active-blue` |
| 卡片內展開區 | `container-general-option-selected-blue` |
| 分隔線 | `container-general-divider` |
| 類別標籤 | `content-tag-highlight` |

### 圖表

色票依顯示順序成組使用（`chart-<色系>-1st` → `6th` 依序疊加），總覽用 Overview 1st～8th。class：`bg-chart-blue-1st`、`fill-chart-blue-1st`。

## 字級

| class | 用途 |
|---|---|
| `t-display-l / m / s` | 行銷大標；`n-display-s` 用於確認頁大金額 |
| `t-headline` | 頁面主標、結果頁標題 |
| `t-title` / `n-title` | 區塊標題、大數字 |
| `t-subtitle-bold` | 卡片標題、頁首標題、主要按鈕 |
| `t-subtitle-regular` | 清單項目、輸入值 |
| `t-body-bold` | 欄位標題、重點 |
| `t-body-regular` / `n-body-regular` | 內文、標籤、Tab / 金額、日期 |
| `t-caption-regular` | 輔助說明、欄位下方提示 |

- 金額、百分比、日期、帳號用 `n-*`；只要內容是中文就用 `t-*`（中英混排也用 `t-*`）。
- 字級從 768 起用 Web 尺寸，以下用 mWeb 尺寸，class 會自動切換。

## 字體

- 字體只在根層（kit 的 `base.css`）用 `var(--font-sans)` 設一次；元件、頁面不寫 `font-family`、`font-sans`。
- `--font-en` / `--font-tc` 只限確定單一語言的元素，一般情境一律 `--font-sans`。
- WebView：App 在 `<html>` 加 `data-platform="ios" | "android"`，自動切成原生字型與字重；網頁不偵測平台。

## 圓角

**只有**：`rounded-none / xs / small / medium / full`。

- 卡片 `rounded-medium`；膠囊按鈕、Tag `rounded-full`；**滿版卡片**（貼齊畫面左右）`rounded-none`。

## 陰影

**只有**：`shadow-light / basic / popover`。

- 藍底上的卡片 `shadow-basic`；浮層、Dialog、Sheet、Toast `shadow-popover`；未選取 / 停用 `shadow-light`。

## 間距（Spacing Guideline）

依**頁面類型**（資訊瀏覽：帳務、總覽；流程申請：借款、申請）與**平台**選值。

### Level 1 頁面整體佈局

| 位置 | 資訊瀏覽 App&mWeb | 資訊瀏覽 Web | 流程申請 App&mWeb | 流程申請 Web |
|---|---|---|---|---|
| 頁首與整體內容 | 24 | 40 | 24 | 28 |
| 頁尾與整體內容 | 48 | 80 | 48 | 80 |
| 區塊內上下 / 邊界 | 24 / 24 | 28 / 40 | 24 / 24 | 28 / 40 |
| 頁面左右（kit 目前） | 16 | — | 16 | — |

### Level 2 元件間距與群組

| 位置 | 資訊瀏覽 App&mWeb | 資訊瀏覽 Web | 流程申請 App&mWeb | 流程申請 Web |
|---|---|---|---|---|
| 區塊與區塊 | 32 | 48 | 24 | 28 |
| 按鈕與內容（非浮動） | 32 | 40 | 32 | 40 |
| 卡片組 | 12 | 16 | 12 | 16 |
| Checkbox、Radio | 12 | 16 | 12 | 16 |
| 條款 | 12 | 16 | 12 | 16 |
| Tab 與上下元件 | 20 | 24 | 20 | 24 |
| 純資訊（詳情條列） | 20 | 28 | 20 | 28 |
| 操作欄位（輸入框、日期） | 24 | 32 | 24 | 32 |
| 表單區塊與按鈕 | 32 | 40 | 32 | 40 |

### Level 3 元件內部

| 位置 | 資訊瀏覽 App&mWeb | 資訊瀏覽 Web | 流程申請 App&mWeb | 流程申請 Web |
|---|---|---|---|---|
| 卡片內距（產品選單卡） | 16×16 | 20×20 | 16×16 | 24×28 |
| 卡片內距（詳情概覽卡） | 16×16 | 28×40 | 24×24 | 28×40 |
| 標題與內容 | 12 | 16 | 12 | 16 |
| 主標題與副標題 | 8 / 8 | 8 / 12 | 8 / 12 | 8 / 12 |
| 圖示與標題水平間距 | 4 | 8 | 4 | 8 |
| 不同資訊段落 | 24 | 28 | 24 | 28 |
| 欄位標題與輸入框 | 8 | 16 | 8 | 16 |

### kit 目前的實作

- `KgiPage` 的區塊間距**各尺寸相同**（流程 24、瀏覽 32），不跟 Web 欄變大。
- 不固定的底部按鈕：距內容至少 32、不滿一屏時置底、距畫面底部 48、多顆直排間距 16（`KgiFlowPage` 的 `#actions`、`KgiBottomActions` 已內建）。

## 版面（Grid System / RWD）

| | 小版 < 768 | 中版 768–1023（`tablet:`） | 大版 ≥ 1024（`desktop:`） |
|---|---|---|---|
| 欄數 / 欄間距 | 4 / 16 | 6 / 16 | 12 / 28 |
| 容器 | 左右各 16 | 92% | 86%，最寬 1175 |
| 字級、icon | mWeb | Web | Web |

- RWD 頁面用 `<KgiPage layout="form | read | list" type="flow | browse">`：填寫型桌機最寬 570（`max-w-form`）置中；閱讀型桌機有目錄 3 + 8 欄、無目錄 8 欄置中；列表型撐滿。
- 自己排版用 `<KgiGrid>`（class `kgi-grid`）+ `col-span-full`、`desktop:col-start-4 desktop:col-span-8`。放進網格的元件加 `flush`（`KgiPageHeader`、`KgiStepBar`、`KgiListTable`、`KgiTextTabs`）去掉自己的左右 16。
- `KgiSheet`：手機底部抽屜、平板置中 92%、桌機置中 570。`KgiDialog`：手機 382、平板以上 570。
- 所有 RWD 變化用 CSS（`tablet:` / `desktop:`）做。
- 尚未 RWD（待元件規則）：`KgiFlowPage`、`KgiResultPage`、`KgiBottomActions`、`KgiStickyFooter`、`KgiTotalBar`、`KgiBottomNav`，仍是手機寬 430（`max-w-app`）。
- 安全區 utility：`pt-safe`、`pb-actions`、`pb-sticky`、`pb-nav`。

## Icon

`<KgiIcon name="info.svg" level="body" />`：文字旁的 icon 用 `level`（caption 16 / body 16→20 / subtitle 20→24，手機→電腦），不要寫 px；`tint` 讓顏色跟著文字色。圖檔網址 `/kgi/icons/*.svg`。

## Figma 讀稿

generate-ui（生成介面）與 sync-figma（補 kit）共用的讀法：

- 只讀使用者給的連結 section / node，不讀其他頁面或節點；跳過隱藏圖層。
- 數值取**實際套用**的文字樣式與變數（`get_variable_defs`），不看圖層名稱與手打的標註文字；圖層命名問題不回報。
- 表格、元件實例裡的文字 `get_metadata` 讀不到，改用 `get_design_context` 或截圖。
- 稿的數值與 Guideline 不同時不要自己決定：生成介面時用最接近的 token，並在回報列出；要改 kit 時照 sync-figma 逐項回報、由使用者決定。
