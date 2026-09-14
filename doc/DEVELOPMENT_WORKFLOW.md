# DEVELOPMENT_WORKFLOW.md

## The loop
For every task pulled from `tasks/BACKLOG.md`, run this full sequence. Do not
skip steps. Do not collapse steps together.

```
DISCOVER → ANALYZE → PLAN → ARCHITECT → IMPLEMENT → TEST → DEBUG → RETEST
→ SECURITY → UI/UX → PERFORMANCE → REGRESSION → AUDIT → RELEASE
```

### DISCOVER
Read the task's linked requirements (`MASTER_SPEC.md`) and feature entry
(`FEATURE_REGISTRY.md`). Read the actual current code for anything the task
touches or depends on — do not assume behavior from a description. If the task
touches a page, trace it through its actual data flow: which server action,
which table, which RLS policy.

### ANALYZE
Identify: what currently works, what's missing, what could break as a side
effect. If the task is ambiguous, resolve it using `MASTER_SPEC.md` Section 9
rules (safest/most protective interpretation) and record the resolution.

### PLAN
Write the specific, scoped list of files you will touch and why. If the plan
would touch more than ~5 files or mix unrelated concerns, split it into
multiple tasks and add the new tasks to `tasks/BACKLOG.md` instead of doing
everything at once.

### ARCHITECT
Confirm the approach matches `ARCHITECTURE.md`'s canonical patterns (server
action shape, auth pattern, error shape, folder structure). If a schema
change is needed, draft the migration and STOP — this requires the human
checkpoint in `AGENT_CONSTITUTION.md` Section 10 before it is applied.

### IMPLEMENT
Write the code. Follow existing conventions in the file you're editing. Add
both `en` and `am` strings for anything user-facing in the same pass — not as
a follow-up task.

### TEST
Write or update tests covering: success path, unauthorized path, wrong-role
path (if applicable), and at least one edge case identified during ANALYZE.

### DEBUG
Run typecheck and the test suite. If anything fails, diagnose the actual
cause (read the error, don't guess) and fix it.

### RETEST
Run typecheck and the full suite again. Confirm 0 errors, 0 failures, and
paste the real output.

### SECURITY
Explicitly re-check: does every new/changed server action authenticate and
authorize correctly per `SECURITY.md`? Does any new table have correct RLS?
Is any client input trusted without validation?

### UI/UX
Confirm: does the new/changed UI have loading, empty, and error states? Is it
responsive? Are both locales present? Does navigation from/to this page work
without a dead end?

### PERFORMANCE
For anything touching a list/query, confirm pagination or reasonable limits
exist. For anything touching bundle size (new dependency), confirm it's
justified.

### REGRESSION
Confirm the full test suite still passes end to end, not just the tests
related to this task.

### AUDIT
Update `REQUIREMENT_TRACEABILITY.md` to reflect this task's requirement(s) as
implemented and tested. Move the task from `tasks/IN_PROGRESS.md` to
`tasks/COMPLETED.md` with a completion note per `AGENT_CONSTITUTION.md`
Section 11.

### RELEASE
The task is only "released" (mergeable/mainline) once it has passed every
step above. If it hasn't, it stays in `tasks/IN_PROGRESS.md`, not
`tasks/COMPLETED.md`, regardless of how much work was done.

## When a task fails
1. Read the actual failure (test output, error message, stack trace).
2. Form a specific hypothesis for the cause — not a guess-and-check loop.
3. Fix it, re-run, confirm.
4. If the same category of failure persists after 3 genuinely different fix
   attempts, stop and record the blocker in `tasks/BLOCKED.md` with: what was
   tried, what happened each time, and what information or decision is needed
   to proceed. Move to the next unblocked task rather than looping further.

## Task ordering
Always work `tasks/BACKLOG.md` in the dependency order it defines. Do not
reorder to work on something more interesting or higher-visibility unless a
task is genuinely blocked and something else is ready.

## Never ask permission for
Implementation details within an already-approved task's scope (variable
names, exact component structure, which existing utility to reuse). These are
yours to decide using `ARCHITECTURE.md` and existing code conventions as the
guide.

## Always ask/stop for
The four checkpoint categories in `AGENT_CONSTITUTION.md` Section 10, and any
case where a requirement in `MASTER_SPEC.md` appears to conflict with a
child-safety or security rule in `SECURITY.md` — flag the conflict rather
than silently picking one.
