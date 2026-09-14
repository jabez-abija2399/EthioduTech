import { createClient } from '@supabase/supabase-js'

if (typeof globalThis !== 'undefined' && typeof globalThis.WebSocket === 'undefined') {
  globalThis.WebSocket = class {
    close() {}
    send() {}
    addEventListener() {}
    removeEventListener() {}
  } as any
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jtryfbeyftnqusuvwljt.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_76x0j6iJTjb7rZ7PNbcwTw_3prHleUj'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
  },
})

export async function syncProgressToSupabase(studentId: string, lessonId: string, status: string) {
  try {
    const { data, error } = await supabase
      .from('student_progress')
      .upsert({
        student_id: studentId,
        lesson_id: lessonId,
        status,
        updated_at: new Date().toISOString(),
      })

    if (error) {
      console.warn('Supabase cloud sync warning:', error.message)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Cloud sync failed.' }
  }
}
