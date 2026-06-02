# Requirements — Ozon-Style E-Commerce (React Native + TypeScript)

## 1. Functional requirements

| ID  | Requirement | Source |
|-----|-------------|--------|
| F1  | App presents 5 tabs via a bottom-tab navigator: Главная, Каталог, Избранное, Корзина, Мой Ozon. Each tab is a native-stack. | Spec §3.3, Evidence |
| F2  | Interactive behaviors: tab switching, and pressing any product card pushes a product-detail screen. All other presses are inert. | Spec §0 (extended) |
| F3  | All product tiles render from the shared `Product` type via a single `ProductCard` with a `variant`. | Spec §0, §4.2 |
| F4  | All product data is sourced from `sampleData` **through a `ProductRepository`**; no inline product fields in components or hooks. | Spec §0, §2 |
| F5  | Brand wordmark + brand colors are resolved through `theme/brand.ts` / tokens, never hardcoded in screens. | Spec §0, §7.8 |
| F6  | Every image entry point falls back to a `searchFill` box + a `photo` glyph when the asset is absent. | Spec §3.0 |
| F7  | Home shows: gradient header (logo + city + Войти pill + search + hero promo), auto-advancing carousel (4 slides), quick-actions rail, "Рекомендуем" 2-col grid. | Spec Screen 1 |
| F8  | Catalog shows: centered logo, search bar, 3-col category grid of 18 categories in exact order. | Spec Screen 2 |
| F9  | Favorites shows: logo, search, filter row, one **compact left-aligned** featured card, "Подобрали для вас" 2-col grid. | Spec Screen 3 |
| F10 | Cart (empty) shows: logo, city row, full-width empty-state band, "Вы смотрели" 2-col grid. | Spec Screen 4 |
| F11 | Profile (logged out) shows: white CTA section, separate white settings group (5 rows), "Подобрали по вашим интересам" grid. | Spec Screen 5 |
| F12 | Search bars are display-only, with per-screen fill + trailing-icon variants. | Spec §4.1 |

## 2. Architecture requirements (MVVM-C → RN)

| ID  | Requirement |
|-----|-------------|
| A1  | **Navigation** is owned by React Navigation config (bottom tabs + per-tab native-stack). Screens navigate only via the typed `navigation` prop; no screen imports/renders another screen. |
| A2  | **ViewModels** are custom hooks (one per screen) that hold state + logic and contain no JSX. They depend only on the `ProductRepository` (via `useRepository()`). |
| A3  | **Repository** is the only path to `sampleData`; `SampleDataRepository` is provided at the root through `RepositoryContext` and is swappable. |
| A4  | **Views** (components) render hook state and forward intent (product press) to navigation — no business/navigation logic inside leaf components. |

## 3. Non-functional requirements

| ID  | Requirement |
|-----|-------------|
| N1  | React Native + **TypeScript (`strict`)**, iOS-targeted (Android-compatible). Minimal, standard libraries only (React Navigation, safe-area-context, screens, linear-gradient, vector-icons); no state-management or UI-kit libraries. |
| N2  | Text scales with the OS font setting by default; 2-line truncation must not clip (cap with `maxFontSizeMultiplier` where layout requires). |
| N3  | Every screen respects the top safe area (`useSafeAreaInsets`); custom header never overlaps the status bar. |
| N4  | App background = `backgroundApp` except inside white surfaces; active tab tint = `brandPrimary`. |
| N5  | Grid item widths are **computed** from `useWindowDimensions()`, gutter, and spacing — never hardcoded. |
| N6  | No crash and no blank space on any missing asset (see F6). |
| N7  | Tests: Jest + React Native Testing Library for components/screens + navigation; visual red-lines covered by the manual gate (optionally Detox e2e). |

## 4. Acceptance red-lines (reject build if ANY fail)

1. **Logo pill never aligned with the status-bar clock/battery** — below the safe area.
2. **Favorites featured card never full-width** — compact, left-aligned, grid-card width.
3. **Cart empty state never an inset white card** — full-width band on `backgroundApp`.
4. **Profile CTA + Settings never collapsed into one block** — two separate sections.
5. **Catalog never missing the centered logo.**
6. **Home hero never detached from the gradient header.**
7. **No product tile built outside the shared `Product` type + single `ProductCard`.**
8. **Brand wordmark/colors never hardcoded inside screen components** — always via `brand`/tokens.

## 5. Out of scope

See `research.md` §7. No add-to-cart/commerce logic, persistence, networking, or
auth. Product detail is a minimal reuse-only screen. Beyond the product-detail push,
no further navigation graph. No Redux/MobX/global store.
