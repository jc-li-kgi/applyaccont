<!-- 自動產生，請勿手改：npm run components（scripts/build-components.mjs，讀元件原始碼） -->
# 元件 API（自動產生）

59 個元件，依 Storybook / Figma 分類排列。props 名稱在 template 裡用 kebab-case（`labelClass` → `label-class`）。
常用叫法 → 元件的對照、選用規則、kit 還沒有的元件，見同資料夾的 `components.md`。

## Patterns/Page Layout

### KgiBottomActions

> 不固定的底部按鈕區：與內容至少 32、內容不滿一屏時置底、距畫面底部 48

slot：預設

### KgiFlowPage

> <FlowPage title="個人信貸" :step="{ index: 0, total: 3, label: '試算' }" @back="…">
>   內容…
>   <template #actions><KgiButton>下一步</KgiButton></template>      內容下方的按鈕（距內容至少 32，不滿一屏時置底）
>   <template #sticky>…總計 + 下一步…</template>               固定在畫面底部的操作區（和 #actions 擇一）
> </FlowPage>
> 間距：頁首→內容 24、內容區塊之間 24（Guideline：流程申請）

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `title` | `string` | 必填 |  |
| `step` | `{ index: number; total: number; label: string; }` |  |  |
| `actionsClass` | `string` |  |  |

事件：`@back`

slot：預設、`#actions`、`#sticky`

### KgiResultPage

> 完成頁（成功插圖 + 標題 + 說明 + 按鈕）
>   <ResultPage header="申請借款" title="成功送出申請" desc="我們將在…" primary-label="查看借款紀錄" secondary-label="完成" @primary="…" @secondary="…" />

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `header` | `string` | 必填 |  |
| `title` | `string` | 必填 |  |
| `desc` | `string` |  |  |
| `primaryLabel` | `string` |  |  |
| `secondaryLabel` | `string` |  |  |

事件：`@primary`、`@secondary`

### KgiSectionHeader

> 區塊標題。action：右側文字連結；desc：標題下方說明。標題左邊要放勾選框時改用 KgiCheckboxHeader。不含左右邊距

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `title` | `string` | 必填 |  |
| `action` | `TextAction` |  |  |
| `desc` | `string` |  |  |
| `descClass` | `string` |  | `"t-body-regular"` |

### KgiStickyFooter

> 置底操作區（固定在畫面底部，可放總計 + 按鈕）。會自動在頁面底部留出同高度的空白，內容不會被擋住
> plain：透明底、無分隔線與陰影（只有一顆按鈕時使用）

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `plain` | `boolean` |  |  |

slot：預設

### KgiTotalBar

> 置底總計列（標題 ⓘ ／ 金額 ^），通常放在 <KgiStickyFooter> 裡、按鈕上方
> 可展開明細（在置底區內向上推開）：<TotalBar label value :expanded="open" @toggle="open = !open">…明細…</TotalBar>
> 不綁 @toggle 就不顯示 ^。note：標題下方補充，例如「(已選取 1 筆)」

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `label` | `string` | 必填 |  |
| `note` | `string` |  |  |
| `info` | `InfoContent` |  |  |
| `value` | `string` | 必填 |  |
| `expanded` | `boolean` |  |  |

事件：`@toggle`

slot：預設

## Foundations/Grid System

### KgiGrid

> 頁面網格容器（Figma Grid System/App & Web RWD），欄數、欄間距、左右邊距隨畫面寬度自動切換：
>   小版 < 768：4 欄、欄間距 16、左右各 16 ／ 中版 768–1023：6 欄、欄間距 16、容器 92% ／ 大版 ≥ 1024：12 欄、欄間距 28、容器 86%、最寬 1175
> 子元素用 Tailwind 定位：col-span-full（撐滿）、desktop:col-start-4 desktop:col-span-8 等。一般頁面直接用 <KgiPage>，不用自己排

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `as` | `string` |  | `"div"` |

slot：預設

### KgiPage

> RWD 頁面版型：依內容類型在 Grid System 上排版（變化方式依 GridSystem 樣式模擬，數值用 Guideline token）
>   layout="form"  填寫型：手機、平板撐滿網格；桌機最寬 570、置中（表單、確認頁、申請流程）
>   layout="read"  閱讀型：手機、平板目錄收合在內容上方；桌機有目錄 → 目錄 3 欄 + 內容 8 欄，無目錄 → 內容 8 欄置中
>   layout="list"  列表型：撐滿網格（桌機最寬 1175）
>   type="flow" 流程申請：區塊間距 24 ／ type="browse" 資訊瀏覽：區塊間距 32（各尺寸相同）
> slot：預設（內容區塊）、#actions（內容下方按鈕，與內容距 32）、#head（閱讀型標題區）、#toc（自訂目錄）、#foot（閱讀型作者、常見問題）
> 綁了 @back 才有返回鍵。底部固定按鈕、總計列不在這個元件處理（依之後的元件規則）

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `layout` | `"form" \| "read" \| "list"` |  | `"form"` |
| `type` | `"flow" \| "browse"` |  | `"flow"` |
| `title` | `string` |  |  |
| `step` | `{ index: number; total: number; label: string; }` |  |  |
| `toc` | `{ id: string; label: string; }[]` |  |  |
| `share` | `boolean` |  | `false` |

事件：`@back`

slot：預設、`#actions`、`#head`、`#toc`、`#foot`

### KgiToc

> 文章目錄（閱讀型頁面）。手機、平板：收合在內容上方，點標題展開；桌機：固定展開（由 KgiPage 放在左側 3 欄並固定位置）
> 捲動時自動標示目前閱讀的段落（items 的 id 要對到內容區塊的 id）

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `items` | `{ id: string; label: string; }[]` | 必填 |  |
| `title` | `string` |  | `"目錄"` |

## Foundations/Icon

### KgiIcon

> <KgiIcon name="info.svg" level="body" />   ← 尺寸跟著文字層級（caption 16 / body 16→20 / subtitle 20→24，手機→電腦）
> <KgiIcon name="add.svg" tint />            ← 顏色跟著文字色（currentColor，用 CSS mask）
> 沒給 level 時用 size（預設 24，Figma 圖層的原始尺寸）

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `name` | `string` | 必填 |  |
| `size` | `number` |  | `24` |
| `width` | `number` |  |  |
| `height` | `number` |  |  |
| `alt` | `string` |  | `""` |
| `tint` | `boolean` |  | `false` |
| `level` | `IconLevel` |  |  |

## Components/Accordion

### KgiCollapsibleCard

> 可收合卡片（Reka UI Collapsible）。variant：flow（流程申請，內距 24）／ overview（資訊瀏覽，內距 16）
> 不受控：default-open；受控：v-model:open

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `v-model:open` | `boolean` | | |
| `title` | `string` | 必填 |  |
| `defaultOpen` | `boolean` |  | `true` |
| `variant` | `"flow" \| "overview"` |  | `"flow"` |

slot：預設

### KgiExpandButton

> 展開 / 收闔明細文字按鈕。預設文字「展開明細 / 收闔明細」，要換傳 :labels="['看更多', '收合']"

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `expanded` | `boolean` |  | `false` |
| `labels` | `[string, string]` |  | `[COPY.common.expand, COPY.common.collapse]` |

### KgiExpandToggle

> 展開 / 收起箭頭（收起朝下、展開朝上，有旋轉動畫）。只負責圖示，點擊行為由外層按鈕處理

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `expanded` | `boolean` |  |  |

## Components/Action Sheet

### KgiSheet

> 底部彈窗（Reka UI Dialog）。點遮罩、Esc 或右上 ✕ 關閉
> RWD（Grid System）：手機 < 768 底部抽屜；平板置中、寬 92%（與網格同寬）；桌機置中、最寬 570

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `open` | `boolean` | 必填 |  |
| `title` | `string` | 必填 |  |
| `description` | `string` |  |  |
| `fullHeight` | `boolean` |  |  |

事件：`@close`

slot：預設

### KgiSheetOptions

> 底部彈窗裡的選項清單。options 可給字串陣列或 { value, label, desc }；chevron：前往型選單（右側 ›，不標示選中項）

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `options` | `(T \| Option<T>)[]` | 必填 |  |
| `value` | `T \| null` |  |  |
| `chevron` | `boolean` |  |  |

事件：`@select`

## Components/Banner

### KgiNoticeCard

> 公告卡（公告 icon + 一行訊息 + ›，整張可點）。icon 一律 24px，不跟文字層級。不含左右外距

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `text` | `string` | 必填 |  |

## Components/Bottom Navigation

### KgiBottomNav

> 底部導覽。icon 一律用 tint，顏色跟著文字：選取 = content active，未選取 = primary 透明度 40%
> 換頁：綁 @navigate 自己處理；沒綁就用 app 的 router（Nuxt 內建 vue-router）push(item.to)
> 沒有 to 的項目 = 未開放（顯示 Toast）。長按「更多」2 秒觸發 @more-long-press（沒綁就不啟用）
> 預設項目是證券 App 的 6 個；新專案請傳入自己的 items

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `active` | `string` |  | `"account"` |
| `items` | `NavItem[]` |  | `BOTTOM_NAV_ITEMS` |

事件：`@moreLongPress`、`@navigate`

## Components/Button

### KgiButton

> <KgiButton>下一步</KgiButton>                               主要按鈕（滿版、直角）
> <KgiButton variant="text" block>完成</KgiButton>            文字按鈕
> <KgiButton variant="text" tone="caution">移除</KgiButton>   警示文字按鈕（Content/Semantic/Caution）
> <KgiButton variant="capsule" size="sm">賣股還款</KgiButton>  膠囊（列表內用 sm）
> 傳 href 會輸出 <a>；其餘屬性（disabled、@click、aria-*）直接套在根元素

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `variant` | `"text" \| "primary" \| "capsule"` |  | `"primary"` |
| `typo` | `string` |  |  |
| `tone` | `"active" \| "caution"` |  |  |
| `block` | `boolean` |  | `false` |
| `href` | `string` |  |  |
| `size` | `"md" \| "sm"` |  | `"md"` |
| `type` | `"button" \| "submit" \| "reset"` |  | `"button"` |

slot：預設

### KgiIconAction

> 圓形圖示 + 文字的功能捷徑（疊在 Surface Blue 上：Basic 陰影）。icon 用 tint，顏色跟著文字主色

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `icon` | `string` | 必填 |  |
| `label` | `string` | 必填 |  |

## Components/Calculation

### KgiAmountField

> 金額 / 數量輸入框（含 − ＋）。v-model 為數字或 null（未填，顯示 placeholder）
> 直接輸入時，離開欄位會自動修正到 min～max 並對齊 step

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `v-model` | `number \| null` | | |
| `label` | `string` | 必填 |  |
| `min` | `number` | 必填 |  |
| `max` | `number` | 必填 |  |
| `step` | `number` |  | `1` |
| `prefix` | `string` |  |  |
| `suffix` | `string` |  |  |
| `placeholder` | `string` |  |  |
| `action` | `{ label: string; onClick: () => void; }` |  |  |
| `hints` | `string[]` |  | `[]` |
| `error` | `string` |  |  |
| `disabled` | `boolean` |  | `false` |

### KgiQtyStepper

> 數量加減框（有外框，− 數量 單位 ＋）。直接輸入時，離開欄位會自動修正到 min～max

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `v-model` | `number` | | |
| `min` | `number` |  | `1` |
| `max` | `number` |  | `Infinity` |
| `step` | `number` |  | `1` |
| `unit` | `string` |  |  |
| `label` | `string` |  | `"數量"` |

## Components/Card

### KgiAmountHero

> 確認頁大金額（標題 + 幣別 + 大數字）

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `label` | `string` |  |  |
| `amount` | `number` | 必填 |  |
| `currency` | `string` |  | `"TWD"` |
| `currencyName` | `string` |  | `"臺幣"` |
| `flag` | `string` |  | `"flag-twd.png"` |

### KgiDetailCard

> 確認資料卡（流程申請 › 詳情概覽卡）：內距 24×24、資料列間距 20；不含左右外距，放在卡片組（px-16 gap-12）裡

slot：預設

### KgiDetailPanel

> 列表展開明細（卡片 + 資料列）：內距 16×16、資料列間距 12。放在白色卡片裡時 tone="blue" 改淡藍底

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `tone` | `"white" \| "blue"` |  | `"white"` |

slot：預設

### KgiDetailRow

> 左標題、右數值
> <KgiDetailRow label="參考利率" value="2.8%" />
> <KgiDetailRow label="借款手續費" value="TWD 2" :info="{ title, body }" />   標題旁 ⓘ
> value 預設英數樣式（金額、日期）；中文值傳 value-class="t-body-regular"；多行傳字串陣列
> tone="caution"：整列警示色（Content/Semantic/Caution；原 tone="warning"）

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `label` | `string` | 必填 |  |
| `value` | `string \| string[]` |  |  |
| `info` | `InfoContent` |  |  |
| `labelClass` | `string` |  | `"t-body-regular"` |
| `valueClass` | `string` |  | `"n-body-regular"` |
| `tone` | `"caution"` |  |  |

事件：`@info`

slot：`#value`

### KgiFeeCard

> 費用卡：標題→內容 12、詳情條列 20、內距 24×24。row 有 info 時標題旁出現 ⓘ
> full：滿版（貼齊畫面左右、無圓角）

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `title` | `string` |  |  |
| `rows` | `{ label: string; value: string; info?: InfoContent; }[]` | 必填 |  |
| `note` | `string` |  |  |
| `full` | `boolean` |  |  |

### KgiServiceCardList

> 服務卡片清單（圖示 + 標題 + 說明 + 前往箭頭）。icon 為彩色插圖（36px），不換色

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `items` | `{ icon: string; title: string; desc?: string; onClick?: (() => void); }[]` | 必填 |  |

### KgiStatementCard

> 對帳單卡片（標題金額 + 類型標籤 + 資料列，可展開淡藍明細）
> rows / detail：[{ label, value（字串或字串陣列＝多行）, valueClass? }]；沒有 detail 就不顯示展開按鈕

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `title` | `string` | 必填 |  |
| `titleClass` | `string` |  | `"n-body-bold"` |
| `tag` | `string` |  |  |
| `tagVariant` | `"default" \| "caution" \| "info" \| "highlight" \| "success"` |  | `"highlight"` |
| `rows` | `StatementRow[]` |  | `[]` |
| `detail` | `StatementRow[]` |  | `[]` |

### KgiStatGroup

> 並排數據（標題 + 大數字 + 單位，中間直線分隔）。highlight：警示色強調。單位是中文用 t- 樣式、英文用 n- 樣式（自動判斷）

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `items` | `StatItem[]` | 必填 |  |

### KgiStockPickCard

> 精選擔保品卡（股票名稱 + 並排數據）。沒有綁 @click 時是純展示卡片（不可點擊）。常搭配 <KgiCarousel> 使用

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `name` | `string` | 必填 |  |
| `code` | `string` | 必填 |  |
| `stats` | `StatItem[]` | 必填 |  |

### KgiSummaryCard

> 摘要卡（大數字 + 資料列）。rows 第 3 個值 'caution' = 整列警示色（原 'warning'）
> 綁了 @bell 時，overview 版右上角出現通知鈴
> variant="flow"：大數字與標題同一行、內距 24（流程申請）／ "overview"：大數字在標題下方、內距 16（資訊瀏覽）

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `label` | `string` | 必填 |  |
| `value` | `string` | 必填 |  |
| `rows` | `[string, string, ("caution")?][]` |  | `[]` |
| `variant` | `"flow" \| "overview"` |  | `"overview"` |
| `bellLabel` | `string` |  | `"通知設定"` |

事件：`@bell`

slot：`#actions`

## Components/Carousel

### KgiCarousel

> 橫向滑動卡片 + 指示點。與 ui-kit 的差別：用 items + 具名 slot，不直接塞子元素
>   <Carousel :items="list" item-width="17.5rem"><template #default="{ item }"><StockPickCard v-bind="item" /></template></Carousel>
> 每張卡片寬度由 item-width 控制（預設 280px），左右露出相鄰卡片

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `items` | `T[]` | 必填 |  |
| `label` | `string` |  |  |
| `itemWidth` | `string` |  |  |

slot：預設

## Components/Checkbox

### KgiCheckbox

> <KgiCheckbox v-model="checked" label="全選" />（Reka UI Checkbox）
> 外框 24×24（含 3px 點擊留白），方框 18px。label 只給螢幕閱讀器，畫面文字由外層自己排

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `v-model` | `boolean` | | |
| `disabled` | `boolean` |  |  |
| `label` | `string` |  |  |
| `name` | `string` |  |  |
| `value` | `string` |  |  |

### KgiCheckboxHeader

> 勾選標題（勾選框 + 標題 + 補充說明）：勾選框與標題第一行垂直置中。不含左右邊距

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `v-model` | `boolean` | | |
| `title` | `string` | 必填 |  |
| `desc` | `string` |  |  |
| `disabled` | `boolean` |  |  |
| `label` | `string` |  |  |

### KgiSelectableItem

> 可勾選項目（勾選框 + 內容，可停用）。disabled 時整個項目（含裡面的 KgiDetailRow）變成停用色

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `v-model` | `boolean` | | |
| `disabled` | `boolean` |  |  |
| `label` | `string` |  |  |

slot：預設

## Components/Dialog

### KgiDialog

> 對話框（Reka UI Dialog：焦點鎖定、Esc 關閉、點遮罩關閉、SSR 安全的 Portal）
> 說明（一顆「我知道了」）：<KgiDialog :open="open" title="…" body="…" @close="open = false" />
> 確認（兩顆按鈕，左次要、右主要）：:actions="[{ label: '返回', secondary: true }, { label: '確認送出', onClick: go }]"
> 沒有 onClick 的按鈕 = 關閉
> RWD：手機最寬 382（App 寬 430 − 48）；平板以上最寬 570

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `open` | `boolean` | 必填 |  |
| `title` | `string` |  |  |
| `body` | `string` |  |  |
| `bodyAlign` | `"left" \| "center"` |  | `"left"` |
| `actions` | `DialogAction[]` |  | `[{ label: COPY.common.gotIt }]` |

事件：`@close`

slot：預設

### KgiInfoDialog

> 說明型對話框：info = { title, body }，null 時關閉

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `info` | `InfoContent \| null` | 必填 |  |

事件：`@close`

## Components/Empty State

### KgiEmptyState

> 無資料提示（置中、次要色）。列表沒有資料時 KgiListTable 會自動使用（傳 empty 與 :has-rows="false"）

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `text` | `string` | 必填 |  |

## Components/FAQ

### KgiAccordion

> 收合問答（Reka UI Accordion，一次只展開一題）。default-open：一開始展開第幾題（不給 = 全部收合）

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `items` | `{ q: string; a: string; }[]` | 必填 |  |
| `defaultOpen` | `number \| null` |  | `null` |

## Components/Filter

### KgiFilterPill

> 篩選 / 排序下拉膠囊（文字 + ▼）

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `label` | `string` | 必填 |  |

## Components/Input

### KgiNumberField

> 數字輸入框（標題 + 輸入 + 單位 + 底線）。v-model 為數字或 null（未填，顯示 placeholder）。只接受整數；超過 max 時自動改成 max

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `v-model` | `number \| null` | | |
| `label` | `string` |  |  |
| `placeholder` | `string` |  |  |
| `suffix` | `string` |  |  |
| `max` | `number` |  |  |

## Components/List

### KgiAmountCell

> 列表金額欄：幣別一行、金額一行，靠右

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `amount` | `number` | 必填 |  |
| `currency` | `string` |  | `"TWD"` |

### KgiDateTimeLines

> 日期＋時間（兩行，台北時區）。放在列表欄位時用 text-class 指定字級與顏色

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `value` | `string` | 必填 |  |
| `textClass` | `string` |  |  |

### KgiListRow

> 列表的一列。cells 用具名 slot：#cell-0、#cell-1…（對應 columns）
>   <ListRow :cell-count="3" :align="['left','center','right']" :expanded="open" @toggle="…">
>     <template #cell-0>…</template> …  <template #detail>…</template> <template #footer>…</template>
>   </ListRow>
> 綁了 @toggle 時整列可點、最右側顯示箭頭；detail 自動包在 DetailPanel（白色明細卡）裡

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `cellCount` | `number` | 必填 |  |
| `align` | `CellAlign[]` |  | `[]` |
| `expanded` | `boolean` |  |  |
| `footerAlign` | `"end" \| "between"` |  | `"end"` |

事件：`@toggle`

slot：`#footer`、`#detail`

### KgiListTable

> 列表（表頭 + 排序 + 分隔線 + 列）。欄寬：沒給 width 的欄平分剩餘寬度；全部都有 width 時，多出的寬度平均分到欄與欄之間。width 可用 'var(--spacing-80)' 這類 token
>   窄螢幕要能縮的欄用 'minmax(0, 71px)'。表頭文字用 \n 換行。v-model:sort 綁排序欄位（再點一次取消）
>   <ListTable :columns="[…]" expandable v-model:sort="sort" empty="目前沒有資料" :has-rows="rows.length > 0"><ListRow … /></ListTable>

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `v-model:sort` | `string \| null` | | |
| `columns` | `Column[]` | 必填 |  |
| `expandable` | `boolean` |  |  |
| `empty` | `string` |  |  |
| `headAlign` | `"center" \| "end"` |  | `"center"` |
| `hasRows` | `boolean` |  | `true` |
| `flush` | `boolean` |  | `false` |

slot：預設

### KgiStockName

> <KgiStockName name="台積電" code="2330" />          上下兩行（列表用）：名稱粗體、代碼次要色
> <KgiStockName name="台積電" code="2330" inline />   同一行（勾選項目標題用）

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `name` | `string` | 必填 |  |
| `code` | `string` | 必填 |  |
| `inline` | `boolean` |  |  |

## Components/Picker

### KgiAccountPicker

> 帳號選擇（證 徽章 + 帳號 + 姓名）。外層自行留左右邊距

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `account` | `{ id: string; name: string; }` | 必填 |  |
| `badge` | `string` |  | `"證"` |

### KgiPickerField

> <KgiPickerField v-model="term" label="借款期數" :options="['12', '24']" />
> 自訂選擇畫面（例如有搜尋的股票清單）：不給 options，改給 display-value + @open

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `v-model` | `T \| null` | | |
| `label` | `string` |  |  |
| `options` | `(T \| Option<T>)[]` |  | `[]` |
| `placeholder` | `string` |  | `"請選擇"` |
| `error` | `string` |  |  |
| `sheetTitle` | `string` |  |  |
| `hint` | `string` |  |  |
| `displayValue` | `string` |  |  |

事件：`@open`

## Components/Progress Bar

### KgiStepBar

> 第 N 步 xxx ／ 共 M 步，index 從 0 開始
> flush：不加左右內距（放在 KgiGrid / KgiPage 裡時用）

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `index` | `number` | 必填 |  |
| `total` | `number` | 必填 |  |
| `label` | `string` | 必填 |  |
| `flush` | `boolean` |  |  |

## Components/Radio Button

### KgiRadioGroup

> 單選按鈕組（Reka UI RadioGroup，橫排平分）
> <KgiRadioGroup v-model="mode" label="還款額度" :options="[{ value: 'partial', label: '部分' }, …]" />

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `v-model` | `T \| null` | | |
| `label` | `string` |  |  |
| `options` | `{ value: T; label: string; disabled?: boolean; }[]` | 必填 |  |
| `name` | `string` |  |  |
| `disabled` | `boolean` |  |  |

## Components/Search

### KgiSearchField

> 搜尋框（膠囊、放大鏡 24、內距 8×16、icon 與文字 8）。預設淡藍底，放在白底上；on-surface：放在藍底頁面上時改白底

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `v-model` | `string` | | |
| `placeholder` | `string` |  |  |
| `onSurface` | `boolean` |  |  |

### KgiSearchIcon

> 搜尋 icon（圓圈 + 握把，Figma 為組合圖層）

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `size` | `number` |  | `24` |

## Components/System Message

### KgiNoticeBar

> 提示條（淡黃底、置中文字）

slot：預設

## Components/Tab

### KgiSegmentedTabs

> 膠囊型頁籤（Reka UI Tabs，整排平分）。<KgiSegmentedTabs v-model="tab" :tabs="[{ key: 'a', label: '總覽' }, …]" />

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `v-model` | `string` | | |
| `tabs` | `{ key: string; label: string; }[]` | 必填 |  |

### KgiTextTabs

> 文字型頁籤（Reka UI Tabs，方向鍵切換）。選中項下方藍線。放在卡片內時加 flush（不留左右邊距），置中加 center
> 內容區由外層依 v-model 自行切換

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `v-model` | `string` | | |
| `tabs` | `{ key: string; label: string; }[]` | 必填 |  |
| `flush` | `boolean` |  |  |
| `center` | `boolean` |  |  |

## Components/Tag

### KgiTag

> <KgiTag variant="caution">即將到期</KgiTag>
>   default   淺藍底（Container/General/Active-Secondary + Content/General/Active）
>   caution   外框＋字 Content/Tag/Caution（原 variant="warning" / "error"）
>   info      外框淺藍（Guideline 無語意 token，暫用 Graphic Blue 色票 sky-blue-300 / 500）
>   highlight 外框＋字 Content/Tag/Highlight
>   success   外框＋字 Content/Tag/Success

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `variant` | `"default" \| "caution" \| "info" \| "highlight" \| "success"` |  | `"default"` |

slot：預設

## Components/Toast & Snackbar

### KgiToast

> 輕提示（Reka UI Toast）。版面放一個 <KgiToast />，任何地方呼叫 useToast().show('訊息')，1.8 秒後自動消失

## Components/Tooltips

### KgiInfoLabel

> 文字 + ⓘ 說明
> <KgiInfoLabel label="可借額度總計" :info="{ title, body }" />   自己開說明彈窗
> <KgiInfoLabel label="…" @info="…" />                            由外部處理

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `label` | `string` | 必填 |  |
| `info` | `InfoContent` |  |  |
| `labelClass` | `string` |  | `"t-body-regular"` |
| `level` | `IconLevel` |  |  |

事件：`@info`

## Components/Top Navigation

### KgiPageHeader

> 子頁標題列：返回 / 標題 / 分享。沒有綁 @back 就不顯示返回鍵
> flush：不加左右內距（放在 KgiGrid / KgiPage 裡時，左右邊距由網格決定）

| prop | 型別 | 必填 | 預設 |
|---|---|---|---|
| `title` | `string` | 必填 |  |
| `showShare` | `boolean` |  | `true` |
| `flush` | `boolean` |  | `false` |

事件：`@back`
