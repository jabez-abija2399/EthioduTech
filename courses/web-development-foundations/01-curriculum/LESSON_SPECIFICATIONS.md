# LESSON SPECIFICATIONS: Vertical Slice

This document contains the structural blueprints for the lessons in Phase 0, 1, and HTML Module 1. These specifications must be approved before prose is generated.

---

## `ENV-L01`: Your Developer Workspace
**Module:** Phase 0: Getting Started
**Prerequisites:** None
**Learning Outcomes:** Navigate the file system using CLI commands (`mkdir`, `cd`, `ls`).
**Skill IDs:** `SKILL-ENV-01`
**Difficulty:** Beginner
**Estimated Effort:** 20 mins
**Common Misconceptions:** Confusing the root directory with the home directory; fearing the terminal will break the computer.
**Retrieval Prompts:** "What is a directory?"
**Concept Explanation:** Terminal vs GUI. Text-based interaction with the OS.
**Worked Example:** Creating a folder named `website` and opening it.
**Guided Practice:** Create `projects/my-first-site` with hints.
**Independent Practice:** `MICRO-ENV-01`: Create `projects/my-first-site` and an `index.html` file using only the CLI.
**Debugging Task:** "You type `cd projects/my-site` and get 'No such file or directory'. Why?"
**Transfer Task:** Delete a folder.
**Project Connection:** Sets up the folder for the Capstone.
**Reflection:** "Why do developers prefer the terminal over clicking folders?"
**Mastery Check:** Successfully creating the target structure.
**Answer Key:** `mkdir projects`, `cd projects`, `mkdir my-first-site`, `cd my-first-site`, `touch index.html` (or platform equivalent).
**Feedback Guidance:** If `cd` fails, ask student to run `ls` or `dir` to see where they are.
**Accessibility Notes:** Ensure terminal screen reader support is mentioned.
**Technical References:** OS specific terminal commands.
**Version/Date:** 1.0 (2026-09-16)

---

## `WEB-L01`: How the Web Works
**Module:** Phase 1: Web Foundations
**Prerequisites:** None
**Learning Outcomes:** Trace a URL request to an IP address, server, and HTML response.
**Skill IDs:** `SKILL-WEB-01`
**Difficulty:** Beginner
**Estimated Effort:** 30 mins
**Common Misconceptions:** The internet and the web are the same; servers push websites to you unprompted.
**Retrieval Prompts:** "What does a server do?"
**Concept Explanation:** URL, DNS, IP, Client, Server, HTTP Request, HTTP Response.
**Worked Example:** The lifecycle of `https://google.com`.
**Guided Practice:** Match the terms (Client, DNS, Server) to their definitions.
**Independent Practice:** `EX-WEB-01`: Map a real-world restaurant analogy to the web request cycle.
**Debugging Task:** N/A (Theory)
**Transfer Task:** Explain what happens when the wifi is disconnected (DNS failure vs Server failure).
**Project Connection:** Understanding where their code lives (Client) vs where it will live (Server).
**Reflection:** "Why is it called a request/response cycle?"
**Mastery Check:** `ASSESS-WEB-01` (Sequencing).
**Answer Key:** D -> C -> A -> B.
**Feedback Guidance:** Remind them that DNS is like a phonebook.
**Accessibility Notes:** N/A
**Technical References:** MDN Web Mechanics.
**Version/Date:** 1.0 (2026-09-16)

---

## `HTML-L01`: The HTML Boilerplate
**Module:** Phase 2: HTML Fundamentals
**Prerequisites:** `SKILL-ENV-02`, `SKILL-WEB-02`
**Learning Outcomes:** Write the mandatory tags required for a valid HTML5 document.
**Skill IDs:** `SKILL-HTML-01`
**Difficulty:** Beginner
**Estimated Effort:** 30 mins
**Common Misconceptions:** Putting visible text in the `<head>` tag.
**Retrieval Prompts:** "What is the difference between structure and presentation?"
**Concept Explanation:** The skeleton of a web page. Tags, nesting, attributes.
**Worked Example:** A minimal valid HTML5 document structure.
**Guided Practice:** Add missing tags to a partially complete boilerplate.
**Independent Practice:** Write the boilerplate from memory.
**Debugging Task:** "This page has a title, but it's rendering on the actual page instead of the browser tab. Why?" (Title is in `<body>`).
**Transfer Task:** Add a `<meta name="description">` tag to the head.
**Project Connection:** Step 1 of `PROJECT-HTML-M1`.
**Reflection:** "Why do we need a `<head>` if it's invisible?"
**Mastery Check:** `ASSESS-HTML-01`.
**Answer Key:** Must contain `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`.
**Feedback Guidance:** Watch for unclosed tags or incorrect nesting.
**Accessibility Notes:** Emphasize `<html lang="en">` for screen readers.
**Technical References:** WHATWG HTML specification.
**Version/Date:** 1.0 (2026-09-16)

---

## `CSS-L01`: Selectors and Properties
**Module:** Phase 3: CSS Fundamentals
**Prerequisites:** `SKILL-HTML-01`
**Learning Outcomes:** Connect a CSS file to HTML and style elements using tag, class, and ID selectors.
**Skill IDs:** `SKILL-CSS-01`
**Difficulty:** Beginner
**Estimated Effort:** 30 mins
**Common Misconceptions:** Putting CSS directly inside HTML tags (inline styles) as a best practice; confusing `.class` with `#id`.
**Retrieval Prompts:** "What tag goes in the `<head>` of an HTML document to link a stylesheet?"
**Concept Explanation:** The CSS Rule (Selector, Property, Value). Tag selectors vs Class selectors vs ID selectors.
**Worked Example:** Styling a `<p>` tag vs a `<p class="alert">`.
**Guided Practice:** Connect a `style.css` file and change the background color of the `<body>`.
**Independent Practice:** `EX-CSS-01`: Given a raw HTML recipe, create a CSS file that makes the title blue, the ingredients list green, and a specific "Warning" paragraph red.
**Debugging Task:** "You wrote `.header { color: blue; }` but the text is still black. You look at your HTML and it says `<h1 id="header">`. Why did it fail?"
**Transfer Task:** Change the font-family of the entire page to sans-serif.
**Project Connection:** Foundation of `PROJECT-CSS-M2`.
**Reflection:** "Why is it better to use a class to style 5 buttons instead of giving them all an ID?"
**Mastery Check:** `ASSESS-CSS-01`.
**Answer Key:** `.alert { color: red; }` vs `#alert`.
**Feedback Guidance:** Remind students that IDs are unique (only one per page), classes are reusable.
**Accessibility Notes:** Mention color contrast ratios for visually impaired users.
**Technical References:** MDN CSS Selectors.
**Version/Date:** 1.0 (2026-09-16)

---

## `CSS-L02`: The Box Model
**Module:** Phase 3: CSS Fundamentals
**Prerequisites:** `SKILL-CSS-01`
**Learning Outcomes:** Manipulate element dimensions using padding, border, and margin.
**Skill IDs:** `SKILL-CSS-02`
**Difficulty:** Intermediate
**Estimated Effort:** 40 mins
**Common Misconceptions:** Padding and Margin are the same thing; Width includes padding by default.
**Retrieval Prompts:** "How do you target an element with `class='box'` in CSS?"
**Concept Explanation:** Every HTML element is a rectangular box. The Box Model: Content -> Padding -> Border -> Margin.
**Worked Example:** Drawing the box model with pixel measurements.
**Guided Practice:** Add a 5px solid black border and 20px of padding to a `<div>`.
**Independent Practice:** `EX-CSS-02`: Given two overlapping `<div>` elements, use margin to separate them and padding to give their internal text breathing room.
**Debugging Task:** "You set a box's width to 100px. You add 10px of padding. Now the box is 120px wide and breaks your layout. Why?"
**Transfer Task:** Introduce `box-sizing: border-box`.
**Project Connection:** Used to space out sections in `PROJECT-CSS-M2`.
**Reflection:** "If you want to push another element away from your button, do you use margin or padding?"
**Mastery Check:** `ASSESS-CSS-02`.
**Answer Key:** Total width = width + padding (left/right) + border (left/right).
**Feedback Guidance:** Have students right-click and "Inspect" their element in the browser to physically see the color-coded Box Model in DevTools.
**Accessibility Notes:** Ensure touch targets (padding on buttons) are large enough for mobile users.
**Technical References:** MDN The Box Model.
**Version/Date:** 1.0 (2026-09-16)

---

## `CSS-L03`: Layout (Flexbox)
**Module:** Phase 3: CSS Fundamentals
**Prerequisites:** `SKILL-CSS-02`
**Learning Outcomes:** Align and distribute space among items in a container.
**Skill IDs:** `SKILL-CSS-03`
**Difficulty:** Intermediate
**Estimated Effort:** 45 mins
**Common Misconceptions:** Applying flex properties (`justify-content`) to the child elements instead of the parent container.
**Retrieval Prompts:** "What is the difference between margin and padding?"
**Concept Explanation:** `display: flex` turns the parent into a flex container and its direct children into flex items. Main axis vs Cross axis.
**Worked Example:** Creating a basic left-to-right navigation bar.
**Guided Practice:** Use `justify-content: space-between` to push a logo to the left and links to the right.
**Independent Practice:** `EX-CSS-03`: Recreate a 3-column pricing tier layout.
**Debugging Task:** "You put `justify-content: center` on a button, but the button didn't move to the center of the screen. Why?"
**Transfer Task:** Use `flex-direction: column` to stack items vertically.
**Project Connection:** Core layout engine for `PROJECT-CSS-M2`.
**Reflection:** "Why is Flexbox easier than using margins to push elements around the screen?"
**Mastery Check:** `ASSESS-CSS-03`.
**Answer Key:** Parent needs `display: flex`.
**Feedback Guidance:** Reinforce the Parent/Child relationship.
**Accessibility Notes:** Ensure DOM order matches visual order when using flex-direction.
**Technical References:** CSS Flexible Box Layout Module.
**Version/Date:** 1.0 (2026-09-16)

---

## `JS-L01`: Variables and Data Types
**Module:** Phase 4: JS Fundamentals
**Prerequisites:** `SKILL-WEB-02`
**Learning Outcomes:** Declare variables (`let`, `const`) and use basic data types (strings, numbers).
**Skill IDs:** `SKILL-JS-01`
**Difficulty:** Beginner
**Estimated Effort:** 30 mins
**Common Misconceptions:** Strings and numbers are interchangeable (`"1" + 1 = "11"`).
**Retrieval Prompts:** "What is the role of JavaScript in the Frontend Trinity?"
**Concept Explanation:** Memory allocation. `let` (can change) vs `const` (cannot change). Strings (text) vs Numbers (math).
**Worked Example:** Storing a username and a score.
**Guided Practice:** Connect an `app.js` file to an HTML document using `<script src="app.js"></script>` and `console.log` a message.
**Independent Practice:** `EX-JS-01`: Create variables for a user's profile (name, age, isOnline) using the correct data types.
**Debugging Task:** "You wrote `const score = 0; score = 10;`. The console shows a `TypeError`. Why?"
**Transfer Task:** Concatenate a string and a variable (`"Hello, " + name`).
**Project Connection:** Variables will store user input in `PROJECT-JS-M3`.
**Reflection:** "Why do modern developers prefer `const` by default over `let`?"
**Mastery Check:** `ASSESS-JS-01`.
**Answer Key:** `const` prevents accidental reassignment.
**Feedback Guidance:** Remind them to open the browser DevTools Console to see their JS output.
**Accessibility Notes:** N/A
**Technical References:** MDN JavaScript data types and data structures.
**Version/Date:** 1.0 (2026-09-16)

---

## `JS-L02`: DOM Manipulation
**Module:** Phase 4: JS Fundamentals
**Prerequisites:** `SKILL-JS-01`, `SKILL-CSS-01`
**Learning Outcomes:** Read and write the HTML document using `document.querySelector`.
**Skill IDs:** `SKILL-JS-02`
**Difficulty:** Intermediate
**Estimated Effort:** 40 mins
**Common Misconceptions:** Forgetting that `querySelector` uses CSS syntax (e.g., forgetting the `#` for an ID).
**Retrieval Prompts:** "How do you select an element with an ID of 'title' in CSS?"
**Concept Explanation:** The Document Object Model (DOM) is a JS representation of the HTML. We can select nodes and change their properties (`.textContent`, `.style`).
**Worked Example:** Changing an `<h1>` text from "Hello" to "Goodbye".
**Guided Practice:** Select a paragraph and change its color to red using JS.
**Independent Practice:** `EX-JS-02`: Given an HTML file with an empty `<ul>`, use JS to select the list and add a new `<li>` to it using `.innerHTML`.
**Debugging Task:** "You wrote `document.querySelector('submit-btn')` but JS says the element is `null`. The HTML is `<button id="submit-btn">`. What is wrong with your selector?"
**Transfer Task:** Read the `.value` of a text `<input>` field.
**Project Connection:** Reading the input and adding list items for `PROJECT-JS-M3`.
**Reflection:** "Why is it important to put your `<script>` tag at the very bottom of the HTML `<body>`?"
**Mastery Check:** `ASSESS-JS-02`.
**Answer Key:** `document.querySelector('#submit-btn')`.
**Feedback Guidance:** Emphasize that the DOM must load before JS can query it.
**Accessibility Notes:** Warn against removing focus states when manipulating styles.
**Technical References:** MDN Document Object Model (DOM).
**Version/Date:** 1.0 (2026-09-16)

---

## `JS-L03`: Event Handling
**Module:** Phase 4: JS Fundamentals
**Prerequisites:** `SKILL-JS-02`
**Learning Outcomes:** Execute JavaScript functions in response to user interactions using `addEventListener`.
**Skill IDs:** `SKILL-JS-03`
**Difficulty:** Intermediate
**Estimated Effort:** 40 mins
**Common Misconceptions:** Invoking the function immediately during event binding instead of passing the function reference.
**Retrieval Prompts:** "How do you read the text typed into an `<input>` field?"
**Concept Explanation:** The browser is always "listening" for events (clicks, keypresses). We can attach functions to those events.
**Worked Example:** Showing an alert when a button is clicked.
**Guided Practice:** Create a button that increments a counter variable and updates the DOM text each time it's clicked.
**Independent Practice:** `EX-JS-03`: Build a "Dark Mode" toggle button that changes the `<body>` background color.
**Debugging Task:** "You wrote `btn.addEventListener('click', toggleDarkMode());`. The page instantly goes dark when it loads, and the button does nothing. Why?"
**Transfer Task:** Log the value of an input field every time the user clicks "Submit".
**Project Connection:** The core interaction loop of `PROJECT-JS-M3`.
**Reflection:** "What is the difference between a function reference (`myFunc`) and a function invocation (`myFunc()`)?"
**Mastery Check:** `ASSESS-JS-03`.
**Answer Key:** Parentheses invoke the function immediately.
**Feedback Guidance:** This is the hardest concept so far. Draw the distinction clearly between "doing the action now" vs "handing the browser a set of instructions to do later."
**Accessibility Notes:** Ensure custom buttons have `tabindex` and respond to the Enter/Space keys if not using a native `<button>` tag (though native tags are heavily preferred).
**Technical References:** MDN Introduction to events.
**Version/Date:** 1.0 (2026-09-16)

---

## `GIT-L01`: Local Version Control
**Module:** Phase 5: Version Control
**Prerequisites:** `SKILL-ENV-01`
**Learning Outcomes:** Initialize a Git repository, track changes, and create semantic commits.
**Skill IDs:** `SKILL-GIT-01`
**Difficulty:** Beginner
**Estimated Effort:** 35 mins
**Common Misconceptions:** Believing that saving a file in VS Code automatically adds it to Git history; confusion between `git add` and `git commit`.
**Retrieval Prompts:** "How do you use the terminal to navigate into a folder named `my-first-site`?"
**Concept Explanation:** The Three Trees of Git: Working Directory (saving), Staging Area (adding), Repository (committing).
**Worked Example:** Taking a snapshot of an `index.html` file.
**Guided Practice:** Run `git init`, `git add .`, and `git commit -m "Initial commit"` in the terminal.
**Independent Practice:** `EX-GIT-01`: Create a new CSS file. Check `git status`. Add the file, commit it with a message describing what it is, and check `git log`.
**Debugging Task:** "You ran `git commit -m "Add styles"`, but Git says 'nothing to commit, working tree clean'. You definitely just saved changes to your CSS file. What step did you skip?"
**Transfer Task:** Change the CSS, stage it, and commit with a new message.
**Project Connection:** Foundation for `PROJECT-GIT-M4`.
**Reflection:** "Why does Git force us to 'add' files to a staging area before committing, instead of just committing every saved file automatically?"
**Mastery Check:** `ASSESS-GIT-01`.
**Answer Key:** You must stage files because you might only want to commit some changes, not all of them.
**Feedback Guidance:** Reinforce `git status` as the command they should run before and after every other Git command.
**Accessibility Notes:** N/A
**Technical References:** Pro Git Book.
**Version/Date:** 1.0 (2026-09-16)

---

## `GIT-L02`: Remote Repositories
**Module:** Phase 5: Version Control
**Prerequisites:** `SKILL-GIT-01`
**Learning Outcomes:** Connect a local repository to GitHub and push changes.
**Skill IDs:** `SKILL-GIT-02`
**Difficulty:** Intermediate
**Estimated Effort:** 40 mins
**Common Misconceptions:** Confusing Git (the offline tool) with GitHub (the online website/cloud).
**Retrieval Prompts:** "What does the `git commit -m` command actually do?"
**Concept Explanation:** The Cloud Backup. Remotes. `git push`.
**Worked Example:** Creating a repo on GitHub and linking it to the local machine.
**Guided Practice:** Create a GitHub account, click "New Repository", and copy/paste the `git remote add origin` commands into the terminal. Run `git push -u origin main`.
**Independent Practice:** `EX-GIT-02`: Make one more change to the HTML file locally, commit it, and push it to GitHub without needing the `-u` flag. Verify the change is visible on the website.
**Debugging Task:** "You try to push, but git says `fatal: remote origin already exists`. Why did this happen?"
**Transfer Task:** Refresh the GitHub page to see the new commit history online.
**Project Connection:** Deploying `PROJECT-GIT-M4`.
**Reflection:** "If your computer was destroyed by a cup of coffee right now, how much of your code would be saved on GitHub?"
**Mastery Check:** `ASSESS-GIT-02`.
**Answer Key:** Only the code that was successfully committed AND pushed.
**Feedback Guidance:** Walk them through GitHub's UI to show them that the code is physically sitting on another computer.
**Accessibility Notes:** GitHub UI navigation for screen readers.
**Technical References:** GitHub Docs.
**Version/Date:** 1.0 (2026-09-16)

---

## `CAP-L01`: The Interactive Portfolio (Capstone Guide)
**Module:** Phase 6: Synthesis
**Prerequisites:** All previous skills.
**Learning Outcomes:** Independently architect, code, version control, and deploy a multi-page interactive web application.
**Skill IDs:** `SKILL-CAP-01`
**Difficulty:** Advanced
**Estimated Effort:** 3-5 Hours
**Common Misconceptions:** Trying to build the entire site before testing if the HTML loads.
**Retrieval Prompts:** N/A (Comprehensive synthesis).
**Concept Explanation:** Project Planning. The "Vertical Slice" methodology (build one page completely, then add complexity).
**Worked Example:** Planning out the file structure (`index.html`, `styles.css`, `app.js`).
**Guided Practice:** Setup the repository and link the 3 blank files together.
**Independent Practice:** `PROJECT-CAPSTONE`: Build the portfolio following the rubric.
**Debugging Task:** N/A (Capstone is entirely self-debugged).
**Transfer Task:** Deploy via GitHub Pages.
**Project Connection:** This *is* the project.
**Reflection:** "Look at the live URL of your project. If you want to change the color of the header on the live site, what are the exact steps you need to take starting from your local code editor?"
**Mastery Check:** Successful deployment.
**Answer Key:** 1. Edit code locally. 2. Save. 3. `git add`. 4. `git commit`. 5. `git push`. 6. Wait for GitHub Pages to rebuild.
**Feedback Guidance:** Do not give students the answers to code bugs during the Capstone. Point them back to earlier lessons or ask guiding questions ("What does the console say?").
**Accessibility Notes:** Final project must pass basic manual accessibility checks (alt text, contrast, semantic HTML).
**Technical References:** GitHub Pages documentation.
**Version/Date:** 1.0 (2026-09-16)
