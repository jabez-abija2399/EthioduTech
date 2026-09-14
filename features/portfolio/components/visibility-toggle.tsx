/* eslint-disable */
'use client'

import * as React from 'react'
import { Switch } from '@/components/ui/switch' // We need to build this or just use a checkbox
import { updateProjectVisibilityAction } from '@/features/student/server/actions'
import { Lock, Globe, ShieldAlert } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface VisibilityToggleProps {
  projectId: string
  initialIsPublic: boolean
  hasGuardianConsent: boolean
}

export function VisibilityToggle({ projectId, initialIsPublic, hasGuardianConsent }: VisibilityToggleProps) {
  const t = useTranslations('Portfolio') // Fallbacks inline
  const [isPublic, setIsPublic] = React.useState(initialIsPublic)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked
    setIsPublic(newValue)
    setIsLoading(true)
    setError(null)

    const result = await updateProjectVisibilityAction({ projectId, isPublic: newValue })
    if (!result.ok) {
      setIsPublic(!newValue) // revert on fail
      setError(result.message)
    }
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col items-start gap-2 p-4 bg-[var(--surface)] border border-[var(--surface-variant)] rounded-lg">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          {isPublic ? <Globe className="w-4 h-4 text-[var(--success)]" /> : <Lock className="w-4 h-4 text-gray-500" />}
          <span className="font-medium text-sm">
            {isPublic ? (t('visibilityPublic') || 'Public (Anyone can view)') : (t('visibilityPrivate') || 'Private (Only you can view)')}
          </span>
        </div>
        
        {/* Simple checkbox acting as a toggle for MVP */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={isPublic}
            onChange={handleToggle}
            disabled={(!hasGuardianConsent && !isPublic) || isLoading}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--primary)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)] peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
        </label>
      </div>

      {!hasGuardianConsent && (
        <div className="flex items-start gap-2 mt-2 text-xs text-[var(--on-error-container)] bg-[var(--error-container)] p-2 rounded-md">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <p>{t('consentRequiredMessage') || 'You cannot make this project public until your parent or guardian has linked to your account and granted sharing consent.'}</p>
        </div>
      )}
      
      {error && (
        <p className="text-xs text-[var(--error)]">{error}</p>
      )}
    </div>
  )
}
