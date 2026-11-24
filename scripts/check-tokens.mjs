// 檢查 app/ 有沒有違反設計規範的寫法（對應 plugins/kgi-ui-kit/skills/generate-ui/rules.md 的「禁止」）。有問題會以非 0 結束，可接進 CI。
//   npm run check:tokens           靜態檢查（不需要 build）
//   npm run check:tokens -- --built 另外檢查「class 看似 utility、但 Tailwind 沒產出」（寫了也沒效果，例如 p-13）
//   node <kit>/scripts/check-tokens.mjs <專案路徑>   檢查其他專案的 app/（例如畫面專案：node node_modules/@kgi/ui-kit/scripts/check-tokens.mjs .）
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')   // kit（讀 guideline/ 與字型設定）
// 要檢查的專案：預設 kit 自己；產品 / 畫面專案傳路徑，例如 node node_modules/@kgi/ui-kit/scripts/check-tokens.mjs .
const target = path.resolve(process.argv.slice(2).find((a) => !a.startsWith('--')) ?? root)
const SKIP = ['kgi.css', 'guideline-hover.css', 'typography.css', 'app-theme.css']   // 入口 / 產生檔 / App token 定義檔：允許出現色碼與 px
const files = []
;(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f)
    if (fs.statSync(p).isDirectory()) walk(p)
    else if (/\.(vue|ts|css)$/.test(p) && !SKIP.includes(f)) files.push(p)
  }
})(path.join(target, 'app'))

// Guideline 的「原始色票」（base palette）：規範要求用語意 token（content / container / surface）
// 直接讀 Guideline 原檔
const themeFile = path.join(root, 'guideline/Color_20261016 update/colors.css')
const theme = fs.readFileSync(themeFile, 'utf8')
const base = [...new Set([...theme.matchAll(/--color-([a-z]+)-/g)].map((m) => m[1]))].filter((n) => !['content', 'container', 'surface', 'chart'].includes(n))
const PROP = '(?:text|bg|border|ring|fill|stroke|from|to|via|divide|outline|accent|caret|decoration|shadow)'

// 只有這些檔案可以設定 font-family（規範：根層只設定一次，元件與頁面不要個別指定字體）
const FONT_FAMILY_ALLOWED = ['base.css']

const RULES = [
  ['個別指定字體', /font-family\s*:|(?<![\w-])font-(?:sans|serif|mono|en|tc)(?![\w-])/g, '字體只在 base.css 用 var(--font-sans) 設一次，元件不要指定', FONT_FAMILY_ALLOWED],
  ['任意值（寫死數值）', /(?<![\w-])(?:[a-z-]+:)*-?[a-z]+(?:-[a-z]+)*-\[[^\]]+\]/g, '改用 Guideline token 的 class；沒有對應 token 先問設計'],
  ['寫死色碼', /#[0-9a-fA-F]{8}\b|#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g, '改用 --color-* 語意 token'],
  ['寫死 px', /(?<![\w.-])\d+(?:\.\d+)?px\b/g, '間距 / 圓角用 token；icon 尺寸用 level'],
  ['Tailwind 字級 / 字重 / 行高 class', /(?<![\w-])(?:text-(?:xs|sm|base|lg|xl|\d?xl)|font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black)|leading-[\w./]+|tracking-[\w.]+)(?![\w-])/g, '字級只用 .t-*（中文）/ .n-*（英數）'],
  ['Tailwind 預設色名', new RegExp(`(?<![\\w-])${PROP}-(?:white|black|slate|gray|zinc|neutral|stone|amber|lime|emerald|cyan|violet|purple|fuchsia|pink|rose)(?:-\\d+)?(?![\\w-])`, 'g'), '這些色名不在 Guideline，會沒有效果'],
  ['原始色票（base palette）', new RegExp(`(?<![\\w-])${PROP}-(?:${base.join('|')})-\\d+[a-z]*(?:-\\d+)?(?![\\w-])`, 'g'), '用語意 token（content / container / surface），紅色徽章等特例除外'],
  ['語意用錯：文字用了 container / surface 色', /(?<![\w-])text-(?:container|surface)-[\w-]+/g, 'content 色用在文字；container / surface 色用在背景和邊框'],
]

let problems = 0
for (const f of files) {
  const text = fs.readFileSync(f, 'utf8')
  const lines = text.split('\n')
  for (const [name, re, hint, allowFiles] of RULES) {
    if (allowFiles?.includes(path.basename(f))) continue
    lines.forEach((line, i) => {
      if (/^\s*(\/\/|\*|\/\*|<!--)/.test(line)) return // 註解
      if (line.includes('lint-allow')) return // 特例：data-lint-allow="原因"（例如規範允許的紅色徽章）
      for (const m of line.matchAll(re)) {
        problems++
        console.log(`${path.relative(target, f)}:${i + 1}  ${name}: ${m[0]}\n    → ${hint}`)
      }
    })
  }
}

// 字重涵蓋檢查：Guideline 字級 token 用到的字重，Google Fonts <link> 都要載入，否則瀏覽器會合成假粗體
{
  const typo = fs.readFileSync(path.join(root, 'guideline/Typography/kgi-typography.css'), 'utf8').split('kgi-大字級(「標準」')[0] // 主尺度（大字級段落之前）
  const need = { tc: new Set(), en: new Set() }
  for (const m of typo.matchAll(/--font-[a-z-]+?-(?:web|mweb)-(tc|en)-weight:\s*(\d+)/g)) need[m[1]].add(Number(m[2]))
  if (!need.tc.size || !need.en.size) { problems++; console.log('Guideline 字級檔讀不到字重 token（檔案格式可能變了），字重檢查無法執行，請更新 scripts/check-tokens.mjs') }
  const html = fs.readFileSync(path.join(root, 'nuxt.config.ts'), 'utf8')
  const link = html.match(/fonts\.googleapis\.com\/css2\?([^'"]+)['"]/)?.[1] ?? ''
  const have = (family) => new Set((link.match(new RegExp(`family=${family}:wght@([\\d;]+)`))?.[1] ?? '').split(';').filter(Boolean).map(Number))
  for (const [lang, family, label] of [['tc', 'Noto\\+Sans\\+TC', 'Noto Sans TC（中文）'], ['en', 'Montserrat', 'Montserrat（英數）']]) {
    const miss = [...need[lang]].filter((w) => !have(family).has(w))
    if (miss.length) { problems++; console.log(`nuxt.config.ts  Google Fonts 少載入 ${label} 字重 ${miss.join(', ')}（Guideline 字級 token 有用到）`) }
  }
}

if (process.argv.includes('--built')) {
  const dist = path.join(target, '.output/public/_nuxt')
  const cssFile = fs.existsSync(dist) && fs.readdirSync(dist).find((f) => f.startsWith('entry') && f.endsWith('.css'))
  if (!cssFile) { console.log('找不到 .output/，請先 npm run build'); process.exit(2) }
  const css = fs.readFileSync(path.join(dist, cssFile), 'utf8')
  const esc = (c) => c.replace(/([:/.[\]%])/g, '\\$1')
  for (const f of files.filter((p) => p.endsWith('.vue'))) {
    const text = fs.readFileSync(f, 'utf8').split('\n').filter((l) => !/^\s*(\/\/|\*|\/\*|<!--)/.test(l)).join('\n')
    const attrs = new Set([...text.matchAll(/[\s:@]([a-z][\w-]*)=/g)].map((m) => m[1])) // 屬性名（例如 text-class="…"）不是 class
    for (const tok of new Set(text.split(/[\s"'`<>=(){},;]+/))) {
      if (attrs.has(tok) || !/^(?:[a-z-]+:)*-?[a-z]+(?:-[a-z0-9]+)+(?:\/\d+)?$/.test(tok)) continue
      if (/^(?:v-|aria-|data-|sheet-|bg-overlay$)/.test(tok) || /^(t|n)-(display|headline|title|subtitle|body|caption)/.test(tok)) continue
      if (!css.includes('.' + esc(tok)) && /^(?:[a-z-]+:)*(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|gap|size|w|h|text|bg|border|rounded|shadow|min-w|max-w|max-h|min-h|top|bottom|left|right|inset|z|opacity|flex|items|justify)(?:-|$)/.test(tok)) {
        problems++
        console.log(`${path.relative(target, f)}  Tailwind 沒有產出（寫了也沒效果）: ${tok}`)
      }
    }
  }
}

console.log(problems ? `\n✗ ${problems} 個問題` : `✓ ${files.length} 個檔案，沒有違反規範的寫法`)
process.exit(problems ? 1 : 0)
