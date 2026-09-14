import { describe, it, expect } from 'vitest'
import { validateCodeSubmission } from '../../src/lib/checker/code-checker'

describe('Automated Code Submission Validator Engine', () => {
  it('should validate valid HTML, CSS, and JS code assertions successfully', () => {
    const html = '<h1>Welcome to Edutech</h1><p>Learn web development</p>'
    const css = 'body { background: #0f172a; color: white; }'
    const js = 'console.log("Hello world");'

    const result = validateCodeSubmission(html, css, js)

    expect(result.isPassed).toBe(true)
    expect(result.score).toBe(result.total)
    expect(result.assertions.length).toBeGreaterThan(0)
  })

  it('should detect missing H1 heading tag and report failure', () => {
    const html = '<p>Only paragraph text without heading</p>'
    const css = 'body { color: red; }'
    const js = ''

    const result = validateCodeSubmission(html, css, js)

    expect(result.isPassed).toBe(false)
    expect(result.feedback).toContain('Missing: Contains a main heading tag (<h1>)')
  })

  it('should apply lesson-specific assertions when lessonId is passed', () => {
    const html = '<h1>Title</h1><p>Para</p><button id="btn">Click</button>'
    const css = 'body { color: blue; }'
    const js = 'document.getElementById("btn").addEventListener("click", () => alert("Hi"))'

    const result = validateCodeSubmission(html, css, js, 'paragraphs')

    expect(result.isPassed).toBe(true)
    expect(result.total).toBe(4)
  })
})
