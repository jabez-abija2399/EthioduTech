# BUSINESS_RULES.md

Every rule below must be enforced in code, not only in documentation. A rule
that exists only in prose and isn't checked by validation, a database
constraint, or a test does not count as enforced.

## RULE-001 — Portfolio privacy default
**Rule:** Every approved project defaults to `visibility: private`.
**Reason:** Students are minors; public exposure must be opt-in, never opt-out.
**Affected features:** FEAT-011
**Affected roles:** Student, Public
**Validation:** database column default + server action never sets public on
creation.
**Consequences of violation:** treated as a CRITICAL severity bug (see
QUALITY_GATES.md severity definitions).

## RULE-002 — No public exposure without verified consent
**Rule:** A project may only be publicly visible if a `guardian_consent`
record exists and is currently active for that student.
**Reason:** Legal/ethical requirement for minors' data.
**Affected features:** FEAT-011, FEAT-014
**Affected roles:** Student, Parent, Public
**Validation:** server-side check on every visibility toggle and on every
public portfolio read, not just at toggle time (consent can be revoked later).
**Consequences of violation:** CRITICAL.

## RULE-003 — Universal authentication + authorization
**Rule:** Every server action must check authentication and the correct
authorization (role check or self-scoping) before performing its operation.
**Reason:** Historical audits on this exact codebase found the majority of
server actions missing this.
**Affected features:** all
**Affected roles:** all
**Validation:** per-action test for unauthorized/wrong-role rejection.
**Consequences of violation:** CRITICAL if it allows privilege escalation or
data access across users; HIGH otherwise.

## RULE-004 — No fake functionality
**Rule:** A feature must perform its real underlying action, or be clearly
marked unavailable. No cosmetic-only success states.
**Reason:** Erodes trust, hides real defects, and specifically has occurred
before in this project (fake autosave indicator, static AI responses).
**Affected features:** FEAT-007, FEAT-008, FEAT-010
**Consequences of violation:** HIGH.

## RULE-005 — Join code validated before account creation
**Rule:** Join code validity is checked before any Supabase Auth account or
profile is created.
**Reason:** Prevents orphaned, unverifiable accounts from a bad join code.
**Affected features:** FEAT-001, FEAT-002

## RULE-006 — Blank join code is always valid
**Rule:** A student may sign up without any cohort; this is a fully
supported, non-error path.
**Affected features:** FEAT-001, FEAT-002

## RULE-007 — No plaintext verification codes at rest
**Rule:** `email_verifications.code_hash` stores a hash, never the raw code.
**Reason:** A DB read/leak should not expose usable codes.
**Affected features:** FEAT-003

## RULE-008 — Verification codes expire
**Rule:** A code is invalid after its `expires_at` timestamp, enforced
server-side on verify, not just hidden client-side.
**Affected features:** FEAT-003

## RULE-009 — Resend rate limiting
**Rule:** A minimum cooldown (recommend 60 seconds) applies between resend
requests for the same email/purpose.
**Reason:** Prevents abuse of the email-sending mechanism.
**Affected features:** FEAT-003

## RULE-010 — No destructive rollback for recoverable failures
**Rule:** When a partial failure occurs after an account or resource is
created (e.g. email dispatch fails after account creation, cohort membership
insert fails after account creation), the default response is a clear,
honest error with a retry/next-step path — not deleting what was already
created.
**Reason:** Destructive rollback (e.g. `admin.auth.admin.deleteUser`) is
higher-risk than a well-designed recovery path and was explicitly rejected in
this project's actual engineering history in favor of a resend/retry
approach.
**Affected features:** FEAT-001, FEAT-002, FEAT-003
**Consequences of violation:** implementing destructive rollback without the
explicit human checkpoint required by AGENT_CONSTITUTION.md Section 10 is a
constitution violation, treated as HIGH regardless of intent.

## RULE-011 — Autosave must be real
**Rule:** Any UI element indicating "saving/saved" must be wired to an actual
successful server write. A local timer producing the same visual state
without a real write is prohibited.
**Affected features:** FEAT-007, FEAT-010

## RULE-012 — Distress-detection layer cannot be weakened
**Rule:** The AI copilot's distress-pattern detection (en and am) always runs
before any LLM call and always overrides the LLM path when triggered. No
feature flag, configuration, or AI-provider change may disable or bypass it.
**Affected features:** FEAT-008
**Consequences of violation:** CRITICAL.

## RULE-013 — No full solutions from the AI copilot
**Rule:** The AI copilot must never output a complete, directly-usable
solution to the current exercise; it may only guide via questions and
partial hints (Socratic method).
**Affected features:** FEAT-008

## RULE-014 — Audit log is append-only
**Rule:** `admin_audit_log` has no UPDATE or DELETE policy for any role,
including admin, enforced at the database level (RLS/grants), not just
application logic.
**Reason:** An editable audit log isn't an audit log.
**Affected features:** FEAT-015
**Consequences of violation:** CRITICAL.

## RULE-015 — Role changes require a justified, logged reason
**Rule:** `updateUserRole` requires a reason string of at least 5 characters,
which is itself written to the audit log alongside the change.
**Affected features:** FEAT-015

## RULE-016 — Instructor scope is cohort-bound
**Rule:** An instructor's queries and actions are always scoped to cohorts
they actually teach (via `cohort_memberships` with `role_in_cohort =
'instructor'`), never platform-wide, unless the caller is also an admin.
**Affected features:** FEAT-012, FEAT-013
**Consequences of violation:** HIGH (cross-cohort data exposure).

## RULE-017 — Bilingual completeness is part of "done"
**Rule:** No user-facing feature may be marked complete with strings present
in only one of `en`/`am`.
**Affected features:** all (via FEAT-017)

## RULE-018 — Notifications cannot be spoofed
**Rule:** A notification's target user must always be the authenticated
caller's own id for any client-reachable path, or the function must be
converted to a trusted-internal-only call with no client-supplied target.
**Affected features:** FEAT-018
**Consequences of violation:** HIGH.
