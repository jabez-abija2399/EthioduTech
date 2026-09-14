/* eslint-disable */
'use client'

import * as React from 'react'
import { getReviewQueueAction } from '@/features/instructor/server/actions'
import { ReviewModal } from '@/features/instructor/components/review-modal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import { ClipboardList, AlertCircle, Clock } from 'lucide-react'

type QueueItem = {
  id: string
  studentName: string
  projectName: string
  status: string
  submittedAt: string
}

export default function InstructorDashboard() {
  const t = useTranslations('Instructor') // using fallback strings inline
  const [queue, setQueue] = React.useState<QueueItem[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [activeReview, setActiveReview] = React.useState<QueueItem | null>(null)

  const loadQueue = React.useCallback(async () => {
    setIsLoading(true)
    const result = await getReviewQueueAction()
    if (result.ok) {
      setQueue(result.data)
    }
    setIsLoading(false)
  }, [])

  React.useEffect(() => {
    loadQueue()
  }, [loadQueue])

  const handleReviewSuccess = () => {
    setActiveReview(null)
    loadQueue()
  }

  // SLA is 48 hours for example
  const isOverdue = (dateString: string) => {
    const submitDate = new Date(dateString)
    const now = new Date()
    const diffHours = (now.getTime() - submitDate.getTime()) / (1000 * 60 * 60)
    return diffHours > 48
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
      <h1 className="text-3xl font-bold text-[var(--foreground)]">{t('title') || 'Instructor Dashboard'}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Review Queue */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-[var(--primary)]" />
                {t('reviewQueue') || 'Capstone Review Queue'}
              </CardTitle>
              <CardDescription>
                Submissions from students in your assigned cohorts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="p-8 text-center text-gray-500 animate-pulse">Loading queue...</div>
              ) : queue.length === 0 ? (
                <div className="p-8 text-center text-gray-500 bg-[var(--surface-variant)] rounded-lg">
                  No pending submissions! Great job.
                </div>
              ) : (
                <div className="space-y-4">
                  {queue.map(item => {
                    const overdue = isOverdue(item.submittedAt)
                    return (
                      <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-[var(--surface-variant)] rounded-lg bg-[var(--surface)] hover:border-gray-300 transition-colors">
                        <div className="space-y-1 mb-4 sm:mb-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{item.projectName}</h3>
                            {overdue && (
                              <span className="flex items-center text-xs font-bold px-2 py-0.5 rounded-full bg-[var(--error-container)] text-[var(--on-error-container)] gap-1">
                                <AlertCircle className="w-3 h-3" /> Overdue SLA
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            Student: <span className="font-medium text-gray-900">{item.studentName}</span>
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Submitted {new Date(item.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <Button 
                          variant={overdue ? 'destructive' : 'primary'} 
                          onClick={() => setActiveReview(item)}
                        >
                          Review Now
                        </Button>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Alerts & Sessions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Stuck Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 text-sm text-gray-500 bg-[var(--surface-variant)] rounded-lg text-center">
                No students currently requesting help.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 text-sm text-gray-500 bg-[var(--surface-variant)] rounded-lg text-center">
                No sessions scheduled for today.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {activeReview && (
        <ReviewModal
          submissionId={activeReview.id}
          studentName={activeReview.studentName}
          projectName={activeReview.projectName}
          onClose={() => setActiveReview(null)}
          onSuccess={handleReviewSuccess}
        />
      )}
    </div>
  )
}
