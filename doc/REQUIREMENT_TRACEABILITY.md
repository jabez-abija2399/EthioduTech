# REQUIREMENT_TRACEABILITY.md

This file is the audit backbone of the project. Every row must eventually be
fully populated. A blank column after a feature is marked complete is a bug in
the process, not an acceptable gap.

Chain: **Requirement → Feature → User Flow → Task → Implementation → Test →
Verification**

Antigravity must keep this table current as work proceeds — update it as part
of the AUDIT step in `DEVELOPMENT_WORKFLOW.md`, not in a separate cleanup pass.

## Table format
| REQ ID | FEAT ID | FLOW ID | TASK ID(s) | Files | TEST ID(s) | Status | Verified? |
|---|---|---|---|---|---|---|---|

Status values: `not started` / `in progress` / `implemented` / `tested` /
`verified`. Only `verified` counts toward Gate D in `QUALITY_GATES.md`.

## Initial seed rows (Antigravity: expand this table to cover every REQ in
MASTER_SPEC.md as tasks are created — do not leave requirements unmapped)

| REQ ID | FEAT ID | FLOW ID | TASK ID(s) | Files | TEST ID(s) | Status | Verified? |
|---|---|---|---|---|---|---|---|
| REQ-001 | FEAT-001 | FLOW-001 | TASK-001..003 | features/auth/* | TEST-001..004 | not started | No |
| REQ-002..005 | FEAT-002 | FLOW-001 | TASK-004..006 | features/auth/*, supabase/migrations/* | TEST-005..008 | not started | No |
| REQ-006..009 | FEAT-003 | FLOW-002 | TASK-007..010 | features/auth/server/email-verification.ts, lib/email/* | TEST-009..013 | not started | No |
| REQ-010..015 | FEAT-004 | FLOW-001, FLOW-003 | TASK-011..013 | features/auth/*, lib/supabase/middleware.ts | TEST-014..018 | not started | No |
| REQ-016..020 | FEAT-005 | FLOW-004 | TASK-014..015 | features/auth/server/actions.ts, app/[locale]/onboarding/* | TEST-019..020 | not started | No |
| REQ-021..023 | FEAT-006 | FLOW-005 | TASK-016..018 | features/learning/* | TEST-021..023 | not started | No |
| REQ-024..030 | FEAT-007 | FLOW-006 | TASK-019..025 | features/learning/*, components/editor/* | TEST-024..032 | not started | No |
| REQ-031..034 | FEAT-008 | FLOW-006 | TASK-026..029 | lib/ai/*, app/api/ai/help/* | TEST-033..038 | not started | No |
| REQ-035..040 | FEAT-009 | FLOW-006, FLOW-007 | TASK-030..032 | features/learning/* | TEST-039..041 | not started | No |
| REQ-041..050 | FEAT-010 | FLOW-008 | TASK-033..040 | features/submissions/* | TEST-042..050 | not started | No |
| REQ-051..055 | FEAT-011 | FLOW-009 | TASK-041..044 | features/portfolio/* | TEST-051..054 | not started | No |
| REQ-056..062 | FEAT-012 | FLOW-010 | TASK-045..049 | features/cohorts/*, features/instructor/*, supabase/migrations/* | TEST-055..059 | not started | No |
| REQ-063..070 | FEAT-013 | FLOW-011 | TASK-050..055 | features/instructor/* | TEST-060..066 | not started | No |
| REQ-071..074 | FEAT-014 | FLOW-012 | TASK-056..059 | features/parent/* | TEST-067..070 | not started | No |
| REQ-075..085a | FEAT-015 | FLOW-013 | TASK-060..070 | features/admin/* | TEST-071..085 | not started | No |
| REQ-086..090 | FEAT-016 | FLOW-014 | TASK-071..074 | features/safety/* | TEST-086..089 | not started | No |
| REQ-091..093 | FEAT-017 | (cross-cutting) | TASK-075..076 | messages/*, next-intl config | TEST-090..091 | not started | No |
| REQ-094..096 | FEAT-018 | FLOW-015 | TASK-077..079 | features/notifications/* | TEST-092..094 | not started | No |

## Orphan check procedure
Before any milestone gate (`QUALITY_GATES.md` Gate C/D), run this check:
1. Every REQ ID in `MASTER_SPEC.md` appears in this table. Flag any that
   don't as orphan requirements.
2. Every FEAT ID in `FEATURE_REGISTRY.md` appears in this table. Flag orphan
   features.
3. Every TASK ID that has been completed appears here with a status of at
   least `implemented`. Flag orphan completed tasks not reflected here.
4. Every row with status `tested` or `verified` has real TEST IDs that exist
   in `TESTING_STRATEGY.md` and correspond to actually-passing tests — spot
   check by running them, don't trust the table blindly.

Zero orphans in all four checks is required for Gate D.
