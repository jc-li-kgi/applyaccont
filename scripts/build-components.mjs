// 從元件原始碼自動產生元件清單（不要手抄 props）：
//   components.json                                        給程式 / 工具用
//   plugins/kgi-ui-kit/skills/generate-ui/components-api.md     給 AI 讀（generate-ui skill 生成頁面時查 props）
//
//   node scripts/build-components.mjs           產生
//   node scripts/build-components.mjs --check   只檢查是否為最新（CI 用）
//
// 來源：
//   - props / v-model / 事件 / slot：vue-component-meta 讀 app/components/**/Kgi*.vue（與 Storybook 的 props 表同一套工具）
//   - 說明：元件 <script setup> 開頭的 // 註解（或 template 開頭的 <!-- --> 註解）
//   - 分類：stories/**/*.stories.ts 的 title、component、subcomponents（與 Storybook 側欄相同）
//   - 檢查：元件所在資料夾必須 = 分類（app/components/<分類 kebab-case>/），不一致就以錯誤結束
import fs from 'node:fs'
import path from 'node:path'
import { createCheckerByJson } from 'vue-component-meta'

const root = path.resolve(import.meta.dirname, '..')
const CHECK = process.argv.includes('--check')
const rel = (p) => path.relative(root, p).split(path.sep).join('/')

/* ---------- 元件檔 ---------- */
const files = []
;(function walk(d) {
  for (const f of fs.readdirSync(d).sort()) {
    const p = path.join(d, f)
    if (fs.statSync(p).isDirectory()) walk(p)
    else if (/^Kgi\w+\.vue$/.test(f)) files.push(p)
  }
})(path.join(root, 'app/components'))

/* ---------- 分類：讀 stories ---------- */
const category = {}
;(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f)
    if (fs.statSync(p).isDirectory()) { walk(p); continue }
    if (!f.endsWith('.stories.ts')) continue
    const src = fs.readFileSync(p, 'utf8')
    // 只認 Foundations / Components / Patterns 開頭的 title（避免抓到範例資料裡的 title 欄位）
    const title = src.match(/title:\s*'((?:Foundations|Components|Patterns)\/[^']+)'/)?.[1]
    if (!title) continue
    const names = [src.match(/component:\s*(Kgi\w+)/)?.[1], ...(src.match(/subcomponents:\s*\{([^}]*)\}/)?.[1].match(/Kgi\w+/g) ?? [])]
    for (const n of names) if (n && !category[n]) category[n] = title
  }
})(path.join(root, 'stories'))

/* ---------- 說明：開頭註解 ---------- */
function description(src) {
  const script = src.match(/<script setup[^>]*>([\s\S]*?)<\/script>/)?.[1]
  if (script) {
    const lines = []
    for (const line of script.split('\n')) {
      const t = line.trim()
      if (t.startsWith('//')) lines.push(t.replace(/^\/\/\s?/, ''))
      else if (t && !t.startsWith('import ') && lines.length) break
    }
    if (lines.length) return lines.join('\n')
  }
  return src.match(/<template>\s*<!--\s*([\s\S]*?)\s*-->/)?.[1]?.trim() ?? ''
}

/* ---------- props / 事件 / slot ---------- */
const checker = createCheckerByJson(root, {
  include: ['app/components/**/*.vue'],
  compilerOptions: { strict: true, target: 'ESNext', module: 'ESNext', moduleResolution: 'Bundler', jsx: 'preserve', skipLibCheck: true },
}, { forceUseTs: true, schema: false, printer: { newLine: 1 } })

const clean = (s) => (s ?? '').replace(/\s+/g, ' ').replace(/ \| undefined/g, '').trim()
const clip = (s, n = 140) => (s.length > n ? s.slice(0, n - 1) + '…' : s)

const components = files.map((file) => {
  const name = path.basename(file, '.vue')
  const src = fs.readFileSync(file, 'utf8')
  const meta = checker.getComponentMeta(file)
  const models = [...src.matchAll(/defineModel<([^>]+(?:<[^>]+>)?[^>]*)>\((?:'(\w+)')?/g)].map((m) => ({ name: m[2] ?? 'modelValue', type: clean(m[1]) }))
  const modelProps = new Set(models.flatMap((m) => [m.name, `onUpdate:${m.name}`, `${m.name === 'modelValue' ? 'model' : m.name}Modifiers`]))
  const props = meta.props
    .filter((p) => !p.global && !modelProps.has(p.name) && !p.name.endsWith('Modifiers'))
    .map((p) => ({ name: p.name, type: clip(clean(p.type)), required: p.required, ...(p.default !== undefined ? { default: clean(p.default) } : {}) }))
  const events = meta.events.filter((e) => !e.name.startsWith('update:')).map((e) => ({ name: e.name, type: clip(clean(e.type)) }))
  const slots = meta.slots.map((s) => ({ name: s.name, type: clip(clean(s.type)) }))
  return { name, category: category[name] ?? '（未分類）', file: rel(file), description: description(src), props, models, events, slots }
})

/* ---------- 檢查：資料夾 = 分類 ---------- */
// 元件放在 app/components/<分類>/，資料夾名稱 = Storybook 分類最後一段的 kebab-case（「Components/Toast & Snackbar」→ toast-snackbar）
const kebab = (s) => s.split('/').pop().toLowerCase().replace(/&/g, ' ').trim().replace(/\s+/g, '-')
const misplaced = components.filter((c) => c.category === '（未分類）' || c.file.split('/')[2] !== kebab(c.category))
if (misplaced.length) {
  console.error('元件資料夾與 Storybook 分類不一致（新元件要先補 story 的 component / subcomponents，再放到對應資料夾）：')
  for (const c of misplaced) console.error(`  ${c.file}：分類 ${c.category}${c.category === '（未分類）' ? '' : ` → 應放在 app/components/${kebab(c.category)}/`}`)
  process.exit(1)
}

/* ---------- 輸出 ---------- */
const json = JSON.stringify({ generatedBy: 'scripts/build-components.mjs', components }, null, 2) + '\n'

const order = (c) => (c.startsWith('Patterns') ? 0 : c.startsWith('Foundations') ? 1 : c.startsWith('Components') ? 2 : 3)
const groups = new Map()
for (const c of [...components].sort((a, b) => order(a.category) - order(b.category) || a.category.localeCompare(b.category) || a.name.localeCompare(b.name))) {
  if (!groups.has(c.category)) groups.set(c.category, [])
  groups.get(c.category).push(c)
}
const esc = (s) => s.replace(/\|/g, '\\|')
const block = (c) => {
  const out = [`### ${c.name}`, '']
  if (c.description) out.push(...c.description.split('\n').map((l) => `> ${l}`), '')
  const rows = [
    ...c.models.map((m) => `| \`v-model${m.name === 'modelValue' ? '' : ':' + m.name}\` | \`${esc(m.type)}\` | | |`),
    ...c.props.map((p) => `| \`${p.name}\` | \`${esc(p.type)}\` | ${p.required ? '必填' : ''} | ${p.default !== undefined ? `\`${esc(p.default)}\`` : ''} |`),
  ]
  if (rows.length) out.push('| prop | 型別 | 必填 | 預設 |', '|---|---|---|---|', ...rows, '')
  if (c.events.length) out.push(`事件：${c.events.map((e) => `\`@${e.name}\``).join('、')}`, '')
  if (c.slots.length) out.push(`slot：${c.slots.map((s) => (s.name === 'default' ? '預設' : `\`#${s.name}\``)).join('、')}`, '')
  return out.join('\n')
}
const md = `<!-- 自動產生，請勿手改：npm run components（scripts/build-components.mjs，讀元件原始碼） -->
# 元件 API（自動產生）

${components.length} 個元件，依 Storybook / Figma 分類排列。props 名稱在 template 裡用 kebab-case（\`labelClass\` → \`label-class\`）。
常用叫法 → 元件的對照、選用規則、kit 還沒有的元件，見同資料夾的 \`components.md\`。

${[...groups].map(([cat, list]) => `## ${cat}\n\n${list.map(block).join('\n')}`).join('\n')}`

const outputs = [
  { file: path.join(root, 'components.json'), content: json },
  { file: path.join(root, 'plugins/kgi-ui-kit/skills/generate-ui/components-api.md'), content: md },
]
if (CHECK) {
  const stale = outputs.filter((o) => !fs.existsSync(o.file) || fs.readFileSync(o.file, 'utf8') !== o.content)
  if (stale.length) { console.error(`${stale.map((o) => rel(o.file)).join('、')} 不是最新的，請重跑：npm run components`); process.exit(1) }
  console.log(`${outputs.map((o) => rel(o.file)).join('、')} 是最新的`)
} else {
  for (const o of outputs) fs.writeFileSync(o.file, o.content)
  const uncategorized = components.filter((c) => c.category === '（未分類）').map((c) => c.name)
  console.log(`components → ${outputs.map((o) => rel(o.file)).join('、')}：${components.length} 個元件${uncategorized.length ? `；未分類：${uncategorized.join('、')}` : ''}`)
}
