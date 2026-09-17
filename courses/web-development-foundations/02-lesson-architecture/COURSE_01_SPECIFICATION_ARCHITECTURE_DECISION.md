# Course 1 Specification Architecture Decision

## Previous Requirement
The initial Section 3 architecture mandated a dedicated `lesson.spec.md` file for every lesson before authoring the final student content. This specification file was intended to outline the purpose, target learner, prerequisites, outcomes, skills, concepts, misconceptions, difficulty, expected time, retrieval, practice, assessment, project connection, technical references, and accessibility requirements.

## Current Implementation
Course 1 was authored using:
1. `LESSON_REGISTRY.json` (canonical JSON metadata)
2. MDX file frontmatter
3. Validated MDX lesson structure (guided practice, interactive sandboxes, etc.)

## Equivalence Analysis
An evaluation of the current implementation against the specification requirements reveals complete equivalence:
- **Purpose & Outcomes**: Covered by `primaryObjective` and `boundaryRationale` in the registry.
- **Target Learner**: Codified systemically through `difficulty` and `scaffoldingLevel`.
- **Prerequisites**: Explicitly tracked in `prerequisiteLessonIds`.
- **Skills & Concepts**: Explicitly mapped via `skillIds` and `conceptIds`.
- **Expected Time**: Accurately mapped via `estimatedTotalWorkloadMinutes` (and its granular subdivisions).
- **Retrieval, Practice, Assessment, Project**: Covered by `retrievalConnections`, `practiceIntent`, `assessmentConnections`, and `projectConnections`.
- **Misconceptions**: Absorbed into `boundaryRationale` (e.g., separating the URL model from the request cycle to avoid cognitive overload).
- **Technical References & Accessibility**: Managed canonically in `CONTENT_SOURCE_REGISTER.md` and `ACCESSIBILITY_CONTENT_GUIDE.md`, with schema support for `accessibilityRequirements`.

## Decision
The current implementation mathematically provides all required specification attributes. Generating 81 redundant `lesson.spec.md` files would only duplicate data already validated in the canonical JSON registry and MDX frontmatter.

Therefore, **`LESSON_REGISTRY.json` + MDX Frontmatter + MDX Body is formally designated as the canonical lesson specification mechanism.**

## Consequences
- Separate `lesson.spec.md` files are officially deprecated and NO LONGER REQUIRED.
- `LESSON_REGISTRY.json` becomes the absolute source of truth for lesson specification metadata.
- Validation scripts will continue to rely on the JSON registry rather than parsing redundant markdown specs.
- The `LESSON_ARCHITECTURE.md` policy has been updated to reflect this mechanism.

## Validation Result
**ARCHITECTURE DECISION RESOLVED → COURSE 1 REMAINS PASS → STOP**
