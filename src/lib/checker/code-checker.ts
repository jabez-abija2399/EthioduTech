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

export function validateCodeSubmission(
  html: string,
  css: string,
  js: string,
  customRules?: CodeAssertion[]
): CheckResult {
  const defaultRules: CodeAssertion[] = [
    {
      name: "Contains a main heading tag (<h1>)",
      test: (h) => /<h1[^>]*>[\s\S]*?<\/h1>/i.test(h)
    },
    {
      name: "Contains at least one paragraph tag (<p>)",
      test: (h) => /<p[^>]*>[\s\S]*?<\/p>/i.test(h)
    },
    {
      name: "CSS defines body or element styling",
      test: (_, c) => c.trim().length > 0 && /[\{\}]/.test(c)
    }
  ]

  const rules = customRules && customRules.length > 0 ? customRules : defaultRules
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
