import { describe, it, expect } from 'vitest';
import { getRedirectPath } from './auth-redirect';

describe('Auth Redirect Logic', () => {
  it('redirects STUDENT to /dashboard by default', () => {
    expect(getRedirectPath('STUDENT')).toBe('/dashboard');
  });

  it('redirects TEACHER to /teacher by default', () => {
    expect(getRedirectPath('TEACHER')).toBe('/teacher');
  });

  it('honors callbackUrl if it is a safe internal path', () => {
    expect(getRedirectPath('STUDENT', '/courses/123')).toBe('/courses/123');
  });

  it('ignores callbackUrl if it points back to auth pages to prevent loops', () => {
    expect(getRedirectPath('STUDENT', '/login')).toBe('/dashboard');
    expect(getRedirectPath('TEACHER', '/register')).toBe('/teacher');
  });

  it('ignores callbackUrl if it is external', () => {
    expect(getRedirectPath('STUDENT', 'https://malicious.com')).toBe('/dashboard');
  });
});
