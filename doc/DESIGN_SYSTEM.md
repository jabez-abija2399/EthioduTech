# DESIGN_SYSTEM.md

## Principles
- Warm, encouraging, never clinical — this is for kids aged 10–18.
- Every interaction should feel like it has room to fail safely; error states
  are worded as "let's try that again," never as blame.
- Bilingual parity: layout must not assume English text length — Amharic
  strings can run longer; components must not clip or overflow.
- Low-bandwidth first: prefer system fonts and minimal custom font loading,
  optimize all images, keep initial bundle lean.

## Color tokens (semantic, not literal hex in components)
`surface`, `surface-variant`, `primary`, `on-primary`, `secondary`,
`error`, `error-container`, `on-error-container`, `success`,
`warning`. Components reference these tokens exclusively — no raw Tailwind
color utilities like `bg-blue-500` in feature code.

## Typography
- One primary typeface for Latin script, one that renders Ethiopic script
  correctly and legibly at all sizes used in the app (verify actual Amharic
  rendering, don't assume a font "supports" Ethiopic without checking).
- Scale: display, heading-1, heading-2, body, body-small, caption. Defined
  once in the design tokens file, referenced everywhere.

## Spacing
4px base unit. Component padding/margin in multiples of 4. No arbitrary
one-off pixel values in feature code.

## Component rules
- **Buttons:** primary/secondary/ghost/destructive variants only. Every
  button has a visible loading state when it triggers an async action.
- **Cards:** consistent radius and elevation token across the whole app —
  no page may define its own one-off card style.
- **Forms:** label above input, inline validation error below the field it
  concerns, submit button disabled while the form is invalid or submitting.
- **Tables:** consistent header style, empty-state row when no data,
  pagination when >25 rows.
- **Modals:** consistent header/body/footer structure, always keyboard-
  dismissible (Escape) and focus-trapped.
- **Toasts/notifications:** consistent placement and duration across the app.
- **Empty states:** always include a short encouraging message plus a clear
  next action (never just "No data").

## Celebration moments (explicit motivation design requirement)
Two moments are designated as deserving real celebratory UI, not a plain
confirmation: (1) a project being approved, (2) a mastery badge being earned.
Both must feel like an event — this is a product requirement, not
decoration, because it materially affects student motivation and retention.

## Responsive rules
- Mobile-first. Bottom navigation on mobile for authenticated app shell,
  replaced by header nav on desktop.
- Code editor and live preview: on mobile, these stack with a tab toggle
  rather than a fixed split-pane that competes with the bottom nav for space
  — this was a known issue in earlier iterations and must not recur.
- Minimum tap target 44x44px on any interactive element reachable on mobile.

## Accessibility requirements
- All interactive elements reachable and operable via keyboard.
- All images have meaningful alt text (empty alt for purely decorative
  images).
- Color is never the only signal for state (e.g. pair a red border with an
  icon/text, not color alone, for error states).
- Sufficient contrast ratio (WCAG AA minimum) for all text/background
  combinations across both light content and any dark-mode code editor
  surfaces.

## Design consistency enforcement
Before any feature is marked complete, confirm it uses only components from
`components/ui/` and `components/shared/` for anything that already has a
shared equivalent. A hand-rolled button, card, or badge markup where a
shared primitive exists is a defect, not a stylistic choice.
