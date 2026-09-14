# QUALITY_GATES.md

These are hard gates. A gate that fails blocks the corresponding release
scope (task, feature, or full product) regardless of how much other work is
complete. Do not mark anything production-ready with a failed gate.

## Gate A — Per-task gate (must pass before a task moves to COMPLETED)
- [ ] Typecheck: 0 errors
- [ ] Full test suite: 0 failures (not just the new tests — the whole suite)
- [ ] New/changed server actions have authentication + authorization checks,
      each covered by a test
- [ ] New/changed tables have RLS enabled with a correctly-scoped policy
- [ ] No hardcoded fallback IDs or placeholder values introduced
- [ ] Both `en` and `am` strings present for any new user-facing text
- [ ] UI states (loading/empty/error) implemented per
      `ERROR_HANDLING_AND_UI_STATES.md` — no blank-screen loading, no
      empty/error conflation, no raw technical error text shown to the user
- [ ] Diff reviewed and shown, not just described
- [ ] `REQUIREMENT_TRACEABILITY.md` updated

## Gate B — Per-feature gate (must pass before a FEATURE_REGISTRY entry is
marked complete)
- [ ] All of Gate A, for every task under this feature
- [ ] Feature's acceptance criteria (in FEATURE_REGISTRY.md) individually
      confirmed true, each with evidence
- [ ] Feature's error, loading, and empty states all implemented and verified
- [ ] Feature works when accessed by each role listed as permitted, and is
      correctly rejected for roles not listed
- [ ] No known regression introduced in any other feature (full suite run
      confirms this)

## Gate C — Milestone/phase gate
- [ ] Every feature scheduled for this phase passes Gate B
- [ ] No item in `tasks/BLOCKED.md` belongs to this phase without an explicit,
      recorded decision to defer it
- [ ] Full regression suite passes
- [ ] Security review for this phase's features completed per `SECURITY.md`
      checklist
- [ ] Responsive behavior spot-checked for this phase's new/changed pages

## Gate D — Production-readiness gate (final, before pilot launch)
The product may not be declared production-ready unless ALL of the following
are true simultaneously:
- [ ] Every requirement in `MASTER_SPEC.md` is either implemented+tested, or
      explicitly listed in "Out of Scope for v1" / backlog — none silently
      missing
- [ ] `REQUIREMENT_TRACEABILITY.md` shows zero orphan requirements (no
      requirement without a feature, task, and test) — see FINAL_AUDIT
      procedure
- [ ] Full test suite passes: unit, integration, and critical-path E2E
      (see TESTING_STRATEGY.md for which flows require E2E)
- [ ] Typecheck, lint, and production build all pass cleanly
- [ ] Security checklist in `SECURITY.md` fully passed, including a manual
      authorization audit of every server action (not just automated)
- [ ] Every table has RLS verified against `DATABASE.md`'s specification
- [ ] Every API/server action's request/response matches
      `API_SPECIFICATION.md`
- [ ] Responsive behavior verified on a real small-viewport + throttled-
      network test, not just desktop
- [ ] All critical user journeys (see TESTING_STRATEGY.md) manually walked
      end-to-end by a human, in addition to automated E2E
- [ ] Production configuration verified: no placeholder secrets, real email
      provider configured and test-sent, monitoring (Sentry or equivalent)
      receiving real events
- [ ] Zero unresolved CRITICAL severity bugs
- [ ] Zero unresolved HIGH severity bugs
- [ ] Child-safety defaults verified: portfolio privacy default, consent
      gating, distress-detection layer all confirmed active and untouched

## Severity definitions (used throughout)
- **CRITICAL** — data loss, authentication/authorization bypass, child-safety
  failure, or a security exploit reachable by an unauthenticated user.
- **HIGH** — authorization bypass reachable only by an authenticated user of
  the wrong role, data corruption in a non-safety-critical path, or a broken
  critical user journey.
- **MEDIUM** — a feature works incorrectly in a non-critical path, a
  significant UX defect, missing edge-case handling.
- **LOW** — cosmetic issues, minor copy problems, non-blocking inconsistency.

Gate D requires zero CRITICAL and zero HIGH. MEDIUM and LOW issues are
tracked in `tasks/BACKLOG.md` for post-launch iteration and do not block
Gate D on their own, unless their volume or nature suggests a systemic
problem — use judgment and flag if so.
