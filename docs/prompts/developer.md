# Developer Prompt — Ozon-Style E-Commerce (React Native + TypeScript)

You are a senior React Native engineer. Build a presentational **React Native
(TypeScript)** prototype of an Ozon-style marketplace, keeping the MVVM-C layering of
the native builds (ViewModels = hooks, Coordinator = React Navigation, Model =
types + repository). Work strictly from the approved docs in `docs/implementation/`.
Do not invent requirements; if something is missing, mark it and ask.

## Scope (do exactly this, no more)

- React Native + **TypeScript (`strict`)**, iOS-targeted (Android-compatible).
- 5 tabs via a bottom-tab navigator: Главная, Каталог, Избранное, Корзина, Мой Ozon;
  each tab a native-stack.
- Interactive behavior: tab switching + pressing a product card pushes a minimal
  product-detail screen. Every other press is inert.
- No networking, persistence, auth, async loading, commerce logic, or global store.
  Simplest code with clean layering — no speculative abstraction.

## Architecture (MVVM-C → RN — required)

- **Navigation owns routing.** `AppNavigator` = bottom tabs → per-tab native-stack;
  typed `routes.ts`. Screens navigate only via the typed `navigation` prop; a card
  press calls `navigation.navigate('ProductDetail', { productId })`. **No component
  imports or renders another screen.**
- **ViewModels are hooks.** One `useXViewModel` per screen, no JSX, depends only on
  `ProductRepository` via `useRepository()`. `useHomeViewModel` owns the carousel index
  + a 3s interval.
- **Components are dumb.** Function components render hook/prop state and forward
  intent via callbacks.
- **Model = types + repository.** `ProductRepository` is the only data path;
  `SampleDataRepository` serves `sampleData`, provided through `RepositoryContext`.
  `sampleData` is imported nowhere else. Route params are serializable (`productId`).

## Source of truth

- Layout & screens: `docs/implementation/design.md`
- Tokens: `docs/implementation/design-system.md` (values verbatim)
- Types, folders, layering: `docs/implementation/architecture.md`
- Task order & acceptance: `docs/implementation/implementation-plan.md`
- Gates: `docs/implementation/validation-plan.md`

## Build directives (do these)

- Follow the fixed build order (plan): scaffold → theme → models/repository →
  navigation skeleton → shared chrome → components → hooks → screens
  (Catalog → Favorites → Cart → Home → Profile) → detail+nav → imagery → tests.
  Screenshot-verify each screen before the next.
- Build **one** `ProductCard` with a `variant` prop; reuse on Home, Favorites, Cart,
  Profile. Set `testID="productCard"`, `accessibilityRole="button"`.
- Source **all** content from `sampleData` **through `ProductRepository`**. No product
  field literals in any component or hook.
- Put the OZON wordmark + brand colors in `theme/brand.ts`; components reference
  `brand`, never the literal "OZON" or brand hex.
- **Compute** grid widths from `useWindowDimensions()`, gutter, spacing:
  - 2-col: `(width - 2*gutter - cardSpacing) / 2`
  - 3-col: `(width - 2*gutter - 2*gridSpacing) / 3`
- Respect the top safe area (`useSafeAreaInsets`): first content top = `insets.top + 8`;
  the logo pill always below the status bar. The Home gradient bleeds under the status
  bar (absolute insets, not `SafeAreaView` padding).
- Every image uses `ProductImage`/the §3.0 fallback: a `searchFill` box + a `photo`
  glyph (`onError`) when the asset is missing. Never blank/crash.
- Respect OS font scaling; `numberOfLines={2}` truncation must not clip
  (`maxFontSizeMultiplier` where a fixed layout requires).
- Add tests (Jest + RNTL): each screen + the product→detail flow; run until green.

## Token block (embed verbatim)

Colors: `brandPrimary #005BFF`, `brandPrimarySoft #E4EEFF`, `priceSale #F0117E`,
`priceInstallment #F59E0B`, `ratingStar #FFA800`, `textPrimary #001A34`,
`textSecondary #707F8D`, `backgroundApp #F2F3F7`, `surfaceCard #FFFFFF`,
`searchFill #F4F6FA`, `buttonDark #050505`, `separator #E8EAEE`.
Layout: `gutter 16`, `sectionSpacing 24`, `gridSpacing 12`, `cardSpacing 12`,
`cornerCard 14`, `cornerImage 12`, `cornerSearch 14`, `cornerButtonLg 16`,
`cornerButtonSm 12`, `cornerSheet 24`.
Type: `screenTitle 30/700`, `sectionTitle 28/700`, `priceMain 16/700`,
`installment 15/600`, `cardTitle 14/400`, `body 15/400`, `secondary 13/400`,
`badge 11/700`, `cta 15/600`, `tabLabel 11/400`.
Active tab tint = `brandPrimary`; `backgroundApp` everywhere except white surfaces.

## Forbidden (anti-slop)

- No bespoke per-screen product cards — one `ProductCard` only.
- No hardcoded brand wordmark/colors inside screen components.
- No product field literals in components/hooks (everything via the repository).
- No `sampleData` references outside `SampleDataRepository`.
- No JSX in hooks; no navigation/data logic in leaf components.
- No non-serializable navigation params (pass `productId`, not a `Product`).
- No placeholder/lorem text — use the real mock strings from `sampleData`.
- No emoji as UI icons — use the chosen icon set.
- No pure-white app background behind cards — use `backgroundApp`.
- No invented features/navigation beyond the product-detail push.
- No Redux/MobX/global store or UI-kit libraries.

## Reporting (after each screen and at the end)

- List exact changed/created files.
- Run the per-screen checklist + layering review + applicable red-lines from
  `validation-plan.md`; report pass/fail with the simulator screenshot.
- State any skipped check and unresolved risk. Do not claim "done" from a clean build
  alone — verify on the running simulator against the reference, and run the test suite
  to green.
