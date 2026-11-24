// 底部導覽項目。沒有 to 的項目 = 未開放（顯示 Toast）
// 預設項目是證券 App 的 6 個；新專案請傳入自己的 items
export interface NavItem { key: string; label: string; to?: string; icon: { name: string; size?: number; width?: number; height?: number } | 'fund' }
export const BOTTOM_NAV_ITEMS: NavItem[] = [
  { key: 'mine', label: '我的', to: '/home', icon: { name: 'nav-rate.svg', size: 20 } },
  { key: 'pick', label: '選股', icon: 'fund' },
  { key: 'watch', label: '自選', icon: { name: 'nav-watchlist.svg', width: 13.334, height: 16.666 } },
  { key: 'order', label: '下單', icon: { name: 'nav-transfer.svg', size: 20 } },
  { key: 'account', label: '帳務', to: '/account', icon: { name: 'nav-account.svg', width: 14.5839, height: 14.5834 } },
  { key: 'more', label: '更多', icon: { name: 'nav-menu.svg', width: 16.6667, height: 11.25 } },
]

