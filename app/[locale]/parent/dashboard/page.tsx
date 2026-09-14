// @ts-nocheck
/* eslint-disable */
'use client'

import * as React from 'react'
import { redeemStudentCodeAction, toggleGlobalConsentAction } from '@/features/parent/server/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import { Link2, ShieldCheck, ShieldAlert, Loader2 } from 'lucide-react'

// Mock initial state for MVP
const MOCK_LINK = {
  studentName: 'Selam',
  status: 'confirmed' as 'pending' | 'confirmed',
  consentGranted: false,
}

export default function ParentDashboard() {
  const t = useTranslations('Parent') // Fallbacks inline
  const [code, setCode] = React.useState('')
  const [isRedeeming, setIsRedeeming] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  
  // Local state for mock UI
  const [hasLink, setHasLink] = React.useState(false)
  const [consent, setConsent] = React.useState(MOCK_LINK.consentGranted)

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsRedeeming(true)
    setError(null)

    const result = await redeemStudentCodeAction({ linkCode: code })
    if (result.ok) {
      setHasLink(true)
    } else {
      setError(result.message)
    }
    setIsRedeeming(false)
  }

  const handleConsentToggle = async (granted: boolean) => {
    // In real app, we'd pass the actual student UUID
    const mockStudentId = '00000000-0000-0000-0000-000000000000' 
    const result = await toggleGlobalConsentAction({ studentId: mockStudentId, consentGranted: granted })
    if (result.ok) {
      setConsent(granted)
    } else {
      alert(result.message)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
      <h1 className="text-3xl font-bold text-[var(--foreground)]">{t('title') || 'Parent Portal'}</h1>

      {!hasLink ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link2 className="w-5 h-5 text-[var(--primary)]" />
              {t('linkChild') || 'Link to Your Child'}
            </CardTitle>
            <CardDescription>
              {t('linkDesc') || 'Ask your child to generate a 6-letter link code from their dashboard, and enter it below.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRedeem} className="flex gap-4 items-start max-w-sm">
              <Input 
                value={code} 
                onChange={e => setCode(e.target.value.toUpperCase())}
                placeholder="ABCDEF"
                maxLength={6}
                error={error || undefined}
                className="font-mono text-center tracking-widest uppercase"
              />
              <Button type="submit" isLoading={isRedeeming} disabled={code.length !== 6}>
                {t('submitCode') || 'Link'}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{MOCK_LINK.studentName}&apos;s Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start justify-between p-4 border border-[var(--surface-variant)] rounded-lg bg-[var(--surface)]">
              <div className="space-y-1 pr-6">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{t('portfolioConsent') || 'Public Portfolio Consent'}</h3>
                  {consent ? <ShieldCheck className="w-4 h-4 text-[var(--success)]" /> : <ShieldAlert className="w-4 h-4 text-gray-500" />}
                </div>
                <p className="text-sm text-gray-500">
                  {t('consentDesc') || 'Allow your child to publish their completed capstone projects to a public portfolio link. You can revoke this at any time.'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={consent}
                  onChange={(e) => handleConsentToggle(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--primary)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
              </label>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
