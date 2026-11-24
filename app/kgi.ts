// @kgi/ui-kit 元件總表：Nuxt 內不需要 import（<KgiButton> 自動註冊）；Storybook、單元測試或非 Nuxt 專案從這裡明確 import
//   import { KgiButton, KgiDialog, useToast } from '@kgi/ui-kit/components'
// 元件依 Figma / Storybook 分類放在 app/components/<分類>/（資料夾名稱 = Storybook 分類的 kebab-case）

// accordion
export { default as KgiCollapsibleCard } from './components/accordion/KgiCollapsibleCard.vue'
export { default as KgiExpandButton } from './components/accordion/KgiExpandButton.vue'
export { default as KgiExpandToggle } from './components/accordion/KgiExpandToggle.vue'

// action-sheet
export { default as KgiSheet } from './components/action-sheet/KgiSheet.vue'
export { default as KgiSheetOptions } from './components/action-sheet/KgiSheetOptions.vue'

// banner
export { default as KgiNoticeCard } from './components/banner/KgiNoticeCard.vue'

// bottom-navigation
export { default as KgiBottomNav } from './components/bottom-navigation/KgiBottomNav.vue'

// button
export { default as KgiButton } from './components/button/KgiButton.vue'
export { default as KgiIconAction } from './components/button/KgiIconAction.vue'

// calculation
export { default as KgiAmountField } from './components/calculation/KgiAmountField.vue'
export { default as KgiQtyStepper } from './components/calculation/KgiQtyStepper.vue'

// card
export { default as KgiAmountHero } from './components/card/KgiAmountHero.vue'
export { default as KgiDetailCard } from './components/card/KgiDetailCard.vue'
export { default as KgiDetailPanel } from './components/card/KgiDetailPanel.vue'
export { default as KgiDetailRow } from './components/card/KgiDetailRow.vue'
export { default as KgiFeeCard } from './components/card/KgiFeeCard.vue'
export { default as KgiServiceCardList } from './components/card/KgiServiceCardList.vue'
export { default as KgiStatGroup } from './components/card/KgiStatGroup.vue'
export { default as KgiStatementCard } from './components/card/KgiStatementCard.vue'
export { default as KgiStockPickCard } from './components/card/KgiStockPickCard.vue'
export { default as KgiSummaryCard } from './components/card/KgiSummaryCard.vue'

// carousel
export { default as KgiCarousel } from './components/carousel/KgiCarousel.vue'

// checkbox
export { default as KgiCheckbox } from './components/checkbox/KgiCheckbox.vue'
export { default as KgiCheckboxHeader } from './components/checkbox/KgiCheckboxHeader.vue'
export { default as KgiSelectableItem } from './components/checkbox/KgiSelectableItem.vue'

// dialog
export { default as KgiDialog } from './components/dialog/KgiDialog.vue'
export { default as KgiInfoDialog } from './components/dialog/KgiInfoDialog.vue'

// empty-state
export { default as KgiEmptyState } from './components/empty-state/KgiEmptyState.vue'

// faq
export { default as KgiAccordion } from './components/faq/KgiAccordion.vue'

// filter
export { default as KgiFilterPill } from './components/filter/KgiFilterPill.vue'

// grid-system
export { default as KgiGrid } from './components/grid-system/KgiGrid.vue'
export { default as KgiPage } from './components/grid-system/KgiPage.vue'
export { default as KgiToc } from './components/grid-system/KgiToc.vue'

// icon
export { default as KgiIcon } from './components/icon/KgiIcon.vue'

// input
export { default as KgiNumberField } from './components/input/KgiNumberField.vue'

// list
export { default as KgiAmountCell } from './components/list/KgiAmountCell.vue'
export { default as KgiDateTimeLines } from './components/list/KgiDateTimeLines.vue'
export { default as KgiListRow } from './components/list/KgiListRow.vue'
export { default as KgiListTable } from './components/list/KgiListTable.vue'
export { default as KgiStockName } from './components/list/KgiStockName.vue'

// page-layout
export { default as KgiBottomActions } from './components/page-layout/KgiBottomActions.vue'
export { default as KgiFlowPage } from './components/page-layout/KgiFlowPage.vue'
export { default as KgiResultPage } from './components/page-layout/KgiResultPage.vue'
export { default as KgiSectionHeader } from './components/page-layout/KgiSectionHeader.vue'
export { default as KgiStickyFooter } from './components/page-layout/KgiStickyFooter.vue'
export { default as KgiTotalBar } from './components/page-layout/KgiTotalBar.vue'

// picker
export { default as KgiAccountPicker } from './components/picker/KgiAccountPicker.vue'
export { default as KgiPickerField } from './components/picker/KgiPickerField.vue'

// progress-bar
export { default as KgiStepBar } from './components/progress-bar/KgiStepBar.vue'

// radio-button
export { default as KgiRadioGroup } from './components/radio-button/KgiRadioGroup.vue'

// search
export { default as KgiSearchField } from './components/search/KgiSearchField.vue'
export { default as KgiSearchIcon } from './components/search/KgiSearchIcon.vue'

// system-message
export { default as KgiNoticeBar } from './components/system-message/KgiNoticeBar.vue'

// tab
export { default as KgiSegmentedTabs } from './components/tab/KgiSegmentedTabs.vue'
export { default as KgiTextTabs } from './components/tab/KgiTextTabs.vue'

// tag
export { default as KgiTag } from './components/tag/KgiTag.vue'

// toast-snackbar
export { default as KgiToast } from './components/toast-snackbar/KgiToast.vue'

// tooltips
export { default as KgiInfoLabel } from './components/tooltips/KgiInfoLabel.vue'

// top-navigation
export { default as KgiPageHeader } from './components/top-navigation/KgiPageHeader.vue'

export type { DialogAction } from './components/dialog/KgiDialog.vue'
export type { StatItem } from './components/card/KgiStatGroup.vue'
export type { StatementRow } from './components/card/KgiStatementCard.vue'
export { BOTTOM_NAV_ITEMS, type NavItem } from './components/bottom-navigation/nav-items'
export { toOptions, type InfoContent, type Option, type TextAction, type IconLevel } from './lib/types'
export type { CellAlign } from './lib/list'
export { COPY, useToast, clampAmount, type AmountRange } from './lib/kit'
export { iconUrl, setAssetBase } from './lib/assets'
export * as format from './lib/format'
export { useLongPress } from './lib/useLongPress'
