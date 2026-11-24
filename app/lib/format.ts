// 顯示格式
// SSR 注意：伺服器與瀏覽器的時區可能不同，日期時間一律以台北時區格式化，避免 hydration mismatch
export const num = (n: number | string) => Number(n).toLocaleString('en-US')
export const twd = (n: number) => `TWD ${num(n)}`

/** 價格：固定兩位小數，例如 106.90 */
export const price = (n: number) => Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

/** 以「萬」為單位（無條件捨去），例如 1,260,000 → 126 */
export const wan = (n: number) => num(Math.floor(n / 10000))

export const pct = (n: number | null | undefined) => (n == null ? '--' : `${num(n)} %`)
export const rate = (r: number) => `${+(r * 100).toFixed(2)} %`

/** 2025-12-28 → 2025/12/28 */
export const date = (iso: string) => iso.replaceAll('-', '/')

const TZ = 'Asia/Taipei'
const fmt = new Intl.DateTimeFormat('en-CA', {
  timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
})

/** Date → 2025/12/28 11:45:11（台北時區） */
export function dateTime(d = new Date()) {
  const p = Object.fromEntries(fmt.formatToParts(d).map((x) => [x.type, x.value]))
  return `${p.year}/${p.month}/${p.day} ${p.hour}:${p.minute}:${p.second}`
}

/** ISO 時間 → [日期, 時間]，例如 ['2025/12/28', '11:45:11'] */
export function dateTimeParts(iso: string): [string, string] {
  const [day = '', time = ''] = dateTime(new Date(iso)).split(' ')
  return [day, time]
}
