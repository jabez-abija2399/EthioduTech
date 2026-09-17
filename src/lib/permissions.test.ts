import { describe, it, expect } from 'vitest';
import {
  hasPermission,
  isRouteAllowedForRole,
  getRoleLandingPage,
  getNavItemsForRole
} from './permissions';

describe('Permissions Logic', () => {
  describe('hasPermission()', () => {
    it('returns true for STUDENT with VIEW_COURSES', () => {
      expect(hasPermission('STUDENT', 'VIEW_COURSES')).toBe(true);
    });

    it('returns false for STUDENT with VIEW_TEACHER_ROSTER', () => {
      expect(hasPermission('STUDENT', 'VIEW_TEACHER_ROSTER')).toBe(false);
    });

    it('returns true for ADMIN with VIEW_TEACHER_ROSTER', () => {
      expect(hasPermission('ADMIN', 'VIEW_TEACHER_ROSTER')).toBe(true);
    });

    it('handles null/undefined roles by defaulting to STUDENT', () => {
      expect(hasPermission(null, 'VIEW_COURSES')).toBe(true);
      expect(hasPermission(undefined, 'VIEW_TEACHER_ROSTER')).toBe(false);
    });
  });

  describe('isRouteAllowedForRole()', () => {
    it('allows students to access /dashboard and /courses', () => {
      expect(isRouteAllowedForRole('/dashboard', 'STUDENT')).toBe(true);
      expect(isRouteAllowedForRole('/courses/123', 'STUDENT')).toBe(true);
    });

    it('blocks students from accessing /teacher and /admin', () => {
      expect(isRouteAllowedForRole('/teacher', 'STUDENT')).toBe(false);
      expect(isRouteAllowedForRole('/admin', 'STUDENT')).toBe(false);
    });

    it('allows teachers to access /teacher but blocks /admin', () => {
      expect(isRouteAllowedForRole('/teacher', 'TEACHER')).toBe(true);
      expect(isRouteAllowedForRole('/admin', 'TEACHER')).toBe(false);
    });

    it('allows admins to access all routes', () => {
      expect(isRouteAllowedForRole('/teacher', 'ADMIN')).toBe(true);
      expect(isRouteAllowedForRole('/admin', 'ADMIN')).toBe(true);
      expect(isRouteAllowedForRole('/dashboard', 'ADMIN')).toBe(true);
    });

    it('always allows public routes regardless of role', () => {
      expect(isRouteAllowedForRole('/', 'STUDENT')).toBe(true);
      expect(isRouteAllowedForRole('/login', 'STUDENT')).toBe(true);
      expect(isRouteAllowedForRole('/api/auth/callback', 'STUDENT')).toBe(true);
    });
  });

  describe('getRoleLandingPage()', () => {
    it('returns /dashboard for STUDENT', () => {
      expect(getRoleLandingPage('STUDENT')).toBe('/dashboard');
    });

    it('returns /teacher for TEACHER', () => {
      expect(getRoleLandingPage('TEACHER')).toBe('/teacher');
    });

    it('returns /admin for SUPER_ADMIN', () => {
      expect(getRoleLandingPage('SUPER_ADMIN')).toBe('/admin');
    });
  });

  describe('getNavItemsForRole()', () => {
    it('returns student nav items including showcase if studentId provided', () => {
      const items = getNavItemsForRole('STUDENT', 'std-123');
      expect(items.length).toBe(2);
      expect(items[1].href).toBe('/portfolio/std-123');
    });

    it('returns admin nav items with multiple views', () => {
      const items = getNavItemsForRole('ADMIN');
      expect(items.length).toBe(4);
      expect(items[0].href).toBe('/admin');
    });
  });
});
