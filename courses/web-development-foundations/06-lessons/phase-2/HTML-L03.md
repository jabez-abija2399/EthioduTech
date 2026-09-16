# HTML-L03: Links and Images

## 1. Context & Goal
A single HTML page is just a document. To make it a *web*, documents must link to each other. Furthermore, the web is a visual medium, so we need the ability to embed media.

**By the end of this lesson, you will be able to:**
Create absolute and relative hyperlinks, and embed images with accessible alt text.

## 2. Retrieval Practice
In Phase 0, you learned how to navigate folders. If you are inside the `my-first-site` folder, and you want to refer to a file called `about.html` sitting right next to `index.html`, what is the path to that file?

## 3. Concept: The Anchor Tag (Links)
Hyperlinks are created using the "anchor" tag: `<a>`.
However, an anchor tag needs to know *where* to go. We provide this information using an **attribute**. Attributes go inside the opening tag.

For links, the required attribute is `href` (Hypertext REFerence).

**Absolute Links:** Point to an external website on the internet.
`<a href="https://google.com">Go to Google</a>`

**Relative Links:** Point to a file on your own computer/server, relative to where you are right now.
`<a href="about.html">Read About Me</a>`

## 4. Concept: The Image Tag
Images are embedded using the `<img>` tag.
Unlike most HTML tags, `<img>` is an **empty element** (or self-closing). It does not have a closing tag `</img>` because you don't put text inside an image.

It requires two attributes:
1. `src` (Source): The path to the image file (can be absolute or relative).
2. `alt` (Alternative Text): A description of the image for screen readers or if the image fails to load. This is strictly required for accessibility.

`<img src="cat.jpg" alt="A fluffy orange cat sleeping on a keyboard">`

## 5. Guided Practice
Look at this broken code:
`<a src="about.html">Click here</a>`
`<img href="dog.jpg">`

What is wrong with both of these tags?
*Answer: The attributes are swapped! Links use `href`. Images use `src`.*

## 6. Independent Practice
> **PROJECT-HTML-GUIDED: The Homepage**
> 1. In your `my-first-site` folder, make sure you have an `index.html`. 
> 2. Create a second file named `about.html` and add the basic boilerplate to it.
> 3. Inside `index.html`, write a link (`<a>`) that connects to `about.html`.
> 4. Inside `about.html`, write a link that connects back to `index.html`.
> 5. Find an image on the internet, copy its Image Address, and use an `<img>` tag to embed it on your index page. Ensure it has an `alt` attribute.

## 7. Debugging Task
You write `<img src="profile.jpg" alt="picture of me">`. The image is located in the exact same folder as your HTML file. But when you open the browser, you just see a broken image icon.

You check the file in your folder, and it's named `Profile.JPG`. 

Why did the image break?
*Hint: Computer file systems are often case-sensitive!*

## 8. Reflection
Why is it a bad idea for the `alt` text to simply say "Image"? If you were blind and listening to a screen reader read the page to you, how would you want the `alt` text written?

## 9. Mastery Check
Can you write an image tag from memory that includes both a source and alternative text?
