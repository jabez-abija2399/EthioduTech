# GIT-L02: Remote Repositories

## 1. Context & Goal
Git is amazing for saving history on your own computer. But what if your computer breaks? What if you want to collaborate with another developer? We need a way to upload our Git history to the cloud. The most popular cloud for code is **GitHub**.

**By the end of this lesson, you will be able to:**
Connect a local Git repository to GitHub and push your code to the internet.

## 2. Retrieval Practice
What does the `git commit -m` command actually do?

## 3. Concept: Git vs GitHub
This is the most common beginner confusion:
* **Git** is the software running on your computer that takes snapshots of your code.
* **GitHub** is a website owned by Microsoft that stores Git repositories in the cloud.

To get your code from Git to GitHub, you use a command called `push`.

## 4. Concept: The Remote Origin
Before you can push, your local Git needs to know *where* on the internet to send the code. We establish this connection by adding a "Remote" URL to our repository. By convention, the primary remote URL is named **origin**.

## 5. Guided Practice
Let's back up your project!
1. Go to github.com and create a free account (if you haven't already).
2. Click the `+` icon in the top right and select "New repository".
3. Name it `my-first-site`. Leave it public. Do NOT check "Add a README file". Click Create.
4. GitHub will show you a page of terminal commands. Look for the section titled **"…or push an existing repository from the command line"**.
5. Copy the first line (it looks like `git remote add origin https://github.com/yourname/my-first-site.git`) and paste it into your VS Code terminal. Hit enter.
6. Copy the second line: `git branch -M main`. Hit enter.
7. Copy the third line: `git push -u origin main`. Hit enter.
8. Refresh your browser page on GitHub. Your code is now in the cloud!

## 6. Independent Practice
> **EX-GIT-02:** Let's prove it works.
> 1. In VS Code, make a visible change to your `index.html` file (e.g., change the `<h1>` text) and save it.
> 2. Use the terminal to `add` and `commit` the change.
> 3. Now, push the change to GitHub by simply typing: `git push`
> 4. Go to your repository on github.com and verify that the HTML file there shows your newest change!

*(Note: You only need the `-u origin main` the very first time. After that, `git push` is enough).*

## 7. Debugging Task
You create a new folder, add an HTML file, and immediately try to run `git push`. 
The terminal spits out an error: `fatal: not a git repository`.

Why did this fail? What steps must you do to a brand new folder before you can push it to the internet?

## 8. Reflection
If your computer was destroyed by a cup of coffee right now, how much of your code would be saved on GitHub? Would the unsaved changes you were just typing be saved? Would the commits you made but haven't pushed be saved?

## 9. Mastery Check
You type `git push`, but the terminal says `fatal: No configured push destination.` What critical step did you forget to do before pushing?
