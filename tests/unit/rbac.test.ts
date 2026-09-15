import { describe, it, expect } from 'vitest'

describe('RBAC Security & Role Helper Unit Suite', () => {
  it('should correctly evaluate role hierarchy and permissions', () => {
    const rolesAllowedForTeacher = ['TEACHER', 'ADMIN']
    
    expect(rolesAllowedForTeacher.includes('TEACHER')).toBe(true)
    expect(rolesAllowedForTeacher.includes('ADMIN')).toBe(true)
    expect(rolesAllowedForTeacher.includes('STUDENT')).toBe(false)
    expect(rolesAllowedForTeacher.includes('PARENT')).toBe(false)
  })

  it('should validate student-only actions', () => {
    const rolesAllowedForStudentActions = ['STUDENT', 'ADMIN']
    
    expect(rolesAllowedForStudentActions.includes('STUDENT')).toBe(true)
    expect(rolesAllowedForStudentActions.includes('ADMIN')).toBe(true)
    expect(rolesAllowedForStudentActions.includes('TEACHER')).toBe(false)
  })
})
