// Typography 說明頁的資料：數值讀自 guideline/Typography/kgi-typography.css（不手抄），
// 內容整理自 Figma MDS_Foundation › Typography（15905:16334）與 Typography Scale（16607:19617）
import guideCss from '../../guideline/Typography/kgi-typography.css?raw'

const vars: Record<string, string> = {}
for (const [, k, v] of guideCss.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/(--[^\s:]+)\s*:\s*([^;]+);/g)) vars[k!] = v!.trim()

export type Platform = 'web' | 'mweb' | 'ios' | 'android'
export type Scale = 'standard' | 'large'
export const PLATFORMS: { key: Platform; label: string; note: string }[] = [
  { key: 'web', label: 'Web desktop', note: '寬度 ≥ 768' },
  { key: 'mweb', label: 'Mobile web', note: '寬度 < 768' },
  { key: 'ios', label: 'APP iOS', note: '蘋方 / SF Pro' },
  { key: 'android', label: 'APP Android', note: '思源黑體 / Roboto' },
]

/** 字級層級：Guideline 名稱、kit class、用途 */
export const LEVELS = [
  { level: 'display-l', label: 'Display-L', cls: 'display-l', use: '需要吸引注意力的短語、具影響力的短內容（行銷大標）' },
  { level: 'display-m', label: 'Display-M', cls: 'display-m', use: '同上，次一級' },
  { level: 'display-s', label: 'Display-S', cls: 'display-s', use: '大金額（確認頁 KgiAmountHero）' },
  { level: 'headline', label: 'Headline', cls: 'headline', use: '頁面主標、結果頁標題' },
  { level: 'title', label: 'Title', cls: 'title', use: '區塊標題、大數字（摘要卡數值）' },
  { level: 'subtitle-b', label: 'Subtitle-B', cls: 'subtitle-bold', use: '卡片標題、頁首標題、主要按鈕' },
  { level: 'subtitle-r', label: 'Subtitle-R', cls: 'subtitle-regular', use: '清單項目、輸入值' },
  { level: 'body-b', label: 'Body-B', cls: 'body-bold', use: '欄位標題、重點文字' },
  { level: 'body-r', label: 'Body-R', cls: 'body-regular', use: '內文、標籤、Tab' },
  { level: 'caption-r', label: 'Caption-R', cls: 'caption-regular', use: '輔助說明、欄位下方提示' },
]

export interface Spec { family: string; weight: number; size: number; unit: string; lineHeight: number }

/** 某層級在某平台、語言、字級版本的規格 */
export function spec(level: string, platform: Platform, lang: 'tc' | 'en', scale: Scale = 'standard'): Spec | null {
  const p = scale === 'large' ? `--font-kgi-大字級-${level}-${platform}-${lang}` : `--font-${level}-${platform}-${lang}`
  const sizeRaw = vars[`${p}-size-px`] ?? vars[`${p}-size-pt`] ?? vars[`${p}-size-sp`]
  if (!sizeRaw) return null
  return {
    family: (vars[`${p}-family`] ?? '').replace(/"/g, ''),
    weight: Number(vars[`${p}-weight`]),
    size: parseFloat(sizeRaw),
    unit: sizeRaw.replace(/[\d.]/g, ''),
    lineHeight: Number(vars[`${p}-line-height`]),
  }
}

/** 實際字體堆疊（樣本用）：Web 用 Guideline 的字型，App 用系統字型近似 */
export const FONT_STACK: Record<Platform, Record<'tc' | 'en', string>> = {
  web: { tc: '"Noto Sans TC", sans-serif', en: 'Montserrat, sans-serif' },
  mweb: { tc: '"Noto Sans TC", sans-serif', en: 'Montserrat, sans-serif' },
  ios: { tc: '"PingFang TC", "Noto Sans TC", sans-serif', en: '-apple-system, "SF Pro Text", sans-serif' },
  android: { tc: '"Noto Sans CJK TC", "Noto Sans TC", sans-serif', en: 'Roboto, sans-serif' },
}

export const WEIGHT_NAME: Record<number, string> = { 274: 'Light（SF）', 300: 'Light', 400: 'Regular', 500: 'Medium', 510: 'Medium（SF）', 600: 'SemiBold' }
