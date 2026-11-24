// 從 guideline/Typography/kgi-typography.css 產生 app/assets/css/typography.css（Guideline 更新後跑 npm run theme）
//
//   node scripts/build-typography.mjs           產生
//   node scripts/build-typography.mjs --check   只檢查是否為最新（CI 用）
//
// Guideline 給的是各平台的原始 token：--font-{level}-{web|mweb|ios|android}-{tc|en}-{size|weight|line-height}
// 這裡只做一件事：拿掉平台那一段，變成「目前環境」的 token，名稱其餘照 Guideline：
//   --font-body-r-tc-size = 畫面 ≥ 768px 用 web、< 768px 用 mweb（與 Grid System 同一個斷點）
//   --font-body-r-tc-weight / line-height = 另外在 <html data-platform="ios|android">（WebView）時改讀原生平台的值
//   字級不跟平台走：iOS pt、Android sp 的數值與 mWeb px 相同
// 再產生文字 class：.t-*（中文，tc）/ .n-*（英數，en）。
// class 名稱沿用設計規範與 Figma 的寫法（subtitle-b → .t-subtitle-bold、body-r → .t-body-regular），只在 CLASS() 這一處轉換。
// Guideline 新增字級層級時，重跑就會自動多出對應的 class。
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(root, 'guideline/Typography/kgi-typography.css')
const OUT = join(root, 'app/assets/css/typography.css')

const src = readFileSync(SRC, 'utf8')
const cut = src.indexOf('======== kgi-大字級')
if (cut === -1) throw new Error('找不到「kgi-大字級」分隔線，無法只取主尺度。Guideline 的檔案格式變了？')
const main = src.slice(0, cut).replace(/\/\*[\s\S]*?\*\//g, '')

const tok = new Set()
const levels = []
for (const m of main.matchAll(/--font-([a-z0-9-]+?)-(web|mweb|ios|android)-(tc|en)-(weight|size|line-height)\s*:/g)) {
  const [, level, plat, lang, key] = m
  tok.add(`${level}|${plat}|${lang}|${key}`)
  if (!levels.includes(level)) levels.push(level)
}
if (!levels.length) throw new Error('kgi-typography.css 裡沒有讀到任何主尺度的字級 token。')

const LANGS = ['tc', 'en']
const KEYS = ['size', 'weight', 'line-height']
const missing = []
for (const l of levels) for (const lang of LANGS) for (const p of ['web', 'mweb']) for (const k of KEYS) {
  if (!tok.has(`${l}|${p}|${lang}|${k}`)) missing.push(`--font-${l}-${p}-${lang}-${k}`)
}
if (missing.length) {
  console.error('Guideline 缺少這些 token，無法產生 typography.css：\n  ' + missing.join('\n  '))
  process.exit(1)
}

const CLASS = (l) => l.replace(/-b$/, '-bold').replace(/-r$/, '-regular')
const vars = (plat, keys, indent) => levels.flatMap((l) => LANGS.flatMap((lang) => keys
  .filter((k) => tok.has(`${l}|${plat}|${lang}|${k}`))
  .map((k) => `${indent}--font-${l}-${lang}-${k}: var(--font-${l}-${plat}-${lang}-${k});`))).join('\n')
const rule = (prefix, l, lang, extra = '') =>
  `.${prefix}-${CLASS(l)} { font-size: var(--font-${l}-${lang}-size); font-weight: var(--font-${l}-${lang}-weight); line-height: var(--font-${l}-${lang}-line-height);${extra} }`

const css = `/**
 * 自動產生，請勿手改：npm run theme（scripts/build-typography.mjs，來源 guideline/Typography/kgi-typography.css 主尺度）
 *
 * 文字 class：.t-*（中文）/ .n-*（英文、數字）
 * ${levels.map((l) => `${l} → .t-${CLASS(l)} / .n-${CLASS(l)}`).join('\n * ')}
 *
 * 目前環境的字級 token（Guideline 名稱拿掉平台段）：--font-{level}-{tc|en}-{size|weight|line-height}
 *   ≥ 768px Web、< 768px mWeb（與 Grid System 同一個斷點）；<html data-platform="ios|android">（WebView）時字重、行高改讀原生平台值
 */

:root {
${vars('web', KEYS, '  ')}
}

@media (max-width: 767px) {
  :root {
${vars('mweb', KEYS, '    ')}
  }
}

/* html[data-platform] 的優先權高於 :root（含 @media），不受畫面寬度影響 */
html[data-platform="ios"] {
${vars('ios', ['weight', 'line-height'], '  ')}
}

html[data-platform="android"] {
${vars('android', ['weight', 'line-height'], '  ')}
}

${levels.map((l) => rule('t', l, 'tc')).join('\n')}

${levels.map((l) => rule('n', l, 'en', ' font-feature-settings: "lnum" 1, "pnum" 1;')).join('\n')}
`

if (process.argv.includes('--check')) {
  if (!existsSync(OUT) || readFileSync(OUT, 'utf8') !== css) {
    console.error('app/assets/css/typography.css 與 guideline/ 不同步，請重跑：npm run theme')
    process.exit(1)
  }
  console.log('app/assets/css/typography.css 是最新的')
} else {
  writeFileSync(OUT, css)
  console.log(`typography → app/assets/css/typography.css：${levels.length} 個層級（${levels.join('、')}）`)
}
