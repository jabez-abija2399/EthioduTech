"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { SupportedLanguage, getTranslation, TranslationDictionary } from './translations'

interface LanguageContextType {
  language: SupportedLanguage
  setLanguage: (lang: SupportedLanguage) => void
  t: (key: keyof TranslationDictionary) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => getTranslation('en', key),
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>('en')

  useEffect(() => {
    const saved = localStorage.getItem('edutech_lang') as SupportedLanguage
    if (saved && (saved === 'en' || saved === 'am' || saved === 'om')) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang)
    localStorage.setItem('edutech_lang', lang)
  }

  const t = (key: keyof TranslationDictionary) => getTranslation(language, key)

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  return useContext(LanguageContext)
}
