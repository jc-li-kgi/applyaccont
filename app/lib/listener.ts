import { getCurrentInstance } from 'vue'

/** 父層有沒有綁這個事件（例如 `onBack`）。對應 ui-kit 的「有傳 onXxx 才顯示」行為，要在 setup 同步呼叫 */
export const hasListener = (name: string) => !!getCurrentInstance()?.vnode.props?.[name]
