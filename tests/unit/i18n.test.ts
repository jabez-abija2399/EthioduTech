import { describe, it, expect } from 'vitest'
import { getTranslation, translations } from '../../src/lib/i18n/translations'

describe('Multilingual i18n Localization System (LANG-001)', () => {
  it('should return English translation by default', () => {
    const text = getTranslation('en', 'brandName')
    expect(text).toBe('Edutech Platform')
  })

  it('should return Amharic translation when language is am', () => {
    const text = getTranslation('am', 'dashboard')
    expect(text).toBe('የተማሪ ዳሽቦርድ')
  })

  it('should return Afaan Oromo translation when language is om', () => {
    const text = getTranslation('om', 'dashboard')
    expect(text).toBe('Daashboordii Barataa')
  })

  it('should ensure translation completeness across all 3 supported languages', () => {
    const keys = Object.keys(translations.en) as Array<keyof typeof translations.en>

    keys.forEach((key) => {
      expect(translations.am[key]).toBeDefined()
      expect(translations.om[key]).toBeDefined()
    })
  })
})
