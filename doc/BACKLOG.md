# tasks/BACKLOG.md

Ordered by dependency. Work top to bottom unless a task is blocked, in which
case skip to the next unblocked task and record the skip in `BLOCKED.md`.
Antigravity should expand each of these into finer-grained sub-tasks during
DISCOVER/PLAN as needed — these are the top-level units, not exhaustive.

## Milestone M0 — Foundation & Safety Net
- TASK-001: Establish baseline — run typecheck + full test suite on current
  codebase; fix any pre-existing failures before proceeding to anything else.
- TASK-002: Produce a full server-action inventory (every action, file,
  role, current test coverage) as a living doc.
- TASK-003: Produce a full, manually-verified authorization audit of every
  server action (see SECURITY.md acceptance criteria — must be real file
  reads, not script heuristics reported as fact).
- TASK-004: Produce a full database + RLS audit against DATABASE.md.

## Milestone M1 — Security & Data Integrity
- TASK-005 onward: for each FAIL found in TASK-003's audit, one task per
  fix — add correct auth+role/scope check, add tests (success, unauthorized,
  wrong-role/IDOR), verify full suite, show diff. Do not batch unrelated
  fixes into one task.
- TASK-0xx: resolve every RLS gap found in TASK-004, one migration/fix per
  gap, each shown for human approval before being applied.
- TASK-0xx: remove any hardcoded fallback IDs/placeholder values found.
- TASK-0xx: fix any silent-error-swallowing paths found (must surface real
  failures, not fall back to fake data).
- TASK-0xx: resolve the `scheduleLiveSession` duplicate (FEAT-012) — confirm
  which is canonical, delete the other, confirm nothing references the
  deleted one.

## Milestone M2 — Core Feature Correctness
- TASK-0xx: real autosave persistence for the standalone code editor
  (FEAT-007) — wire the "saved" indicator to an actual server round trip.
- TASK-0xx: cohort join-code enrollment end-to-end (FEAT-002) — migration
  (human-approved before applying), validation+enrollment logic, sign-up
  form wiring, tests.
- TASK-0xx: email delivery hardening (FEAT-003) — real SMTP confirmed with
  real credentials, production hard-fail behavior, dev-mode loud fallback,
  non-destructive sign-up recovery path (RULE-010).
- TASK-0xx: real LLM-backed AI copilot (FEAT-008) — server-side adapter,
  grounded prompting, distress-detection preserved and tested as running
  before any LLM call.
- TASK-0xx: parent-student linking flow (FEAT-014) — resolve the open design
  decision in MASTER_SPEC.md Section 9 first, then implement.
- TASK-0xx: real badge/streak logic replacing any mock data (FEAT-009).
- TASK-0xx: Python execution decision — implement real execution (Pyodide)
  or remove/clearly-disable the tab; do not leave a misleading fake tab.

## Milestone M3 — Structural Consistency
- TASK-0xx: consolidate duplicated components across the codebase.
- TASK-0xx: enforce shared `components/ui/` primitives everywhere; replace
  any hand-rolled markup found.
- TASK-0xx: align design tokens across all pages per DESIGN_SYSTEM.md.
- TASK-0xx: fix navigation dead ends found during audit; standardize
  back-navigation.
- TASK-0xx: standardize server-action error shape and Supabase client usage
  across every feature module.
- TASK-0xx: remove remaining `any` type casts on Supabase query results.

## Milestone M4 — Observability & Production Readiness
- TASK-0xx: install and wire Sentry, verify with a real test event.
- TASK-0xx: add `error.tsx`/`global-error.tsx` at every route level missing
  one.
- TASK-0xx: build integration/E2E coverage for the 8 critical journeys in
  TESTING_STRATEGY.md.
- TASK-0xx: rotate all placeholder secrets before Gate D (human-executed
  step, Antigravity confirms via a checklist, does not generate/store real
  secrets itself).

## Milestone M5 — Learning Experience Quality
- TASK-0xx: review/tune first-interactive-step pacing for a sub-60-second
  visible win.
- TASK-0xx: review lesson "explain" segment lengths against pacing guidance.
- TASK-0xx: review lenient-checker error message clarity (plain language,
  specific).
- TASK-0xx: test the AI copilot's Socratic prompt against representative
  real student scenarios; tune as needed.
- TASK-0xx: implement real badges tied to milestones; implement a
  non-punitive streak mechanic.
- TASK-0xx: build the "project approved" and "badge earned" celebration UI
  moments per DESIGN_SYSTEM.md.
- TASK-0xx: add SLA-flagging to the instructor review queue.

## Milestone M6 — Localization & Cultural Fit
- TASK-0xx: native-speaker educator review pass of all Amharic content
  (human-executed; Antigravity applies the resulting corrections).
- TASK-0xx: localize project examples to Ethiopian context.
- TASK-0xx: glossary review for natural Amharic coding-term phrasing.

## Milestone M7 — Performance & Device Reality
- TASK-0xx: bundle size audit and reduction.
- TASK-0xx: mobile touchscreen usability pass on code editor/live preview.
- TASK-0xx: throttled-network load test on lesson player and dashboard.
- TASK-0xx: image/asset optimization pass.

## Milestone M8 — Pilot Launch Readiness
- TASK-0xx: full human walkthrough of every role's critical journey.
- TASK-0xx: privacy/consent flow legal-style review (human-executed).
- TASK-0xx: finalize help content.
- TASK-0xx: document the pilot support/rollback plan.

## Milestone M9 — Backlog (not scheduled, tracked)
- Real attendance recording (FEAT-019)
- Python track full content (FEAT-020)
- Game-dev track full content (FEAT-021)
- GitHub integration (FEAT-022)
