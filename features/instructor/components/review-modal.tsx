/* eslint-disable */
'use client'

import * as React from 'react'
import { submitReviewAction } from '@/features/instructor/server/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { X } from 'lucide-react'

interface ReviewModalProps {
  submissionId: string
  studentName: string
  projectName: string
  onClose: () => void
  onSuccess: () => void
}

export function ReviewModal({ submissionId, studentName, projectName, onClose, onSuccess }: ReviewModalProps) {
  const [rubric, setRubric] = React.useState({
    logic: 0,
    creativity: 0,
    design: 0,
    codeQuality: 0,
    effort: 0,
  })
  const [feedback, setFeedback] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Is it complete? (All dimensions scored > 0)
  const isRubricComplete = Object.values(rubric).every(val => val > 0)

  const handleSubmit = async (status: 'approved' | 'needs_changes') => {
    setIsSubmitting(true)
    const result = await submitReviewAction({
      submissionId,
      rubric,
      feedback,
      status
    })

    if (result.ok) {
      onSuccess()
    } else {
      alert(result.message)
      setIsSubmitting(false)
    }
  }

  const renderRubricRow = (key: keyof typeof rubric, label: string) => (
    <div className="flex items-center justify-between py-2 border-b border-[var(--surface-variant)] last:border-0">
      <span className="text-sm font-medium w-1/3">{label}</span>
      <div className="flex gap-2 flex-1 justify-end">
        {[1, 2, 3, 4].map(score => (
          <button
            key={score}
            type="button"
            onClick={() => setRubric(prev => ({ ...prev, [key]: score }))}
            className={`w-8 h-8 rounded-full text-xs font-semibold flex items-center justify-center transition-colors ${
              rubric[key] === score 
                ? 'bg-[var(--primary)] text-[var(--on-primary)]' 
                : 'bg-[var(--surface-variant)] text-gray-600 hover:bg-gray-300'
            }`}
          >
            {score}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b border-[var(--surface-variant)] bg-[var(--surface)]">
          <div>
            <h2 className="text-lg font-bold">Review: {projectName}</h2>
            <p className="text-sm text-gray-500">Student: {studentName}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <h3 className="font-semibold mb-3">5-Dimension Rubric (0-4)</h3>
            <div className="bg-[var(--surface)] border border-[var(--surface-variant)] rounded-lg p-4">
              {renderRubricRow('logic', 'Logic & Problem Solving')}
              {renderRubricRow('creativity', 'Creativity')}
              {renderRubricRow('design', 'UI / Design')}
              {renderRubricRow('codeQuality', 'Code Quality & Organization')}
              {renderRubricRow('effort', 'Effort & Persistence')}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Written Feedback</h3>
            <textarea
              className="w-full min-h-[100px] p-3 border border-[var(--surface-variant)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm"
              placeholder="Provide constructive, encouraging feedback..."
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
            />
          </div>
        </div>

        <div className="p-4 border-t border-[var(--surface-variant)] bg-[var(--surface)] flex justify-end gap-3">
          <Button 
            variant="secondary" 
            onClick={() => handleSubmit('needs_changes')} 
            disabled={isSubmitting || feedback.trim().length === 0}
          >
            Needs Changes
          </Button>
          <Button 
            variant="primary" 
            onClick={() => handleSubmit('approved')}
            disabled={isSubmitting || !isRubricComplete}
            title={!isRubricComplete ? 'Complete the rubric to approve' : ''}
          >
            Approve Project
          </Button>
        </div>
      </Card>
    </div>
  )
}
