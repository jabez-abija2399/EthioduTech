# CAP-L01: The Interactive Portfolio (Capstone Guide)

## 1. Context & Goal
You have learned HTML for structure, CSS for presentation, JavaScript for logic, and Git for version control. It is time to synthesize all of these skills. 

**By the end of this project, you will have:**
Architected, coded, version-controlled, and deployed a multi-page interactive web application to the live internet.

## 2. Project Requirements
You are building a "Personal Interactive Portfolio". It must meet the following technical requirements:

1. **Structure (HTML):** At least two distinct pages (e.g., `index.html` and `projects.html`). They must link to each other using relative paths.
2. **Style (CSS):** All styles must be in an external `styles.css` file. You must use Flexbox for at least one major layout component (e.g., a navigation bar or a grid of projects).
3. **Logic (JS):** An external `app.js` file that contains at least one interactive feature triggered by an event listener (e.g., a "Dark Mode" toggle button, or a "Contact Me" button that reveals a hidden email address).
4. **Version Control (Git):** The project must be tracked locally using Git, with semantic commit messages.
5. **Deployment (GitHub):** The project must be pushed to a public GitHub repository and deployed live using **GitHub Pages**.

## 3. The Vertical Slice Methodology
Do not try to build the whole website at once. Professionals build software in "Vertical Slices"—getting a tiny, basic version of the app fully working end-to-end before adding complexity.

**Recommended Workflow:**
1. **Initialize:** Create a new folder. Run `git init`.
2. **Skeleton:** Create `index.html`, `styles.css`, and `app.js`. Link them together. Add a single `<h1>` with a colored background to prove they are connected.
3. **Deploy Early:** Commit your skeleton code. Push it to GitHub. Go to the repository settings on GitHub, navigate to "Pages", and deploy the `main` branch. 
4. *(Why? Because now you have a live URL! Every time you push from now on, the live site updates automatically).*
5. **Iterate:** Now, go back to your local code. Build the navigation bar. Commit and push. Build the JavaScript feature. Commit and push.

## 4. Debugging During the Capstone
You are on your own. If something breaks, remember your debugging fundamentals:
* **HTML:** Is the tag closed? Is the path to the CSS/JS file correct?
* **CSS:** Is the class name spelled exactly the same in HTML as it is in CSS? Did you remember the dot (`.`)?
* **JavaScript:** Open the DevTools Console. Does it show a red error? Are you trying to select an element that doesn't exist yet? Are you invoking a function immediately with `()` inside an event listener?
* **Git:** Run `git status`. Read what the terminal tells you.

## 5. Reflection
Look at the live URL of your project on the internet. Send it to a friend on your phone.
If you notice a typo in your header and want to fix it on the live site, what are the exact steps you need to take starting from your local code editor?
