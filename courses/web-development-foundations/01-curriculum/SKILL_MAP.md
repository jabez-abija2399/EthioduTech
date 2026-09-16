# SKILL MAP: Vertical Slice (Phases 0, 1, and HTML Module 1)

This document maps out the specific capabilities students will develop in the first three modules of the Web Development Foundations course.

---

## PHASE 0: GETTING STARTED

### `SKILL-ENV-01`: Local Environment Navigation
**Name:** Navigate the File System
**Description:** Use the command line interface to navigate folders, create files, and list directory contents.
**Prerequisites:** None
**Related Skills:** `SKILL-ENV-02`
**Lessons:** `ENV-L01`
**Exercises:** `EX-ENV-01` (Create project structure via CLI)
**Assessments:** `ASSESS-ENV-01`
**Projects:** Applied implicitly in all future projects.
**Mastery Evidence:** Student can create a nested folder structure and an `index.html` file exclusively using the command line.
**Common Misconceptions:** Confusing the working directory with the root directory; using spaces in file names without quotes.

### `SKILL-ENV-02`: IDE & Browser Developer Tools (Basic)
**Name:** Basic Code Execution & Inspection
**Description:** Open a project in VS Code, run a local development server, and open the browser's elements inspector.
**Prerequisites:** `SKILL-ENV-01`
**Related Skills:** `SKILL-WEB-02`
**Lessons:** `ENV-L02`
**Exercises:** `EX-ENV-02` (Launch server, edit text, view changes, inspect element)
**Assessments:** `ASSESS-ENV-02`
**Projects:** Applied in all future projects.
**Mastery Evidence:** Student can change text in the IDE and locate that specific DOM node in the browser DevTools.
**Common Misconceptions:** Believing changes in the browser DevTools permanently alter the source code.

---

## PHASE 1: WEB FOUNDATIONS

### `SKILL-WEB-01`: Client-Server Mental Model
**Name:** Explain the Request/Response Cycle
**Description:** Describe how a URL translates to a DNS lookup, an HTTP request to a server, and a response back to the client.
**Prerequisites:** None
**Related Skills:** `SKILL-WEB-02`
**Lessons:** `WEB-L01`
**Exercises:** `EX-WEB-01` (Predict network flow based on URL)
**Assessments:** `ASSESS-WEB-01`
**Projects:** Foundational theory.
**Mastery Evidence:** Student can trace the lifecycle of typing "google.com" to seeing the page render, identifying the roles of DNS, Client, and Server.
**Common Misconceptions:** The internet and the World Wide Web are the exact same thing; servers push websites to you without a request.

### `SKILL-WEB-02`: Separation of Concerns
**Name:** Identify HTML, CSS, and JS Roles
**Description:** Differentiate the responsibilities of structure (HTML), presentation (CSS), and behavior (JS).
**Prerequisites:** `SKILL-WEB-01`
**Related Skills:** `SKILL-HTML-01`
**Lessons:** `WEB-L02`
**Exercises:** `EX-WEB-02` (Categorize code snippets by language and role)
**Assessments:** `ASSESS-WEB-02`
**Projects:** Foundational theory.
**Mastery Evidence:** Given a broken web page, the student can accurately hypothesize whether the bug is in the HTML, CSS, or JS.
**Common Misconceptions:** Believing HTML makes text bold and colorful by default; confusing Java with JavaScript.

---

## PHASE 2: HTML FUNDAMENTALS (MODULE 1)

### `SKILL-HTML-01`: Document Structure
**Name:** Author HTML Boilerplate
**Description:** Write the mandatory tags required for a valid HTML5 document (`<!DOCTYPE>`, `<html>`, `<head>`, `<body>`, `<title>`, `<meta charset>`).
**Prerequisites:** `SKILL-ENV-02`
**Related Skills:** `SKILL-HTML-02`
**Lessons:** `HTML-L01`
**Exercises:** `EX-HTML-01` (Fix a broken boilerplate)
**Assessments:** `ASSESS-HTML-01`
**Projects:** `PROJECT-HTML-M1`
**Mastery Evidence:** Student can write a valid HTML document from memory without relying on Emmet abbreviations.
**Common Misconceptions:** Placing visible content inside the `<head>` tag; omitting the DOCTYPE.

### `SKILL-HTML-02`: Semantic Text Content
**Name:** Structure Text Semantically
**Description:** Use appropriate heading hierarchy (`<h1>`-`<h6>`), paragraphs (`<p>`), strong/emphasis (`<strong>`, `<em>`), and lists (`<ul>`, `<ol>`, `<li>`).
**Prerequisites:** `SKILL-HTML-01`
**Related Skills:** `SKILL-HTML-03`
**Lessons:** `HTML-L02`
**Exercises:** `EX-HTML-02` (Convert plain text into semantic HTML)
**Assessments:** `ASSESS-HTML-02`
**Projects:** `PROJECT-HTML-M1`
**Mastery Evidence:** Student uses exactly one `<h1>` per page, doesn't skip heading levels, and correctly nests list items.
**Common Misconceptions:** Using `<h3>` just because they want the text to look smaller; nesting `<ul>` inside `<ul>` instead of inside an `<li>`.

### `SKILL-HTML-03`: Hyperlinks & Image Assets
**Name:** Connect Pages and Media
**Description:** Create absolute and relative hyperlinks (`<a>`) and embed images (`<img>`) with accessible `alt` attributes.
**Prerequisites:** `SKILL-ENV-01`, `SKILL-HTML-02`
**Related Skills:** `SKILL-CSS-01`
**Lessons:** `HTML-L03`
**Exercises:** `EX-HTML-03`
**Assessments:** `ASSESS-HTML-03`
**Projects:** `PROJECT-HTML-M1`
**Mastery Evidence:** Student can link `index.html` to `about.html` using a relative path, and embed a local image with descriptive alt text.
**Common Misconceptions:** Confusing `href` with `src`; assuming `alt` text is optional.

---

## PHASE 3: CSS FUNDAMENTALS (MODULE 2)

### `SKILL-CSS-01`: Selectors and Properties
**Name:** Target and Style Elements
**Description:** Use tag, class, and ID selectors to apply color, typography, and spacing properties.
**Prerequisites:** `SKILL-HTML-01`
**Related Skills:** `SKILL-CSS-02`
**Lessons:** `CSS-L01`
**Exercises:** `EX-CSS-01` (Style a raw HTML recipe)
**Assessments:** `ASSESS-CSS-01`
**Projects:** `PROJECT-CSS-M2`
**Mastery Evidence:** Student can target a specific paragraph via a class without affecting other paragraphs.
**Common Misconceptions:** Confusing IDs (`#`) with Classes (`.`).

### `SKILL-CSS-02`: The Box Model
**Name:** Manipulate Element Dimensions
**Description:** Calculate and apply margin, border, padding, and width/height.
**Prerequisites:** `SKILL-CSS-01`
**Related Skills:** `SKILL-CSS-03`
**Lessons:** `CSS-L02`
**Exercises:** `EX-CSS-02` (Visually debug overlapping boxes)
**Assessments:** `ASSESS-CSS-02`
**Projects:** `PROJECT-CSS-M2`
**Mastery Evidence:** Student correctly predicts the total rendered width of a box given its padding and border.
**Common Misconceptions:** Padding is outside the border; margins collapse predictably (margin collapse is confusing).

### `SKILL-CSS-03`: Layout (Flexbox)
**Name:** Align and Distribute Space
**Description:** Use Flexbox to create rows, columns, and center content.
**Prerequisites:** `SKILL-CSS-02`
**Related Skills:** `SKILL-CSS-04`
**Lessons:** `CSS-L03`
**Exercises:** `EX-CSS-03` (Recreate a navigation bar layout)
**Assessments:** `ASSESS-CSS-03`
**Projects:** `PROJECT-CSS-M2`
**Mastery Evidence:** Student can vertically and horizontally center a child element inside a parent container.
**Common Misconceptions:** Applying `justify-content` to the child instead of the flex container.

---

## PHASE 4: JAVASCRIPT FUNDAMENTALS (MODULE 3)

### `SKILL-JS-01`: Variables & Data Types
**Name:** Store and Retrieve Data
**Description:** Declare variables (`let`, `const`) and use basic data types (strings, numbers, booleans).
**Prerequisites:** None (Logical isolated), practically `SKILL-WEB-02`
**Related Skills:** `SKILL-JS-02`
**Lessons:** `JS-L01`
**Exercises:** `EX-JS-01` (Data type prediction)
**Assessments:** `ASSESS-JS-01`
**Projects:** `PROJECT-JS-M3`
**Mastery Evidence:** Student correctly identifies when to use `const` vs `let`.
**Common Misconceptions:** Confusing the string `"123"` with the number `123`.

### `SKILL-JS-02`: DOM Manipulation
**Name:** Read and Write the Page
**Description:** Use `document.querySelector` to read HTML elements and modify their text or styles dynamically.
**Prerequisites:** `SKILL-JS-01`, `SKILL-CSS-01`
**Related Skills:** `SKILL-JS-03`
**Lessons:** `JS-L02`
**Exercises:** `EX-JS-02` (Change heading text via JS)
**Assessments:** `ASSESS-JS-02`
**Projects:** `PROJECT-JS-M3`
**Mastery Evidence:** Student can select an input field and read its `.value`.
**Common Misconceptions:** Forgetting the `#` or `.` inside `querySelector`.

### `SKILL-JS-03`: Event Handling
**Name:** React to User Input
**Description:** Attach `addEventListener` to buttons and forms to trigger functions.
**Prerequisites:** `SKILL-JS-02`
**Related Skills:** None
**Lessons:** `JS-L03`
**Exercises:** `EX-JS-03` (Build a click counter)
**Assessments:** `ASSESS-JS-03`
**Projects:** `PROJECT-JS-M3`
**Mastery Evidence:** Student can log a message to the console every time a button is clicked.
**Common Misconceptions:** Executing the function immediately (`addEventListener('click', myFunc())`) instead of passing the reference.

---

## PHASE 5: VERSION CONTROL (MODULE 4)

### `SKILL-GIT-01`: Local Version Control
**Name:** Track Code Changes
**Description:** Use `git init`, `git add`, and `git commit -m` to save snapshots of code history.
**Prerequisites:** `SKILL-ENV-01`
**Related Skills:** `SKILL-GIT-02`
**Lessons:** `GIT-L01`
**Exercises:** `EX-GIT-01` (Initialize and commit a new HTML file)
**Assessments:** `ASSESS-GIT-01`
**Projects:** `PROJECT-GIT-M4`
**Mastery Evidence:** Student successfully tracks a new file and creates a semantic commit message.
**Common Misconceptions:** Thinking `git add` automatically saves the file permanently without a commit.

### `SKILL-GIT-02`: Remote Repositories
**Name:** Backup and Share Code
**Description:** Connect a local repository to GitHub and push changes.
**Prerequisites:** `SKILL-GIT-01`
**Related Skills:** None
**Lessons:** `GIT-L02`
**Exercises:** `EX-GIT-02` (Push a local repo to GitHub)
**Assessments:** `ASSESS-GIT-02`
**Projects:** `PROJECT-GIT-M4`, `PROJECT-CAPSTONE`
**Mastery Evidence:** Student can view their local code on github.com.
**Common Misconceptions:** Confusing Git (the tool) with GitHub (the website).

---

## PHASE 6: SYNTHESIS (CAPSTONE)

### `SKILL-CAP-01`: Full Stack Integration
**Name:** Build and Deploy
**Description:** Combine HTML, CSS, JS, and Git to build a complete project from scratch and deploy it live via GitHub Pages.
**Prerequisites:** `SKILL-HTML-03`, `SKILL-CSS-03`, `SKILL-JS-03`, `SKILL-GIT-02`
**Related Skills:** All previous skills.
**Lessons:** N/A (Project Phase)
**Exercises:** N/A
**Assessments:** Capstone Rubric Evaluation
**Projects:** `PROJECT-CAPSTONE`
**Mastery Evidence:** Student has a live URL of a multi-page interactive portfolio they built entirely themselves.
