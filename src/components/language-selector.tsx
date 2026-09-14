"use client"

import React from 'react'
import { Globe } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/context'
import { SupportedLanguage } from '@/lib/i18n/translations'

export function LanguageSelector() {
  const { language, setLanguage } = useTranslation()

  return (
    <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
      <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
        className="bg-transparent font-bold text-slate-700 focus:outline-none cursor-pointer pr-1"
      >
        <option value="en">English (EN)</option>
        <option value="am">አማርኛ (AM)</option>
        <option value="om">Afaan Oromoo (OM)</option>
      </select>
    </div>
  )
}
