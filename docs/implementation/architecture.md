# Architecture — Ozon-Style E-Commerce (React Native + TypeScript)

## 1. Approach

A **React Native (TypeScript)** app that keeps the MVVM-C spirit of the native
builds, mapped to RN idioms. One-way dependency direction (top → down):

- **Coordinator → React Navigation.** A bottom-tab navigator with five tabs, each a
  native-stack navigator that can push the product detail screen. Typed routes
  (param lists) are the "routes"; screens express navigation **intent** through the
  typed `navigation` prop — they never reach into other screens.
- **ViewModel → custom hooks.** One `useXViewModel` hook per screen returns the
  view's state + handlers. Hooks hold all screen logic (e.g. the Home carousel
  index + auto-advance) and never render anything.
- **View → function components.** Screens render hook state with RN primitives
  (`View`/`Text`/`Image`/`Pressable`/`FlatList`) and forward intent (a product tap)
  to navigation.
- **Model → types + repository.** `ProductRepository` (a TS interface) is the only
  data path; `SampleDataRepository` serves the in-memory `sampleData`. The concrete
  repo is provided via React Context at the root and consumed with `useRepository()`
  — the DI seam.

Strict TypeScript (`strict: true`). State is local (`useState`/`useEffect`/`useRef`);
no global store needed for this static prototype.

## 2. Folder structure

```
src/
  App.tsx                       // SafeAreaProvider + RepositoryProvider + NavigationContainer

  navigation/
    AppNavigator.tsx            // bottom tabs (5) → per-tab native-stack
    routes.ts                   // typed param lists (Tab + per-stack), route names
    navigationTheme.ts          // maps tokens → React Navigation theme

  models/
    types.ts                    // Product, ProductBadge, Category, QuickAction, SettingsItem, Banner
    sampleData.ts               // ALL mock content lives here

  services/
    ProductRepository.ts        // interface + SampleDataRepository
    RepositoryContext.tsx       // <RepositoryProvider> + useRepository()

  viewmodels/                   // custom hooks = ViewModels (no JSX)
    useHomeViewModel.ts         // banners/quickActions/recommended + carousel index
    useCatalogViewModel.ts
    useFavoritesViewModel.ts
    useCartViewModel.ts         // viewed + isEmpty
    useProfileViewModel.ts

  theme/
    colors.ts                   // 12 semantic color tokens (design-system §1)
    spacing.ts                  // layout constants + grid math (§2)
    typography.ts               // 10 text styles (§3)
    brand.ts                    // wordmark + brand colors (config switch)

  components/                   // reusable function components
    ProductImage.tsx            // §3.0 placeholder fallback
    AppLogoHeader.tsx           // §3.2
    SearchBar.tsx               // §4.1 (+ SearchTrailing union)
    ProductCard.tsx             // §4.2 (+ ProductCardVariant)
    PriceBlock.tsx              // §4.3
    RatingRow.tsx               // §4.4 (+ ru pluralization)
    CTAButton.tsx               // §4.5
    CategoryCard.tsx            // §4.6
    FilterChip.tsx              // §4.7 (SortChip + FilterChip)
    QuickAction.tsx             // §4.8
    SettingsRow.tsx             // §4.9
    SectionHeader.tsx           // §4.10
    Buttons.tsx                 // §4.11 (PrimaryButton + SoftButton)
    BannerCarousel.tsx          // paged horizontal FlatList + dots

  screens/
    HomeScreen.tsx              // Screen 1
    CatalogScreen.tsx           // Screen 2
    FavoritesScreen.tsx         // Screen 3
    CartScreen.tsx              // Screen 4
    ProfileScreen.tsx           // Screen 5
    ProductDetailScreen.tsx     // pushed destination

  assets/                       // product/category/banner images, app icon
```

> Screen composition: a root `ScrollView` with sections (Catalog/Favorites/Cart/
> Profile) and a sectioned `ScrollView` for Home. Grids use `FlatList numColumns={2|3}`
> (or mapped rows inside the scroll view) with item width computed from
> `useWindowDimensions()`. The Home banner is a horizontal **paged** `FlatList`; the
> quick-actions rail is a horizontal `FlatList`.

## 3. Data model (from spec §2)

```ts
export type ProductBadge = 'salesOfWeek';   // flame + "СКИДКИ НЕДЕЛИ"

export interface Product {
  id: string;
  imageName: string;        // asset key; §3.0 fallback if absent
  imageCount: number;       // page dots (1 = no dots)
  isFavorite: boolean;
  badge: ProductBadge | null;
  installmentPrice: string; // "1398 ₸"
  installmentTerm: string;  // "×12 мес"
  salePrice: string;        // "16 769 ₸"
  oldPrice: string | null;  // "154 967 ₸" (strikethrough)
  discountPercent: number | null; // 89 → "-89%"
  urgency: string | null;   // "218 шт осталось"
  title: string;
  rating: number;           // 4.7
  reviewCount: number;      // 6
  deliveryDate: string;     // "6 июня"
}

export interface Category    { id: string; title: string; imageName: string; }
export interface QuickAction { id: string; title: string; imageName: string; }
export interface SettingsItem { id: string; title: string; value: string | null; }
export interface Banner      { id: string; imageName: string; }
```

> `id` is a stable string (e.g. `'watch'`) so it can be a `FlatList` key and a
> **serializable** navigation param — the detail route takes a `productId` and
> re-reads the product from the repository (no non-serializable params).

### sampleData (single source; reuse instances across screens)

- `watch` — favorite, `salesOfWeek` badge, -89%, "218 шт осталось".
- `pedicure` — not favorite, no badge/discount/urgency.
- `swimwear` — favorite, "Купальник раздельный…".
- `recommended: Product[]` — ≥6 (bikini, watches, wallet/clutch, …).
- `viewed: Product[]` — `[watch, pedicure, swimwear, …]`.
- `banners: Banner[]` — 4 promo images (Home carousel).
- `categories: Category[]` — 18, exact order (design.md Screen 2).
- `quickActions: QuickAction[]` — 6 (design.md Screen 1).
- `settings: SettingsItem[]` — 5 (Валюта=KZT, Цвет приложения, Язык, Помощь, О приложении).

Reached only through `ProductRepository` — no screen or hook imports `sampleData`.

## 4. Component reuse map (the keystone rule)

| Screen     | Uses `ProductCard` variant | Grid |
|------------|----------------------------|------|
| Home       | `grid`                     | 2-col `recommended` |
| Favorites  | `featuredCompact` (1) + `grid` | featured + 2-col `recommended` |
| Cart       | `viewedGrid`               | 2-col `viewed` |
| Profile    | `grid`                     | 2-col `recommended` |
| Catalog    | — (uses `CategoryCard`)    | 3-col `categories` |

`ProductCardVariant = 'grid' | 'featuredCompact' | 'viewedGrid'`. All variants share
identical internal layout; only the outer width differs (`featuredCompact` is
grid-card width, left-aligned by the screen). `ProductCard` takes an `onPress` and
sets `testID="productCard"`.

## 5. Navigation & state (MVVM-C in RN)

- **`App.tsx`** wraps the tree: `SafeAreaProvider` → `RepositoryProvider` (injects
  `SampleDataRepository`) → `NavigationContainer` → `AppNavigator`.
- **`AppNavigator`** = `BottomTab.Navigator` with 5 screens; each tab is a
  `NativeStack.Navigator` whose root is the tab's screen and which registers
  `ProductDetail`. A card press calls `navigation.navigate('ProductDetail', { productId })`.
- **ViewModels (hooks)** call `useRepository()` and return `{ ...data, ...handlers }`.
  `useHomeViewModel` owns `bannerIndex` + a `useEffect` interval (3s) that advances
  and wraps; the screen scrolls the paged list to that index.
- **Interactive behavior:** tab switching + product → detail push. Everything else
  (hearts, chips, search, settings rows) is inert.

## 6. Shared chrome rules (spec §3)

- **Safe area (HARD):** `react-native-safe-area-context`. First content top =
  `insets.top + 8`. Logo pill always below the status bar; on Home the logo sits
  inside the gradient (still below the status bar).
- **AppLogoHeader:** centered, pill height 30, brand-blue capsule, white wordmark
  from `brand`. Used on Catalog/Favorites/Cart/Profile and inside the Home gradient.
- **Image placeholder (HARD):** `ProductImage` renders a `searchFill` box + a `photo`
  glyph (`onError` → fallback) when the asset is missing — never blank, never crash.

## 7. Dependencies (minimal, standard RN)

React Native + TypeScript core, plus the standard navigation/safe-area stack:
`@react-navigation/native`, `@react-navigation/native-stack`,
`@react-navigation/bottom-tabs`, `react-native-screens`,
`react-native-safe-area-context`. Gradients via `react-native-linear-gradient`.
Icons: a single set (`react-native-vector-icons`) standing in for SF Symbols. No
state-management or UI-kit libraries. (This relaxes the native builds' "zero
dependencies" to "minimal, standard RN libraries" — see requirements N1.)
