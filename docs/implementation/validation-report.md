# Validation Report — Ozon-Style E-Commerce (React Native + TypeScript)

> **Status: PENDING.** Template to fill during the final pass (T20), after the RN
> build. Nothing here is signed off — coding has not started. Replace each `_pending_`
> once the corresponding check runs.

Date: _pending_ · Metro/build: _pending_ · iOS simulator (iPhone 15 Pro Max).

## Commands run

| Command | Result |
|---------|--------|
| `npm install` / `pod install` | _pending_ |
| `tsc --noEmit` | _pending_ |
| `eslint .` | _pending_ |
| `npm run ios` (Metro + sim) | _pending_ |
| screenshot per tab | _pending_ |
| `jest` (RNTL) | _pending_ |
| OS font-scaling spot-check | _pending_ (N2) |

## Per-screen verification (vs reference screenshots)

| Screen | Result | Notes |
|--------|--------|-------|
| Home (Главная) | _pending_ | logo below safe area; city + dark Войти pill; white search; hero + countdown **inside** gradient; auto-advancing carousel (4 dots); 6 quick actions; Рекомендуем 2-col grid. |
| Catalog (Каталог) | _pending_ | centered logo; camera search; 3-col grid, 18 categories in order; computed width. |
| Favorites (Избранное) | _pending_ | filter row; compact **left-aligned** featured watch; Подобрали для вас 2-col grid. |
| Cart (Корзина) | _pending_ | full-width empty band on backgroundApp; auto-width Войти; Вы смотрели grid. |
| Profile (Мой Ozon) | _pending_ | two separate white sections; gradient avatar; primary+soft buttons; KZT pill + chevrons; recommendations grid. |
| Product detail | _pending_ | pushed on card press; header + back; reuses price/rating/CTA. |

## Layering review (MVVM-C in RN)

| Check | Status |
|-------|--------|
| Screens read only their hook (no `sampleData`) | _pending_ |
| Hooks contain no JSX; depend on `ProductRepository` | _pending_ |
| No component renders/pushes another screen (navigation via prop) | _pending_ |
| `sampleData` referenced only in `SampleDataRepository` | _pending_ |
| Route params serializable (`productId`) | _pending_ |

## Acceptance red-lines (binary gate)

| # | Red-line | Status |
|---|----------|--------|
| 1 | Logo pill below safe area (all) | _pending_ |
| 2 | Favorites featured compact + left-aligned | _pending_ |
| 3 | Cart empty state full-width band | _pending_ |
| 4 | Profile = two grouped sections | _pending_ |
| 5 | Catalog has centered logo | _pending_ |
| 6 | Home hero inside the gradient | _pending_ |
| 7 | One shared `Product` type + single `ProductCard` | _pending_ |
| 8 | Brand wordmark/colors isolated in `theme/brand.ts` | _pending_ |

## Test suite

| Group | Result |
|-------|--------|
| Functional (screens + navigation flow) | _pending_ |
| Structural (grid layout, ru pluralization) | _pending_ |

## Anti-slop gate

_pending_ — real mock data · single icon set · neutral `backgroundApp` · one brand
accent · touch targets ≥44 · no emoji as icons.

## Known deviations (record at sign-off)

_pending_ — e.g. RN CLI vs Expo, icon set chosen vs SF Symbols, layout-test depth
(RNTL has no real layout engine; geometry via Detox or manual).

## Sign-off

_pending_ — sign off only when all 5 screens match their references, the layering
review passes, all 8 red-lines pass, the Jest/RNTL suite is green, and `tsc`/ESLint are
clean.
