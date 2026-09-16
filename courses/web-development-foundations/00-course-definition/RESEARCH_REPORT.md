# RESEARCH REPORT: Web Development Foundations

## 1. Authoritative Curriculum References & Competitor Analysis

**[FACT]** The curriculum must align with the current specifications provided by the standard bodies (WHATWG, W3C, TC39). We reference the following modern pedagogical sources and competitor models:

| Source / Competitor | What it does well | Weaknesses / Limitations |
|---------------------|-------------------|--------------------------|
| **MDN Web Docs (Learning Area)** | Authoritative, technically accurate, excellent coverage of accessibility and modern standards. | Can be overwhelming for complete beginners; heavily text-based; lacks cohesive project-based spacing. |
| **freeCodeCamp** | Highly interactive, immediate feedback, gentle learning curve. | Over-scaffolds learning ("copy-paste" syndrome); weak on debugging and independent project planning. |
| **The Odin Project** | Excellent focus on environment setup, Git, and independent projects; treats learners as future engineers. | Very high dropout rate due to steep difficulty cliffs; heavy reliance on reading external links. |
| **Codecademy** | Smooth UI, gamified, good for syntax memorization. | "Sandbox syndrome" (learners struggle to run code on their own machines); weak on transfer and reflection. |

## 2. Pedagogical Principles (Research-Backed)

**[FACT]** Based on the Education Endowment Foundation and What Works Clearinghouse:
- **Retrieval Practice:** Forcing learners to recall information strengthens memory more than re-reading.
- **Spaced Practice:** Revisiting concepts over time is essential for durable learning.
- **Gradual Release of Responsibility:** "I do, we do, you do" builds independence.
- **Cognitive Load Theory:** Beginners need worked examples and narrowed scope before tackling complex integrations.

## 3. Recommended Scope & Sequencing (Vertical Slice Focus)

**[DECISION]** We will sequence the course by prioritizing *capabilities* over *technologies*.
- **Phase 0 (Getting Started):** Focus on the *developer environment*. Goal: The student can run a local server and write code in an IDE.
- **Phase 1 (Web Foundations):** Focus on the *mental model*. Goal: The student understands the Request/Response cycle and the distinct roles of HTML (structure), CSS (presentation), and JS (behavior).
- **Phase 2 (HTML Fundamentals - Module 1):** Focus on *semantic document creation*. Goal: The student can author a well-structured, accessible, multi-page text document.

## 4. Durable Concepts vs. Fast-Changing Technologies

- **[FACT] Durable Concepts:** Semantic HTML, CSS Cascade/Specificity, the DOM, Box Model, HTTP Request/Response, Git fundamentals.
- **[FACT] Fast-Changing Technologies:** JavaScript frameworks (React/Vue), CSS preprocessors, specific build tools (Vite/Webpack).
- **[DECISION]** The Foundations course will strictly avoid fast-changing frameworks and focus entirely on durable Web APIs and Vanilla implementations.

## 5. Age & Accessibility Considerations

- **[ASSUMPTION]** The target audience reading level for this initial build is High School / Young Adult (14-18) to adult beginners. Language will be plain, jargon will be defined, and tone will be professional but encouraging.
- **[DECISION]** Accessibility will be treated as a core structural requirement, not an afterthought. ARIA roles, semantic tags, and contrast rules will be introduced alongside their corresponding HTML/CSS lessons.

## 6. Identified Risks & Unresolved Questions

- **[FACT] Risk:** Students often experience "tutorial hell" where they can pass lessons but cannot build from a blank file.
- **[HYPOTHESIS]** By forcing students to predict outcomes, debug broken code, and reflect on errors before writing new code, we will significantly reduce tutorial hell.
- **[UNKNOWN]** It is unknown how much time the average student will need to set up their local environment (Phase 0) without a human teacher present, as OS differences (Windows/Mac) often cause friction.

## 7. Decisions Made for the Vertical Slice

1. **[DECISION]** **Debugging First:** Every module will feature at least one "broken code" lesson where the student must isolate and fix a bug.
2. **[DECISION]** **No Multiple Choice:** Assessments will rely on code modification, output prediction, and short explanations.
3. **[DECISION]** **AI Tutor Restraint:** The AI Tutor will be strictly limited to Level 1-3 (Encouragement, Concept Reminder, Strategic Hint) by default, and will require explicit student reasoning before revealing Level 5/6 solutions.
