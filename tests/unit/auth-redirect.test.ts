import { describe, it, expect } from 'vitest'
import { getRedirectPath } from '../../src/lib/auth-redirect'

describe('Auth Redirect Utility Suite', () => {
  it('should redirect TEACHER and ADMIN to /teacher', () => {
    expect(getRedirectPath('TEACHER')).toBe('/teacher')
    expect(getRedirectPath('ADMIN')).toBe('/teacher')
    expect(getRedirectPath('teacher')).toBe('/teacher')
  })

  it('should redirect PARENT to /parent', () => {
    expect(getRedirectPath('PARENT')).toBe('/parent')
    expect(getRedirectPath('parent')).toBe('/parent')
  })

  it('should redirect STUDENT or empty role to /dashboard', () => {
    expect(getRedirectPath('STUDENT')).toBe('/dashboard')
    expect(getRedirectPath('')).toBe('/dashboard')
    expect(getRedirectPath(null)).toBe('/dashboard')
    expect(getRedirectPath(undefined)).toBe('/dashboard')
  })

  it('should prioritize valid relative callbackUrl over role default', () => {
    expect(getRedirectPath('TEACHER', '/courses/c1/lessons/l1')).toBe('/courses/c1/lessons/l1')
    expect(getRedirectPath('STUDENT', '/portfolio/s1')).toBe('/portfolio/s1')
  })

  it('should ignore callbackUrl if it points to auth routes or external sites', () => {
    expect(getRedirectPath('TEACHER', '/login')).toBe('/teacher')
    expect(getRedirectPath('STUDENT', '/register')).toBe('/dashboard')
    expect(getRedirectPath('PARENT', 'https://malicious.com')).toBe('/parent')
  })
})
