# ENV-L02: Writing and Running Code

## 1. Context & Goal
Now that you can navigate folders in the terminal, you need a way to actually write code inside them, and a way to view what that code looks like as a web page. 

**By the end of this lesson, you will be able to:**
Open your project in a code editor, write text into an HTML file, launch a local web server, and inspect your code using the browser's developer tools.

## 2. Retrieval Practice
In the previous lesson, we used the `cd` command. What does `cd` stand for, and what happens if you type `cd ..` ?

## 3. Concept: The Editor and The Browser
Web development relies on an endless loop of two actions:
1. **Writing Code:** Done in an Integrated Development Environment (IDE) like VS Code.
2. **Viewing Code:** Done in a Web Browser (like Chrome or Firefox).

However, you shouldn't just double-click an HTML file to open it in Chrome. Real web development requires a **Local HTTP Server**—a small program running on your computer that acts like a real internet server, serving your files to your browser.

## 4. Guided Practice

**Step 1: Open the IDE**
1. Open your terminal and navigate to your `my-first-site` folder from the last lesson.
2. Type `code .` and press Enter. This tells VS Code to open the current folder (`.`).

**Step 2: Write Code**
1. Click on the `index.html` file you created earlier.
2. Type: `Hello, World! This is my first web page.`
3. Save the file (`Ctrl+S` or `Cmd+S`).

**Step 3: Run the Server**
1. In VS Code, you can use an extension like **Live Server**, or run a terminal command if you have Python installed (`python3 -m http.server`).
2. Your browser should automatically open to a URL that looks like `http://127.0.0.1:5500/index.html`.

## 5. Independent Practice
Change the text in your `index.html` file to say "I am a web developer." Save the file. What happens in the browser? 

*Note: If you used Live Server, the browser should refresh automatically. This is called Hot Reloading.*

## 6. Concept: Developer Tools
Browsers have a hidden superpower: The Developer Tools (DevTools).
Right-click on your text in the browser and select **Inspect**. A panel will open showing the underlying code of the web page.

## 7. Debugging Task
You made a change in VS Code, but the browser still shows the old text. What is the most likely reason?
*Hint: Look at the tab at the top of your VS Code window. Is there a white dot next to the filename?*

## 8. Reflection
When you right-click and "Inspect" a website like Google or Wikipedia, you can double-click their text in the DevTools panel and rewrite it! 
Does changing the text in the DevTools actually hack the website for everyone else in the world? Why or why not?

## 9. Mastery Check
Can you open your folder in VS Code, make a change, save it, and view it on a local server URL? If so, your developer environment is ready.
