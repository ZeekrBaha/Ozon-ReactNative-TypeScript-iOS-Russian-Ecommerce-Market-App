# Implementation Plan — Ozon-Style E-Commerce (React Native + TypeScript, MVVM-C)

> Build order (bottom-up so each layer type-checks against the one below):
> scaffold → theme → models/repository → navigation skeleton → shared chrome →
> components → viewmodels (hooks) → screens (Catalog → Favorites → Cart → Home →
> Profile) → detail + navigation → imagery → tests. Each task has acceptance criteria;
> nothing is "done" until its criteria pass. Screenshot-verify each screen vs the
> reference before the next.

## Phase 0 — Project scaffold

**T0. Create the app.**
- React Native CLI + TypeScript template (or Expo — research §4). Add deps:
  `@react-navigation/native`, `@react-navigation/native-stack`,
  `@react-navigation/bottom-tabs`, `react-native-screens`,
  `react-native-safe-area-context`, `react-native-linear-gradient`,
  `react-native-vector-icons`. Dev: `jest`, `@testing-library/react-native`,
  `@testing-library/jest-native`, `@types/*`, ESLint + Prettier.
- `tsconfig` `strict: true`. iOS pods installed (bare RN).
- Acceptance: app builds + runs the RN template on an iOS simulator; `tsc --noEmit`
  and `jest` (empty) pass.

## Phase 1 — Theme tokens

**T1. `theme/colors.ts`, `spacing.ts`, `typography.ts`, `brand.ts`.**
- Source: `design-system.md` §1–3, §7 (values verbatim). `as const` objects.
- Acceptance: a scratch screen renders all 12 colors + 10 type styles; no TS errors.

## Phase 2 — Models & data

**T2. `models/types.ts`.** `Product` (+ `ProductBadge`), `Category`, `QuickAction`,
`SettingsItem`, `Banner`. String `id`s.
- Acceptance: types compile under `strict`.

**T3. `models/sampleData.ts`.** All mock content: `watch`/`pedicure`/`swimwear` per
spec §2; `recommended` (≥6), `viewed`, `banners` (4), `categories` (18, exact order),
`quickActions` (6), `settings` (5). Stable string ids.
- Acceptance: changing `watch.salePrice` here changes it everywhere.

## Phase 3 — Repository + navigation skeleton

**T4. `services/ProductRepository.ts` + `RepositoryContext.tsx`.** Interface +
`SampleDataRepository` (incl. `productById(id)`); `<RepositoryProvider>` + `useRepository()`.
- Acceptance: data reachable via the hook; `sampleData` imported nowhere else.

**T5. `navigation/` + `App.tsx`.** Typed `routes.ts` (tab + per-stack param lists);
`AppNavigator` (bottom tabs → per-tab native-stack) with placeholder screens; `App.tsx`
wraps SafeAreaProvider → RepositoryProvider → NavigationContainer.
- Acceptance: app launches into a 5-tab bar; tab switching works (F1); tints correct.

## Phase 4 — Shared chrome

**T6. `AppLogoHeader.tsx`.** Centered pill 30, brand capsule, white wordmark.
- Acceptance: top = `insets.top + 8`; pill below status bar (red-line #1).

**T7. `ProductImage.tsx`.** Asset load with `searchFill` + `photo` `onError` fallback.
- Acceptance: a bogus asset renders the placeholder, never blank/crash (F6/N6).

**T8. `SearchBar.tsx`** (+ `SearchTrailing`). Per design §3.1.
- Acceptance: height 52, radius 14, correct trailing icons per fill.

## Phase 5 — Components

**T9. `ProductCard.tsx`** (+ `ProductCardVariant`) — the keystone. §3.2.
- Sub-components: `PriceBlock` (§3.3), `RatingRow` (§3.4, ru pluralization), `CTAButton`
  (§3.5). `Pressable`, `testID="productCard"`, `accessibilityRole="button"`.
- Acceptance: renders `watch` (badge + discount + urgency + dots), `pedicure` (none),
  favorite vs non-favorite heart.

**T10. Remaining components.** `CategoryCard` (§3.6, height 188, `testID="categoryCard"`),
`SortChip`/`FilterChip` (§3.7), `QuickAction` (§3.8), `SettingsRow` (§3.9),
`SectionHeader` (§3.10), `PrimaryButton`/`SoftButton` (§3.11), `BannerCarousel`.
- Acceptance: each matches its spec metrics in isolation.

## Phase 6 — ViewModels (hooks)

**T11. Five hooks** (no JSX), using `useRepository()`: `useHomeViewModel`
(banners/quickActions/recommended + `bannerIndex` + 3s interval + `onMomentumScroll`),
`useCatalogViewModel`, `useFavoritesViewModel`, `useCartViewModel` (viewed + isEmpty),
`useProfileViewModel`.
- Acceptance: each returns exactly its screen's data + handlers; unit-testable with a
  fake repository.

## Phase 7 — Screens (build + verify each before the next)

> Each screen = a function component using its hook, registered in its tab's stack.
> After each: run on simulator → screenshot → compare to reference → run that screen's
> checks in `validation-plan.md`.

**T12. CatalogScreen** (Screen 2). Validates grid math + logo. Red-line #5.
**T13. FavoritesScreen** (Screen 3). Filter row + compact left featured + grid. Red-line #2.
**T14. CartScreen** (Screen 4). Full-width empty band + viewed grid. Red-line #3.
**T15. HomeScreen** (Screen 1). Gradient header (hero inside) + carousel + rail + grid. Red-line #6.
**T16. ProfileScreen** (Screen 5). Two white sections + avatar + settings + grid. Red-line #4.

## Phase 8 — Detail + navigation

**T17. `ProductDetailScreen` + wiring.** Param `{ productId }` → `repo.productById`.
Reuses `ProductImage`/`PriceBlock`/`RatingRow`/`CTAButton`. Card press →
`navigation.navigate('ProductDetail', { productId })`. Header shown on detail; tab roots
hide their stack header.
- Acceptance: press a card from any product tab → detail; back returns (F2).

## Phase 9 — Imagery

**T18. Real imagery.** Product/quick-action images keyword-matched + downscaled;
category images = transparent cutouts. `require()` map keyed by `imageName`; missing →
`ProductImage` placeholder.
- Acceptance: clean category cutouts; placeholder still fires for any missing key.

## Phase 10 — Tests + final pass

**T19. Tests (Jest + RNTL).** Functional: render each screen within providers + a test
navigator, assert content markers; press a `productCard` → assert `navigate` called with
`ProductDetail`. Structural: assert 2-col/3-col layout props + key styles. (Optional:
Detox e2e for real geometry / red-line frames.)
- Acceptance: `jest` green; `tsc --noEmit` clean; ESLint clean.

**T20. Red-line sweep + font-scaling spot-check + `validation-report.md`.**
- Acceptance: all 8 red-lines pass on a fresh launch; bump OS text size one step, confirm
  no clipping (N2); write the report.

**T21. Ship polish.** App icon; remove any screenshot-only hooks; README screenshots.

## Requirements → tasks → validation traceability

| Req | Task(s)        | Validated by |
|-----|----------------|--------------|
| F1  | T5             | Tab switch check |
| F2  | T17            | Detail nav test |
| F3  | T9             | Red-line #7 |
| F4  | T3/T4          | Red-line #7 / repo-only access |
| F5  | T1 (brand)     | Red-line #8 |
| F6  | T7             | Placeholder check |
| F7  | T15            | Home checks, red-line #6 |
| F8  | T12            | Catalog checks, red-line #5 |
| F9  | T13            | Favorites checks, red-line #2 |
| F10 | T14            | Cart checks, red-line #3 |
| F11 | T16            | Profile checks, red-line #4 |
| F12 | T8             | SearchBar variant check |
| A1–A4 | T4/T5/T11/T17 | Layering review |
| N3  | T6             | Red-line #1 |
| N5  | T9/T12         | Grid-math check |
| N7  | T19            | Test run |

## Role review notes

- **PM:** scope is minimal — reject any add beyond the detail push.
- **Developer:** never duplicate a card; reuse `ProductCard`. Compute grid widths from
  `useWindowDimensions()`.
- **RN architect:** one-way deps (Component → hook → repository; navigation wires them).
  No data logic in components; no `sampleData` outside the repository; route params
  serializable.
- **Junior dev:** copy token values exactly from `design-system.md`; don't eyeball.
- **Tester:** gate = visual + 8 red-lines + the Jest/RNTL suite, run per-screen.
- **Reviewer:** check for inline product literals, hardcoded brand strings/hex,
  safe-area overlaps, and components that import navigation/data they shouldn't.
- **Team lead:** enforce build order; each screen verified before the next.
