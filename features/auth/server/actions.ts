'use server'

import { createClient } from '@/lib/supabase/server'
import { ActionResult } from '@/lib/types'
import { z } from 'zod'

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  role: z.enum(['student', 'parent']),
  joinCode: z.string().optional(),
})

type SignUpInput = z.infer<typeof signUpSchema>

export async function signUpAction(input: SignUpInput): Promise<ActionResult<{ success: true }>> {
  const validated = signUpSchema.safeParse(input)
  if (!validated.success) {
    return { ok: false, code: 'validation_error', message: validated.error.issues[0]?.message }
  }

  const { email, password, name, role, joinCode } = validated.data
  const supabase = await createClient()

  let cohortId = null

  // 1. Validate join code FIRST (REQ-003, REQ-005)
  if (joinCode && joinCode.trim() !== '') {
    const { data: cohort, error: cohortError } = await supabase
      .from('cohorts')
      .select('id')
      .eq('join_code', joinCode.trim().toUpperCase())
      .maybeSingle()

    if (!cohort || cohortError) {
      return { ok: false, code: 'invalid_join_code', message: 'invalidJoinCode' }
    }
    cohortId = cohort.id
  }

  // 2. Create Auth Account
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError || !authData.user) {
    // If it's an email delivery failure, we log it heavily in dev (handled by Supabase or custom email provider later)
    return { ok: false, code: 'auth_error', message: authError?.message || 'Failed to create account.' }
  }

  const userId = authData.user.id

  // 3. Create Profile
  const { error: profileError } = await supabase.from('profiles').insert({
    id: userId,
    role,
    display_name: name,
    locale: 'en', // Default, updated in onboarding
  })

  if (profileError) {
    return { ok: false, code: 'profile_error', message: 'Failed to create user profile.' }
  }

  // 4. Create Cohort Membership (if applicable)
  if (cohortId) {
    const { error: membershipError } = await supabase.from('cohort_memberships').insert({
      cohort_id: cohortId,
      profile_id: userId,
      role_in_cohort: role === 'student' ? 'student' : 'parent', // Note: usually parents don't join cohorts directly, but modeling per specs
    })

    if (membershipError) {
      // RULE-010: Do not rollback on partial failure, report clearly.
      return { ok: false, code: 'membership_error', message: 'Account created, but failed to join cohort.' }
    }
  }

  return { ok: true, data: { success: true } }
}
