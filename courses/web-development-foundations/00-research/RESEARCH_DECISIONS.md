# Research Decisions Log

```text
DEC-001
Date: 2026-09-17
SOURCE: MDN Core Curriculum & Codecademy Front-End Path
FINDING: Foundational web technologies (HTML, CSS, JS) must be separated into distinct learning phases before integration.
EVIDENCE: MDN structures its core modules strictly as "HTML - Structuring the web", "CSS - Styling the web", and "JavaScript - Dynamic client-side scripting". Codecademy uses completely separate courses for each within their Path.
PRODUCT IMPLICATION: We cannot teach a "Build a Website" course that mixes HTML, CSS, and JS all at once on day one.
DECISION: Use a six-course Web Development Foundations learning path, where Courses 2, 3, and 4 are strictly separated by technology.
IMPACT: Each course can have separate enrollment, progress, assessment, and versioning. Learners master structure before presentation, preventing syntax confusion.
```

```text
DEC-002
Date: 2026-09-17
SOURCE: Code.org CS Discoveries
FINDING: Absolute beginners require an ultra-accessible, conceptual "on-ramp" before touching code.
EVIDENCE: Code.org's curriculum begins with "Problem Solving" and highly scaffolded conceptual models of the internet before introducing raw text syntax.
PRODUCT IMPLICATION: Course 1 cannot start with `<!DOCTYPE html>`. It must start with the mental model of the web.
DECISION: Create "Course 01 — Web Foundations" as a ~5 hour conceptual onboarding course.
IMPACT: Reduces early drop-out rates by establishing psychological safety and baseline vocabulary (Internet vs Web, URL, Client/Server) before syntax errors can cause frustration.
```

```text
DEC-003
Date: 2026-09-17
SOURCE: Harvard CS50W & GitHub Education
FINDING: Version control is a critical professional requirement but causes massive cognitive overload if taught concurrently with early programming.
EVIDENCE: CS50W dedicates specific early modules to Git *after* students know how to build basic things. GitHub Education recommends isolating Git concepts.
PRODUCT IMPLICATION: We must not force students to use Git for their first HTML exercises.
DECISION: Create a dedicated "Course 05 — Git & GitHub" course, but introduce Git *conceptually* and practically (status, add, commit) in tiny doses during Courses 2-4.
IMPACT: By the time students reach Course 5, they already have muscle memory for basic commits, allowing the course to focus on collaboration (Branches, Remotes, PRs).
```

```text
DEC-004
Date: 2026-09-17
SOURCE: Harvard CS50x & Pedagogy Research on Project-Based Learning
FINDING: True capability is only proven through independent project creation without hand-holding.
EVIDENCE: CS50's final project requires students to design and implement their own software with minimal structural scaffolding.
PRODUCT IMPLICATION: The learning path cannot end with a multiple-choice quiz or a "paint-by-numbers" tutorial project.
DECISION: Create "Course 06 — Web Development Capstone" as a standalone course dedicated entirely to building a portfolio project.
IMPACT: Generates explicit portfolio evidence of mastery and forces the student to synthesize HTML, CSS, JS, and Git independently.
```
