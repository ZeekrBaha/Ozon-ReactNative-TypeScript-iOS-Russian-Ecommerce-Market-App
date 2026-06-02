# Ozon-Style (React Native + TypeScript)

A Russian-language e-commerce storefront built in **React Native + TypeScript**,
recreating the OZON marketplace UI from a spec + 5 reference screenshots. Keeps the
**MVVM-C** layering of the native builds, mapped to RN idioms: five tabs, one reusable
product card, per-tab navigation stacks, minimal dependencies. The React Native sibling
of the [SwiftUI](../Ozon-SwiftUI-iOS-Russian-Ecommerce-Market-App) and
[UIKit](../Ozon-UIKit-iOS-Russian-Ecommerce-Market-App) builds — same screens, tokens,
and data; different framework.

> **Status: implemented + verified.** Builds + runs on the iPhone 15 Pro Max
> simulator (Metro + Hermes, New Architecture); `tsc` clean; **21/21 Jest tests green**.

---

## Screenshots

| Home (Главная) | Catalog (Каталог) | Favorites (Избранное) |
|----------------|-------------------|-----------------------|
| ![Home](docs/screenshots/01_home.jpg) | ![Catalog](docs/screenshots/02_catalog.jpg) | ![Favorites](docs/screenshots/03_favorites.jpg) |

| Cart (Корзина) | Profile (Мой Ozon) |
|----------------|--------------------|
| ![Cart](docs/screenshots/04_cart.jpg) | ![Profile](docs/screenshots/05_profile.jpg) |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI | React Native, TypeScript (`strict`) |
| Architecture | MVVM-C mapped to RN |
| Coordinator | React Navigation — bottom tabs + per-tab native-stack (typed routes) |
| ViewModel | Custom hooks (`useXViewModel`) — state + logic, no JSX |
| State | React local state (`useState`/`useEffect`/`useRef`) |
| Data | `ProductRepository` interface → `SampleDataRepository`, injected via Context |
| Styling | Token objects (`theme/`), `StyleSheet`, `react-native-linear-gradient` |
| Lists | `FlatList` (grids `numColumns`, paged carousel, horizontal rail) |
| Tests | Jest + React Native Testing Library — 21 tests, all green |
| Dependencies | Minimal standard RN libs (navigation, safe-area, screens, gradient, icons) |

---

## Architecture

**MVVM-C in RN.** One-way dependency direction (top → down):

- **Coordinator → React Navigation.** `AppNavigator` = bottom tabs → per-tab
  native-stack with typed routes. A card press calls
  `navigation.navigate('ProductDetail', { productId })`. **No component renders/pushes
  another screen.**
- **ViewModel → hooks.** One `useXViewModel` per screen holds state + logic (e.g. the
  Home carousel index + 3s auto-advance). Depends only on `ProductRepository`; no JSX.
- **View → components.** Function components render hook/prop state and forward intent.
- **Model → types + repository.** `SampleDataRepository` (behind the `ProductRepository`
  interface, provided via Context) serves the in-memory `sampleData` — single source of
  truth, swappable for a network/DB layer without touching a component or hook.

```
┌──────────────────────────────────────────────────────────┐
│  App.tsx  →  SafeAreaProvider · RepositoryProvider ·      │
│             NavigationContainer · AppNavigator            │
│    bottom tabs (5) → per-tab native-stack (typed routes)  │
└───────────────────────────┬──────────────────────────────┘
                            │ navigation.navigate('ProductDetail', { productId })
        ┌───────────────────┴───────────────────────────────┐
        │  Screens (function components)                     │
        │  Home · Catalog · Favorites · Cart · Profile       │
        │     │ useXViewModel()                              │
        │     └──────────────→ ProductDetail (pushed)        │
        └───────────────────┬───────────────────────────────┘
        Screen → hook        │ · Screen → navigation (intent)
        ┌───────────────────┴───────────────────────────────┐
        │  ViewModels = hooks (no JSX)                       │
        │  read via useRepository() ↓                        │
        │  ProductRepository  ←  sampleData (single source)  │
        └────────────────────────────────────────────────────┘
              composed of ↑ Components (ProductCard …)
```

### The keystone rule — one card, every surface

A single `ProductCard` renders every product across all screens. The `variant` prop
changes only the **outer width**, never the internal layout.

```
<ProductCard product variant onPress />
  variant ─┬─ 'grid'           → fills a 2-col grid cell   (Home/Favorites/Profile)
           ├─ 'viewedGrid'      → fills a 2-col grid cell   (Cart "Вы смотрели")
           └─ 'featuredCompact' → grid-card width, screen left-aligns it (Favorites)

internal layout (identical for all variants):
  image (1:1, heart · badge · page-dots)
    → PriceBlock (installment / sale+old+discount / urgency)
    → title (2-line)
    → RatingRow (★ rating · ru-pluralized review count)
    → CTAButton (basket + delivery date)
```

`ProductCard` is a `Pressable` with `testID="productCard"` that calls `onPress` →
`navigation.navigate('ProductDetail', …)`.

### Design tokens (single source)

```
src/theme/
  colors.ts       12 semantic color tokens (as const)
  spacing.ts      gutter=16 global · computed grid math
  typography.ts   10 TextStyle objects
  brand.ts        OZON wordmark + brand colors isolated here
```

---

## Project Structure (planned)

```
src/
├── App.tsx                       SafeAreaProvider + RepositoryProvider + NavigationContainer
├── navigation/
│   ├── AppNavigator.tsx          bottom tabs → per-tab native-stack
│   ├── routes.ts                 typed param lists / route names
│   └── navigationTheme.ts
├── viewmodels/                   custom hooks (ViewModels)
│   ├── useHomeViewModel.ts       banners/quick-actions/recommended + carousel
│   ├── useCatalogViewModel · useFavoritesViewModel
│   └── useCartViewModel · useProfileViewModel
├── services/
│   ├── ProductRepository.ts      interface + SampleDataRepository
│   └── RepositoryContext.tsx     <RepositoryProvider> + useRepository()
├── theme/                        colors · spacing · typography · brand
├── models/
│   ├── types.ts                  Product · Category · QuickAction · SettingsItem · Banner
│   └── sampleData.ts             ALL mock content
├── components/                   ProductCard (+ variant) · PriceBlock · RatingRow ·
│   │                             CTAButton · SearchBar · ProductImage · CategoryCard ·
│   │                             FilterChip · QuickAction · SettingsRow · SectionHeader ·
│   │                             Buttons · AppLogoHeader · BannerCarousel
├── screens/
│   ├── HomeScreen · CatalogScreen · FavoritesScreen · CartScreen · ProfileScreen
│   └── ProductDetailScreen.tsx   pushed destination
└── assets/                       product/category/banner images, app icon

__tests__/ (or co-located *.test.tsx)  — Jest + React Native Testing Library
```

---

## Setup

```bash
# React Native CLI (bare) + TypeScript
npm install
cd ios && pod install && cd ..
npm run ios          # Metro + iOS simulator
```

(Expo is a supported alternative — see `docs/implementation/research.md` §4.)

---

## Design fidelity & validation

Verified against the 5 reference screenshots on an iPhone 15 Pro Max simulator. The
gate is visual fidelity + a **layering review** + **8 binary red-lines** + the
**Jest/RNTL suite** (full report in
[`docs/implementation/validation-report.md`](docs/implementation/validation-report.md)):

| # | Red-line | Status |
|---|----------|--------|
| 1 | Logo pill always below the safe area | ✅ |
| 2 | Favorites featured card compact + left-aligned | ✅ |
| 3 | Cart empty state is a full-width band (not an inset card) | ✅ |
| 4 | Profile = two separate grouped sections | ✅ |
| 5 | Catalog has the centered logo | ✅ |
| 6 | Home hero lives inside the gradient header | ✅ |
| 7 | One shared `Product` type + single `ProductCard` | ✅ |
| 8 | Brand wordmark/colors never hardcoded in screen components | ✅ |

---

## Tests

Jest + React Native Testing Library — **21/21 green** across 4 suites:
- **Unit:** `reviewWord` ru pluralization; `SampleDataRepository` (collection sizes,
  category order, `productById`, featured favorite).
- **Components:** `ProductCard` (press + badge), `PriceBlock`, `RatingRow`,
  `CategoryCard`, `SearchBar`.
- **Screens:** all 5 render their content marker + `ProductDetailScreen` renders by route id.
- **Navigation flow:** product → `ProductDetail` from **all four** product tabs (Home,
  Favorites, Cart, Profile).

The 5-tab bar structure is exercised at runtime (screenshots) rather than in a full-
navigator render test; real on-device geometry / red-line frames would use Detox e2e
(out of scope for v1). See `docs/implementation/validation-plan.md` §5.

```bash
npm test
npx tsc --noEmit
```

---

## Known constraints (v1 prototype)

- **Mostly inert** — search bars, hearts, chips, CTAs, settings rows, login buttons
  render fully but do nothing on press. Interactive paths: tab switching, and pressing
  any product card pushes `ProductDetail`.
- **Imagery** — product/quick-action photos are low-res keyword-matched stand-ins;
  category tiles use transparent cutouts; `ProductImage` falls back to a `photo` glyph
  on a missing/erroring asset.
- **Type scaling** — text scales with the OS font setting by default; capped where a
  fixed layout requires it.
- **IP** — the OZON wordmark, the О!РАСПРОДАЖА hero lockup, and the stand-in photos are
  isolated in `theme/brand.ts` + `assets/` and should be swapped before any non-prototype use.

---

## Documentation

Spec-first docs that drive the build live in [`docs/`](docs/):
research, requirements, design-system, design, architecture, implementation-plan,
validation-plan, validation-report, and the developer prompt — all for React Native +
TypeScript.
