# Sequencing Logic

This document explains the pedagogical rationale behind the sequencing of the Web Development Foundations learning path.

## 1. HTML Before CSS and JavaScript
**Decision:** HTML is taught in its entirety (structure, content, semantics, forms) before introducing any CSS presentation or JavaScript behavior.
**Reason:** HTML provides the necessary DOM tree that CSS selectors and JavaScript methods depend on. Teaching CSS or JS without a solid structural model leads to abstract confusion.
**Prerequisite relationship:** `HTML → CSS` and `HTML → JS`
**Evidence/source:** MDN Core Curriculum starts strictly with "Structuring the web with HTML" before moving to CSS or JS. Code.org CS Discoveries starts with Web Lab (HTML).
**Product implication:** Students build unstyled websites for the first ~12 hours. This requires managing expectations so they don't feel discouraged by the lack of visual polish.

## 2. Programming Concepts Before DOM Programming
**Decision:** JavaScript Foundations (Course 4) introduces variables, conditions, loops, and functions (JS-01 to JS-06) before manipulating the page visually (JS-10).
**Reason:** Attempting to teach DOM manipulation concurrently with fundamental logic overwhelms beginners. They need to understand what a "variable" and "function" is in an abstract sense before they use it to hide a UI element.
**Prerequisite relationship:** `Programming Thinking → DOM Interaction`
**Evidence/source:** Pedagogical research on cognitive overload; CS50 teaches C logic before moving to Python/Web.
**Product implication:** The first half of the JS course will rely heavily on `console.log` rather than visual DOM updates.

## 3. Arrays/Objects Before API Data Rendering
**Decision:** Arrays and Objects are fully covered before introducing `fetch` and API interactions.
**Reason:** APIs return JSON, which is deserialized into nested Objects and Arrays. If a learner doesn't know how to iterate over an array of objects, they cannot use API data.
**Prerequisite relationship:** `Arrays & Objects → Async & APIs`
**Evidence/source:** MDN JavaScript modules place "Introducing JavaScript objects" before "Asynchronous JavaScript".
**Product implication:** API integration is delayed until the final modules of Course 4.

## 4. Debugging Taught Explicitly Before Large Applications
**Decision:** A dedicated Debugging module (JS-09) is placed right before DOM and large projects.
**Reason:** Students moving from basic logic to DOM manipulation will encounter exponentially more errors. They need explicit permission and tools to fail and recover.
**Prerequisite relationship:** `Basic JS Syntax → Debugging → Integrated Projects`
**Evidence/source:** Code.org emphasizes debugging as a core practice. CS50 dedicates significant time to `gdb` / `debug50`.
**Product implication:** The curriculum will include intentionally broken code snippets that the student must fix.

## 5. Git Introduced Early But Taught Formally Later
**Decision:** Git is introduced as muscle memory (add, commit) during Courses 2-4, but branch management and GitHub collaboration are delayed to Course 5.
**Reason:** Version control is critical but introduces heavy cognitive load. Mixing branch conflict resolution with learning CSS Flexbox will cause students to quit.
**Prerequisite relationship:** `Local File Management → Basic Commit → Collaboration Workflow`
**Evidence/source:** GitHub Education recommends isolating Git concepts.
**Product implication:** The platform must support "background commits" or highly guided single-button commits early on before revealing the full terminal.

## 6. Accessibility Distributed Across HTML, CSS, and JS
**Decision:** Accessibility (A11y) is introduced immediately in HTML (Semantic tags, alt text) and recurs in CSS (contrast, focus) and JS (keyboard events).
**Reason:** Treating accessibility as an "add-on" at the end of the path creates developers who bolt it on as an afterthought.
**Prerequisite relationship:** `HTML Semantics → Accessible Document`, `CSS Visuals → Accessible Contrast`
**Evidence/source:** MDN Accessibility guidelines explicitly thread A11y through HTML, CSS, and JS modules.
**Product implication:** Assessment rubrics must fail non-accessible implementations even if they visually look correct.

## 7. Responsive Design After Layout Fundamentals
**Decision:** Responsive Design (CSS-07) is taught only after the Box Model, Flexbox, and Grid.
**Reason:** Media queries modify layouts. You cannot modify a layout you do not know how to build.
**Prerequisite relationship:** `Box Model + Flexbox/Grid → Responsive Design`
**Evidence/source:** CSS Working Group specifications; MDN CSS layout modules.
**Product implication:** Early CSS exercises will be fixed-width desktop only.

## 8. Capstone Occurs Only After Core Integration
**Decision:** The Capstone (Course 6) is a standalone course occurring only after HTML, CSS, JS, and Git are fully covered.
**Reason:** The capstone must prove the ability to synthesize all web technologies independently.
**Prerequisite relationship:** `HTML + CSS + JS + Git → Capstone`
**Evidence/source:** CS50W final project requirements.
**Product implication:** No new syntax is taught in the Capstone. The focus shifts entirely to product management and implementation.
