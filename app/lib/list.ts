// KgiListTable / KgiListRow 共用：欄位對齊（完整 class 字串，Tailwind 才掃得到）與 provide key
export type CellAlign = 'left' | 'center' | 'right'
export const CELL_ALIGN: Record<CellAlign, string> = {
  left: 'justify-self-start text-left',
  center: 'justify-self-center text-center',
  right: 'justify-self-end text-right',
}
export const LIST_COLS_KEY = 'kgiListCols'
