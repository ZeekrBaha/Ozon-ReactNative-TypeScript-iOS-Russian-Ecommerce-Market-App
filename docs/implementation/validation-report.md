# Validation Report — Ozon-Style E-Commerce (React Native + TypeScript)

Date: 2026-06-02 · React Native (New Architecture, Hermes), TypeScript. Run on the
iPhone 15 Pro Max simulator via Metro. Scaffolded with the React Native Community CLI.

## Commands run

| Command | Result |
|---------|--------|
| `npm install` + iOS `pod install` | OK (78 pods) |
| `tsc --noEmit` | clean |
| `npx react-native start` (Metro) | running |
| build + run (Xcode/iOS sim) | SUCCEEDED, warnings only (pods/Hermes) |
| screenshot per tab | captured all 5 screens |
| `jest` (RNTL) | 9 passed, 0 failed |

Tabs were screenshotted by temporarily setting the bottom-tab `initialRouteName` +
relaunching (UI tap automation is unavailable for the screenshot tool); the override
was reverted before sign-off.

## Per-screen verification (vs reference screenshots)

| Screen | Result | Notes |
|--------|--------|-------|
| Home (Главная) | ✅ | logo below safe area; city + dark Войти pill; white search; hero + countdown **inside** the rounded gradient; carousel w/ 4 dots; 6 quick actions; Рекомендуем 2-col grid. |
| Catalog (Каталог) | ✅ | centered logo; camera search; 3-col grid, 18 categories in order; cutout images. |
| Favorites (Избранное) | ✅ | filter row; compact **left-aligned** featured watch; Подобрали для вас 2-col grid. |
| Cart (Корзина) | ✅ | full-width empty band on backgroundApp; auto-width Войти; Вы смотрели grid. |
| Profile (Мой Ozon) | ✅ | two separate white sections; gradient avatar; primary+soft buttons; KZT pill + chevrons; recommendations grid. |
| Product detail | ✅ | reached by pressing a card; native-stack header + back; reuses price/rating/CTA. |

## Layering review (MVVM-C in RN)

| Check | Status |
|-------|--------|
| Screens read only their hook (no `sampleData`) | ✅ |
| Hooks contain no JSX; depend on `ProductRepository` | ✅ |
| No component renders/pushes another screen (navigation via prop) | ✅ |
| `sampleData` referenced only in `SampleDataRepository` | ✅ |
| Route params serializable (`productId`) | ✅ |

## Acceptance red-lines (binary gate)

| # | Red-line | Status |
|---|----------|--------|
| 1 | Logo pill below safe area (all) | ✅ |
| 2 | Favorites featured compact + left-aligned | ✅ |
| 3 | Cart empty state full-width band | ✅ |
| 4 | Profile = two grouped sections | ✅ |
| 5 | Catalog has centered logo | ✅ |
| 6 | Home hero inside the gradient | ✅ |
| 7 | One shared `Product` type + single `ProductCard` | ✅ |
| 8 | Brand wordmark/colors isolated in `theme/brand.ts` | ✅ |

**All 8 red-lines pass** (verified visually on the simulator).

## Test suite (Jest + RNTL)

| Group | Result |
|-------|--------|
| Unit (ru pluralization) + component (`ProductCard` press, badge) | ✅ |
| Screens render markers (5) + product→detail navigation call | ✅ |
| Total | ✅ 9/9 |

## Anti-slop gate

✅ Real plausible mock data · ✅ single icon set (Ionicons) · ✅ neutral `backgroundApp`
behind cards · ✅ one brand accent + distinct sale/installment/rating colors ·
✅ touch targets ≥44 · ✅ no emoji as icons.

## Known deviations (honest)

1. **Dependencies** — not zero (impossible for RN nav). Uses the standard stack:
   `@react-navigation/*`, `react-native-screens`, `react-native-safe-area-context`,
   `react-native-linear-gradient`, `react-native-vector-icons` (Ionicons stand in for
   SF Symbols, registered via `UIAppFonts`).
2. **Gradient sizing (New Arch)** — `react-native-linear-gradient` did not auto-size to
   its children on Fabric; the Home header renders the gradient as an absolute-fill
   background behind a normal container that sizes to content. (Caught + fixed during
   screenshot verification.)
3. **Layout red-lines** — verified visually + by screenshot, not as automated frame
   assertions (RNTL has no real layout engine, unlike XCUITest). Real geometry checks
   would need Detox e2e (out of scope for v1).
4. **Stack** — React Native CLI (bare), not Expo. Bundle id left at the template
   default `org.reactjs.native.example.OzonStyle`.
5. **Imagery** — asset images (product/category cutouts/banners) reused from the
   native builds; missing keys render the `ProductImage` placeholder (F6).

## Sign-off

All 5 screens match their references; the MVVM-C layering review passes; all 8
red-lines pass on a fresh launch; the Jest/RNTL suite is green (9/9); `tsc` is clean;
the build runs on the simulator. Acceptable for the v1 prototype scope.
