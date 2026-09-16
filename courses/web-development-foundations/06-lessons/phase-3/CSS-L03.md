# CSS-L03: Layout (Flexbox)

## 1. Context & Goal
By default, HTML elements stack on top of each other from top to bottom (like blocks). If you want them to sit side-by-side (like a navigation bar or a grid of photos), you need a layout engine. The most common and powerful layout engine in modern CSS is **Flexbox**.

**By the end of this lesson, you will be able to:**
Use Flexbox to create rows, columns, and perfectly align content inside a container.

## 2. Retrieval Practice
What is the difference between margin and padding?

## 3. Concept: The Parent and the Children
Flexbox operates entirely on a Parent/Child relationship. 
To use it, you do *not* apply flexbox to the items you want to move. Instead, you apply it to the **container** (the Parent) that holds them.

```html
<nav class="navbar"> <!-- THE PARENT -->
  <a href="#">Home</a> <!-- THE CHILD -->
  <a href="#">About</a> <!-- THE CHILD -->
</nav>
```

When you add `display: flex;` to the `.navbar` in CSS, it immediately turns into a flexible row, and all the children sit side-by-side!

## 4. Concept: Distributing Space
Once a parent is a flex container, you can distribute the children along the main axis using `justify-content`.

* `justify-content: flex-start;` (Default. All items squished to the left).
* `justify-content: center;` (All items clustered in the middle).
* `justify-content: space-between;` (Pushes the first item to the far left, the last item to the far right, and divides the remaining space equally between the middle items).

## 5. Guided Practice
Let's build a classic navigation bar. We want a Logo on the far left, and a "Login" button on the far right.
1. Create a `<div class="header">` containing two items: an `<h1>Logo</h1>` and a `<button>Login</button>`.
2. In CSS, target the parent:
```css
.header {
  display: flex;
  justify-content: space-between;
}
```
3. Look at your browser! The logo is on the left, the button is on the right. No complex math required.

## 6. Independent Practice
> **EX-CSS-03:** Create a section on a webpage for "Pricing Tiers" (Basic, Pro, Enterprise). Create one parent `<div>` containing three child `<div>`s. Use Flexbox to make the three pricing cards sit side-by-side in the center of the screen, with equal space between them. Give them borders so you can see them!

## 7. Debugging Task
You have a single button on a page, and you want it to be perfectly centered. 
You write:
```css
.my-button {
  display: flex;
  justify-content: center;
}
```
But the button doesn't move. It stays on the left. Why did this fail?
*Hint: Remember the rule about Parents and Children.*

## 8. Reflection
Before Flexbox was invented, developers used margins and complex math (like `width: 33.333%`) to create side-by-side columns. Why is Flexbox a better mental model for layout?

## 9. Mastery Check
You have a `div` containing three buttons stacked on top of each other. Write the two exact CSS properties you must add to the `div` to make the buttons sit side-by-side with equal space between them.
