# JS-L01: Variables and Data Types

## 1. Context & Goal
HTML and CSS are static. Once they are loaded, they don't change. JavaScript (JS) is the language that makes your website think, calculate, and change dynamically. To do this, JS needs a memory system.

**By the end of this lesson, you will be able to:**
Store data in your computer's memory using variables and use the two fundamental data types: strings and numbers.

## 2. Retrieval Practice
In the Frontend Trinity, what is the role of JavaScript?

## 3. Concept: The Console
Because JavaScript runs logic in the background, you can't always *see* what it's doing on the webpage. We use the **Console** (found in your browser's DevTools) as our debugging screen.

If you write `console.log("Hello");` in your JS file, the word "Hello" will print out in the DevTools console. This is your primary tool for seeing what your code is thinking.

## 4. Concept: Variables and Data Types
A variable is a labeled box in your computer's memory where you can store data.
In modern JavaScript, we declare a variable using either `const` (constant: cannot be changed later) or `let` (can be changed later). 

**Data Types:**
* **String:** Text. Must be wrapped in quotes (`"John"`, `'Hello'`).
* **Number:** Math. No quotes (`10`, `3.14`).

```javascript
const playerName = "Alice"; // A String. Cannot change.
let score = 0;              // A Number. Can change.

score = 10;                 // Valid! We updated the score.
```

## 5. Guided Practice
1. Create a file named `app.js`.
2. Connect it to your HTML by adding `<script src="app.js"></script>` just above the closing `</body>` tag.
3. In `app.js`, write: 
```javascript
const username = "Admin";
console.log(username);
```
4. Open the HTML file in your browser, right-click -> Inspect, and open the "Console" tab. You should see "Admin" printed there!

## 6. Independent Practice
> **EX-JS-01:** Create a mini user profile in your JS file. 
> 1. Create a `const` variable for your first name.
> 2. Create a `let` variable for your age.
> 3. Use `console.log` to print them both out. 
> 4. On the next line, update your age to be one year older. Print it out again.

## 7. Debugging Task
You write the following code to track a video game score:
```javascript
const score = 0;
score = 10;
console.log(score);
```
When you open the Console, the score didn't print. Instead, there is a giant red error: `Uncaught TypeError: Assignment to constant variable.`

Why did this crash?

## 8. Reflection
Look at this code: `const result = "10" + 5;`. 
Because `"10"` is a string (text) and `5` is a number, JavaScript doesn't know how to do math with them. It just smashes them together like words. The answer is `"105"`, not `15`! 

Why is it so important to never put quotes around your numbers if you plan to do math with them?

## 9. Mastery Check
Write the JS code to create a variable called `status` that you plan to change later, and store the text `Loading` inside of it.
