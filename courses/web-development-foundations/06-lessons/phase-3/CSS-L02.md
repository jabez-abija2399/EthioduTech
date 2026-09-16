# CSS-L02: The Box Model

## 1. Context & Goal
In HTML, every single element—whether it's a paragraph, an image, or a heading—is actually a rectangular box. To position things correctly on a screen, you must learn how to manipulate the dimensions of these invisible boxes.

**By the end of this lesson, you will be able to:**
Calculate and apply padding, borders, and margins to manipulate element dimensions.

## 2. Retrieval Practice
How do you target an element with `class="card"` in CSS?

## 3. Concept: The Box Model
Imagine a framed picture hanging on a wall. 
1. **Content:** The photograph itself.
2. **Padding:** The white matting between the photo and the frame. (Internal space).
3. **Border:** The wooden frame itself.
4. **Margin:** The empty wall space between this picture frame and the next picture frame. (External space).

In CSS, the total width of an element is calculated by adding these up:
`Total Width = Content Width + Left/Right Padding + Left/Right Border`. 

## 4. Worked Example
Let's look at a button:
```css
.btn {
  width: 100px;
  padding: 10px;
  border: 5px solid black;
  margin: 20px;
}
```
The actual visible width of this button on the screen is **130px**. 
(100px content + 10px left padding + 10px right padding + 5px left border + 5px right border). *Margin pushes other elements away, but does not increase the button's visible size.*

## 5. Guided Practice
1. Open your browser, right-click on any element on this page, and click **Inspect**.
2. Look at the right side of the DevTools panel. Scroll down until you see a colored diagram of nested boxes. This is the Box Model viewer!
3. Hover over the different layers (blue for content, green for padding, orange for margin) to see them highlight on the actual webpage.

## 6. Independent Practice
> **EX-CSS-02:** Create an HTML file with two `<div>` elements stacked on top of each other. Give them both a background color. 
> 1. Use **margin** to push them 50 pixels apart from each other.
> 2. Put some text inside the divs, and use **padding** to push the text away from the edges of the box so it doesn't touch the colored walls.

## 7. Debugging Task
You create a layout where two boxes sit side-by-side. You carefully do the math so they each take up exactly 50% of the screen. But then you decide to add `padding: 10px` to the boxes so the text looks nicer. 
Suddenly, the second box drops down to the next line and breaks your layout! Why?

## 8. Reflection
If you want to push another element away from your button, do you use margin or padding? What if you want to make the clickable area of the button larger?

## 9. Mastery Check
A `<div>` has a width of 200px, padding of 20px on all sides, and a border of 2px on all sides. What is its total visible width on the screen?
