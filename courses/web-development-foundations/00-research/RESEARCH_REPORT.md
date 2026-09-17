# Research Report

## 5.1 Research Objective
The objective is to determine the optimal architectural structure, sequencing, and pacing for a foundational "Web Development Foundations" learning path aimed at beginners (specifically targeting Ethiopian students grades 5-12 as well as global learners), ensuring high engagement, practical capability, and lack of initial cognitive overload.

## 5.2 Reference Systems

| Name | Purpose | Audience | Relevant Architecture | Relevant Strength | Limitation | Transferable Principle |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **MDN Core Curriculum** | Industry standard benchmark for front-end developers | Aspiring Professionals | Core Modules (HTML, CSS, JS) | Highly authoritative and comprehensive. | Highly dense; not beginner-friendly for young students without heavy scaffolding. | Clear separation of foundational technologies into strict domains. |
| **Harvard CS50W** | University-level web programming course | Intermediate / CS students | Project-driven, integration-heavy | Excellent use of rigorous, portfolio-worthy projects. | Requires prior programming experience (CS50x). | Project-centered learning and Git/GitHub as a required professional workflow. |
| **Code.org CS Discoveries** | Introductory CS curriculum | Grades 6-10 | Modular units, Web Lab | Extremely accessible, highly scaffolded, immediate visual feedback. | May feel too slow or limited for older/advanced learners. | The necessity of a highly accessible "Foundations" course before jumping into raw syntax. |
| **Codecademy** | Interactive coding platform | Self-directed learners | "Path" composed of multiple discrete courses | Excellent continuous interactive loop (read, code, feedback). | Can lead to "tutorial hell" if independent projects aren't enforced. | The 6-course continuous path architecture, breaking down massive topics into digestible courses. |

## 5.3 Curriculum Findings
- **Learning-path sequencing:** The universal consensus across MDN, Codecademy, and CS50 is to teach HTML first (structure), CSS second (presentation), and JS third (behavior).
- **Course boundaries:** Courses must have explicit boundaries. HTML should not attempt to teach JS prematurely. 
- **Project placement:** CS50 demonstrates that projects must be placed at the *end* of specific capability acquisitions, not just at the end of the entire path.
- **Learner independence:** Code.org emphasizes high scaffolding initially, gradually releasing control to the learner.

## 5.4 Web-Development Curriculum Findings
Foundational knowledge universally includes: The difference between Internet and Web, HTTP/DNS basics, semantic HTML structure, CSS box model/layout (Flexbox/Grid), JavaScript programming fundamentals (variables, logic, loops) and DOM manipulation, plus Version Control (Git).

## 5.5 Product-Specific Implications
For the Edutech platform, we cannot rely on dense documentation (like MDN) alone. We must adopt Code.org's extreme beginner-friendliness for Course 1 (Web Foundations) to hook the student, adopt Codecademy's interactive pacing for Courses 2-4, and adopt CS50's rigorous project standards for Course 5 & 6 (Git and Capstone).

## 5.6 Decisions

### DECISION 1: Separation of Concerns into 6 Courses
- **FACT:** Massive single courses cause high drop-out rates.
- **ASSUMPTION:** Breaking the path into 6 distinct courses will provide learners with frequent milestones and psychological wins.
- **DECISION:** The Web Development Foundations path will be split into: Web Foundations, HTML, CSS, JS, Git/GitHub, and Capstone.

### DECISION 2: Gradual Git Integration
- **FACT:** Git is overwhelmingly confusing for beginners if taught purely in a vacuum.
- **ASSUMPTION:** Introducing Git commands slowly during earlier courses builds muscle memory before the formal Git course.
- **DECISION:** Git will be introduced gradually in HTML/CSS courses (add, commit) before the deep-dive Git course.

### DECISION 3: Capstone as a Standalone Course
- **FACT:** CS50 uses a dedicated final project phase.
- **ASSUMPTION:** A dedicated capstone course forces independent problem-solving rather than just following tutorial instructions.
- **DECISION:** Course 6 is entirely dedicated to building an independent, portfolio-ready project from scratch.
