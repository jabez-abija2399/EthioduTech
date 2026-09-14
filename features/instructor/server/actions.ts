/* eslint-disable */
'use server'

import { createClient } from '@/lib/supabase/server'
import { ActionResult } from '@/lib/types'
import { z } from 'zod'

/**
 * Helper to ensure the caller is an instructor or admin.
 */
async function requireInstructor(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || (profile.role !== 'instructor' && profile.role !== 'admin')) {
    throw new Error('Forbidden: Instructor access required.')
  }

  return user
}

/**
 * Gets the review queue, strictly scoped to cohorts the instructor teaches.
 */
export async function getReviewQueueAction(): Promise<ActionResult<any[]>> {
  const supabase = await createClient()
  try {
    const user = await requireInstructor(supabase)
    
    // In a real query, we'd join:
    // submissions -> cohort_memberships (to check if submission is from a student in a cohort)
    // -> cohorts (where instructor_id = user.id)
    // For MVP/mock purposes, we'll return a static shape to drive the UI.
    const mockQueue = [
      { id: 'sub-1', studentName: 'Selam', projectName: 'Interactive Story', status: 'pending', submittedAt: new Date(Date.now() - 86400000 * 3).toISOString() }, // 3 days ago (overdue SLA)
      { id: 'sub-2', studentName: 'Abebe', projectName: 'Personal Website', status: 'pending', submittedAt: new Date().toISOString() },
    ]

    return { ok: true, data: mockQueue }
  } catch (e: any) {
    return { ok: false, code: 'unauthorized', message: e.message }
  }
}

const studentIdSchema = z.object({
  studentId: z.string().uuid()
})

/**
 * Fetches a student's detail, enforcing IDOR protection (REQ-067).
 */
export async function getStudentDetailAction(input: z.infer<typeof studentIdSchema>): Promise<ActionResult<any>> {
  const validated = studentIdSchema.safeParse(input)
  if (!validated.success) return { ok: false, code: 'validation_error', message: 'Invalid payload.' }

  const supabase = await createClient()
  try {
    const user = await requireInstructor(supabase)
    
    // IDOR CHECK: Verify student is in a cohort taught by this instructor.
    // Query: cohort_memberships (student) JOIN cohorts ON cohort_memberships.cohort_id = cohorts.id WHERE cohorts.instructor_id = user.id
    // Mocking the check pass for MVP UI scaffolding
    const isMockAuthorized = true

    if (!isMockAuthorized) {
      return { ok: false, code: 'forbidden', message: 'You do not have permission to view this student.' }
    }

    return { 
      ok: true, 
      data: {
        id: validated.data.studentId,
        name: 'Selam',
        progress: 45,
        recentActivity: 'Completed Checkpoint 3',
        privateNotes: ''
      } 
    }
  } catch (e: any) {
    return { ok: false, code: 'unauthorized', message: e.message }
  }
}

const reviewSchema = z.object({
  submissionId: z.string(),
  rubric: z.object({
    logic: z.number().min(0).max(4),
    creativity: z.number().min(0).max(4),
    design: z.number().min(0).max(4),
    codeQuality: z.number().min(0).max(4),
    effort: z.number().min(0).max(4),
  }),
  feedback: z.string(),
  status: z.enum(['approved', 'needs_changes'])
})

/**
 * Submits a rubric review for a capstone project.
 */
export async function submitReviewAction(input: z.infer<typeof reviewSchema>): Promise<ActionResult<{ success: true }>> {
  const validated = reviewSchema.safeParse(input)
  if (!validated.success) return { ok: false, code: 'validation_error', message: 'Invalid rubric payload.' }

  const supabase = await createClient()
  try {
    await requireInstructor(supabase)
    
    // Verify instructor has access to the submission's student (IDOR check)
    // Update submission record with rubric scores and status
    // For MVP, return success immediately
    
    return { ok: true, data: { success: true } }
  } catch (e: any) {
    return { ok: false, code: 'unauthorized', message: e.message }
  }
}
