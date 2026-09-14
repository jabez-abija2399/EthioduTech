'use client'

import * as React from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { html } from '@codemirror/lang-html'
import { saveCodeSnapshotAction } from '../server/actions'
import { useTranslations } from 'next-intl'
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react'

interface CodeEditorProps {
  stepId: string
  initialCode: string
  onChange: (code: string) => void
}

type SaveState = 'idle' | 'saving' | 'saved' | 'error'

export function CodeEditor({ stepId, initialCode, onChange }: CodeEditorProps) {
  const t = useTranslations('Editor') // Fallbacks used inline for now
  const [code, setCode] = React.useState(initialCode)
  const [saveState, setSaveState] = React.useState<SaveState>('idle')

  // Debounced autosave ref
  const saveTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const handleCodeChange = React.useCallback((value: string) => {
    setCode(value)
    onChange(value)
    setSaveState('saving')

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    // RULE-011: Debounced server roundtrip to persist code
    saveTimeoutRef.current = setTimeout(async () => {
      const result = await saveCodeSnapshotAction({ stepId, code: value })
      if (result.ok) {
        setSaveState('saved')
      } else {
        setSaveState('error')
      }
    }, 1500)
  }, [stepId, onChange])

  React.useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    }
  }, [])

  return (
    <div className="flex flex-col w-full h-full border rounded-xl overflow-hidden bg-white shadow-sm border-[var(--surface-variant)]">
      <div className="flex justify-between items-center px-4 py-2 bg-[var(--surface-variant)] border-b border-[var(--surface-variant)]">
        <span className="text-sm font-mono font-medium text-gray-700">index.html</span>
        <div className="flex items-center text-xs">
          {saveState === 'saving' && (
            <span className="flex items-center text-gray-500">
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
              {t('saving') || 'Saving...'}
            </span>
          )}
          {saveState === 'saved' && (
            <span className="flex items-center text-[var(--success)]">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              {t('saved') || 'Saved'}
            </span>
          )}
          {saveState === 'error' && (
            <span className="flex items-center text-[var(--error)]">
              <AlertCircle className="w-3 h-3 mr-1" />
              {t('error') || 'Save failed'}
            </span>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <CodeMirror
          value={code}
          height="100%"
          extensions={[html()]}
          onChange={handleCodeChange}
          theme="light" // Could be dynamic based on next-themes later
          className="h-full text-base"
        />
      </div>
    </div>
  )
}
