# HTML-L01: The HTML Boilerplate

## 1. Context & Goal
Now that you understand that HTML provides the structure of a webpage, it's time to write some. However, you can't just open a file and start typing paragraphs. A browser needs to know what kind of document it's looking at before it can process it. 

**By the end of this lesson, you will be able to:**
Write the mandatory foundational tags required to create a valid HTML5 document.

## 2. Retrieval Practice
In the previous lesson, we discussed the Frontend Trinity. Which of the three languages is responsible for defining whether a piece of text is a button or a paragraph?

## 3. Concept: The Boilerplate
Every single valid HTML page on the internet shares the exact same starting skeleton. We call this the **Boilerplate**. It consists of nested tags.

A "tag" in HTML looks like this: `<tagname>Content</tagname>`.
* `<tagname>` is the opening tag.
* `</tagname>` is the closing tag (note the forward slash).

Here is the mandatory boilerplate:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My Web Page</title>
  </head>
  <body>
    <!-- Visible content goes here -->
  </body>
</html>
```

## 4. Concept Breakdown
* `<!DOCTYPE html>`: Tells the browser "Hey, I am using the modern HTML5 standard." It doesn't have a closing tag.
* `<html>`: The root element that wraps all other code on the page. The `lang="en"` attribute tells screen readers the page is in English.
* `<head>`: The brain of the document. Everything inside here is **invisible** to the user (metadata, page title, links to CSS).
* `<body>`: The body of the document. Everything inside here is **visible** to the user.

## 5. Guided Practice
Look at this broken boilerplate. What three things are missing or wrong?
```html
<html>
  <head>
    <title>My Broken Page</title>
  <body>
    <p>Hello world!</p>
  </body>
</head>
```

*Answers:*
1. Missing `<!DOCTYPE html>` at the very top.
2. The `<head>` tag is closed at the very bottom, after the `<body>`. It should be closed *before* the `<body>` starts.
3. The `<html>` tag is never closed at the end.

## 6. Independent Practice
Open your VS Code editor, delete everything inside `index.html`, and type out the complete HTML boilerplate from memory. Do not copy and paste. Inside the `<body>`, type a simple sentence. Save the file and view it in your browser.

## 7. Debugging Task
You write your boilerplate, and inside the `<head>` tag you put `<title>My Cool Website</title>`. But when you refresh the browser, the words "My Cool Website" are printed in huge black letters directly on the white webpage, instead of appearing in the browser tab.

Look closely at your code. What mistake did you make?

## 8. Reflection
Why do you think the creators of HTML decided to split the document into a `<head>` and a `<body>`? Why not just put everything in one big container?

## 9. Mastery Check
Can you open a blank text file and write a valid HTML document from memory, including the DOCTYPE, html, head, title, and body tags?
