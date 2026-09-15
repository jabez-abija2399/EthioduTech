import { describe, it, expect } from 'vitest'
import {
  isRouteAllowedForRole,
  getRoleLandingPage,
  getNavItemsForRole,
  hasPermission
} from '../../src/lib/permissions'

describe('Centralized Permission Engine Unit Suite', () => {
  it('should enforce strict route boundaries for STUDENT', () => {
    expect(isRouteAllowedForRole('/dashboard', 'STUDENT')).toBe(true)
    expect(isRouteAllowedForRole('/courses/c1/lessons/l1', 'STUDENT')).toBe(true)
    expect(isRouteAllowedForRole('/portfolio/s1', 'STUDENT')).toBe(true)
    expect(isRouteAllowedForRole('/teacher', 'STUDENT')).toBe(false)
    expect(isRouteAllowedForRole('/parent', 'STUDENT')).toBe(false)
    expect(isRouteAllowedForRole('/admin', 'STUDENT')).toBe(false)
  })

  it('should enforce strict route boundaries for TEACHER', () => {
    expect(isRouteAllowedForRole('/teacher', 'TEACHER')).toBe(true)
    expect(isRouteAllowedForRole('/courses/c1/lessons/l1', 'TEACHER')).toBe(true)
    expect(isRouteAllowedForRole('/parent', 'TEACHER')).toBe(false)
    expect(isRouteAllowedForRole('/admin', 'TEACHER')).toBe(false)
  })

  it('should enforce strict route boundaries for PARENT', () => {
    expect(isRouteAllowedForRole('/parent', 'PARENT')).toBe(true)
    expect(isRouteAllowedForRole('/portfolio/s1', 'PARENT')).toBe(true)
    expect(isRouteAllowedForRole('/teacher', 'PARENT')).toBe(false)
    expect(isRouteAllowedForRole('/admin', 'PARENT')).toBe(false)
    expect(isRouteAllowedForRole('/dashboard', 'PARENT')).toBe(false)
  })

  it('should allow ADMIN and SUPER_ADMIN access to all system routes', () => {
    expect(isRouteAllowedForRole('/admin', 'ADMIN')).toBe(true)
    expect(isRouteAllowedForRole('/teacher', 'ADMIN')).toBe(true)
    expect(isRouteAllowedForRole('/parent', 'ADMIN')).toBe(true)
    expect(isRouteAllowedForRole('/dashboard', 'ADMIN')).toBe(true)

    expect(isRouteAllowedForRole('/admin', 'SUPER_ADMIN')).toBe(true)
    expect(isRouteAllowedForRole('/teacher', 'SUPER_ADMIN')).toBe(true)
    expect(isRouteAllowedForRole('/parent', 'SUPER_ADMIN')).toBe(true)
  })

  it('should resolve correct role landing pages', () => {
    expect(getRoleLandingPage('STUDENT')).toBe('/dashboard')
    expect(getRoleLandingPage('TEACHER')).toBe('/teacher')
    expect(getRoleLandingPage('PARENT')).toBe('/parent')
    expect(getRoleLandingPage('ADMIN')).toBe('/admin')
    expect(getRoleLandingPage('SUPER_ADMIN')).toBe('/admin')
  })

  it('should generate strictly role-isolated navigation items', () => {
    const studentNav = getNavItemsForRole('STUDENT')
    const teacherNav = getNavItemsForRole('TEACHER')
    const parentNav = getNavItemsForRole('PARENT')
    const adminNav = getNavItemsForRole('ADMIN')

    // Student nav should NOT contain teacher, parent, or admin links
    expect(studentNav.some(item => item.href === '/teacher')).toBe(false)
    expect(studentNav.some(item => item.href === '/parent')).toBe(false)
    expect(studentNav.some(item => item.href === '/admin')).toBe(false)

    // Teacher nav should NOT contain parent or admin links
    expect(teacherNav.some(item => item.href === '/parent')).toBe(false)
    expect(teacherNav.some(item => item.href === '/admin')).toBe(false)

    // Parent nav should NOT contain teacher, dashboard, or admin links
    expect(parentNav.some(item => item.href === '/teacher')).toBe(false)
    expect(parentNav.some(item => item.href === '/admin')).toBe(false)

    // Admin nav should contain admin link
    expect(adminNav.some(item => item.href === '/admin')).toBe(true)
  })

  it('should check atomic permissions correctly', () => {
    expect(hasPermission('STUDENT', 'PUBLISH_PORTFOLIO')).toBe(true)
    expect(hasPermission('TEACHER', 'PUBLISH_PORTFOLIO')).toBe(false)
    expect(hasPermission('TEACHER', 'VIEW_TEACHER_ROSTER')).toBe(true)
    expect(hasPermission('STUDENT', 'VIEW_TEACHER_ROSTER')).toBe(false)
    expect(hasPermission('PARENT', 'VIEW_PARENT_CHILDREN')).toBe(true)
    expect(hasPermission('SUPER_ADMIN', 'ACCESS_ADMIN_PORTAL')).toBe(true)
  })
})
