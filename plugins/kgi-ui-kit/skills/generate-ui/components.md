# 元件對照（常用叫法 → kit 元件）

用法：先在這裡把描述裡的叫法對到元件，再到 **`components-api.md`**（自動產生）查那個元件的 props、v-model、事件、slot 與說明。
這份只放 API 文件給不了的東西：叫法對照、選用規則、kit 還沒有的元件。**不要在這裡寫 props**（會過期）。

## 頁面版型

| 常用叫法 | 元件 |
|---|---|
| RWD 頁面（平台含 Web）、網頁版 | `KgiPage` |
| 自己排網格 | `KgiGrid`（子元素 `col-span-full`、`desktop:col-start-4 desktop:col-span-8`…） |
| 文章目錄 | `KgiToc`（`KgiPage` 給 `toc` 會自動放） |
| 流程頁、申請頁、步驟頁（只有 App / mWeb） | `KgiFlowPage` |
| 完成頁、結果頁、成功頁 | `KgiResultPage` |
| 底部按鈕區（不固定） | `KgiBottomActions` |
| 固定底部區 | `KgiStickyFooter` |
| 總計列（固定底部裡） | `KgiTotalBar` |
| 區塊標題 | `KgiSectionHeader` |

## 元件（依 Figma 分類）

| 分類 | 常用叫法 | 元件 |
|---|---|---|
| Top Navigation | 頁首、標題列、返回列 | `KgiPageHeader` |
| Progress Bar | 步驟條、進度條、第 N 步 | `KgiStepBar`（`index` 從 0 起算） |
| Bottom Navigation | 底部導覽、Tab bar | `KgiBottomNav` |
| Button | 按鈕、主要按鈕、下一步、文字按鈕、膠囊按鈕 | `KgiButton` |
| Button | 圓形圖示捷徑 | `KgiIconAction` |
| Card | 詳情卡、確認資料卡、詳情概覽卡 | `KgiDetailCard` |
| Card | 左標題右數值、資料列、明細列 | `KgiDetailRow` |
| Card | 大金額 | `KgiAmountHero` |
| Card | 費用卡 | `KgiFeeCard` |
| Card | 摘要卡、總覽卡（大數字） | `KgiSummaryCard` |
| Card | 對帳單卡、紀錄卡（可展開明細） | `KgiStatementCard` |
| Card | 明細面板（列表展開、卡片內淡藍區） | `KgiDetailPanel` |
| Card | 並排數據 | `KgiStatGroup` |
| Card | 精選標的卡 | `KgiStockPickCard` |
| Card | 服務卡清單 | `KgiServiceCardList` |
| Accordion | 可收合卡片 | `KgiCollapsibleCard` |
| Accordion | 展開明細按鈕 / 箭頭 | `KgiExpandButton` / `KgiExpandToggle` |
| FAQ | 常見問題、問答 | `KgiAccordion` |
| Banner | 公告卡（一行 + ›） | `KgiNoticeCard` |
| System Message | 提示條（淡黃） | `KgiNoticeBar` |
| Toast & Snackbar | 輕提示 | `KgiToast` + `useToast().show('…')`（頁面放一個 `<KgiToast />`） |
| Dialog | 說明彈窗、確認對話框 | `KgiDialog` |
| Dialog | ⓘ 說明彈窗 | `KgiInfoDialog` |
| Tooltips | 文字 + ⓘ | `KgiInfoLabel` |
| Action Sheet | 底部彈窗、選單 | `KgiSheet` + `KgiSheetOptions` |
| Input | 數字輸入框 | `KgiNumberField` |
| Calculation | 金額輸入（− ＋） | `KgiAmountField` |
| Calculation | 數量加減框 | `KgiQtyStepper` |
| Picker | 下拉選擇、選擇欄位 | `KgiPickerField` |
| Picker | 帳號切換 | `KgiAccountPicker` |
| Checkbox | 勾選框、同意條款 | `KgiCheckbox` |
| Checkbox | 勾選標題（全選） | `KgiCheckboxHeader` |
| Checkbox | 可勾選項目（內含資料列） | `KgiSelectableItem` |
| Radio Button | 單選 | `KgiRadioGroup` |
| Search | 搜尋框 | `KgiSearchField` |
| Filter | 篩選膠囊 | `KgiFilterPill` |
| Tab | 文字頁籤 | `KgiTextTabs` |
| Tab | 膠囊頁籤、分段切換 | `KgiSegmentedTabs` |
| Tag | 標籤 | `KgiTag` |
| List | 列表（表頭 + 列） | `KgiListTable` + `KgiListRow` |
| List | 股票名稱 / 金額欄 / 日期時間 | `KgiStockName` / `KgiAmountCell` / `KgiDateTimeLines` |
| Carousel | 輪播 | `KgiCarousel` |
| Empty State | 無資料 | `KgiEmptyState` |
| （Foundation） | icon | `KgiIcon` |

## 選用規則（一對多時照這裡選，不問）

使用者自己的分組與元件名稱優先（例如把利率寫在「詳情卡」裡就放 `KgiDetailCard`），下表只用在描述沒有指定的時候。

| 情況 | 選 |
|---|---|
| 詳情卡的第一個主要金額（借款金額、申購金額、還款金額） | `KgiAmountHero`；其餘數值用 `KgiDetailRow` |
| 紀錄列表：多欄位、要排序或對齊比較（日期 / 名稱 / 金額） | `KgiListTable` + `KgiListRow` |
| 紀錄列表：每筆有類型標籤、要展開看明細的「單據」感 | `KgiStatementCard`（卡片組 `gap-12`） |
| 描述只說「列表 / 紀錄」沒有其他線索 | `KgiListTable`（推斷，列入回報） |
| 費用、利率、手續費一組 | `KgiFeeCard` |
| 頁面頂部的大數字總覽 | `KgiSummaryCard`（資訊瀏覽 `variant="overview"`，流程 `variant="flow"`） |
| 二選一（是 / 否、部分 / 全部） | `KgiRadioGroup` |
| 選項 3 個以上或很長 | `KgiPickerField`（開 Action Sheet） |
| 同意條款 | `KgiCheckbox` + 文字（條款名稱用 `KgiButton variant="text"`） |
| 期間、排序篩選 | `KgiFilterPill` + `KgiSheet` / `KgiSheetOptions` |
| 2–3 個同層切換 | `KgiSegmentedTabs`；頁面主要分頁用 `KgiTextTabs` |

## kit 還沒有（描述用到就列入追問）

| 需要的東西 | 現況 | 追問選項（推薦放第一） |
|---|---|---|
| **文字輸入框**（姓名、身分證字號、地址、Email） | 沒有，只有數字輸入 `KgiNumberField` | 新增 `KgiTextField`（推薦）／先放佔位區塊並標 TODO |
| **日期選擇**（生日、起訖日） | 沒有 | 新增日期選擇元件（推薦）／`KgiPickerField` + 自訂 `KgiSheet` |
| **開關 Toggle** | 沒有（Figma 有） | 使用者明確說「開關」→ 問：新增 Toggle（推薦）／改用是 / 否單選；只說「是否…」→ 直接用 `KgiRadioGroup`，不問 |
| Avatar、Badge、Chart、Credit Card Picker、Coach Mark Hint、Snowflake | 沒有（Figma 有） | 用現有元件組合／新增元件（依用途選推薦） |
| Divider 分隔線 | 沒有元件 | 不用問：`border-b border-container-general-divider` 或 `h-px bg-container-general-divider` |
