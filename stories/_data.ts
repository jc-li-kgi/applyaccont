// stories 共用的假資料與裝飾器
export const info = { title: '借款手續費', body: '每筆借款收取手續費 TWD 2，於撥款時扣除。' }

export const picks = [
  { name: '元大台灣50', code: '0050', stats: [{ label: '預估可借', value: '106', unit: '萬', highlight: true }, { label: '參考利率', value: '2.8', unit: '%' }] },
  { name: '台積電', code: '2330', stats: [{ label: '預估可借', value: '320', unit: '萬' }, { label: '參考利率', value: '2.6', unit: '%' }] },
  { name: '凱基金', code: '2883', stats: [{ label: '預估可借', value: '12', unit: '萬' }, { label: '參考利率', value: '3.0', unit: '%' }] },
]

/** 元件放在 Surface White 上展示 */
export const onWhite = () => ({ template: '<div class="flex flex-col gap-24 bg-surface-white p-16"><story /></div>' })
/** 元件放在白色卡片裡展示 */
export const inCard = () => ({ template: '<div class="flex flex-col gap-20 rounded-medium bg-container-card-white p-24"><story /></div>' })

/** public/kgi/icons 的檔名（Vite glob，不載入檔案本身） */
const files = Object.keys(import.meta.glob('../public/kgi/icons/*')).map((p) => p.split('/').pop()!).sort()
/** 插圖：彩色點陣圖（.png）與結果頁插圖；其餘 .svg 是 icon */
export const ILLUSTRATIONS = files.filter((f) => f.endsWith('.png') || f === 'success.svg')
export const ICONS = files.filter((f) => f.endsWith('.svg') && f !== 'success.svg')
