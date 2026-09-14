'use server'

import { createClient } from '@/lib/supabase/server'
import { ActionResult } from '@/lib/types'
import { z } from 'zod'

const redeemSchema = z.object({
  linkCode: z.string().length(6)
})

/**
 * Parent redeems a student's link code.
 * This creates a PENDING link in the database, which the student must confirm.
 */
export async function redeemStudentCodeAction(input: z.infer<typeof redeemSchema>): Promise<ActionResult<{ success: true }>> {
  const validated = redeemSchema.safeParse(input)
  if (!validated.success) return { ok: false, code: 'validation_error', message: 'Invalid code format.' }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, code: 'unauthorized', message: 'Sign-in required.' }

  const { linkCode } = validated.data

  // 1. Find the student who generated this code. 
  // (Assuming 'current_link_code' is stored on the profile for this MVP)
  const { data: student, error: lookupError } = await supabase
    .from('profiles')
    .select('id')
    .eq('current_link_code', linkCode.toUpperCase())
    .eq('role', 'student')
    .maybeSingle()

  if (lookupError || !student) {
    return { ok: false, code: 'invalid_code', message: 'Code not found or expired.' }
  }

  // 2. Create the pending link
  const { error: insertError } = await supabase
    .from('parent_student_links')
    .insert({
      parent_id: user.id,
      student_id: student.id,
      status: 'pending',
      consent_granted: false // Consent cannot be granted until confirmed by student
    })

  if (insertError) {
    // Unique constraint violation (already linked)
    if (insertError.code === '23505') {
      return { ok: false, code: 'already_linked', message: 'You have already linked to this student.' }
    }
    return { ok: false, code: 'db_error', message: 'Failed to create link request.' }
  }

  // 3. Clear the code so it can't be reused
  await supabase.from('profiles').update({ current_link_code: null }).eq('id', student.id)

  return { ok: true, data: { success: true } }
}

const consentSchema = z.object({
  studentId: z.string().uuid(),
  consentGranted: z.boolean()
})

/**
 * Parent toggles the blanket portfolio consent for a confirmed student.
 */
export async function toggleGlobalConsentAction(input: z.infer<typeof consentSchema>): Promise<ActionResult<{ success: true }>> {
  const validated = consentSchema.safeParse(input)
  if (!validated.success) return { ok: false, code: 'validation_error', message: 'Invalid payload.' }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, code: 'unauthorized', message: 'Sign-in required.' }

  const { studentId, consentGranted } = validated.data

  // Update consent ONLY if the link is confirmed
  const { error } = await supabase
    .from('parent_student_links')
    .update({ consent_granted: consentGranted })
    .eq('parent_id', user.id)
    .eq('student_id', studentId)
    .eq('status', 'confirmed')

  if (error) return { ok: false, code: 'db_error', message: 'Failed to update consent. Link may not be confirmed yet.' }

  return { ok: true, data: { success: true } }
}
