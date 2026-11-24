// Color 說明頁的資料：數值從 guideline/ 讀取（不手抄色碼），用途文字整理自 Figma MDS_Foundation（顏色使用說明 16606:15914、輔助用色 16606:18200、交易狀態顏色顯示規範 27483:24956）
import colorsCss from '../../guideline/Color_20261016 update/colors.css?raw'
import hoverCss from '../../app/assets/css/guideline-hover.css?raw'

const components = import.meta.glob('../../app/components/**/*.vue', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

type Vars = Record<string, string>
const strip = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, '')
function parse(css: string) {
  const light: Vars = {}
  const dark: Vars = {}
  for (const [, sel, body] of strip(css).matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const target = sel!.includes('dark') ? dark : light
    for (const [, k, v] of body!.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) target[k!] = v!.trim()
  }
  return { light, dark }
}
const base = parse(colorsCss)
const hover = parse(hoverCss)
const LIGHT: Vars = { ...base.light, ...hover.light }
const DARK: Vars = { ...LIGHT, ...base.dark, ...hover.dark }

/** 沿著 var() 解析：回傳 { value: 最終色值, global: 引用的原始色票名稱 } */
export function resolve(name: string, mode: 'light' | 'dark' = 'light') {
  const vars = mode === 'dark' ? DARK : LIGHT
  let v = vars[name]
  let global: string | undefined
  for (let i = 0; v?.startsWith('var(') && i < 10; i++) {
    const ref = v.slice(4, -1)
    if (!/^--color-(surface|content|container|chart)-/.test(ref)) global ??= ref.replace('--color-', '')
    v = vars[ref]
  }
  return { value: v ?? '—', global: global ?? '—' }
}

/** WCAG 對比度（只算純色 #RRGGBB；半透明回傳 null） */
export function contrast(fg: string, bg: string) {
  const lum = (h: string) => {
    const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4))
    return 0.2126 * c[0]! + 0.7152 * c[1]! + 0.0722 * c[2]!
  }
  if (!/^#[0-9a-f]{6}$/i.test(fg) || !/^#[0-9a-f]{6}$/i.test(bg)) return null
  const [a, b] = [lum(fg), lum(bg)].sort((x, y) => y - x)
  return (a! + 0.05) / (b! + 0.05)
}

/** 哪些 kit 元件用到這個 token（掃描 class 名稱） */
export function usedBy(token: string) {
  const re = new RegExp(`(?:bg|text|border|ring|outline|fill|stroke)-${token}(?![\\w-])`)
  return Object.entries(components)
    .filter(([, src]) => re.test(src))
    .map(([path]) => path.split('/').pop()!.replace('.vue', ''))
}

export interface Row { token: string; name: string; use: string }

/** Surface 背景色：介面底色、各內容區塊底色 */
export const SURFACE: Row[] = [
  { token: 'surface-white', name: 'White', use: '主要背景' },
  { token: 'surface-blue', name: 'Blue', use: '主要背景' },
  { token: 'surface-blue-75', name: 'Blue-75%', use: '遮罩背景（透明度 75%）' },
  { token: 'surface-yellow', name: 'Yellow', use: '次級背景' },
  { token: 'surface-grey', name: 'Grey', use: '次級背景、網頁 Footer' },
]

/** Container 元件容器底色。元件與背景對比度需 3:1 */
export const CONTAINER: { group: string; rows: Row[] }[] = [
  {
    group: 'General',
    rows: [
      { token: 'container-general-active-primary', name: 'Active-Primary', use: '主要按鈕' },
      { token: 'container-general-active-secondary', name: 'Active-Secondary', use: '膠囊型按鈕、次級資訊元件' },
      { token: 'container-general-light-active', name: 'Light Active', use: '膠囊型 Tab（已選擇）' },
      { token: 'container-general-light-active-blue', name: 'Light Active-Blue', use: '第三層元件（例如卡片展開按鈕）、進階篩選 / 條件展開篩選器「已選擇」（僅限單一篩選條件）' },
      { token: 'container-general-light-active-red', name: 'Light Active-Red', use: '錯誤、警示訊息的區塊底色（例如維持率不足）' },
      { token: 'container-general-filter-active-blue', name: 'Filter/Active-Blue', use: '複合型篩選器、膠囊型 Tab（未選擇）' },
      { token: 'container-general-filter-inactive-white', name: 'Filter/Inactive-White', use: '條件展開篩選器「未選擇」（僅限單一篩選條件）' },
      { token: 'container-general-filter-inactive-grey', name: 'Filter/Inactive-Grey', use: '進階篩選條件「未選擇」（僅限白背景上）' },
      { token: 'container-general-option-selected-blue', name: 'Option Selected-Blue', use: '選項被選擇的底色（例如 Action Sheet 複選）' },
      { token: 'container-general-picker-bg-30', name: 'Picker Bg-30%', use: '深色底卡片上的選擇器（例如帳務卡上的 Account Picker）' },
      { token: 'container-general-disabled', name: 'Disabled', use: '禁用狀態（按鈕、輸入欄位底線）' },
      { token: 'container-general-divider', name: 'Divider', use: '分隔線' },
      { token: 'container-general-input-line', name: 'Input Line', use: '輸入欄位底線' },
      { token: 'container-general-active-corporate', name: 'Active/Corporate', use: '官網主要按鈕' },
    ],
  },
  {
    group: 'Card',
    rows: [
      { token: 'container-card-white', name: 'White', use: '一般卡片背景' },
      { token: 'container-card-blue', name: 'Blue', use: '一般卡片背景' },
      { token: 'container-card-yellow', name: 'Yellow', use: '一般卡片背景' },
      { token: 'container-card-grey', name: 'Grey', use: '一般卡片背景、頁腳容器' },
    ],
  },
  {
    group: 'Semantic',
    rows: [
      { token: 'container-semantic-positive', name: 'Positive', use: '成功狀態元件、類別標籤（申購成功、扣款成功）' },
      { token: 'container-semantic-caution', name: 'Caution', use: '失敗、警告 / 特殊提示元件、類別標籤' },
      { token: 'container-semantic-ascend', name: 'Ascend', use: '漲幅元件、類別標籤（上漲）' },
      { token: 'container-semantic-descend', name: 'Descend', use: '跌幅元件、類別標籤（下跌）' },
      { token: 'container-semantic-buy-in-expenditure', name: 'Buy-in/Expenditure', use: '買進、支出、類別標籤' },
      { token: 'container-semantic-sell-off-income', name: 'Sell-off/Income', use: '賣出、收入、類別標籤' },
      { token: 'container-semantic-default', name: 'Default', use: '一般說明元件、類別標籤' },
    ],
  },
]

/** Content 內容色：文本、標題、標語、圖標 */
export const CONTENT: { group: string; rows: (Row & { level?: '★' | '☆' | '＊' })[] }[] = [
  {
    group: 'General',
    rows: [
      { token: 'content-general-primary', name: 'Primary', use: '標題、主要文字', level: '★' },
      { token: 'content-general-secondary', name: 'Secondary', use: '副標、次級文字', level: '★' },
      { token: 'content-general-tertiary', name: 'Tertiary', use: 'Placeholder', level: '★' },
      { token: 'content-general-active', name: 'Active', use: 'Text Button、文字型 Tab', level: '★' },
      { token: 'content-general-active-button-capsule', name: 'Active-Button-Capsule', use: '膠囊型按鈕文字、膠囊型 Tab 被選中文字', level: '★' },
      { token: 'content-general-active-multi-filter', name: 'Active-Multi-Filter', use: '複合型篩選器被選中文字', level: '★' },
      { token: 'content-general-active-single-filter', name: 'Active-Single-Filter', use: '條件展開篩選器被選中文字（僅限單一篩選條件）', level: '★' },
      { token: 'content-general-light-active', name: 'Light Active', use: '深色容器內文字', level: '★' },
      { token: 'content-general-disabled', name: 'Disabled', use: '禁用狀態文字', level: '＊' },
    ],
  },
  {
    group: 'Semantic',
    rows: [
      { token: 'content-semantic-default', name: 'Default', use: '持平狀態文字', level: '☆' },
      { token: 'content-semantic-positive', name: 'Positive', use: '成功狀態文字（申購成功、扣款成功）', level: '☆' },
      { token: 'content-semantic-caution', name: 'Caution', use: '錯誤狀態文字', level: '★' },
      { token: 'content-semantic-ascend', name: 'Ascend', use: '漲幅狀態文字（上漲、買進）', level: '☆' },
      { token: 'content-semantic-descend', name: 'Descend', use: '跌幅狀態文字（下跌、賣出）', level: '☆' },
      { token: 'content-semantic-buy-in-expenditure', name: 'Buy-in/Expenditure', use: '買進、支出、類別標籤', level: '☆' },
      { token: 'content-semantic-sell-off-income', name: 'Sell-off/Income', use: '賣出、收入、類別標籤', level: '☆' },
    ],
  },
  {
    group: 'Tag',
    rows: [
      { token: 'content-tag-highlight', name: 'Highlight', use: '特別強調' },
      { token: 'content-tag-default', name: 'Default', use: '一般狀態' },
      { token: 'content-tag-caution', name: 'Caution', use: '錯誤警示' },
      { token: 'content-tag-success', name: 'Success', use: '成功狀態（申購成功、扣款成功）' },
    ],
  },
]

export const CHART_FAMILIES = ['blue', 'orange', 'teal', 'yellow', 'green', 'red', 'navy', 'indigo']
export const ORDINALS = ['1st', '2nd', '3rd', '4th', '5th', '6th']
export const OVERVIEW = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th']

/** 原始色票，依色系分組（Figma KGI Color Palette 的順序） */
export const PALETTE = ['blue', 'sky-blue', 'indigo', 'green', 'teal', 'yellow', 'orange', 'red', 'grey', 'navy'].map((family) => ({
  family,
  tokens: Object.keys(base.light).filter((k) => k.startsWith(`--color-${family}-`)),
}))

/** Figma「顏色使用範例」的標註：畫面元素 → token */
export const EXAMPLES: [string, string][] = [
  ['頁面底色', 'surface-blue'],
  ['頁面主標、主要文字', 'content-general-primary'],
  ['次級文字、未選中頁籤', 'content-general-secondary'],
  ['卡片', 'container-card-white'],
  ['主要按鈕、已選中的膠囊頁籤、選中日期', 'container-general-active-primary'],
  ['文字頁籤選中（文字與底線）', 'content-general-active'],
  ['分隔線', 'container-general-divider'],
  ['類別標籤', 'content-tag-highlight'],
  ['篩選下拉、膠囊頁籤底', 'container-general-filter-active-blue'],
  ['膠囊按鈕底色', 'container-general-active-secondary'],
  ['膠囊按鈕文字', 'content-general-active-button-capsule'],
  ['分段切換的選中項', 'container-general-light-active'],
  ['第三層小按鈕、篩選選中', 'container-general-light-active-blue'],
  ['卡片內展開區', 'container-general-option-selected-blue'],
  ['上漲數值', 'content-semantic-ascend'],
  ['下跌數值', 'content-semantic-descend'],
]
