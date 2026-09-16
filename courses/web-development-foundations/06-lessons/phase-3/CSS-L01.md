# CSS-L01: Selectors and Properties

## 1. Context & Goal
If HTML is the foundation of a house, CSS is the paint, wallpaper, and interior design. Without CSS, every website on the internet would look like a 1990s word document.

**By the end of this lesson, you will be able to:**
Connect a CSS file to your HTML and use tag, class, and ID selectors to apply styles like color and typography.

## 2. Retrieval Practice
What tag goes inside the `<head>` of an HTML document to embed metadata or link external files?

## 3. Concept: The CSS Rule
CSS (Cascading Style Sheets) is written in **rules**. A rule has three parts:
1. **Selector:** *What* are we styling?
2. **Property:** *Which aspect* of it are we styling?
3. **Value:** *How* are we styling it?

```css
/* Selector */
p {
  /* Property : Value */
  color: blue;
}
```

## 4. Concept: Three Types of Selectors
If you use a **Tag Selector** (like `p { }`), *every single paragraph* on your website will change. Usually, you only want to change *one specific* paragraph. To do this, we use Classes and IDs.

* **Class (`.`):** Reusable. You can give 5 different buttons the class `btn`. In CSS, you target it with a dot: `.btn { }`.
* **ID (`#`):** Unique. Only ONE element on the page can have an ID of `main-header`. In CSS, you target it with a hash: `#main-header { }`.

## 5. Guided Practice
**Step 1:** Create a file named `styles.css` in your project folder.
**Step 2:** Link it in your `index.html` inside the `<head>` tag:
`<link rel="stylesheet" href="styles.css">`
**Step 3:** Add a class to a paragraph in your HTML:
`<p class="alert">Warning: Do not press!</p>`
**Step 4:** Target that class in your CSS and make it red:
```css
.alert {
  color: red;
}
```

## 6. Independent Practice
> **EX-CSS-01:** Create a simple HTML recipe. Create a CSS file and link it. Make the main `<h1>` title blue. Give your ingredients list (`<ul>`) a class of `ingredients` and make the text green.

## 7. Debugging Task
You wrote `.header { color: blue; }` in your CSS file, but the text on your website is still black. You look at your HTML, and it says `<h1 id="header">Welcome</h1>`. 

Why did the CSS fail to apply the blue color?
*Hint: Look at the punctuation mark used in the CSS selector.*

## 8. Reflection
Imagine you have a website with 100 buttons that all need to be identical (red with white text). Why is it better to use a **Class** to style them instead of giving them all a unique **ID**?

## 9. Mastery Check
Write the exact CSS rule to change the background color to yellow for any HTML element that has `class="highlight"`.
