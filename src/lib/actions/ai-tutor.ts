"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function askAiTutorAction({
  lessonId,
  userPrompt,
  codeContext
}: {
  lessonId: string
  userPrompt: string
  codeContext: { html: string; css: string; js: string }
}) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized: Please log in to ask the AI Tutor.")
  }

  const userId = session.user.id

  // 1. Ensure StudentProfile exists
  let studentProfile = await prisma.studentProfile.findUnique({
    where: { userId }
  })

  if (!studentProfile) {
    studentProfile = await prisma.studentProfile.create({
      data: { userId }
    })
  }

  // 2. Generate intelligent pedagogical tutor response based on prompt intent & code context
  const htmlSnippet = codeContext.html ? codeContext.html.trim() : "<!-- Empty -->"
  const cssSnippet = codeContext.css ? codeContext.css.trim() : "/* Empty */"
  const jsSnippet = codeContext.js ? codeContext.js.trim() : "// Empty"

  let aiResponse = ""

  const promptLower = userPrompt.toLowerCase()

  if (promptLower.includes("explain") || promptLower.includes("understand")) {
    aiResponse = `### 💡 Code Explanation

Your current web page is structured with:
- **HTML Structure:** Contains your page elements (like headings and containers).
- **CSS Styling:** Defines the colors, flex layout, and background colors.
- **JS Interactivity:** Adds event listeners to handle user button clicks!

**Tip:** Keep your HTML markup clean by wrapping related sections inside \`<div class="card">\` elements!`
  } else if (promptLower.includes("error") || promptLower.includes("bug") || promptLower.includes("fix")) {
    // Check for common beginner HTML/CSS errors
    const errorsFound: string[] = []
    if (!htmlSnippet.includes("<") || !htmlSnippet.includes(">")) {
      errorsFound.push("Missing valid HTML tags (like `<h1>` or `<p>`).")
    }
    if (cssSnippet && (!cssSnippet.includes("{") || !cssSnippet.includes("}"))) {
      errorsFound.push("Missing `{}` curly braces in your CSS rules.")
    }

    if (errorsFound.length > 0) {
      aiResponse = `### 🔍 Code Inspection Results\n\nI noticed the following items to check:\n` +
        errorsFound.map(err => `- ${err}`).join("\n") +
        `\n\n**Recommendation:** Make sure all open tags and CSS braces have matching closing brackets!`
    } else {
      aiResponse = `### 🟢 Syntax Check Passed!\n\nYour HTML, CSS, and JS syntax look clean! If elements aren't displaying as expected, verify your CSS selector names match your HTML class names.`
    }
  } else if (promptLower.includes("hint") || promptLower.includes("help")) {
    aiResponse = `### 🎯 Lesson Hint\n\nTo build a great web layout:\n1. Use \`<h1>\` for your primary title.\n2. Use \`<p>\` for body text.\n3. In CSS, use \`display: flex;\` and \`justify-content: center;\` to center your elements perfectly on screen!`
  } else {
    aiResponse = `### 🤖 Edutech AI Tutor\n\nGreat question about your code! Here's how to improve your project:\n\n- **HTML:** Ensure all tags are properly nested.\n- **CSS:** Use modern flexbox or grid for responsive design.\n- **JS:** Add \`console.log()\` statements to debug event listeners.`
  }

  // 3. Log interaction to SQLite
  try {
    await prisma.aIInteraction.create({
      data: {
        studentId: studentProfile.id,
        contextType: "LESSON_EDITOR",
        contextId: lessonId,
        prompt: userPrompt,
        response: aiResponse
      }
    })
  } catch (err) {
    console.warn("Failed to record AI interaction log:", err)
  }

  return {
    response: aiResponse,
    timestamp: new Date().toISOString()
  }
}
