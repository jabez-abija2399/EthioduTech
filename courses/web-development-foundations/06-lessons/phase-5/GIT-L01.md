# GIT-L01: Local Version Control

## 1. Context & Goal
Hitting `Ctrl+S` (or `Cmd+S`) saves your current file, but it overwrites the old version. What if you make a mistake and want to go back to how the code looked yesterday? To do this, professionals use a "time machine" for code called **Git**.

**By the end of this lesson, you will be able to:**
Initialize a local Git repository and create snapshots of your code history using semantic commit messages.

## 2. Retrieval Practice
How do you use the terminal to navigate into a folder named `my-first-site`?

## 3. Concept: The Three Trees
Git does not automatically track every save. It uses a three-step process to give you total control over what is saved to history:

1. **Working Directory:** You edit and save your files here. (Git sees changes, but doesn't record them yet).
2. **Staging Area:** You tell Git exactly *which* changed files you want to include in the next snapshot. (`git add`)
3. **Repository:** You officially take the snapshot, attaching a message describing the change. (`git commit`)

## 4. Worked Example: Making a Commit
Open your terminal inside your project folder.
1. `git init` (Only run this ONCE per project. It creates the hidden `.git` folder).
2. `git add index.html` (Moves the file to the staging area).
3. `git commit -m "Create the homepage"` (Takes the snapshot. The `-m` stands for message).

If you want to see your history, run: `git log`.

## 5. Guided Practice
Let's track a whole project!
1. Open your terminal in your `my-first-site` folder.
2. Run `git status`. It will say this is not a git repository.
3. Run `git init`. 
4. Run `git status` again. Your files will be listed in red (untracked).
5. Run `git add .` (The dot means "add ALL files in this folder").
6. Run `git status`. The files are now green (staged)!
7. Run `git commit -m "Initial commit of the whole project"`.

## 6. Independent Practice
> **EX-GIT-01:** 
> 1. In your project, create a new file called `styles.css`.
> 2. Open the terminal and run `git status`. Verify that Git sees the new file.
> 3. Use the terminal to stage the file.
> 4. Use the terminal to commit the file with the message `"Add CSS stylesheet"`.
> 5. Run `git log` to see both of your commits in history!

## 7. Debugging Task
You made changes to your CSS file. You open the terminal and run:
`git commit -m "Make the background blue"`

Git replies with an error: `nothing to commit, working tree clean`.
But you definitely just saved the file in VS Code! What step did you forget to do before running the commit command?

## 8. Reflection
Why does Git force us to "add" files to a staging area before committing, instead of just committing every saved file automatically when we hit `Ctrl+S`?
*Hint: What if you were working on a CSS file and a JS file at the same time, but the JS file is broken and you only want to save the CSS file to history right now?*

## 9. Mastery Check
You just created a new file called `about.html`. Write the two terminal commands needed to stage it and commit it with the message 'Add about page'.
