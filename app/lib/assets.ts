// icon / 插圖路徑：public/kgi/icons/（加上 kgi/ 命名空間，避免與產品專案的 public/assets/ 撞名）
// Nuxt 由 plugins/kgi.ts 依 app.baseURL 設定；Storybook 用預設的 '/'
let base = '/'
export function setAssetBase(b: string) {
  base = b.endsWith('/') ? b : `${b}/`
}
export const iconUrl = (name: string) => `${base}kgi/icons/${name}`
