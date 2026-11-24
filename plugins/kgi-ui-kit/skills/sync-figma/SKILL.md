---
name: sync-figma
description: 從 Figma 補充或更新 KGI ui kit 的 Foundation（顏色、字級、間距、圓角、陰影、Grid、Icon、插畫）或元件。使用者給 Figma 連結並說「補 foundation」「補元件」「更新元件」「同步 Figma」「從 Figma 補到 ui kit」「比對 Figma 和 guideline」「這個元件照 Figma 改」時使用。只在 kit repo（@kgi/ui-kit）裡執行。要用 kit 做頁面、畫面、介面，用 generate-ui。
---

# sync-figma：從 Figma 補充 ui kit

目標：**Figma 和 kit 的差異一項一項列給使用者決定，決定後才改**。不自己判斷哪一邊對。

## 前置：一定要在 kit repo 裡

- 根目錄 `package.json` 的 `name` 是 `@kgi/ui-kit`，而且有 `guideline/`、`app/components/` → 繼續。
- **不是**（例如產品或畫面專案，kit 在 `node_modules/@kgi/ui-kit/`）→ 停止，告訴使用者：kit 要在 kgi-ui-kit repo 裡改（`git clone` 後打開那個資料夾），不能改 `node_modules` 裡的 kit；只是要做頁面請用 generate-ui。
- 規範在 `plugins/kgi-ui-kit/skills/generate-ui/rules.md`（kit 的 `CLAUDE.md` 已載入）；開發規範在 `CLAUDE.md`。

## 流程

1. **確認範圍**：使用者給的 Figma 連結（section / node）與要補的項目。沒有連結 → 請使用者給連結，不要自己找。
2. **讀稿**：照 `rules.md` 的「Figma 讀稿」。用 Figma MCP：`get_metadata`（結構）、`get_variable_defs`（實際套用的變數、文字樣式）、`get_screenshot`；表格、元件實例裡的文字讀不到時用 `get_design_context` 或截圖。Figma 沒連上 → 請使用者在 Claude Code 用 `/mcp` 登入 Figma。
3. **比對**：
   - Foundation → 比對 `guideline/`（顏色 `Color_*/colors.css`、字級 `Typography/kgi-typography.css`、間距 `Spacing/`、圓角 `Radius/`、陰影 `Shadow/`）。
   - 元件 → 比對 `app/components/<分類>/Kgi*.vue` 的樣式與 props，以及 `rules.md`。
4. **回報差異**（見「回報格式」），然後**停下來等使用者逐項決定**：照 Figma、照 kit，或先不動。
5. **修改**（只改使用者同意的項目）：
   - Guideline：改 `guideline/` 原檔。
   - 元件：改 `app/components/<分類>/Kgi*.vue`；新元件照 `CLAUDE.md` 的「元件規則」（`Kgi` 前綴、資料夾 = Figma / Storybook 分類、補 story 的 `component` / `subcomponents`、加到 `app/kgi.ts`、開頭 `//` 註解寫用途）。
   - 使用規範：改 `rules.md`（唯一一份，不要抄到其他檔案）。
6. **產生**：改了 `guideline/` → `npm run theme`；改了元件或 story → `npm run components`。
7. **檢查**：`npm run theme:check`、`npm run check:tokens`、`npm run typecheck`，全部通過才算完成。
8. **看畫面**：`npm run storybook`，對照 Figma 截圖確認。
9. **記錄**：`CHANGELOG.md`，Guideline 數值的修改寫在「規範」段（原本 → 修改後、依據）。⚠️ 標不相容變更。
10. **回報**做了什麼、檢查結果。**使用者說 commit 才 commit**；要發版照 `docs/WORKFLOW.md`（改 `version`、打 tag；改了 `plugins/kgi-ui-kit/` 的檔案要升 `plugin.json` 版本並重新發佈 plugin）。

## 必須遵守

- **差異只回報，不決定。** Figma 與 `guideline/`、元件不同時，列出兩邊的值與位置，由使用者決定採用哪一方。
- **`guideline/` 只有使用者說要改時才改**，也不精簡、不重新整理 Guideline 原檔。
- 不回報圖層命名、手打標註文字的問題，只回報實際數值的差異。
- 一次只處理使用者給的範圍；看到範圍外的問題，列在回報最後「範圍外」，不改。

## 回報格式

```
來源：Figma <section 名稱>（node 1234:5678）

| # | 項目 | Figma | kit | 位置 |
|---|---|---|---|---|
| 1 | Caption-R mWeb 字級 | 13px | 14px | guideline/Typography/kgi-typography.css |
| 2 | 買進底色 | red-600 #B01700 | red-400 #DD4F2C | guideline/Color_20261016 update/colors.css |

一致：Body-R、Subtitle-B、Title（共 12 項）
範圍外：（沒有就省略）

請逐項回覆：照 Figma / 照 kit / 先不動
```
