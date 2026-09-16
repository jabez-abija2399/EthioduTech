  # PROJECT ARCHITECTURE: Vertical Slice

This outlines the progressively un-scaffolded projects spanning Phases 0, 1, and HTML Module 1.

## 1. Micro Projects (In-Lesson Validation)
* **Goal:** Immediate application of a single concept.
* **`MICRO-ENV-01`**: Create a folder structure `projects/my-first-site` and add `index.html` via CLI.
* **`MICRO-HTML-01`**: Given a plaintext recipe, mark it up using only `<h1>`, `<h2>`, `<p>`, `<ul>`, and `<li>`.

## 2. Guided Project
* **Goal:** Bringing together a module's concepts with step-by-step guardrails.
* **`PROJECT-HTML-GUIDED`**: "The Homepage"
  * **Requirements:** Student follows instructions to write boilerplate, insert an image, and link to a nonexistent `contact.html`.
  * **Evaluation:** Automated HTML linting + AI verification of the relative path correctness.

## 3. Module Project (Independent Application)
* **Goal:** Demonstrating capability across the entire module without step-by-step instructions.
* **`PROJECT-HTML-M1`**: "The Personal Knowledge Base"
  * **Purpose:** Create a 3-page interconnected wiki (Home, Hobbies, Studies).
  * **Target Skills:** `SKILL-ENV-01`, `SKILL-ENV-02`, `SKILL-HTML-01`, `SKILL-HTML-02`, `SKILL-HTML-03`.
  * **Prerequisites:** Completion of Phase 2.
  * **Requirements:** 
    - 3 valid HTML files.
    - 1 relative link connecting all pages in a navigation list.
    - 1 absolute link to an external resource.
    - 1 image with valid `alt` text per page.
    - Strictly semantic tags (no `<div>` or `<span>` yet).
  * **Evaluation Rubric:**
    - Code is syntactically valid (passes W3C validator checks mentally applied by AI).
    - Links actually route between the 3 files.
    - Image `alt` text describes the image context, not just "image".
  * **Reflection Prompt:** "Which was harder to understand: setting up the HTML boilerplate, or getting your pages to link to each other correctly? Why?"

## 4. Phase 3 Module Project (CSS)
* **`PROJECT-CSS-M2`**: "Responsive Landing Page"
  * **Purpose:** Style a single-page product advertisement using the Box Model and Flexbox.
  * **Target Skills:** `SKILL-CSS-01`, `SKILL-CSS-02`, `SKILL-CSS-03`.
  * **Requirements:**
    - An external `styles.css` file linked in the HTML `<head>`.
    - A navigation bar at the top using Flexbox (`justify-content: space-between`).
    - At least 3 different classes used to target specific elements.
    - Explicit padding and margin used to separate content blocks.
  * **Reflection Prompt:** "How did using a class make your CSS easier to write than if you had to style every single element individually?"

## 5. Phase 4 Module Project (JavaScript)
* **`PROJECT-JS-M3`**: "Interactive Task Tracker"
  * **Purpose:** Use JavaScript to read user input and manipulate the DOM dynamically.
  * **Target Skills:** `SKILL-JS-01`, `SKILL-JS-02`, `SKILL-JS-03`.
  * **Requirements:**
    - An external `app.js` file linked at the bottom of the `<body>`.
    - An `<input>` field and a `<button>`.
    - An Event Listener that triggers when the button is clicked.
    - The JS function must read the text from the input, clear the input, and append the text as a new `<li>` to an existing `<ul>`.
  * **Reflection Prompt:** "What would happen if you put the `document.querySelector` for the input's `.value` outside of the event listener function instead of inside it?"

## 6. Phase 5 Module Project (Git)
* **`PROJECT-GIT-M4`**: "First Repository"
  * **Purpose:** Convert an existing local folder into a Git repository and push it to GitHub.
  * **Target Skills:** `SKILL-GIT-01`, `SKILL-GIT-02`.
  * **Requirements:**
    - The `my-first-site` folder must have a `.git` hidden directory.
    - At least two commits (`Initial commit`, `Add styles`).
    - The repository must be visible on the student's GitHub profile.
  * **Reflection Prompt:** "Why is it important to write a descriptive commit message like 'Fix broken layout' instead of just typing 'stuff'?"

## 7. Phase 6: Final Capstone
* **`PROJECT-CAPSTONE`**: "Interactive Portfolio & Live Deployment"
  * **Purpose:** Synthesize HTML, CSS, JS, and Git into a single, cohesive, live project.
  * **Target Skills:** All previous skills.
  * **Requirements:**
    - **Structure:** At least two HTML pages (e.g., `index.html` and `projects.html`) linked together.
    - **Style:** Fully styled with CSS, using Flexbox for at least one major layout component (like the navigation or a project grid).
    - **Logic:** A working JavaScript feature (e.g., a Dark Mode toggle, or a "Contact Me" button that reveals an email address).
    - **Version Control:** Pushed to a GitHub repository.
    - **Deployment:** Hosted live on the internet using GitHub Pages.
  * **Reflection Prompt:** "Look at the live URL of your project. If you want to change the color of the header on the live site, what are the exact steps you need to take starting from your local code editor?"
