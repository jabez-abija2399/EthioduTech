export interface CodeAssertion {
  name: string
  test: (html: string, css: string, js: string) => boolean
}

export interface CheckResult {
  isPassed: boolean
  score: number
  total: number
  feedback: string[]
  assertions: { name: string; passed: boolean }[]
}

const LESSON_ASSERTION_REGISTRY: Record<string, CodeAssertion[]> = {
  // Lesson 1: What is HTML?
  "default": [
    {
      name: "Contains a main heading tag (<h1>)",
      test: (h) => /<h1[^>]*>[\s\S]*?<\/h1>/i.test(h)
    },
    {
      name: "Contains at least one paragraph tag (<p>)",
      test: (h) => /<p[^>]*>[\s\S]*?<\/p>/i.test(h)
    },
    {
      name: "CSS defines background or text color",
      test: (_, c) => c.trim().length > 0 && /(background|color)/i.test(c)
    }
  ],
  // Lesson 2: Paragraphs and Structure
  "paragraphs": [
    {
      name: "Contains a heading tag (<h1> or <h2>)",
      test: (h) => /<h[1-2][^>]*>[\s\S]*?<\/h[1-2]>/i.test(h)
    },
    {
      name: "Contains a paragraph tag (<p>)",
      test: (h) => /<p[^>]*>[\s\S]*?<\/p>/i.test(h)
    },
    {
      name: "Contains an interactive button (<button>)",
      test: (h) => /<button[^>]*>[\s\S]*?<\/button>/i.test(h)
    },
    {
      name: "JavaScript contains event listener or alert",
      test: (_, __, j) => j.trim().length > 0 && /(addEventListener|alert|console)/i.test(j)
    }
  ]
}

export function getRulesForLesson(lessonId: string): CodeAssertion[] {
  return LESSON_ASSERTION_REGISTRY[lessonId] || LESSON_ASSERTION_REGISTRY["default"]
}

export function validateCodeSubmission(
  html: string,
  css: string,
  js: string,
  lessonId?: string,
  customRules?: CodeAssertion[]
): CheckResult {
  let rules: CodeAssertion[] = []

  if (customRules && customRules.length > 0) {
    rules = customRules
  } else if (lessonId) {
    rules = getRulesForLesson(lessonId)
  } else {
    rules = LESSON_ASSERTION_REGISTRY["default"]
  }

  const assertions: { name: string; passed: boolean }[] = []
  const feedback: string[] = []
  let passedCount = 0

  for (const rule of rules) {
    try {
      const passed = rule.test(html, css, js)
      assertions.push({ name: rule.name, passed })
      if (passed) {
        passedCount++
      } else {
        feedback.push(`Missing: ${rule.name}`)
      }
    } catch {
      assertions.push({ name: rule.name, passed: false })
      feedback.push(`Error evaluating: ${rule.name}`)
    }
  }

  const isPassed = passedCount === rules.length

  return {
    isPassed,
    score: passedCount,
    total: rules.length,
    feedback: isPassed ? ["Great job! All code structure assertions passed."] : feedback,
    assertions
  }
}
