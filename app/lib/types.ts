// 元件共用型別
export interface InfoContent { title: string; body: string }
export interface Option<V extends string | number = string> { value: V; label: string; desc?: string }
export interface TextAction { label: string; onClick: () => void }
export type IconLevel = 'caption' | 'body' | 'subtitle'

/** 選項可給純值或 { value, label, desc }，統一轉成 Option */
export const toOptions = <V extends string | number>(list: (V | Option<V>)[]): Option<V>[] =>
  list.map((o) => (typeof o === 'object' ? o : { value: o, label: String(o) }))
