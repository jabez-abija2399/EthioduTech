# ENV-L01: Your Developer Workspace

## 1. Context & Goal
To build things for the web, you need to be able to talk to your computer the way a developer does. While clicking on folders with your mouse works for normal usage, web development requires a faster, more precise way to tell your computer where to store and run code. 

**By the end of this lesson, you will be able to:**
Navigate your file system and create new project folders entirely through the Command Line Interface (CLI).

## 2. Concept: Terminal vs GUI
Most people interact with computers using a Graphical User Interface (GUI) — this means clicking icons with a mouse. 
Developers often use a Command Line Interface (CLI) — this means typing text commands. 

Why? Because the CLI is:
1. **Faster:** You can create 10 folders in one second by typing a single line.
2. **Required:** Many modern web development tools do not have a graphical interface. They only exist in the terminal.

## 3. The Core Commands
Your computer's storage is a giant tree of folders (directories). To move around this tree in the terminal, you need three main commands:

* `ls` (List): "What is in my current folder?" (Note: on Windows Command Prompt, this is `dir`).
* `cd <folder_name>` (Change Directory): "Move me into this folder."
* `mkdir <folder_name>` (Make Directory): "Create a new folder here."

## 4. Guided Practice
Let's create a dedicated folder for all your future web development work. Open your terminal (Terminal on Mac, or Git Bash / PowerShell on Windows).

1. Type `ls` and press Enter. You should see a list of your main folders (like Documents, Downloads, Desktop).
2. Type `cd Documents` and press Enter. You are now inside your Documents folder. 
3. Type `mkdir WebProjects` and press Enter. You just created a new folder!
4. Type `cd WebProjects` and press Enter. You are now inside your new workspace.

## 5. Independent Practice
> **MICRO-ENV-01:** Without using your mouse, create a new folder inside `WebProjects` called `my-first-site`. Move into that folder. Then, use the `touch index.html` command (or `echo. > index.html` on Windows) to create an empty HTML file. 

## 6. Debugging Task
You are trying to open a folder you just made. 
You type: `cd projects/my-site`
Your terminal outputs: `cd: no such file or directory: projects/my-site`

**Why did this happen?**
*Hint: The terminal is very literal. If you are already inside the `projects` folder, the terminal is looking for a folder named `projects` *inside* the current `projects` folder!*

## 7. Reflection
Why do you think developers prefer the terminal over clicking folders, even though it seems harder to memorize the commands at first? 

## 8. Mastery Check
Can you successfully navigate from your home directory all the way into `my-first-site` without making a mistake? If so, you are ready for the next lesson.
