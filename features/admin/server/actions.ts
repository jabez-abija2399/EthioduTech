// @ts-nocheck
/* eslint-disable */
'use server'

import { createClient } from '@/lib/supabase/server'
import { ActionResult } from '@/lib/types'
import { z } from 'zod'

/**
 * Helper to ensure the caller is an admin.
 */
async function requireAdmin(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    throw new Error('Forbidden: Admin access required.')
  }

  return user
}

/**
 * Centralized audit logger (REQ-085).
 * ALL sensitive admin actions MUST call this before completing.
 */
async function logAuditAction(
  supabase: any, 
  actorId: string, 
  action: string, 
  targetId: string, 
  reason: string, 
  details: Record<string, any>
) {
  const { error } = await supabase
    .from('audit_logs')
    .insert({
      actor_id: actorId,
      action_type: action,
      target_id: targetId,
      reason,
      details
    })

  if (error) {
    throw new Error(`Failed to write audit log: ${error.message}`)
  }
}

const roleSchema = z.object({
  targetUserId: z.string().uuid(),
  newRole: z.enum(['student', 'instructor', 'parent', 'admin']),
  auditReason: z.string().min(10, 'A reason of at least 10 characters is required for the audit log.')
})

/**
 * Changes a user's role and writes an audit log (REQ-079).
 */
export async function changeUserRoleAction(input: z.infer<typeof roleSchema>): Promise<ActionResult<{ success: true }>> {
  const validated = roleSchema.safeParse(input)
  if (!validated.success) return { ok: false, code: 'validation_error', message: validated.error.errors[0].message }

  const supabase = await createClient()
  try {
    const adminUser = await requireAdmin(supabase)
    const { targetUserId, newRole, auditReason } = validated.data

    // In Supabase, if we are doing this strictly, we'd need Service Role to update `auth.users` metadata, 
    // but for our spec, roles live in `profiles`. RLS policy on `profiles` must allow admin updates.
    
    // 1. Write the audit log FIRST (or in a transaction if possible)
    await logAuditAction(supabase, adminUser.id, 'CHANGE_ROLE', targetUserId, auditReason, { newRole })

    // 2. Update the profile
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', targetUserId)

    if (error) throw new Error(error.message)

    return { ok: true, data: { success: true } }
  } catch (e: any) {
    return { ok: false, code: 'admin_error', message: e.message }
  }
}

/**
 * Fetches the safety queue for the admin dashboard (REQ-076).
 */
export async function getSafetyQueueAction(): Promise<ActionResult<any[]>> {
  const supabase = await createClient()
  try {
    await requireAdmin(supabase)
    
    // Mock queue for MVP UI
    const mockQueue = [
      { id: 'alert-1', studentName: 'Selam', type: 'Distress Keyword', context: 'kill myself', status: 'pending', createdAt: new Date().toISOString() },
      { id: 'alert-2', studentName: 'Abebe', type: 'User Report', context: 'Inappropriate project submission', status: 'pending', createdAt: new Date(Date.now() - 3600000).toISOString() },
    ]

    return { ok: true, data: mockQueue }
  } catch (e: any) {
    return { ok: false, code: 'admin_error', message: e.message }
  }
}

const resolveSafetySchema = z.object({
  alertId: z.string(),
  auditReason: z.string().min(10, 'A reason is required to close a safety alert.')
})

/**
 * Resolves a safety alert and audits it.
 */
export async function resolveSafetyAlertAction(input: z.infer<typeof resolveSafetySchema>): Promise<ActionResult<{ success: true }>> {
  const validated = resolveSafetySchema.safeParse(input)
  if (!validated.success) return { ok: false, code: 'validation_error', message: validated.error.errors[0].message }

  const supabase = await createClient()
  try {
    const adminUser = await requireAdmin(supabase)
    const { alertId, auditReason } = validated.data

    await logAuditAction(supabase, adminUser.id, 'RESOLVE_SAFETY_ALERT', alertId, auditReason, {})

    // Assume an `admin_safety_queue` table exists in a real build
    // For MVP, just return success
    return { ok: true, data: { success: true } }
  } catch (e: any) {
    return { ok: false, code: 'admin_error', message: e.message }
  }
}
