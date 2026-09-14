'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { MonitorPlay } from 'lucide-react'

interface LivePreviewProps {
  code: string
}

export function LivePreview({ code }: LivePreviewProps) {
  const t = useTranslations('Editor')
  
  // Basic HTML scaffolding if the user only types a snippet
  const getFullHtml = (source: string) => {
    if (source.includes('<html')) return source
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>body { font-family: sans-serif; }</style>
        </head>
        <body>${source}</body>
      </html>
    `
  }

  return (
    <div className="flex flex-col w-full h-full border rounded-xl overflow-hidden bg-white shadow-sm border-[var(--surface-variant)]">
      <div className="flex justify-between items-center px-4 py-2 bg-[var(--surface-variant)] border-b border-[var(--surface-variant)]">
        <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <MonitorPlay className="w-4 h-4" />
          {t('preview') || 'Live Preview'}
        </span>
      </div>
      
      <div className="flex-1 bg-white relative">
        <iframe
          title="live-preview"
          srcDoc={getFullHtml(code)}
          sandbox="allow-scripts"
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    </div>
  )
}
