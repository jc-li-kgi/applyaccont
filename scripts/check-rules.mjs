// 檢查「使用規範只有一份」：plugins/kgi-ui-kit/skills/generate-ui/rules.md
//
//   node scripts/check-rules.mjs     （npm run theme:check 會一起跑）
//
// 1. rules.md 裡的間距、圓角、陰影清單要與 guideline/ 的 token 一致（Guideline 更新後提醒改 rules.md）
// 2. CLAUDE.md 要用 @ 載入 rules.md
// 3. 其他文件不准再抄一份間距清單或間距表（要改規則只改 rules.md）
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8')
const RULES = 'plugins/kgi-ui-kit/skills/generate-ui/rules.md'
const rules = read(RULES)
const errors = []

/* ---------- 1. 清單與 guideline 一致 ---------- */
const tokens = (file, prefix) => [...read(file).matchAll(new RegExp(`${prefix}([\\w-]+)\\s*:`, 'g'))].map((m) => m[1])
const same = (a, b) => a.length === b.length && a.every((x) => b.includes(x))

const spacingG = [...new Set(tokens('guideline/Spacing/spacing.css', '--spacing-'))].map(Number).sort((a, b) => a - b)
const spacingR = rules.match(/\*\*只有這些間距值\*\*：([\d /]+)/)?.[1].split('/').map((s) => Number(s.trim())) ?? []
if (!same(spacingG, spacingR)) errors.push(`${RULES} 的間距清單（${spacingR.join(' / ')}）與 guideline/Spacing/spacing.css（${spacingG.join(' / ')}）不一致`)

const list = (heading, prefix) => {
  const sec = rules.split(/^## /m).find((s) => s.startsWith(heading)) ?? ''
  return sec.match(new RegExp(`\`${prefix}-([\\w /-]+)\``))?.[1].split('/').map((s) => s.trim()) ?? []
}
for (const [heading, cls, file, prefix] of [
  ['圓角', 'rounded', 'guideline/Radius/radius-tokens.css', '--radius-'],
  ['陰影', 'shadow', 'guideline/Shadow/shadow.css', '--shadow-'],
]) {
  const g = [...new Set(tokens(file, prefix))]
  const r = list(heading, cls)
  if (!same(g, r)) errors.push(`${RULES} 的${heading}清單（${r.join(' / ')}）與 ${file}（${g.join(' / ')}）不一致`)
}

/* ---------- 2. CLAUDE.md 載入 rules.md ---------- */
if (!read('CLAUDE.md').includes(`@${RULES}`)) errors.push(`CLAUDE.md 沒有載入 @${RULES}`)

/* ---------- 3. 不准重複 ---------- */
const DUP = [
  [/0 \/ 2 \/ 4 \/ 8/, '間距清單'],
  [/^\|\s*(頁首與整體內容|頁首 ?→ ?內容|區塊與區塊|區塊之間)\s*\|/m, '間距表'],
  [/^\|\s*`--color-content-general-primary`\s*\|\s*`text-content-general-primary`/m, 'token → class 對照表'],
]
const docs = ['CLAUDE.md', 'README.md', 'CONFLICTS.md', 'plugins/kgi-ui-kit/skills/generate-ui/SKILL.md', 'plugins/kgi-ui-kit/skills/sync-figma/SKILL.md', 'plugins/kgi-ui-kit/skills/generate-ui/components.md', 'plugins/kgi-ui-kit/skills/generate-ui/page-spec.md', 'stories/foundations/Overview.mdx', 'stories/components/Overview.mdx']
for (const f of docs) {
  if (!fs.existsSync(path.join(root, f))) continue
  const src = read(f)
  for (const [rx, what] of DUP) if (rx.test(src)) errors.push(`${f} 又抄了一份${what}，請刪掉並改成引用 ${RULES}`)
}

if (errors.length) {
  console.error('使用規範檢查失敗：')
  for (const e of errors) console.error('  ' + e)
  process.exit(1)
}
console.log(`rules → ${RULES} 是唯一一份，間距 ${spacingR.length} / 圓角 / 陰影清單與 guideline 一致`)
