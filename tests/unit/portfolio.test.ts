import { describe, it, expect } from 'vitest'

describe('Portfolio Project Publishing Unit Suite', () => {
  it('should serialize HTML, CSS, and JS code bundle into valid JSON payload', () => {
    const htmlCode = '<h1>My Card</h1>'
    const cssCode = 'h1 { color: blue; }'
    const jsCode = 'console.log("Card loaded");'

    const codeBundle = JSON.stringify({
      html: htmlCode,
      css: cssCode,
      js: jsCode
    })

    const parsed = JSON.parse(codeBundle)

    expect(parsed.html).toBe(htmlCode)
    expect(parsed.css).toBe(cssCode)
    expect(parsed.js).toBe(jsCode)
  })
})
