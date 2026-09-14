export type ActionResult<T> = 
  | { ok: true; data: T }
  | { ok: false; code: string; message: string };

export type UserRole = 'student' | 'instructor' | 'parent' | 'admin';

export interface Profile {
  id: string;
  role: UserRole;
  display_name: string;
  locale: string;
  grade_band?: string;
  created_at: string;
}
