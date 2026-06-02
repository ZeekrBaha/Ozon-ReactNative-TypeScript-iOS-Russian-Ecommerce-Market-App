# Validation Plan — Ozon-Style E-Commerce (React Native + TypeScript)

> Define checks before coding. The gate is **visual fidelity + the 8 red-lines + the
> Jest/RNTL suite + a layering review**, verified per-screen on a running simulator —
> not a clean build alone.

## 1. Commands / checks

| Check | How | When |
|-------|-----|------|
| Types | `tsc --noEmit` | every task |
| Lint | `eslint .` | every task |
| Run | `npm run ios` (Metro + iOS sim) | every screen |
| Screenshot | simulator screenshot per tab | every screen |
| Compare | screenshot vs the matching reference image | every screen |
| Tests | `jest` (RNTL) | T19 + final |
| Font scaling | bump OS text size one step, re-screenshot | final pass (T20) |
| Missing-asset | pass a bogus `imageName` to `ProductImage` | T7 |

## 2. Per-screen verification checklist (run after each screen)

- [ ] Logo pill **below** the safe area (never on the status-bar row).
- [ ] Search bar height 52 / radius 14 (where present).
- [ ] `backgroundApp` everywhere except inside white surfaces.
- [ ] Grid spacing 12 and **computed** item width (`useWindowDimensions`), not hardcoded.
- [ ] `ProductCard` width correct for its variant.
- [ ] Tab active = `brandPrimary`, inactive = `textSecondary`.
- [ ] 2-line truncation intact (`numberOfLines={2}`), no clipping.
- [ ] Card radius 14; CTA height 44.
- [ ] Safe-area top = `insets.top + 8`.

## 3. Layering review (MVVM-C in RN)

- [ ] Screen components import no `sampleData`; they read only their hook.
- [ ] Hooks contain no JSX and depend only on `ProductRepository` (`useRepository()`).
- [ ] No component imports/renders another screen — navigation goes via the `navigation` prop.
- [ ] Product press forwarded via `onPress` → `navigation.navigate`, not handled in a leaf.
- [ ] `sampleData` referenced only inside `SampleDataRepository`.
- [ ] Route params are serializable (`productId`, not a `Product` object).

## 4. Acceptance red-lines (binary, reject if ANY fail)

| # | Red-line | Screen |
|---|----------|--------|
| 1 | Logo pill never aligned with status-bar (below safe area) | all |
| 2 | Favorites featured never full-width (compact, left-aligned) | Favorites |
| 3 | Cart empty state never an inset card (full-width band) | Cart |
| 4 | Profile CTA + Settings never one block (two sections) | Profile |
| 5 | Catalog never missing the centered logo | Catalog |
| 6 | Home hero never detached from the gradient header | Home |
| 7 | No product tile outside the shared `Product` type + single `ProductCard` | all |
| 8 | Brand wordmark/colors never hardcoded inside screen components | all |

## 5. Test gate (Jest + React Native Testing Library)

- [ ] Functional: each screen renders its content marker within providers + a test
      navigator; pressing a `productCard` triggers `navigation.navigate('ProductDetail', …)`.
- [ ] Structural: 2-col / 3-col grid props + key styles asserted; ru pluralization unit-tested.
- [ ] (Optional) Detox e2e for real-device geometry / red-line frames.
- [ ] `jest` green; `tsc --noEmit` clean; ESLint clean.

## 6. Anti-slop gate

- [ ] Real, plausible mock data on every card (no "Lorem").
- [ ] Single icon set at consistent sizes.
- [ ] Neutral `backgroundApp` (#F2F3F7) behind cards, not pure white.
- [ ] One brand accent + distinct sale/installment/rating colors.
- [ ] Touch targets / rows ≥ 44.
- [ ] OS font scaling respected; secondary-text contrast on white passes AA.
- [ ] No emoji as UI icons.

## 7. IP / brand check before any sharing

- [ ] If this leaves a private context, the OZON wordmark, О!РАСПРОДАЖА lockup, and
      third-party photos are swapped (isolated in `theme/brand.ts` + `assets/`).

## 8. Sign-off

Acceptable when: all 5 screens pass their checklist, the layering review passes, all 8
red-lines pass on a fresh launch, the Jest/RNTL suite is green, `tsc`/ESLint are clean,
the font-scaling spot-check is clean, and `validation-report.md` records the commands run
and any skipped checks.
