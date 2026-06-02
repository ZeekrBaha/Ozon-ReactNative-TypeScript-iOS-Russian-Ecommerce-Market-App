# Research — Ozon-Style E-Commerce (React Native + TypeScript)

> Spec-first research doc. Claims are labelled `Evidence`, `Repository fact`, or
> `Assumption`. No design decisions here except as clearly marked options.

## 1. Goal

Build a presentational **React Native (TypeScript)** prototype that visually
reproduces an Ozon-style marketplace across five tabs (Home, Catalog, Favorites,
Cart empty, Profile logged-out) plus a minimal product-detail screen. The RN sibling
of the existing SwiftUI and UIKit builds — same screens, tokens, and data; different
framework.

- `Evidence` (5 reference screenshots): Home with a blue gradient header + hero promo;
  3-column Catalog grid; Favorites with one compact featured card; empty Cart with a
  "Вы смотрели" grid; logged-out Profile with CTA + settings group.
- `Assumption`: a portfolio/learning prototype — no backend, accounts, or commerce.

## 2. Audience

- `Assumption`: the developer (Baha) building a cross-framework portfolio, and
  reviewers judging UI fidelity **and** the RN architecture (hooks/navigation/repo).

## 3. Success criteria

1. Each of the 5 screens matches its reference on layout, spacing, color, typography.
2. All 8 acceptance red-lines in `requirements.md` pass.
3. Clean layering: navigation owns routing, hooks own state, components are dumb, a
   repository is the only data path (`requirements.md` §2).
4. Interactive behavior limited to tab switching + product→detail push.
5. Strict TypeScript; minimal standard RN libraries only.
6. Jest + React Native Testing Library coverage for screens + navigation flow.

## 4. Constraints (binding)

- `Constraint`: **React Native + TypeScript (`strict`)**, iOS-targeted (the reference
  is iOS), Android-compatible. Run via the React Native CLI (or Expo — see options).
- `Constraint`: **MVVM-C mapped to RN.** ViewModels are custom hooks; the
  "coordinator" is React Navigation config; a `ProductRepository` is injected via
  Context. Components hold no business/navigation logic.
- `Constraint`: **Minimal dependencies.** Only the standard navigation/safe-area/
  gradient/icon libraries. No Redux/MobX/global store, no UI-kit.
- `Constraint`: **Centralized mock data.** All content from `sampleData`, reached only
  through the repository. Never hardcode product fields in a component or hook.
- `Constraint`: **One card component.** Every product tile is the same `ProductCard`,
  differing only by a `variant`. Per-screen duplicate cards are rejected.
- `Constraint`: **Branding behind a config switch** (`theme/brand.ts`).
- `Constraint`: **Localization Russian/Kazakh-market.** Russian strings; ₸ (KZT);
  city Астана; "Сделано в Казахстане". (Inline strings; i18n is future work.)

### Stack options (decide at T0)

- `Option A (default)`: **React Native CLI** + TypeScript template — closest to a
  "real" bare RN app; iOS via CocoaPods + Xcode simulator.
- `Option B`: **Expo (managed)** + TypeScript — fastest to run; `expo-linear-gradient`
  + `@expo/vector-icons`. Pick if simulator setup friction matters more than bare-RN
  fidelity.

## 5. Data sources & APIs

- `Repository fact`: none external. All data is mock in `sampleData`, served via
  `SampleDataRepository`. No API/network.
- `Evidence` (spec §2): `Product`, `Category`, `QuickAction`, `SettingsItem` shapes
  are fully specified with concrete sample values. IDs are stable strings (serializable
  nav params + list keys).

## 6. Risks & unknowns

- `Risk — IP/Trademark (HIGH).` Reproduces the **OZON** wordmark, **О!РАСПРОДАЖА**
  lockup, and apparent third-party photos. Private reference only; **must not ship**
  without swapping the mark, art, and images. Mitigation: all identity isolated in
  `theme/brand.ts` + `assets/`.
- `Risk — navigation params.` Passing whole objects as route params warns/serializes
  poorly. Mitigation: pass `productId` and re-read from the repository in the detail.
- `Risk — grid layout.` `FlatList numColumns` + per-item computed width can drift on
  rotation/landscape. Mitigation: compute from `useWindowDimensions()`; lock portrait.
- `Risk — safe-area / gradient header.` The Home gradient must bleed under the status
  bar while content starts at `insets.top + 8`. Mitigation: header uses absolute
  insets, not `SafeAreaView` padding.
- `Risk — asset stalls.` Missing images leave blank space. Mitigation: §3.0
  `ProductImage` `onError` fallback at every image entry point.
- `Unknown`: hero/promo artwork → `Assumption`: styled text lockup (IP-safe) + 4 banner
  images; carousel auto-advances.
- `Unknown`: full `recommended` set → `Assumption`: ≥6 plausible products reusing the
  three specified instances + simple additions; centralized in `sampleData`.

## 7. Non-goals (explicit)

- No add-to-cart logic, search results, or commerce actions on detail.
- No dark mode beyond OS font scaling (light UI matches reference).
- No i18n library in v1 (future work).
- No networking, persistence, auth, or global state store.
