# ERROR_HANDLING_AND_UI_STATES.md

This is the canonical reference for how the UI layer handles errors, loading,
and empty states — the client-side counterpart to `ARCHITECTURE.md`'s
server-side `ActionResult<T>` pattern. Every page and component follows this
contract. Inconsistent, one-off handling in a single feature is a defect,
not a stylistic choice.

## 1. The state machine every data-driven view follows
Every component that fetches or mutates data moves through a strict, ordered
set of states — never an ad-hoc combination:

```
idle → loading → (success → populated | success → empty) | error
```

- **idle** — before any request has been made (rare; usually skipped on
  server-rendered pages).
- **loading** — request in flight. Never leave the user looking at a blank
  screen with no signal.
- **populated** — data returned and is non-empty.
- **empty** — data returned successfully but the result set is genuinely
  empty (e.g. zero submissions). This is NOT the same state as an error and
  must never be rendered using error styling.
- **error** — the request failed. Distinct from empty.

A component that conflates "loading" with "empty" (e.g. briefly flashing an
empty state before real data arrives) is a defect — gate the empty state on
`status === 'success' && data.length === 0`, never on data being merely
absent during load.

## 2. Loading state conventions
- **Page-level initial load:** skeleton screens matching the eventual
  layout's shape (per `DESIGN_SYSTEM.md` component rules) — never a bare
  spinner centered on an otherwise blank page for a full page load.
- **Inline/button-level actions:** a spinner inside the triggering button,
  button disabled for the duration, no layout shift when the spinner
  appears/disappears.
- **Background refresh** (e.g. polling notifications): no visible loading
  indicator unless the refresh takes longer than ~2 seconds — don't flicker
  UI for fast background updates.

## 3. Empty state conventions
Every list/collection view must define an explicit empty state per
`DESIGN_SYSTEM.md`: a short encouraging message plus one clear next action
(e.g. "No projects yet — start your first lesson" with a CTA), never a bare
"No data" or a silently blank container.

First-time/zero-progress states (e.g. a brand-new student's dashboard) are a
specific, designed empty state — not the generic fallback. See
`FEATURE_REGISTRY.md` FEAT-009 acceptance criteria.

## 4. Error state conventions — mapping `ActionResult` codes to UI treatment
Every server action returns `{ ok: false, code: string, message: string }`
on failure (see `ARCHITECTURE.md`). The UI layer maps `code` to a consistent
treatment, not a one-off per call site:

| Code pattern | UI treatment | Example |
|---|---|---|
| `validation_error` | Inline, field-level message, shown next to the specific input | "Password must be at least 6 characters" under the password field |
| `unauthorized` | Redirect to sign-in (if unauthenticated) or a clear "you don't have access" page-level banner (if wrong role) — never a raw error dump | Wrong-role instructor page access |
| `rate_limited` | Inline banner with a countdown or "try again in X" — never a generic error | Verification code resend |
| `email_dispatch_error` / similar recoverable-but-external-failure codes | Page-level banner with a specific explanation AND a clear next action/link (see FEAT-003) | Sign-up email failed to send |
| `internal_error` / unrecognized code | Generic, friendly page-level or toast error ("Something went wrong, please try again") — never expose raw error internals to the user | Unexpected DB failure |

**Toast vs. inline banner rule:** use a toast for errors on an action the
user can immediately retry without losing context (e.g. "failed to save
note, try again"). Use an inline banner for errors that block a form or
flow from proceeding (e.g. sign-up failure) — the user needs to see it
persist, not have it disappear in a few seconds.

## 5. Network/connectivity failures
A fetch that fails due to network issues (not a server-returned error) is
distinguished in the UI from a server-returned `ActionResult` failure: show
"check your connection and try again" rather than a generic server error
message, since the fix is different and this matters especially given the
low-bandwidth device context in `DESIGN_SYSTEM.md`.

## 6. Route-level error boundaries
- Every route segment that can throw an unexpected error has an `error.tsx`
  boundary rendering a graceful, on-brand error page with a "try again" and
  a "go to dashboard/home" action — never Next.js's raw default error
  screen in production.
- `global-error.tsx` exists at the root for errors that occur above the
  normal boundary (e.g. in the root layout itself).
- A `not-found.tsx` is used deliberately in two distinct cases that must
  look and read identically to an outside visitor: a genuine 404, and a
  privacy-gated resource (e.g. a private portfolio). Never let the wording
  differ in a way that confirms a resource exists but is merely private —
  that's an information leak. See `PAGE_INVENTORY.md` PAGE-016/PAGE-032.

## 7. Form validation timing
- Field-level validation errors appear on blur (after the user leaves the
  field) or on submit attempt — never on every keystroke while the user is
  still typing their first entry into a field.
- Once an error is shown for a field, it re-validates live on each
  subsequent change to that field, so the error clears as soon as it's
  actually fixed.
- Submit buttons are disabled while the form is in a known-invalid state
  AND while a submission is in flight — never allow a double-submit.

## 8. Retry patterns
- Any page-level data fetch that fails offers an explicit "Retry" action —
  never requires a full page reload as the only recovery path.
- Retries do not auto-loop indefinitely; a manual retry action is preferred
  over silent automatic retries for user-initiated data loads, to avoid
  masking a persistent failure as a hang.

## 9. What this means for Gate A (QUALITY_GATES.md)
No task is complete if its UI:
- Shows a blank screen during loading with no skeleton/spinner.
- Conflates an empty result with an error.
- Displays a raw/technical error message to the user.
- Leaves a form submittable in an invalid or already-submitting state.
- Lacks a retry path for a failed fetch.
- Uses a route without an `error.tsx` boundary for anything beyond the
  simplest static page.

This file's rules are additive to — not a replacement for — the per-page
"states" requirements already listed in `PAGE_INVENTORY.md` and the
component rules in `DESIGN_SYSTEM.md`. When they overlap, this file defines
*how* those states behave; the other two define *what* must exist on each
page/component.
