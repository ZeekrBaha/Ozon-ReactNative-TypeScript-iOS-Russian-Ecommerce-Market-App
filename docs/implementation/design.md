# Design — Ozon-Style E-Commerce (React Native + TypeScript)

> UX flows, screens, states, and component props. Tokens are in `design-system.md`
> — referenced here, never re-defined. Verified against the 5 reference screenshots.

## 1. Flows & states

- **Primary flow:** launch → land on Home (Главная) → switch tabs via bottom bar.
- **Navigation flow:** press any product card → push `ProductDetail` (param
  `{ productId }`); back returns. Reachable from every product-bearing tab.
- **States:** every screen is a single static state. No loading/error/auth states
  (no data fetching). The empty Cart is the one explicit "empty" state — the
  designed default, not a fallback.
- **Inert affordances:** search bars, hearts, chips, CTA buttons, settings rows,
  city pickers, login buttons render fully but do nothing on press.

## 2. Shared chrome (see `architecture.md` §6)

Safe-area rule, `AppLogoHeader`, bottom-tab navigator, and the image placeholder
rule apply to all screens.

### Bottom tab bar (`@react-navigation/bottom-tabs`, 5 tabs)

| Tab       | Label      | Icon (inactive / active)                   |
|-----------|------------|--------------------------------------------|
| Home      | Главная    | `home-outline` / `home`                    |
| Catalog   | Каталог    | `search-outline` (tint changes)            |
| Favorites | Избранное  | `heart-outline` / `heart`                  |
| Cart      | Корзина    | `basket-outline` / `basket`                |
| Profile   | Мой Ozon   | `person-outline` / `person-circle`         |

White bar. Active icon+label `brandPrimary` (`tabBarActiveTintColor`), inactive
`textSecondary`. Icon ~24, label `tabLabel` (11). Each tab is a native-stack.

## 3. Component props

> All components are typed function components. "props" lists the public interface.

### 3.1 SearchBar
`type SearchTrailing = 'barcode' | 'camera'`
`<SearchBar fill?: string = searchFill, trailing?: SearchTrailing[] = [] />`
Height 52, radius 14, leading search glass, placeholder "Искать на Ozon", h-padding
16. Non-interactive (a styled `View`, not a `TextInput`).
- Home: `fill="#FFFFFF"`, `trailing={['barcode','camera']}`.
- Catalog/Favorites: `fill={searchFill}`, `trailing={['camera']}`.

### 3.2 ProductCard (keystone)
`type ProductCardVariant = 'grid' | 'featuredCompact' | 'viewedGrid'`
`<ProductCard product: Product, variant?: ProductCardVariant = 'grid', onPress?: () => void />`
All variants share identical internal layout; only outer width differs. Wrapped in a
`Pressable` with `testID="productCard"` and `accessibilityRole="button"`.

Internal layout (top → bottom):
1. **Image block** — `resizeMode: 'cover'`, radius `cornerImage` 12. Overlays:
   - Heart top-right: filled `heart` in `priceSale` when `isFavorite`, else outline
     `heart` in white over a subtle white circle. Inert.
   - Badge bottom-left (if `badge`): pill, flame + "СКИДКИ НЕДЕЛИ", white, `badge` font.
   - Page dots bottom-center if `imageCount > 1` (first filled).
2. **PriceBlock** (§3.3)
3. **Title** — `cardTitle`, `numberOfLines={2}`.
4. **RatingRow** (§3.4)
5. **CTAButton** (§3.5)
Card bg `surfaceCard`, radius `cornerCard` 14, padding 10–12.

### 3.3 PriceBlock
`<PriceBlock product: Product />`
- Line 1: `{installmentPrice} {installmentTerm}` in `priceInstallment`, `installment`.
- Line 2: `salePrice` in `priceMain` (`priceSale`); if `oldPrice`, gray
  line-through beside it (`textDecorationLine: 'line-through'`); if `discountPercent`,
  `-{n}%` in `priceSale`.
- Line 3 (if `urgency`): urgency in `priceSale`, `secondary`.

### 3.4 RatingRow
`<RatingRow rating: number, reviewCount: number />`
star (`ratingStar`) + bold rating + chat glyph (`textSecondary`) +
`{reviewCount} отзыв(а/ов)` in `textSecondary`.
Pluralize: 1→отзыв, 2–4→отзыва, else→отзывов (teen exception 11–14→отзывов).

### 3.5 CTAButton
`<CTAButton date: string />`
Full-width, height 44, radius 12, `brandPrimary`, centered basket + date in white,
`cta`. Inert (no `onPress`).

### 3.6 CategoryCard
`<CategoryCard category: Category />`
Fill `searchFill`, radius 16, height 188. Label top-left, 2-line, semibold (`body`).
Image bottom-right, `resizeMode: 'contain'`. Padding 12. `testID="categoryCard"`.

### 3.7 FilterChip
`<SortChip />` — round, sort glyph only.
`<FilterChip kind: 'filters' | 'brand' />` — `filters`: sliders + "Фильтры"; `brand`: "Бренд".
Capsule, fill `searchFill`, height 42, h-padding 16. Inert.

### 3.8 QuickAction
`<QuickAction action: QuickAction />` — 56 rounded image tile (radius 14) + 2-line
centered caption (`secondary`). In a horizontal `FlatList`.

### 3.9 SettingsRow
`<SettingsRow item: SettingsItem, showDivider: boolean />`
Height 56, leading title (`body`), optional trailing value pill (KZT in a `searchFill`
capsule), trailing chevron (`textSecondary`), hairline `separator` below (inset to
text). Inert.

### 3.10 SectionHeader
`<SectionHeader title: string />` — `sectionTitle` (28/700, `textPrimary`),
left-aligned, `gutter` inset.

### 3.11 PrimaryButton / SoftButton
- `<PrimaryButton title />`: height 56, radius 16, `brandPrimary`, white `cta`, full-width.
- `<SoftButton title />`: same metrics, `brandPrimarySoft`, `brandPrimary` text.
- Cart "Войти" is a smaller auto-width capsule variant (Screen 4).

---

## 4. Screens

> Each screen = a function component using its `useXViewModel()` hook. Root is a
> `ScrollView` (`contentContainerStyle` with bottom padding to clear the tab bar);
> grids are `FlatList numColumns` or mapped rows.

### Screen 1 — Home / Главная
`ScrollView`, sections top→bottom:
1. **Gradient header** — full-width vertical blue gradient
   (`react-native-linear-gradient`), rounded bottom corners 24. Contains, in order:
   `AppLogoHeader` (below safe area); header row (`gutter`): left "Астана" + chevron
   (white), right "Войти" pill on `buttonDark`; `SearchBar fill="#FFFFFF"
   trailing={['barcode','camera']}`; hero — headline ("ПРАЗДНИК ПРИЛЕТИТ" /
   "О!РАСПРОДАЖА" lockup) + countdown pill on `buttonDark` ("19:45:13 до старта" +
   chevron). **The hero lives inside this gradient.**
2. **Carousel banner** — full-width minus `gutter`, radius 16, height ~150. Paged
   horizontal `FlatList` over `banners` (4) + page dots; auto-advances every 3s
   (VM `bannerIndex` → `scrollToIndex`, wrapping).
3. **Quick actions rail** — horizontal `FlatList` of `QuickAction`: Каталог, Быстрая
   доставка, Рассрочка 0-0-12, Сделано в Казахстане, Ozon Селект, Товары из Китая.
4. `SectionHeader "Рекомендуем"` → 2-col `ProductCard variant="grid"` from `recommended`.

### Screen 2 — Catalog / Каталог
`ScrollView`. Order: `AppLogoHeader` → `SearchBar fill={searchFill} trailing={['camera']}`
→ 3-col grid of `CategoryCard`, `gutter` inset, `gridSpacing` 12.

Categories (exact order): Женская одежда, Мужская одежда, Обувь, Детская одежда,
Ювелирные украшения, Электроника, Бытовая техника, Красота и здоровье, Дом и сад,
Мебель, Аксессуары, Строительство и ремонт, Автотовары, Продукты питания,
Товары для животных, Детские товары, Спорт и отдых, Книги.

### Screen 3 — Favorites / Избранное
`ScrollView`. Order:
1. `AppLogoHeader`
2. `SearchBar fill={searchFill} trailing={['camera']}`
3. Filter row (horizontal, `gutter`): `<SortChip/>`, `<FilterChip kind="filters"/>`, `<FilterChip kind="brand"/>`.
4. Featured — left-aligned, compact: `ProductCard product={watch} variant="featuredCompact"`
   at grid-card width, blank `backgroundApp` to the right.
5. `SectionHeader "Подобрали для вас"` → 2-col `grid` from `recommended`.

### Screen 4 — Cart / Корзина (empty)
`ScrollView`. Order:
1. `AppLogoHeader`
2. City row (`gutter`): "Астана" + chevron (`textPrimary`).
3. **Empty-state band** — full-width, `backgroundApp` (NOT an inset card). Centered,
   v-padding 32: title "Корзина пуста" (`sectionTitle`); body (`body`,
   `textSecondary`, centered) "Воспользуйтесь поиском, чтобы найти всё, что нужно.
   Если в Корзине были товары, войдите, чтобы посмотреть список"; "Войти" soft button
   (auto-width). `testID="cartEmptyBand"`.
4. `SectionHeader "Вы смотрели"` → 2-col `viewedGrid` from `viewed` (watch=heart+badge,
   pedicure=plain, swimwear peeks).

### Screen 5 — Profile / Мой Ozon (logged out)
`ScrollView`. **Two separate white grouped sections** on `backgroundApp`:

**A. CTA section** — full-width white, rounded bottom 24, centered: `AppLogoHeader`;
96 avatar (blue gradient circle + white person glyph); title "Войдите в личный
кабинет" (`screenTitle`); subtitle (`body`, `textSecondary`) "Отслеживайте заказы,
копите баллы и пользуйтесь персональными скидками"; `PrimaryButton "Войти или
зарегистрироваться"`; `SoftButton "Покупайте как юрлицо"`; caption (`secondary`)
"Применяем " + blue "рекомендательные технологии".

**B. Settings group** — white, rounded 20, `gutter` inset, `SettingsRow`s with
hairlines: Валюта (KZT pill), Цвет приложения, Язык, Помощь, О приложении.

**C.** `SectionHeader "Подобрали по вашим интересам"` → 2-col `grid`.

## 5. Reviewer pass (design)

- ✅ Single `ProductCard` covers all 4 product surfaces (red-line #7).
- ✅ Favorites featured compact + left-aligned (red-line #2).
- ✅ Cart empty state full-width band, not inset card (red-line #3).
- ✅ Profile two grouped sections (red-line #4).
- ✅ Home hero inside the gradient (red-line #6).
- ✅ Catalog centered logo (red-line #5).
- ⚠️ Confirm during build: `featuredCompact` width equals computed grid-card width.
- ⚠️ Confirm: page dots only render when `imageCount > 1`.
