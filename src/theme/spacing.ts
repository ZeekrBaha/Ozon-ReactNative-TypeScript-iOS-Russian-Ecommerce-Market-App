// Spacing / corner constants + grid math (design-system.md §2).
export const layout = {
  gutter: 16,
  sectionSpacing: 24,
  gridSpacing: 12,
  cardSpacing: 12,
  cornerCard: 14,
  cornerImage: 12,
  cornerSearch: 14,
  cornerButtonLg: 16,
  cornerButtonSm: 12,
  cornerSheet: 24,
} as const;

// Grid math (compute, never eyeball). Pass screen width from useWindowDimensions().
export const productCardWidth = (width: number): number =>
  (width - 2 * layout.gutter - layout.cardSpacing) / 2;

export const categoryCardWidth = (width: number): number =>
  (width - 2 * layout.gutter - 2 * layout.gridSpacing) / 3;
