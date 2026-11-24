// 長按：按住 ms 毫秒後觸發 onLongPress（手指移動或放開就取消）
// 回傳 { handlers, fired }：handlers 用 v-on="handlers" 綁到元素上；fired() = 這次按壓是否已觸發長按（用來略過接著的 click）
export function useLongPress(onLongPress: () => void, ms = 2000) {
  let timer: ReturnType<typeof setTimeout> | undefined
  let fired = false
  const start = () => {
    fired = false
    timer = setTimeout(() => {
      fired = true
      onLongPress()
    }, ms)
  }
  const cancel = () => clearTimeout(timer)
  return {
    handlers: {
      touchstart: start,
      touchend: cancel,
      touchmove: cancel,
      mousedown: start,
      mouseup: cancel,
      mouseleave: cancel,
      contextmenu: (e: Event) => e.preventDefault(), // 手機長按不跳出系統選單
    },
    fired: () => fired,
  }
}
