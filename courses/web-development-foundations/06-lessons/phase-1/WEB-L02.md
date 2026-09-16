# WEB-L02: The Frontend Trinity

## 1. Context & Goal
When the server sends a response back to the client, it doesn't send a picture of a website. It sends code. The browser is responsible for interpreting that code and rendering it onto the screen. 

**By the end of this lesson, you will be able to:**
Identify the three main languages of the web and differentiate their responsibilities (Structure, Presentation, Behavior).

## 2. Retrieval Practice
In the previous lesson, we established that a server sends files back to the browser. Does the server care what operating system (Mac, Windows, Linux) the client is running? 

## 3. Concept: Separation of Concerns
Modern web development relies on a principle called **Separation of Concerns**. This means we don't mix all our instructions together. We use three different languages, each with a single, specific job:

1. **HTML (HyperText Markup Language):** The Structure. It defines what the content *is* (e.g., "This is a paragraph," "This is an image," "This is a button").
2. **CSS (Cascading Style Sheets):** The Presentation. It defines what the content *looks like* (e.g., "Make that paragraph blue," "Make that image 200px wide").
3. **JavaScript (JS):** The Behavior. It defines what the content *does* (e.g., "When that button is clicked, show a popup window").

## 4. Analogy: Building a House
Think of a web page like a house.
* **HTML** is the foundation, walls, and plumbing. It is the structure. A house without HTML doesn't exist.
* **CSS** is the paint, the wallpaper, and the carpet. It makes the structure beautiful. A house without CSS is just ugly gray concrete.
* **JavaScript** is the electricity, the garage door opener, and the smart thermostat. It makes the structure interactive. A house without JavaScript is perfectly fine, but you can't interact with it.

## 5. Guided Practice
Look at the following instructions. Categorize them as HTML, CSS, or JavaScript:
1. Make the text 24 pixels tall.
2. Tell the browser that a specific block of text is the main heading.
3. Check if the user typed an '@' symbol in the email input field when they submit the form.

*Answers: 1 (CSS), 2 (HTML), 3 (JavaScript).*

## 6. Independent Practice
> **EX-WEB-02:** Go to a website you visit often (like YouTube or Amazon). Try to identify three elements on the page. For each element, describe what part of it is governed by HTML, what part by CSS, and what part by JavaScript.

## 7. Debugging / Transfer Task
You load a webpage, and you see a button that says "Log In". The button is supposed to be red and located in the top right corner. However, it is currently black, Times New Roman, and sitting in the bottom left corner. Furthermore, when you click it, nothing happens.

Which layers of the Frontend Trinity are currently broken?

## 8. Reflection
In the early days of the web (the 1990s), CSS didn't exist. Developers used HTML tags like `<font color="red">` to style their pages. Why do you think developers invented CSS to handle styling instead of just keeping it all in HTML?

## 9. Mastery Check
If a website's text says 'Helo' instead of 'Hello', is this an HTML, CSS, or JS problem? Why?
