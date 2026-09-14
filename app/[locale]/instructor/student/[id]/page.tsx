/* eslint-disable */
'use client'

import * as React from 'react'
import { getStudentDetailAction } from '@/features/instructor/server/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import { User, Activity, StickyNote, AlertTriangle } from 'lucide-react'

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  const t = useTranslations('Instructor') // using fallback strings inline
  const [student, setStudent] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    async function loadStudent() {
      setIsLoading(true)
      const result = await getStudentDetailAction({ studentId: params.id })
      if (result.ok) {
        setStudent(result.data)
      } else {
        setError(result.message)
      }
      setIsLoading(false)
    }
    loadStudent()
  }, [params.id])

  if (isLoading) return <div className="p-8 text-center animate-pulse">Loading student profile...</div>

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="bg-[var(--error-container)] text-[var(--on-error-container)] p-6 rounded-xl flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-bold mb-2">Access Denied</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!student) return null

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
      <div className="flex items-center gap-4 border-b border-[var(--surface-variant)] pb-6">
        <div className="w-16 h-16 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full flex items-center justify-center">
          <User className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">{student.name}</h1>
          <p className="text-gray-500">Cohort Member</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-[var(--primary)]" />
              Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall Completion</span>
                  <span className="font-bold">{student.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[var(--primary)] h-2 rounded-full" style={{ width: `${student.progress}%` }}></div>
                </div>
              </div>
              <p className="text-sm text-gray-600 bg-[var(--surface-variant)] p-3 rounded-md">
                <strong>Recent Activity:</strong> {student.recentActivity}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <StickyNote className="w-5 h-5 text-yellow-600" />
              Private Instructor Notes
            </CardTitle>
            <CardDescription>
              Visible only to instructors and admins.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full min-h-[120px] p-3 border border-[var(--surface-variant)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm bg-yellow-50/50"
              placeholder="Add a private note about this student's progress or needs..."
              defaultValue={student.privateNotes}
            />
            <div className="flex justify-end mt-2">
              <Button size="sm">Save Note</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
