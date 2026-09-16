# HTML-L02: Structuring Text

## 1. Context & Goal
If you just type raw text into the `<body>` of an HTML file, the browser will render it as one giant, continuous block of words. The browser ignores spaces and line breaks (returns) that you type in your editor. To give text shape, you must wrap it in semantic tags.

**By the end of this lesson, you will be able to:**
Structure text logically using headings, paragraphs, emphasis, and lists.

## 2. Retrieval Practice
Write down the opening and closing tag for the section of the HTML document where visible content belongs. 

## 3. Concept: Semantic HTML
"Semantic" means relating to meaning in language. Semantic HTML means using the tag that correctly describes the *meaning* of the content, not just how you want it to *look*. 

**Core Text Tags:**
* `<h1>` to `<h6>`: Headings. `<h1>` is the most important (the title). `<h2>` is a sub-heading, and so on. (Rule: Only use one `<h1>` per page).
* `<p>`: Paragraph. Wraps standard blocks of text.
* `<strong>`: Indicates that text has strong importance (usually rendered as bold).
* `<em>`: Indicates emphasis (usually rendered as italicized).

**List Tags:**
Lists require two tags working together:
* `<ul>`: Unordered List (bullet points).
* `<ol>`: Ordered List (numbered).
* `<li>`: List Item. These go *inside* the `<ul>` or `<ol>`.

## 4. Worked Example
Here is raw text:
```text
My Cat
My cat is named Whiskers. She likes:
Sleeping
Eating fish
```

Here is that text semantically structured:
```html
<h1>My Cat</h1>
<p>My cat is named <strong>Whiskers</strong>. She likes:</p>
<ul>
  <li>Sleeping</li>
  <li>Eating fish</li>
</ul>
```

## 5. Guided Practice
> **MICRO-HTML-01:** Convert the following raw text into semantic HTML. Use an `<h1>`, an `<h2>`, a `<p>`, and an `<ol>`.
> 
> How to make toast
> Ingredients
> You will need bread and butter.
> Steps
> Put bread in toaster
> Wait
> Eat

## 6. Independent Practice
Open your `index.html` file from the previous lesson. Inside the `<body>`, create a mini-resume for a fictional character (like Batman or SpongeBob). 
* Use an `<h1>` for their name.
* Use a `<p>` for their summary.
* Use an `<h2>` for "Skills".
* Use a `<ul>` and `<li>` to list three of their skills.

## 7. Debugging Task
A student wants to make a word look a little bit bigger than a normal paragraph, but smaller than an `<h1>`. They write:
`<h3>This is just a normal sentence, but I wanted it slightly bold.</h3>`

Why is this a bad practice in Semantic HTML? 
*Hint: Think about how a blind user's screen reader might interpret the structure of this page.*

## 8. Reflection
Why does the browser ignore line breaks that you type in VS Code? Why force developers to use `<p>` tags?

## 9. Mastery Check
Can you write the code for a bulleted list with two items completely from memory?
