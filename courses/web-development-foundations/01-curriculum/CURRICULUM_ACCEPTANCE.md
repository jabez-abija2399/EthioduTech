# Curriculum Acceptance

This document establishes the explicit criteria required to mark the Section 2 Curriculum Blueprint as `VERIFIED`.

## Architecture
- [x] All required Section 2 artifacts exist (Sequencing, Workload, Traceability, etc.).
- [x] Machine-readable registries (ID and Module) are populated.

## Pedagogy
- [x] The sequence supports progressive learning (HTML before CSS, CSS before JS, JS before Git, Capstone last).
- [x] There are no cycles in the prerequisite graph.

## Capabilities & Skills
- [x] Every module has exactly one primary capability.
- [x] Primary capabilities are observable and actionable.
- [x] Important durable skills (e.g., Semantic HTML, Flexbox, Debugging) follow a complete learning arc (`INTRODUCE → PRACTICE → RETRIEVE → APPLY → ASSESS → REAPPLY → MASTER`).

## Retrieval & Practice
- [x] Durable skills are explicitly documented in the Retrieval Spiral.
- [x] Concepts are not orphaned; they directly support actionable skills.

## Projects & Scaffolding
- [x] Projects become progressively more independent (`WE DO` to `YOU DESIGN`).
- [x] Projects only demand skills that have been introduced, practiced, and assessed.

## Assessment & Traceability
- [x] Assessment evidence matches the cognitive demand of the skill (no multiple-choice tests for coding implementations).
- [x] Every course outcome traces all the way down to a project or mastery evidence check.

## Integrity & Validation
- [x] `ID_REGISTRY.json` contains no duplicate or orphaned IDs.
- [x] No out-of-scope technologies (React, TypeScript, Node.js, Prisma, Tailwind) were accidentally introduced.
- [x] The 19-point automated validation script passes without any `BLOCKER` or `ERROR` flags.

## Release Gate
Section 2 is considered `VERIFIED` ONLY when `scratch-validate-curriculum.js` passes all 19 checks and outputs a success signal, ensuring that the theoretical architecture described in these Markdown files structurally aligns with the JSON registries and traceability rules.
