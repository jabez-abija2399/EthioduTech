/* eslint-disable */
'use client'

import * as React from 'react'
import { generateLinkCodeAction, confirmParentLinkAction } from '@/features/student/server/actions'
import { VisibilityToggle } from '@/features/portfolio/components/visibility-toggle'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import { Users, Code2, AlertTriangle, ShieldCheck } from 'lucide-react'

// Mock initial state for MVP
const MOCK_PORTFOLIO = [
  { id: 'proj-1', title: 'Interactive Story', isPublic: false },
]

export default function StudentDashboard() {
  const t = useTranslations('Student')
  const [linkCode, setLinkCode] = React.useState<string | null>(null)
  const [isGenerating, setIsGenerating] = React.useState(false)
  
  // Mock state for link request & consent
  const [hasPendingRequest, setHasPendingRequest] = React.useState(true) // Set true to test UI
  const [isConfirming, setIsConfirming] = React.useState(false)
  const [parentLinked, setParentLinked] = React.useState(false)
  const [guardianConsent, setGuardianConsent] = React.useState(true) // Set true to allow toggle testing

  const handleGenerate = async () => {
    setIsGenerating(true)
    const result = await generateLinkCodeAction()
    if (result.ok) {
      setLinkCode(result.data.linkCode)
    }
    setIsGenerating(false)
  }

  const handleConfirm = async () => {
    setIsConfirming(true)
    // Pass mock UUID
    const result = await confirmParentLinkAction({ linkId: '00000000-0000-0000-0000-000000000000' })
    if (result.ok) {
      setHasPendingRequest(false)
      setParentLinked(true)
    }
    setIsConfirming(false)
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
      <h1 className="text-3xl font-bold text-[var(--foreground)]">{t('title') || 'My Dashboard'}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Settings / Parent Link */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[var(--primary)]" />
                {t('parentLink') || 'Parent / Guardian Link'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {parentLinked ? (
                <div className="flex items-center gap-2 text-[var(--success)] bg-[var(--success)]/10 p-4 rounded-lg">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-medium">Linked to Parent</span>
                </div>
              ) : hasPendingRequest ? (
                <div className="p-4 border border-[var(--warning)] bg-[var(--warning)]/10 rounded-lg space-y-3">
                  <div className="flex items-center gap-2 text-[var(--warning)]">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-semibold">Pending Link Request</span>
                  </div>
                  <p className="text-sm">A parent has requested to link to your account to view your progress.</p>
                  <Button variant="primary" onClick={handleConfirm} isLoading={isConfirming}>
                    Approve Link
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Generate a secure 6-letter code to share with your parent or guardian. They can use it to view your progress.
                  </p>
                  {linkCode ? (
                    <div className="p-4 bg-[var(--surface-variant)] text-center rounded-lg">
                      <span className="text-2xl font-mono tracking-widest text-[var(--primary)]">{linkCode}</span>
                    </div>
                  ) : (
                    <Button onClick={handleGenerate} isLoading={isGenerating}>
                      Generate Code
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Portfolio */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[var(--primary)]" />
                {t('portfolio') || 'My Portfolio'}
              </CardTitle>
              <CardDescription>
                Manage the visibility of your completed capstone projects.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {MOCK_PORTFOLIO.map(proj => (
                <div key={proj.id} className="p-4 border border-[var(--surface-variant)] rounded-lg space-y-4">
                  <h3 className="font-semibold text-lg">{proj.title}</h3>
                  <VisibilityToggle 
                    projectId={proj.id} 
                    initialIsPublic={proj.isPublic} 
                    hasGuardianConsent={guardianConsent && parentLinked} 
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
