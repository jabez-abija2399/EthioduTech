# LEARNING OUTCOMES & ASSESSMENT BLUEPRINT: Vertical Slice

This document aligns the observable capabilities (Outcomes) with the specific tools we use to measure them (Assessments) for Phase 0, 1, and HTML Module 1. We strictly avoid multiple-choice questions for programming concepts.

## PHASE 0: GETTING STARTED

### Module Outcome
"Configure a basic local development environment, manipulate files via the command line, and view edits in a web browser."

### Assessments
| Target Skill | Assessment ID | Type | Task | Evidence of Mastery |
|--------------|---------------|------|------|---------------------|
| `SKILL-ENV-01` | `ASSESS-ENV-01` | Code Modification | Provide a broken CLI sequence. Student must fix the commands to correctly create a folder and enter it. | Correctly uses `mkdir` and `cd` in sequence. |
| `SKILL-ENV-02` | `ASSESS-ENV-02` | Explanation | "Explain the difference between saving a file in VS Code and refreshing the browser. Why must both happen?" | Mentions that the browser reads from the disk state, which only updates on save. |

## PHASE 1: WEB FOUNDATIONS

### Module Outcome
"Trace the lifecycle of a web request and categorize frontend code by its architectural responsibility."

### Assessments
| Target Skill | Assessment ID | Type | Task | Evidence of Mastery |
|--------------|---------------|------|------|---------------------|
| `SKILL-WEB-01` | `ASSESS-WEB-01` | Sequencing | "Put these events in order: A) Server sends HTML, B) Browser renders pixels, C) Browser asks DNS for IP, D) You hit Enter." | Correct sequence: D -> C -> A -> B. |
| `SKILL-WEB-02` | `ASSESS-WEB-02` | Debugging Hypothesis | "You load a page and the text says 'Helo' instead of 'Hello'. Is this an HTML, CSS, or JS problem? Why?" | Correctly identifies HTML as the layer responsible for raw text content. |

## PHASE 2: HTML FUNDAMENTALS (Module 1)

### Module Outcome
"Author a syntactically valid, multi-page, text-based website using semantic HTML and relative hyperlinking."

### Assessments
| Target Skill | Assessment ID | Type | Task | Evidence of Mastery |
|--------------|---------------|------|------|---------------------|
| `SKILL-HTML-01` | `ASSESS-HTML-01` | Code Writing | "From memory, write the absolute minimum HTML tags required for a browser to consider it a valid HTML5 page." | Includes `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`. |
| `SKILL-HTML-02` | `ASSESS-HTML-02` | Transformation | "Given this raw string of text about cats, mark it up so that 'Cats' is the main title, and the three breeds are a bulleted list." | Uses `<h1>` for title, `<ul>` and `<li>` for breeds. |
## PHASE 3: CSS FUNDAMENTALS (Module 2)

### Module Outcome
"Style an HTML document using an external stylesheet, targeting specific elements with classes, and laying them out responsively using Flexbox and the Box Model."

### Assessments
| Target Skill | Assessment ID | Type | Task | Evidence of Mastery |
|--------------|---------------|------|------|---------------------|
| `SKILL-CSS-01` | `ASSESS-CSS-01` | Code Writing | "Given a paragraph with `<p class='highlight'>`, write the CSS rule to make its background yellow." | Writes `.highlight { background-color: yellow; }` with correct syntax. |
| `SKILL-CSS-02` | `ASSESS-CSS-02` | Prediction | "A `<div>` has a width of 100px, padding of 10px on all sides, and a border of 5px on all sides. What is its total visible width?" | Calculates 130px (100 + 10 + 10 + 5 + 5). |
| `SKILL-CSS-03` | `ASSESS-CSS-03` | Transformation | "You have a `div` containing three buttons stacked on top of each other. Add the two CSS properties required to the `div` to make them sit side-by-side with equal space between them." | Adds `display: flex;` and `justify-content: space-between;`. |

## PHASE 4: JAVASCRIPT FUNDAMENTALS (Module 3)

### Module Outcome
"Write vanilla JavaScript to capture user events, modify the DOM in response, and correctly declare and manipulate variables."

### Assessments
| Target Skill | Assessment ID | Type | Task | Evidence of Mastery |
|--------------|---------------|------|------|---------------------|
| `SKILL-JS-01` | `ASSESS-JS-01` | Debugging | "Why does this code throw an error? `const age = 10; age = 11;`" | Identifies that `const` variables cannot be reassigned. |
| `SKILL-JS-02` | `ASSESS-JS-02` | Code Writing | "Write the single line of JS required to select an element with the ID of `submit-btn` and change its text to 'Loading...'." | Writes `document.querySelector('#submit-btn').textContent = 'Loading...';` |
| `SKILL-JS-03` | `ASSESS-JS-03` | Debugging | "A student wrote `btn.addEventListener('click', sayHello());`. The function runs immediately on page load, and clicking the button does nothing. Why?" | Identifies that adding `()` invokes the function immediately rather than passing it as a reference. |

## PHASE 5: VERSION CONTROL (Module 4)

### Module Outcome
"Initialize a local Git repository, track changes using semantic commit messages, and push the code to a remote GitHub repository."

### Assessments
| Target Skill | Assessment ID | Type | Task | Evidence of Mastery |
|--------------|---------------|------|------|---------------------|
| `SKILL-GIT-01` | `ASSESS-GIT-01` | Code Writing | "You just created a new file called `index.html`. Write the two terminal commands needed to stage it and commit it with the message 'Add homepage'." | Writes `git add index.html` (or `.`) and `git commit -m "Add homepage"`. |
| `SKILL-GIT-02` | `ASSESS-GIT-02` | Debugging | "You type `git push`, but the terminal says 'fatal: No configured push destination.' What step did you forget to do before pushing?" | Identifies that the local repo needs to be connected to a remote GitHub URL (e.g., `git remote add origin`). |

## PHASE 6: SYNTHESIS (CAPSTONE)

### Module Outcome
"Independently architect, code, version control, and deploy a multi-page interactive web application."

### Assessments
*There are no multiple-choice or short-answer assessments for the Capstone. Mastery is proven purely through the successful deployment of the `PROJECT-CAPSTONE` rubric.*
