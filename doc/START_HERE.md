# START_HERE.md

## What this folder is
A complete engineering specification for the Ethio EduTech platform, built so
that Antigravity can operate on it autonomously across many sessions without
losing requirements, features, or engineering discipline. This folder — not
any conversation history — is the source of truth.

## Read order (for the human, once)
1. `MASTER_SPEC.md` — the product, its requirements, its explicit scope
   boundaries.
2. `FEATURE_REGISTRY.md` — every feature, fully specified with acceptance
   criteria.
3. `USER_FLOWS.md`, `BUSINESS_RULES.md`, `PAGE_INVENTORY.md`,
   `DESIGN_SYSTEM.md`, `ERROR_HANDLING_AND_UI_STATES.md` — the product detail
   layer. `ERROR_HANDLING_AND_UI_STATES.md` is the canonical reference for how
   every loading/empty/error state behaves — read it before implementing any
   page, not just when something breaks.
4. `ARCHITECTURE.md`, `DATABASE.md`, `API_SPECIFICATION.md`, `SECURITY.md` —
   the technical layer.
5. `AGENT_CONSTITUTION.md` — the non-negotiable behavioral rules. Read this
   one carefully; it exists because of real failure modes observed while
   building this exact product.
6. `DEVELOPMENT_WORKFLOW.md`, `QUALITY_GATES.md`, `TESTING_STRATEGY.md` — how
   work actually gets done and verified.
7. `REQUIREMENT_TRACEABILITY.md` — the audit backbone; keep it current.
8. `tasks/BACKLOG.md`, `IN_PROGRESS.md`, `COMPLETED.md`, `BLOCKED.md` — the
   living task state.

## What to do next
Copy the contents of `START_ANTIGRAVITY.md` into your Antigravity session as
a single message. That prompt tells Antigravity to read everything above,
validate consistency, and begin autonomous work through `tasks/BACKLOG.md`.

## The four checkpoints that always require your approval
Even in full autonomous mode, Antigravity will stop and ask before:
1. Applying a database migration to a shared/staging/production environment.
2. Any destructive or irreversible data operation.
3. Weakening the AI copilot's distress-detection safety layer.
4. Expanding a student's data exposure beyond its current default (e.g.
   portfolio privacy defaults).
Everything else proceeds without you needing to respond turn by turn.

## If Antigravity reports something suspiciously clean
If you ever see a report like "all features complete, zero issues found"
across a broad scope, don't accept it at face value — ask for 3–5 specific
items from that claim to be proven with an actual file+line code citation.
This exact check caught a false "100% functional" audit during this
project's real development history.

## Keeping this package current
As Antigravity works, it will update `REQUIREMENT_TRACEABILITY.md` and the
`tasks/` files continuously. If it discovers a requirement or edge case not
captured in `MASTER_SPEC.md`, it should add it there (not just informally in
a task note) so the specification stays the actual source of truth.
