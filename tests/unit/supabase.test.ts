import { describe, it, expect, beforeAll, vi } from 'vitest'

beforeAll(() => {
  if (typeof globalThis !== 'undefined' && typeof globalThis.WebSocket === 'undefined') {
    globalThis.WebSocket = class {
      close() {}
      send() {}
      addEventListener() {}
      removeEventListener() {}
    } as any
  }
})

import { supabase, syncProgressToSupabase } from '../../src/lib/supabase'

describe('Supabase Cloud Sync & Remote Database Engine', () => {
  it('should initialize Supabase client with project environment URL', () => {
    expect(supabase).toBeDefined()
    expect((supabase as any).supabaseUrl).toContain('supabase.co')
  })

  it('should handle cloud sync progress payload gracefully', async () => {
    // Mock Supabase table upsert response for unit testing
    vi.spyOn(supabase, 'from').mockReturnValue({
      upsert: vi.fn().mockResolvedValue({ data: { id: 'sync-1' }, error: null }),
    } as any)

    const result = await syncProgressToSupabase('student-test-1', 'lesson-html-1', 'COMPLETED')
    expect(result).toBeDefined()
    expect(result.success).toBe(true)
  })
})
