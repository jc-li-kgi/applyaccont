---
name: generate-ui
description: 用 KGI ui kit（@kgi/ui-kit：Nuxt 4.5 + Vue 3.5 + Reka UI + Tailwind 3.4）與 One KGI Guideline 生成或修改介面、畫面、頁面、流程頁、表單頁。使用者說「用 ui kit 生成介面」「生成畫面」「做一頁」「做 UI」「切版」「用 kgi 元件做…」「照 guideline 做…」、貼上頁面描述（頁面：…／類型：…／區塊：…）、或給 Figma 設計稿 / frame 要做成頁面時使用。先檢查描述是否完整，缺必要資訊時一次追問完再生成，避免做錯重工。
---

# generate-ui：用 ui kit 生成介面

目標：**一次做對、少問**。能推斷就推斷、能用預設就用預設；只有會讓版型或元件做錯的事才問，而且一輪問完。

這個 skill 資料夾裡的檔案：`rules.md`（**唯一一份使用規範**：class 寫法、禁止、顏色與交易狀態、字級、間距表、Grid、Figma 讀稿）、`components.md`（叫法 → 元件對照、選用規則、kit 還沒有的元件）、`components-api.md`（**自動產生**：每個元件的 props、v-model、事件、slot、說明）、`page-spec.md`（頁面描述範本）。

## 前置：確認專案有 ui kit

- **kit repo 本身**（根目錄有 `nuxt.config.ts` 且 `package.json` 名稱是 `@kgi/ui-kit`）：元件在 `app/components/`，開發規範在 `CLAUDE.md`（使用規範一樣是這裡的 `rules.md`）。
- **產品專案**：`nuxt.config.ts` 的 `extends` 有 `@kgi/ui-kit`（或指向 kit 的路徑）。元件原始碼在 `node_modules/@kgi/ui-kit/app/components/`（或 extends 指向的路徑）。
- **兩者都不是** → 停止，告訴使用者：這個專案還沒引用 ui kit，請先在 `nuxt.config.ts` 加 `extends: ['@kgi/ui-kit']`。不要用其他元件庫代替。

## 流程

1. **讀描述**。可能照 `page-spec.md` 填，也可能只有一句話。
2. **有 Figma frame 連結就先讀稿**，能從稿裡得到的資訊就不問。讀稿原則照 `rules.md` 的「Figma 讀稿」。
3. **只有頁面名稱、沒有任何內容線索**（例如「做一個首頁」）→ 不用 `AskUserQuestion`。回覆範本的 ★ 部分，**先帶入已推斷的值**（例如類型：資訊瀏覽、主頁），請使用者補區塊內容，然後停止。描述裡有任何內容詞（列表、紀錄、表單欄位、卡片…）就算有區塊，繼續往下。
4. **依序判斷每個項目**：① 推斷（見「推斷規則」）→ ② 推斷不出且屬於「必問」→ 列入追問 → ③ 其餘用「預設值」。
5. **對元件**：用 `components.md` 把每個區塊對到 kit 元件。一對多時照 `components.md` 的「選用規則」選，**不問**；對不到（kit 沒有）才列入追問。
6. **追問**（有需要才做）：一輪 `AskUserQuestion`，規則見「追問規則」。
7. **生成**（見「生成規則」）。
8. **驗證**：`package.json` 有 `check:tokens` 就跑（kit repo 有，產品專案不一定有）；跑 `npm run typecheck`（或 `npx nuxt typecheck`）；開 dev server 用手機寬度（375）看畫面。沒辦法跑的步驟在回報裡寫明。
9. **回報**（見「回報格式」）：推斷、預設、沒做的分開列。

## 推斷規則（推得出就不問，列入「推斷」）

| 項目 | 推斷依據 | 推不出時 |
|---|---|---|
| 頁面類型 | 「申請、開戶、借款、申購、第 N 步、確認送出、下一步」→ 流程申請；「帳務、總覽、首頁、紀錄、明細、列表、我的」→ 資訊瀏覽 | 必問 |
| 平台 | 有寫 Web / 桌機 → Web；沒提 → App / mWeb | 不問，用 App / mWeb |
| 內容類型（平台含 Web 時才需要） | 表單、申請、輸入、確認頁 → 填寫型 `form`；文章、說明、介紹、教學 → 閱讀型 `read`（有「目錄」才加 `toc`）；紀錄、列表、清單、商品列表 → 列表型 `list` | 不問，用填寫型 |
| 底部按鈕形式 | 有「固定、置底、總計」→ 固定在底部（+ 總計列）；其餘 →「不固定（內容下方）」；資訊瀏覽、列表頁沒提按鈕 → 沒有按鈕 | 不問，照左欄 |
| 主頁 / 子頁（只有資訊瀏覽要判斷） | 頁面就是底部導覽項目本身（只說「帳務頁」「首頁」「我的」）且沒提返回 → 主頁（`KgiBottomNav`、無返回鍵）；「○○紀錄、○○明細、○○列表」→ 子頁 | 必問 |
| 範本某一行還留著多個選項（「A／B」「A（或：B）」） | 視為未填；**這一行的文字不拿來比對關鍵字**（避免殘留的「Web」「固定」被誤判），改用其他內容推斷，並在「推斷」寫明「範本未選，依 ○○ 推斷為 A」 | 依該項目規則 |

**關鍵字衝突時**：以**頁面本身是什麼**為準，看頁面名稱的最後一個詞。「借款紀錄」「申購明細」是紀錄 → 資訊瀏覽、子頁；「借款申請」「確認申購」是動作 → 流程申請。仍判斷不了才問。

## 必問（推不出才問）

- 頁面類型
- 資訊瀏覽頁是主頁還是子頁
- 對不到 kit 元件的區塊（見 `components.md`「kit 還沒有」）：怎麼做
- 使用者**明確指定**的元件 kit 沒有（例如說了「開關」）：不可自己換成別的元件，要問
- 步驟條有「第 N 步」但沒有總步數 → 問總共幾步（題目放不下時用預設 3 並標 TODO）

## 預設值（不問，列入「預設」）

| 項目 | 預設 |
|---|---|
| 頁首 | 子頁：返回鍵（`@back`）、無分享（`:show-share="false"`）；主頁：無返回鍵 |
| 頁首標題 | 用功能名稱（「股票借貸 › 確認申請」→「申請借款」；「開戶第 1 步」→「線上開戶」） |
| 區塊歸屬 | **照使用者的分組**：使用者把利率、手續費寫在詳情卡裡，就放在 `KgiDetailCard`，不因「選用規則」搬到 `KgiFeeCard` |
| 列表欄位 / 篩選 | 描述有寫就照寫；沒寫用 3 欄（名稱、日期、金額）假資料；描述沒提篩選就不放 |
| 文案、數值、說明文字（描述寫「…」的地方） | 合理的假資料，程式裡註解 `// TODO: 待替換文案` |
| 互動目標頁 | 描述有提到才做；沒提到按鈕先接 `useToast().show('…')` |
| 條款勾選 | 按鈕在未勾選時停用；條款名稱用 `KgiButton variant="text"`，點擊先接 Toast |
| 固定總計列的數值 | 從區塊裡的金額推（例如借款金額）；推不出用假資料並標 TODO |
| 表單 | 不做驗證與錯誤訊息；按鈕不停用（條款除外） |
| 狀態 | 只做正常狀態；**列表一律加空狀態**（`KgiListTable` 的 `empty` + `:has-rows`） |
| 檔案位置 | 在 kit repo 裡：`app/pages/demo/<英文-slug>.vue`；在產品專案：`app/pages/<slug>.vue` |
| 間距、顏色、字級、圓角、陰影 | **永遠不問**，照 `rules.md` |

## 追問規則

- 一輪 `AskUserQuestion`，**最多 4 題**，每題 2–4 個選項，推薦選項放第一個並在 label 結尾加「（推薦）」。
- `header` 用 2–6 個字的項目名稱：頁面類型、主頁子頁、姓名欄位、總步數…
- 推薦選項依情境決定：kit 沒有的元件，常用的欄位類型（文字輸入、日期）推薦「新增元件」，少用的推薦「用現有元件組合」。
- **超過 4 題**：照影響大小排序（頁面類型 > 主頁 / 子頁 > 缺元件 > 其他），只問前 4 題；其餘用預設值並在回報的「預設」裡註明「未確認」。同一類的缺元件可以合併成一題（例如「姓名、身分證字號沒有文字輸入框」）。
- 每題的問題要能單獨看懂（使用者可能只看到對話框）。
- 不要問：間距、顏色、字級、圓角、返回鍵、文案細節、平台（除非描述互相矛盾）。

## 生成規則

- 先讀 `rules.md`（規範）與 `components.md`（元件對照），**不要逐一讀元件原始碼**；props、事件、slot 查 `components-api.md`（只讀用到的元件那幾段）；它沒寫清楚時才讀那一個 `.vue`（位置見「前置」）。
- 只用 `Kgi*` 元件與 Guideline token class；class 寫法、禁止事項、顏色（含交易狀態）、字級、間距全部照 `rules.md`。間距依頁面類型與平台查 `rules.md` 的間距表（平台含 Web 時看 Web 欄）。
- **平台含 Web（Web 或兩者）→ 用 `<KgiPage>`**（RWD，依 Grid System 自動變化）：`layout` 依內容類型（填寫 `form`／閱讀 `read`／列表 `list`，見推斷規則），`type` 依頁面類型（流程 `flow`／瀏覽 `browse`）。props：`title`、`step`、`toc`（閱讀型目錄 `[{ id, label }]`）、`@back`；slot：預設、`#actions`（內容下方按鈕）、`#head`、`#foot`。放進去的元件用 `flush`（`KgiStepBar`、`KgiListTable`、`KgiTextTabs`）。卡片組外層不用再加 `px-16`。
- **只有 App / mWeb**：
  - 流程申請用 `<KgiFlowPage>`（內建頁首、步驟條、區塊間距 24、`#actions` 不固定按鈕、`#sticky` 固定底部）。`step` 的 `index` 從 0 起算（第 3 步 = 2）。
  - 資訊瀏覽：外層照 `KgiFlowPage` 的寫法改成 `flex flex-col gap-32`；子頁頁首用 `<KgiPageHeader>`；主頁加 `<KgiBottomNav>`；底部按鈕用 `<KgiBottomActions>`。
  - 卡片組外層：`<div class="flex flex-col gap-12 px-16">`。
- 固定在底部的按鈕、總計列（`#sticky`、`KgiStickyFooter`、`KgiTotalBar`）目前只有手機寬，`KgiPage` 不支援；平台含 Web 又需要固定底部時，在回報裡註明「固定底部尚未 RWD」。
- 對話框、Action Sheet 用 `KgiDialog`、`KgiSheet`；頁面要有一個 `<KgiToast />`（`app.vue` 已有就不用）。
- 有 `v-model` 的元件一律綁 `ref`。

## 回報格式

```
已生成：app/pages/demo/stock-loan-confirm.vue（手機寬度 375 已檢查）
元件：KgiFlowPage、KgiDetailCard、KgiAmountHero、KgiDetailRow、KgiFeeCard、KgiCheckbox、KgiButton、KgiDialog
推斷：流程申請（有「第 3 步」「申請」）、App / mWeb（未提 Web）、按鈕不固定
預設：文案為假資料（已標 TODO）、未勾條款時按鈕停用、契約連結先接 Toast
沒做：錯誤狀態、載入中、完成頁
```

## 追問範例

描述：「做一個開戶第 1 步填寫基本資料的頁面，要有姓名、生日、職業下拉、是否為美國公民的開關，最下面下一步」

- 推斷：流程申請（開戶、第 1 步）、App / mWeb、按鈕不固定（「最下面」沒說固定）、標題「線上開戶」
- 元件：職業 → `KgiPickerField`；姓名、生日、開關 → kit 沒有
- 追問（4 題）：
  1. header「總步數」：開戶流程總共幾步？ 3 步（推薦）／4 步／5 步
  2. header「文字欄位」：姓名需要文字輸入框，kit 還沒有，怎麼做？ 新增 KgiTextField（推薦）／先放佔位區塊並標 TODO
  3. header「生日欄位」：生日需要日期選擇，kit 還沒有，怎麼做？ 新增日期選擇元件（推薦）／用 KgiPickerField + 自訂 Sheet
  4. header「美國公民」：你指定了開關，kit 還沒有 Toggle，怎麼做？ 新增 Toggle 元件（推薦）／改用是 / 否單選（KgiRadioGroup）
- 使用者沒指定元件時（例如只說「是否為美國公民」），二選一直接用 `KgiRadioGroup`，不問。
