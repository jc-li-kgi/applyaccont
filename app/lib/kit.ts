// 元件預設文字、Toast、金額規則（對應 ui-kit 的 src/kit.js）。新專案依需要修改 COPY
import { ref } from 'vue'

export const COPY = {
  common: {
    notAvailable: '此功能未開放於本次測試',
    gotIt: '我知道了',   // KgiDialog 預設按鈕
    expand: '展開明細',  // KgiExpandButton
    collapse: '收闔明細',
    close: '關閉',
    back: '返回',
    share: '分享',
  },
}

/* Toast：useToast().show('訊息') 顯示 1.8 秒；版面放一個 <KgiToast />
 * SSR：message 是模組層級的單例，只能在瀏覽器（事件處理）裡呼叫 show()，伺服器端呼叫會被忽略，避免跨請求共用狀態 */
const message = ref<string | null>(null)
export const TOAST_DURATION = 1800

export function useToast() {
  const show = (text: string) => {
    if (typeof window === 'undefined') return
    message.value = null
    queueMicrotask(() => (message.value = text))
  }
  const clear = () => (message.value = null)
  return { message, show, clear }
}

/* 金額輸入：依級距取整並限制在範圍內 */
export interface AmountRange { min: number; max: number; step: number }
export function clampAmount(value: number | string, range: AmountRange) {
  const n = Number(value) || 0
  const stepped = Math.round(n / range.step) * range.step
  return Math.min(range.max, Math.max(range.min, stepped))
}
