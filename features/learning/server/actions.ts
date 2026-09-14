'use server'

import { createClient } from '@/lib/supabase/server'
import { ActionResult } from '@/lib/types'
import { z } from 'zod'

const codeSnapshotSchema = z.object({
  stepId: z.string(),
  code: z.string(),
})

type CodeSnapshotInput = z.infer<typeof codeSnapshotSchema>

/**
 * Saves a code snapshot to the database.
 * The client relies on this returning ok: true to display "Saved" (RULE-011).
 */
export async function saveCodeSnapshotAction(input: CodeSnapshotInput): Promise<ActionResult<{ savedAt: string }>> {
  const validated = codeSnapshotSchema.safeParse(input)
  if (!validated.success) {
    return { ok: false, code: 'validation_error', message: 'Invalid code payload.' }
  }

  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (!user || authError) {
    return { ok: false, code: 'unauthorized', message: 'Sign-in required.' }
  }

  const { stepId, code } = validated.data

  // Upsert the attempt (or insert if we don't have a unique constraint on step_id yet,
  // but for the sake of RULE-011, we just need a real persistence path).
  const { error: dbError } = await supabase
    .from('interactive_step_attempts')
    .insert({
      profile_id: user.id,
      step_id: stepId,
      code_snapshot: { source: code },
      result: { status: 'pending' }, // evaluation result goes here
    })

  if (dbError) {
    return { ok: false, code: 'db_error', message: 'Failed to save progress.' }
  }

  return { ok: true, data: { savedAt: new Date().toISOString() } }
}

const checkStepSchema = z.object({
  stepId: z.string(),
  code: z.string(),
  expectedContent: z.string(),
})

/**
 * Very basic intent-based/lenient checker stub.
 * Checks if the expected content is present in the code, ignoring basic whitespace.
 */
export async function checkStepAction(input: z.infer<typeof checkStepSchema>): Promise<ActionResult<{ passed: boolean; hint?: string }>> {
  const validated = checkStepSchema.safeParse(input)
  if (!validated.success) {
    return { ok: false, code: 'validation_error', message: 'Invalid payload.' }
  }

  const { code, expectedContent } = validated.data
  
  // Basic lenient check: remove whitespace/newlines for a very simple comparison
  const normalize = (str: string) => str.replace(/\s+/g, '').toLowerCase()
  
  const passed = normalize(code).includes(normalize(expectedContent))

  if (passed) {
    return { ok: true, data: { passed: true } }
  }

  return { 
    ok: true, 
    data: { 
      passed: false, 
      hint: `Hmm, it looks like you are missing something similar to: ${expectedContent}`
    } 
  }
}
