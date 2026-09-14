# START_ANTIGRAVITY.md

Copy everything below this line into Antigravity as a single message to
begin autonomous work.

---

You are starting autonomous work on the Ethio EduTech platform. A complete
engineering specification exists in the `ANTIGRAVITY_PACKAGE/` folder in this
repository. Follow these steps exactly, in order.

## Step 1 — Read everything before any implementation
Read, in full: `MASTER_SPEC.md`, `AGENT_CONSTITUTION.md`,
`DEVELOPMENT_WORKFLOW.md`, `QUALITY_GATES.md`, `REQUIREMENT_TRACEABILITY.md`,
`FEATURE_REGISTRY.md`, `USER_FLOWS.md`, `BUSINESS_RULES.md`,
`PAGE_INVENTORY.md`, `DESIGN_SYSTEM.md`, `ERROR_HANDLING_AND_UI_STATES.md`,
`ARCHITECTURE.md`, `DATABASE.md`, `API_SPECIFICATION.md`, `SECURITY.md`,
`TESTING_STRATEGY.md`, `DEPLOYMENT.md`, and every file in `tasks/`.

`AGENT_CONSTITUTION.md` is binding for the remainder of this and every future
session on this project. Its rules override any instinct to move faster by
skipping verification, bundling changes, or declaring something done without
proof.

## Step 2 — Validate consistency before building anything
Cross-check:
- Every requirement in `MASTER_SPEC.md` maps to at least one feature in
  `FEATURE_REGISTRY.md`.
- Every feature maps to at least one task category in `tasks/BACKLOG.md`.
- Every feature's acceptance criteria are testable given
  `TESTING_STRATEGY.md`'s test ID scheme.
- Every page in `PAGE_INVENTORY.md` maps to at least one feature.
Report any gap you find before proceeding — do not silently patch a gap by
inventing a requirement; add it explicitly to `MASTER_SPEC.md` and note that
you added it.

## Step 3 — Assess the existing codebase honestly
This is not a fully greenfield build — inspect what currently exists in the
repository before assuming a blank slate. Run the codebase's actual test
suite and typecheck right now, and treat the real output as ground truth
over anything implied by the specification documents. If the current state
diverges from the spec, the spec wins for what SHOULD exist; the real code
wins for what CURRENTLY exists. Document the delta.

## Step 4 — Establish or confirm the baseline (Milestone M0)
Follow `tasks/BACKLOG.md` Milestone M0 exactly: baseline test/typecheck run,
full server-action inventory, full manually-verified authorization audit,
full database/RLS audit. Do not proceed to M1 until M0's findings are
real, specific, and free of unverified placeholders (per
`AGENT_CONSTITUTION.md` Section 8).

## Step 5 — Work the backlog autonomously
Proceed through `tasks/BACKLOG.md` in order, applying the full
`DEVELOPMENT_WORKFLOW.md` loop to every task. Update `tasks/IN_PROGRESS.md`,
`tasks/COMPLETED.md`, and `REQUIREMENT_TRACEABILITY.md` continuously, not
only at the end of a session.

Do not stop after each individual task to ask what to do next — the next
task is always the next unblocked item in `tasks/BACKLOG.md`. Do not
repeatedly ask for implementation-detail decisions that are yours to make
per `DEVELOPMENT_WORKFLOW.md`'s "Never ask permission for" section.

Do stop and wait for explicit approval at the four checkpoints defined in
`AGENT_CONSTITUTION.md` Section 10 (schema migrations before applying,
destructive operations, weakening the AI safety layer, expanding data
exposure beyond current defaults). These are the only required interruptions
during otherwise-autonomous execution.

## Step 6 — Continuous verification
For every task: run typecheck and the full test suite, paste the real
output, show the real diff, and only then mark it complete per
`AGENT_CONSTITUTION.md` Section 11's definition of "feature complete."
Never report a broad claim of correctness ("all working," "no issues") 
without individually citing evidence for the specific items claimed.

## Step 7 — Progress toward Gate D
Continue through every milestone in `tasks/BACKLOG.md` until every item in
`QUALITY_GATES.md` Gate D is genuinely satisfied — not assumed. When you
believe Gate D is met, perform the Final Audit procedure below before
declaring the product production-ready.

## Final Audit procedure (perform before declaring production-ready)
Answer explicitly, with real numbers pulled from `REQUIREMENT_TRACEABILITY.md`
and actual test runs, not estimates:
1. How many requirements exist in `MASTER_SPEC.md`?
2. How many are implemented?
3. How many are tested?
4. How many are verified (per the traceability table's `verified` status)?
5. How many are missing entirely?
6. How many have failing tests right now?
7. Which features have zero test coverage?
8. Which features have incomplete implementation?
9. Which user flows in `USER_FLOWS.md` fail when actually walked through?
10. Which items in `SECURITY.md`'s acceptance criteria remain unmet?

The product may not be declared production-ready if any required item from
this audit is missing, untested, unverified, or failing. Report the audit
results in full before making any production-readiness claim.

## Standing instruction
Never declare this project "done" or "production-ready" prematurely. A
partial, honest status report is always preferable to an inflated one — this
specific failure mode (a broad, unverified "everything works" claim) has
occurred before on this exact project and must not recur.
