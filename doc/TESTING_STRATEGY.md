# TESTING_STRATEGY.md

## Test types and when each applies
- **Unit tests** — every server action, every validation schema, every pure
  utility function (e.g. the lenient checker, error translator).
- **Integration tests** — flows crossing multiple actions/tables (e.g.
  sign-up → verification → onboarding; submission → review → notification →
  portfolio).
- **API/route tests** — the AI copilot route specifically, given its
  external dependency and safety-critical distress-detection logic.
- **Database tests** — RLS policy verification against a real (test)
  Supabase instance, not just application-level mocking — this is currently
  a zero-coverage gap in the project's history and must be closed.
- **Component tests** — key interactive components (code editor, live
  preview, rubric scorer) for correct state transitions.
- **E2E tests** — the critical user journeys listed below, run against a
  real browser.
- **Accessibility tests** — automated axe-core (or equivalent) scan on every
  page in `PAGE_INVENTORY.md`, plus manual keyboard-navigation spot checks.
- **Security tests** — authorization (every action, both unauthenticated and
  wrong-role), IDOR, and RLS-policy tests as described above.
- **Performance tests** — bundle size budget check, and a throttled-network
  load test on the lesson player and dashboard specifically (highest-traffic
  pages).

## Critical user journeys requiring E2E coverage (non-negotiable)
1. Sign-up → email verification → onboarding → first lesson → checkpoint
   pass → lesson complete.
2. Sign-up with a valid cohort join code → membership created → visible on
   instructor roster.
3. Sign-up with an invalid join code → blocked → retry with blank code
   succeeds.
4. Project workspace → autosave persists across a simulated reload → submit
   → instructor review → approval → appears on student portfolio (private).
5. Student attempts to make a portfolio project public without consent →
   blocked → parent grants consent → student can now make it public →
   public link is viewable by a signed-out visitor.
6. A student account attempts to call an instructor-only and an admin-only
   action directly → both rejected.
7. Password reset: request → code → new password → sign in with new
   password.
8. AI copilot: a distress-pattern message never reaches the LLM and returns
   the safe-reply path; a normal coding question receives a response that
   varies based on the actual code submitted.

## Test ID scheme
`TEST-001` upward, grouped and referenced from `REQUIREMENT_TRACEABILITY.md`.
Numbering blocks (for consistency with the traceability seed table):
- TEST-001–004: account creation core
- TEST-005–008: join-code validation/enrollment
- TEST-009–013: email verification/delivery
- TEST-014–018: sign-in/session/routing
- TEST-019–020: onboarding
- TEST-021–023: curriculum browsing
- TEST-024–032: lesson player + autosave + checkpoint
- TEST-033–038: AI copilot (including distress-detection cases)
- TEST-039–041: dashboard/progress
- TEST-042–050: submissions + review authorization
- TEST-051–054: portfolio visibility/consent
- TEST-055–059: cohorts/live sessions/duplicate resolution
- TEST-060–066: instructor authorization + cohort scoping
- TEST-067–070: parent scoping
- TEST-071–085: admin authorization (every action, both unauthenticated and
  non-admin-authenticated cases)
- TEST-086–089: safety reporting/resolution
- TEST-090–091: i18n completeness check (automated diff of en/am message
  keys — flags any missing key in either file)
- TEST-092–094: notifications, including the anti-spoofing IDOR test

## Every authorization test must cover at minimum
1. Unauthenticated caller → rejected.
2. Authenticated, wrong-role caller → rejected.
3. Authenticated, correct-role caller → succeeds.
4. (Where applicable) authenticated, correct-role, but wrong-scope caller
   (e.g. instructor for a different cohort; parent for an unlinked student)
   → rejected.

A test file asserting only case 3 without also asserting cases 1, 2, and (if
applicable) 4 is incomplete and does not satisfy Gate A.

## Test data & fixtures
- Use realistic but clearly-fake data (no real student names/emails).
- Never write a test that depends on a schema or function that does not yet
  exist in the codebase — write the implementation first, or write the test
  in the same task as the implementation. A previously-observed failure mode
  in this project was an orphaned test file referencing a schema that was
  never built; do not repeat this.

## CI requirements
- Typecheck, full unit/integration suite, and lint run on every change.
- E2E suite runs at minimum before any milestone gate (Gate C) and before
  Gate D.
- No merge/task completion with a red test suite, ever.
