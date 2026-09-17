# Retrieval Spiral

This document maps the deliberate interleaving and retrieval of durable, high-value skills across the learning path. This ensures that critical knowledge does not decay before the capstone.

## 1. Semantic HTML & Document Structure (`skill-html-semantic`, `skill-html-scaffold`)
- **First Introduction:** `mod-html-01` (Document Structure), `mod-html-05` (Semantic Structure)
- **Initial Practice:** `mod-html-05` (Replacing `div` tags with `<header>`, `<main>`, `<article>`)
- **Retrieval Opportunities:** 
  - `mod-html-08` (Accessibility Review) requires recalling semantic meaning.
  - `mod-css-01` requires recalling tags to write element selectors.
- **Reapplication Contexts:** 
  - `mod-css-09` (Responsive Interface Project) requires structuring the HTML before styling it.
  - `mod-js-10` (DOM Interaction) requires targeting semantic elements.
- **Assessment:** `assess-html-sem` (Project Automated Validation).
- **Later Project Use:** Required in `mod-js-14` Integration Project.
- **Mastery Evidence:** `mod-cap-03` (Capstone HTML Build).

## 2. Accessibility (A11y) (`skill-html-a11y`)
- **First Introduction:** `mod-html-08` (Accessibility & Document Quality)
- **Initial Practice:** `mod-html-08` (Fixing missing alt text, form labels, and heading hierarchy)
- **Retrieval Opportunities:** 
  - `mod-css-02` (Color & Typography) requires recalling contrast rules.
  - `mod-css-08` (Accessibility and Design) requires recalling focus states and readability.
- **Reapplication Contexts:** 
  - `mod-js-11` (Events & Forms) requires ensuring dynamic state changes are accessible (e.g., simple focus management).
- **Assessment:** `assess-html-sem` Project Rubric.
- **Later Project Use:** `mod-js-14` (Integration Project).
- **Mastery Evidence:** `mod-cap-05` (Testing, Debugging & Accessibility Audit).

## 3. CSS Layouts (Flexbox) (`skill-css-flex`)
- **First Introduction:** `mod-css-05` (Flexbox)
- **Initial Practice:** Isolated layout challenges (e.g., aligning nav items, building a card grid).
- **Retrieval Opportunities:** 
  - `mod-css-07` (Responsive Design) requires modifying Flex behavior in media queries.
- **Reapplication Contexts:** 
  - `mod-js-14` (Integration Project) requires building the application UI using Flex before wiring up the JS.
- **Assessment:** `assess-css-layout` Responsive Interface Project.
- **Later Project Use:** Capstone UI development.
- **Mastery Evidence:** `mod-cap-03` (Capstone CSS Build).

## 4. Debugging & Error Isolation (`skill-js-debug`)
- **First Introduction:** `mod-js-09` (Debugging and Program Investigation)
- **Initial Practice:** Finding syntax and logic errors in intentionally broken code snippets using Chrome DevTools.
- **Retrieval Opportunities:** 
  - `mod-js-10` (DOM) - Diagnosing `null` selector returns.
  - `mod-js-13` (Async & APIs) - Diagnosing network `404` or JSON parsing errors.
- **Reapplication Contexts:** 
  - `mod-git-03` (History & Recovery) - Debugging Git state (e.g., detached HEAD).
- **Assessment:** `assess-css-layout` Debugging Challenge.
- **Later Project Use:** Required to complete `mod-js-14` and Capstone independently.
- **Mastery Evidence:** `mod-cap-05` (Explicit debugging phase of Capstone).

## 5. Arrays, Objects & Data iteration (`skill-js-variables`, `skill-js-vars`)
- **First Introduction:** `mod-js-07` (Strings and Arrays) & `mod-js-08` (Objects and Data Modeling)
- **Initial Practice:** Iterating over arrays of strings/numbers; accessing object properties.
- **Retrieval Opportunities:** 
  - `mod-js-10` (DOM) - Iterating over `querySelectorAll` NodeLists.
- **Reapplication Contexts:** 
  - `mod-js-12` (Local Storage) - Serializing/deserializing arrays of objects.
  - `mod-js-13` (Async & APIs) - Iterating over API JSON response data to render UI cards.
- **Assessment:** `assess-js-dom`.
- **Later Project Use:** `mod-js-14` (Integration Project - managing application state).
- **Mastery Evidence:** `mod-cap-04` (Capstone JavaScript Build).
