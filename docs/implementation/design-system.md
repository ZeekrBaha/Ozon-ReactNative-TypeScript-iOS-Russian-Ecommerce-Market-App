# Design System — Ozon-Style E-Commerce (React Native + TypeScript)

> Single source of truth for all tokens. Reuse this block **verbatim** in every
> screen spec and implementation prompt. If a value isn't here, it isn't a token —
> do not invent ad-hoc spacing/colors in a component.

## 1. Color tokens — `theme/colors.ts`

| Token              | Hex       | Use                                            |
|--------------------|-----------|------------------------------------------------|
| `brandPrimary`     | `#005BFF` | active tab, primary buttons, links, CTAs       |
| `brandPrimarySoft` | `#E4EEFF` | soft / secondary buttons                       |
| `priceSale`        | `#F0117E` | sale price, discount, urgency                  |
| `priceInstallment` | `#F59E0B` | installment price                              |
| `ratingStar`       | `#FFA800` | rating star                                    |
| `textPrimary`      | `#001A34` | titles, prices, body                           |
| `textSecondary`    | `#707F8D` | captions, secondary labels                     |
| `backgroundApp`    | `#F2F3F7` | app background                                 |
| `surfaceCard`      | `#FFFFFF` | cards, grouped sections                        |
| `searchFill`       | `#F4F6FA` | search bars, chips, category tiles             |
| `buttonDark`       | `#050505` | Home "Войти" pill, countdown pill              |
| `separator`        | `#E8EAEE` | list dividers                                  |

```ts
export const colors = {
  brandPrimary: '#005BFF', brandPrimarySoft: '#E4EEFF',
  priceSale: '#F0117E', priceInstallment: '#F59E0B', ratingStar: '#FFA800',
  textPrimary: '#001A34', textSecondary: '#707F8D',
  backgroundApp: '#F2F3F7', surfaceCard: '#FFFFFF', searchFill: '#F4F6FA',
  buttonDark: '#050505', separator: '#E8EAEE',
} as const;
```

- App background is `backgroundApp` everywhere except inside white surfaces.
- Active tab tint = `brandPrimary`; inactive = `textSecondary` (set on the bottom-tab
  navigator's `screenOptions`).

## 2. Spacing & layout — `theme/spacing.ts`

```ts
export const layout = {
  gutter: 16,         // global horizontal screen inset — used EVERYWHERE
  sectionSpacing: 24, // vertical gap between sections
  gridSpacing: 12,    // inter-item gap in all grids
  cardSpacing: 12,    // inter-item gap in 2-col product grid
  cornerCard: 14, cornerImage: 12, cornerSearch: 14,
  cornerButtonLg: 16, cornerButtonSm: 12, cornerSheet: 24,
} as const;
```

> **Decision:** one global `gutter = 16` overrides the draft's scattered "24-ish."

**Grid math (compute, never eyeball):** read screen width from
`useWindowDimensions()`.
- 2-col card width = `(width - 2*gutter - cardSpacing) / 2`
- 3-col card width = `(width - 2*gutter - 2*gridSpacing) / 3`
- Apply as the `width` style on each card (with `FlatList numColumns` +
  `columnWrapperStyle={{ gap: gridSpacing }}`, or mapped rows).

## 3. Typography — `theme/typography.ts` (RN `TextStyle`)

| Style          | Size / Weight   | Use                                                            |
|----------------|-----------------|----------------------------------------------------------------|
| `screenTitle`  | 30 / 700        | Profile "Войдите в личный кабинет"                            |
| `sectionTitle` | 28 / 700        | "Рекомендуем", "Подобрали для вас", "Вы смотрели", "Корзина пуста" |
| `priceMain`    | 16 / 700        | sale price                                                     |
| `installment`  | 15 / 600        | installment price (orange)                                     |
| `cardTitle`    | 14 / 400        | product title (2-line truncate)                                |
| `body`         | 15 / 400        | empty-state body, subtitles                                    |
| `secondary`    | 13 / 400        | reviews, captions, old price                                   |
| `badge`        | 11 / 700        | СКИДКИ НЕДЕЛИ                                                   |
| `cta`          | 15 / 600        | CTA button, primary buttons                                    |
| `tabLabel`     | 11 / 400        | tab bar labels                                                 |

```ts
export const typography = {
  sectionTitle: { fontSize: 28, fontWeight: '700' },
  // …each as a TextStyle object
} as const;
```

- 2-line truncation via `numberOfLines={2}` (`ellipsizeMode="tail"`) must not clip.
- Dynamic Type: `Text` scales by default; cap with `maxFontSizeMultiplier` where a
  fixed layout requires it.

## 4. Shape & elevation

- Cards: `borderRadius: cornerCard` (14), `overflow: 'hidden'`, padding 10–12, no
  heavy border.
- Images inside cards: `borderRadius: cornerImage` (12), `resizeMode: 'cover'`.
- Search bar: height 52, radius 14.
- CTA button (in card): height 44, radius `cornerButtonSm` 12.
- Primary/Soft buttons: height 56, radius `cornerButtonLg` 16.
- Gradient header + grouped white sections: rounded **bottom** corners
  `cornerSheet` 24 (`borderBottomLeftRadius`/`…Right`). Gradient via
  `react-native-linear-gradient`.

## 5. Icons

- Single set via `react-native-vector-icons` (e.g. Ionicons / MaterialCommunity)
  standing in for SF Symbols, at consistent sizes. Tab icons ~24. Heart, flame,
  star, search glass, basket, chevrons as named in component specs. Icon-only
  controls are inert but present.

## 6. Motion

- Native bottom-tab + native-stack transitions are the defaults. One custom motion:
  the Home banner carousel auto-advances every 3s (`setInterval` → `scrollToIndex`,
  wrapping). No other custom animations unless matching a reference behavior.

## 7. Brand isolation — `theme/brand.ts`

- Holds the wordmark string + brand colors so the OZON identity can be swapped
  without touching screens. Components reference `brand`, never literals.
- `AppLogoHeader` reads its pill color + wordmark from `brand`.
