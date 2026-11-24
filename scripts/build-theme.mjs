// 從 guideline/ 產生 Tailwind 3.4 需要的兩個檔案（Guideline 更新後跑 npm run theme）
//
//   1. tailwind.guideline.preset.ts      Guideline token → Tailwind class 的對照（值一律是 var(--…)，不複製數值）
//   2. app/assets/css/guideline-hover.css Hover 色：Guideline 規定由 HSB Brightness 運算，沒有色票，所以要算出來
//
// Guideline 的 CSS 變數本身（colors / spacing / radius / shadow）由 app/assets/css/kgi.css 直接 @import，不在這裡複製。
//
// Hover 規則（guideline/Color…/colors.css 標頭、color-state-utils.ts）：只調整 HSB 的 Brightness
//                            Light   Dark
//   Brightness ≤ 32%          +10%    +15%
//   33% ≤ Brightness ≤ 86%    −10%    +10%
//   Brightness ≥ 87%          −5%     −15%
// 範圍：surface / content / container 語意色（不含 disabled、overlay）；半透明色不算。
//
//   node scripts/build-theme.mjs           產生
//   node scripts/build-theme.mjs --check   只檢查是否為最新（CI 用）
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const G = path.join(root, 'guideline')
const CHECK = process.argv.includes('--check')

const FILES = {
  colors: path.join(G, 'Color_20261016 update/colors.css'),
  spacing: path.join(G, 'Spacing/spacing.css'),
  borderRadius: path.join(G, 'Radius/radius-tokens.css'),
  boxShadow: path.join(G, 'Shadow/shadow.css'),
}
// Tailwind theme 鍵 → 變數前綴（去掉前綴就是 class 名稱：--spacing-16 → p-16）
const PREFIX = { colors: '--color-', spacing: '--spacing-', borderRadius: '--radius-', boxShadow: '--shadow-' }

const strip = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '')
const blocks = (css) => [...strip(css).matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({ selector: m[1].trim(), body: m[2] }))
const decls = (body) => [...body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim().replace(/\s+/g, ' ')])

const light = {} // theme 鍵 → Map(變數, 值)
const dark = new Map()
for (const [key, file] of Object.entries(FILES)) {
  light[key] = new Map()
  for (const { selector, body } of blocks(fs.readFileSync(file, 'utf8'))) {
    if (selector === ':root') for (const [k, v] of decls(body)) light[key].set(k, v)
    else if (selector.includes('data-theme="dark"')) for (const [k, v] of decls(body)) dark.set(k, v)
  }
}

/* ---------- Hover ---------- */
function resolveHex(decl, name, depth = 0) {
  const v = decl.get(name)
  if (!v || depth > 10) return null
  const ref = v.match(/^var\((--[\w-]+)\)$/)
  if (ref) return resolveHex(decl, ref[1], depth + 1)
  const hex = v.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)
  if (!hex) return null
  return '#' + (hex[1].length === 3 ? [...hex[1]].map((c) => c + c).join('') : hex[1]).toUpperCase()
}
const hexToRgb = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
function rgbToHsb(r, g, b) {
  const [rr, gg, bb] = [r, g, b].map((x) => x / 255)
  const max = Math.max(rr, gg, bb), delta = max - Math.min(rr, gg, bb)
  let h = 0
  if (delta !== 0) {
    if (max === rr) h = ((gg - bb) / delta) % 6
    else if (max === gg) h = (bb - rr) / delta + 2
    else h = (rr - gg) / delta + 4
    h *= 60; if (h < 0) h += 360
  }
  return { h, s: max === 0 ? 0 : (delta / max) * 100, b: max * 100 }
}
function hsbToRgb(h, s, v) {
  const ss = s / 100, vv = v / 100, c = vv * ss, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = vv - c
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x]
  return [r, g, b].map((k) => Math.round((k + m) * 255))
}
const toHex = (rgb) => '#' + rgb.map((n) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0')).join('').toUpperCase()
const DELTA = { light: (b) => (b <= 32 ? 10 : b >= 87 ? -5 : -10), dark: (b) => (b <= 32 ? 15 : b >= 87 ? -15 : 10) }
const HOVER_SCOPE = /^--color-(surface|content|container)-/
const HOVER_SKIP = /disabled|overlay|-hover$/

function hoverTokens(decl, mode) {
  const out = []
  for (const name of decl.keys()) {
    if (!HOVER_SCOPE.test(name) || HOVER_SKIP.test(name)) continue
    const hex = resolveHex(decl, name)
    if (!hex) continue
    const { h, s, b } = rgbToHsb(...hexToRgb(hex))
    const d = DELTA[mode](b)
    out.push([`${name}-hover`, toHex(hsbToRgb(h, s, Math.max(0, Math.min(100, b + d)))), `${hex} (B ${Math.round(b)}%) → ${d > 0 ? '+' : '−'}${Math.abs(d)}%`])
  }
  return out
}
const hoverLight = hoverTokens(light.colors, 'light')
const hoverDark = hoverTokens(new Map([...light.colors, ...dark]), 'dark') // Dark 沒列到的沿用 Light
const hoverLines = (list) => list.map(([k, hex, note]) => `  ${k}: ${hex}; /* ${note} */`).join('\n')

const hoverCss = `/* 自動產生：npm run theme（來源 guideline/，不要手動修改）
 * Hover 色：Guideline 規定由容器 / 文字色的 HSB Brightness 運算，沒有獨立色票。
 * 用法：hover:bg-container-general-active-primary-hover、active:bg-…-hover */

:root {
${hoverLines(hoverLight)}
}

[data-theme="dark"] {
${hoverLines(hoverDark)}
}
`

/* ---------- Tailwind preset ---------- */
const theme = {
  colors: { transparent: 'transparent', current: 'currentColor', inherit: 'inherit' },
  spacing: {},
  borderRadius: {},
  boxShadow: { none: 'none' },
}
for (const [key, vars] of Object.entries(light)) {
  for (const name of vars.keys()) {
    if (name.startsWith(PREFIX[key])) theme[key][name.slice(PREFIX[key].length)] = `var(${name})`
  }
}
for (const name of new Set([...hoverLight, ...hoverDark].map(([k]) => k))) theme.colors[name.slice('--color-'.length)] = `var(${name})`

const row = ([k, v]) => `      ${JSON.stringify(k)}: ${JSON.stringify(v)},`
const section = (key) => `    ${key}: {\n${Object.entries(theme[key]).map(row).join('\n')}\n    },`

const preset = `/**
 * 自動產生：npm run theme（來源 guideline/，不要手動修改）
 * Guideline token → Tailwind 3.4 class。值都是 var(--…)：數值只存在 guideline/ 的 CSS 裡。
 *   --color-content-general-primary → text-content-general-primary / bg-… / border-…
 *   --spacing-16 → p-16 / gap-16（16px，不是 Tailwind 預設的 64px）
 *   --radius-medium → rounded-medium　　--shadow-popover → shadow-popover
 * 這裡「取代」Tailwind 預設值，只能用 Guideline 有的 token。字級用 .t-* / .n-*（typography.css）。
 * 顏色不能加透明度修飾（bg-x/50）：Guideline 的半透明色是獨立 token。
 */
import type { Config } from 'tailwindcss'

export default {
  // 與 Guideline 一樣用 <html data-theme="dark"> 切換（token 會跟著變，通常不需要 dark: 前綴）
  darkMode: ['selector', '[data-theme="dark"]'],
  // hover: 只在支援 hover 的裝置生效（手機點一下不會黏在 hover 狀態）
  future: { hoverOnlyWhenSupported: true },
  theme: {
${section('colors')}
${section('spacing')}
${section('borderRadius')}
${section('boxShadow')}
    fontSize: {},
    fontFamily: {},
    lineHeight: {},
    letterSpacing: {},
  },
} satisfies Partial<Config>
`

const outputs = [
  { file: path.join(root, 'app/assets/css/guideline-hover.css'), content: hoverCss },
  { file: path.join(root, 'tailwind.guideline.preset.ts'), content: preset },
]
const rel = (f) => path.relative(root, f)
if (CHECK) {
  const stale = outputs.filter((o) => !fs.existsSync(o.file) || fs.readFileSync(o.file, 'utf8') !== o.content)
  if (stale.length) {
    console.error(`${stale.map((o) => rel(o.file)).join('、')} 與 guideline/ 不同步，請重跑：npm run theme`)
    process.exit(1)
  }
  console.log(`${outputs.map((o) => rel(o.file)).join('、')} 是最新的`)
} else {
  for (const o of outputs) fs.writeFileSync(o.file, o.content)
  const n = (k) => Object.keys(theme[k]).length
  console.log(`theme → ${outputs.map((o) => rel(o.file)).join('、')}  colors ${n('colors')}（含 hover ${hoverLight.length}）/ spacing ${n('spacing')} / radius ${n('borderRadius')} / shadow ${n('boxShadow')}`)
}
