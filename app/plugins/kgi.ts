import { setAssetBase } from '../lib/assets'

// icon 網址跟著 app.baseURL（部署在子路徑時也正確）
export default defineNuxtPlugin(() => {
  setAssetBase(useRuntimeConfig().app.baseURL)
})
