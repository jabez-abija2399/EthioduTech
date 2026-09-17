# Curriculum Decisions

This document records the major architectural decisions made during Section 2 Curriculum Blueprinting. 

## DECISION-01: Delaying Git/GitHub to Course 5
**Context:** Students need version control to submit the final capstone, but teaching it concurrently with HTML/CSS causes cognitive overload.
**Evidence:** Code.org and CS50 delay branch-management and remote collaboration until students have a firm grasp of local file management and basic programming.
**Alternatives Considered:** Teaching Git in Course 1 (Web Foundations).
**Reason:** Teaching Git in Course 1 forces students to memorize CLI commands before they have written a single line of code they care about saving. This damages motivation.
**Impact:** Git is formally taught as a dedicated 7-hour block right before the Capstone. (Note: "Save/Refresh" muscle memory is taught earlier, but true Git is delayed).
**Affected Artifacts:** `COURSE_PATH.md`, `SEQUENCING_LOGIC.md`
**Status:** APPROVED

## DECISION-02: Workload Estimation Metric
**Context:** Section 1 established an 84-hour target. Section 2 must define how those hours are calculated.
**Evidence:** Educational time-on-task models require separating passive learning from active practice.
**Alternatives Considered:** Assigning an arbitrary "30 minutes per lesson" flat rate.
**Reason:** A flat rate ignores the reality that CSS Grid practice takes significantly longer than HTML Heading practice.
**Impact:** Workload is strictly calculated as `Concept + Practice + Retrieval + Assessment + Project + Reflection = Module Workload`.
**Affected Artifacts:** `WORKLOAD_MODEL.md`
**Status:** APPROVED

## DECISION-03: Separation of Concept and Skill
**Context:** Curriculum often conflates "knowing about" with "knowing how".
**Evidence:** Pedagogical research on observable outcomes emphasizes behavioral verbs (Bloom's Taxonomy).
**Alternatives Considered:** Grouping all learning targets under "Topics".
**Reason:** "Topics" cannot be assessed. If a module topic is "Functions", it is unclear if the student must explain a function, write a function, or debug a function.
**Impact:** Every module separates `Concepts` (what to understand) from `Skills` (what to perform).
**Affected Artifacts:** `CONCEPT_GRAPH.md`, `SKILL_PROGRESSION_MATRIX.md`
**Status:** APPROVED

## DECISION-04: Strict Scope Boundary (No Frameworks)
**Context:** Modern web development heavily relies on React, Next.js, Tailwind, etc.
**Evidence:** MDN Core Curriculum establishes vanilla HTML/CSS/JS as the non-negotiable prerequisite to any framework.
**Alternatives Considered:** Teaching a tiny amount of React at the end of the Capstone.
**Reason:** Introducing a framework prematurely breaks the learner's mental model of the DOM and Vanilla JS state management.
**Impact:** React, Next.js, Tailwind, TypeScript, Node.js, Prisma, and Docker are explicitly BANNED from this Foundations path.
**Affected Artifacts:** Entire Curriculum Architecture.
**Status:** APPROVED

## DECISION-05: Section 1 Regression Check
**Context:** Section 2 must preserve Section 1 architecture unless an explicit change is required.
**Evidence:** Automated validation via `scratch-validate-architecture.js` confirmed 100% integrity of Section 1 IDs and dependencies before Phase 2 began.
**Alternatives Considered:** N/A
**Reason:** Maintaining source-of-truth integrity.
**Impact:** No Section 1 contracts were altered.
**Affected Artifacts:** `ID_REGISTRY.json`
**Status:** VERIFIED
