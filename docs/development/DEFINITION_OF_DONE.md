# DEFINITION OF DONE — DEVELOPMENT OPERATING SYSTEM

A task or feature is **NEVER** marked as `VERIFIED` merely because code was written.

A task achieves `VERIFIED` status only when **ALL** applicable criteria are satisfied:

```text
[ ] Requirement & acceptance criteria fully understood
[ ] Code implementation completed
[ ] Acceptance criteria satisfied
[ ] TypeScript compilation passes with 0 errors (`npx tsc --noEmit`)
[ ] Production build compilation passes cleanly (`npm run build`)
[ ] Error states & boundary cases handled
[ ] Responsive mobile & desktop behavior verified
[ ] Accessibility & dark mode contrast verified
[ ] Security & sandbox authorization checked
[ ] Performance & low-bandwidth impact evaluated
[ ] Relevant documentation updated in `docs/`
[ ] Manual browser verification executed
[ ] Empirical evidence hash recorded in TASK_REGISTRY.md
[ ] Task committed with standard commit message
```

Only when all checkboxes are verified does `STATUS = VERIFIED`.
