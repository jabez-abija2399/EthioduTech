# JS-L02: DOM Manipulation

## 1. Context & Goal
Variables let JS remember things, but currently, your JS doesn't know what is happening on the HTML webpage. To bridge this gap, we use the DOM (Document Object Model). 

**By the end of this lesson, you will be able to:**
Use JavaScript to find elements on your HTML page and change their text or style.

## 2. Retrieval Practice
In CSS, how do you select an element that has the ID of `main-title`?

## 3. Concept: The DOM and querySelector
When a browser loads an HTML file, it converts all the HTML tags into JavaScript "objects." This huge tree of objects is called the **Document Object Model**. 

To grab one of these objects in JavaScript, we use the `document.querySelector()` command. The amazing part? **It uses the exact same selectors as CSS!**

```javascript
// Grab the element with id="main-title" and store it in a variable
const titleElement = document.querySelector('#main-title');
```

## 4. Concept: Reading and Writing
Once you have grabbed an element, you can read its properties or change them.
* `.textContent`: The text inside the HTML tags.
* `.style`: The CSS styles applied to it.
* `.value`: What the user typed into an `<input>` field.

```javascript
// Change the text!
titleElement.textContent = "Welcome to the future!";

// Change the color!
titleElement.style.color = "blue";
```

## 5. Guided Practice
1. In your HTML, create a paragraph: `<p class="message">Hello</p>`.
2. In your JS, select it: `const myMessage = document.querySelector('.message');`
3. In your JS, change it: `myMessage.textContent = "I have been hacked by JavaScript!";`
4. Look at the browser. The word "Hello" never appears. JS changes it instantly!

## 6. Independent Practice
> **EX-JS-02:** 
> 1. In your HTML, create an empty bulleted list: `<ul id="todo-list"></ul>`.
> 2. In your JS, select the list using its ID.
> 3. Use `.innerHTML` to inject a new list item into it. `yourListVariable.innerHTML = "<li>Buy Milk</li>";`

## 7. Debugging Task
You want to change the text of a submit button.
**HTML:** `<button id="submit-btn">Send</button>`
**JS:**
```javascript
const btn = document.querySelector('submit-btn');
btn.textContent = "Loading...";
```
You get a red error in the console: `Cannot read properties of null (reading 'textContent')`.
"Null" means JS couldn't find the element. Look closely at the `querySelector`. What punctuation mark is missing?

## 8. Reflection
Why is it incredibly important to put your `<script src="app.js"></script>` tag at the very *bottom* of your HTML `<body>`, rather than at the top in the `<head>`?
*Hint: What happens if JS tries to select a paragraph that the browser hasn't drawn yet?*

## 9. Mastery Check
Write the single line of JavaScript required to select an element with the ID of `warning` and change its text to 'Danger!'.
