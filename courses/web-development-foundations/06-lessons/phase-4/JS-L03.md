# JS-L03: Event Handling

## 1. Context & Goal
Currently, our JavaScript runs instantly as soon as the page loads. But most web interactivity happens *after* the user does something—like clicking a button or typing in a form. 

**By the end of this lesson, you will be able to:**
Use `addEventListener` to tell the browser to wait for a user action before running a block of JavaScript code.

## 2. Retrieval Practice
How do you read the text that a user has typed into an `<input>` field?

## 3. Concept: Functions and Listeners
A **Function** is a block of code that we package up so it can be run later.
An **Event Listener** is a mechanism that waits for a specific action (a "click", a "keypress") and then triggers a Function.

```javascript
// 1. Select the button
const myBtn = document.querySelector('#magic-btn');

// 2. Define the function (the instructions)
function doMagic() {
  console.log("The button was clicked!");
}

// 3. Attach the listener to the button
myBtn.addEventListener('click', doMagic);
```

## 4. Concept: Reference vs Invocation
Look closely at step 3 above. It says `doMagic`, not `doMagic()`. 
* `doMagic` (without parentheses) means: "Here are the instructions for later." (Reference).
* `doMagic()` (with parentheses) means: "Do it RIGHT NOW." (Invocation).

If you put parentheses inside the event listener, the code will run the moment the page loads, and the button will be useless.

## 5. Guided Practice
Let's build a Click Counter!
1. HTML: `<button id="counter-btn">Clicks: 0</button>`
2. JS:
```javascript
const btn = document.querySelector('#counter-btn');
let count = 0; // Notice we use 'let' because the count will change!

function addClick() {
  count = count + 1; // Increase the math number
  btn.textContent = "Clicks: " + count; // Update the HTML text
}

btn.addEventListener('click', addClick);
```

## 6. Independent Practice
> **EX-JS-03:** Build a "Dark Mode" toggle button.
> 1. HTML: A button with an ID.
> 2. JS: Select the button. Select the `<body>`. 
> 3. Create a function that changes the body's `.style.backgroundColor` to `"black"` and `.style.color` to `"white"`.
> 4. Add a click event listener to the button that triggers your function.

## 7. Debugging Task
A student writes the following code:
```javascript
const btn = document.querySelector('#dark-mode');

function makeDark() {
  document.body.style.backgroundColor = "black";
}

btn.addEventListener('click', makeDark());
```
When they refresh the page, the screen instantly turns black before they even click the button. Furthermore, clicking the button does nothing. Why?

## 8. Reflection
Think about the real world. If you tell your friend, "Call me when you get home," you are giving them an Event Listener (when you get home) and a Function (call me). What would happen if you used parentheses and forced them to call you immediately before they even left?

## 9. Mastery Check
Write the JavaScript required to attach a function called `submitForm` to a button stored in a variable called `submitBtn` when the user clicks it.
