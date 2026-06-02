# Ozon-Style E-Commerce (React Native + TypeScript) — Implementation Docs

Spec-first documentation package for a presentational **React Native (TypeScript)**
prototype of an Ozon-style marketplace. The RN sibling of the SwiftUI and UIKit
builds — same screens, tokens, and data; MVVM-C mapped to RN (hooks = ViewModels,
React Navigation = Coordinator, repository = Model). Built from the v2 spec + 5
verified reference screenshots.

## Read in this order

1. [`implementation/research.md`](implementation/research.md) — goal, constraints, stack decision, IP risk, unknowns.
2. [`implementation/requirements.md`](implementation/requirements.md) — functional/architecture/non-functional reqs + the 8 red-lines.
3. [`implementation/design-system.md`](implementation/design-system.md) — **tokens** (color/spacing/type/shape) as TS objects. Reuse verbatim.
4. [`implementation/design.md`](implementation/design.md) — component props + per-screen specs (5 screens + detail).
5. [`implementation/architecture.md`](implementation/architecture.md) — MVVM-C→RN layering, folder tree, data model, reuse map.
6. [`implementation/implementation-plan.md`](implementation/implementation-plan.md) — ordered tasks T0–T21 with acceptance + traceability.
7. [`implementation/validation-plan.md`](implementation/validation-plan.md) — per-screen checklist, layering review, red-lines, test gate.
8. [`prompts/developer.md`](prompts/developer.md) — the implementation prompt (tokens + RN rules + slop ban).

`implementation/validation-report.md` is a pending template, filled during the final
pass (T20).

## The non-negotiables (one glance)

- **MVVM-C in RN:** navigation owns routing; hooks own state (no JSX); a repository is
  the only data path; components are dumb.
- One `ProductCard` (variant prop) on every product surface — no per-screen cards.
- All content from `sampleData` **via `ProductRepository`** — no literals in components/hooks.
- Brand behind `theme/brand.ts` — no hardcoded "OZON"/brand hex in screens.
- Logo always below the safe area.
- Build order is fixed; screenshot-verify each screen before the next.

## Status

Planning complete. Coding has **not** started — begin with task **T0** in the
implementation plan once approved.
