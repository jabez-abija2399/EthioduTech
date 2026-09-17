import { describe, it, expect, vi, beforeEach } from 'vitest';
import { completeLessonAction } from './progress';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// Mock dependencies
vi.mock('@/auth', () => ({
  auth: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: { findUnique: vi.fn(), create: vi.fn() },
    studentProfile: { findUnique: vi.fn(), create: vi.fn(), update: vi.fn() },
    progress: { findFirst: vi.fn(), create: vi.fn(), update: vi.fn() },
    badge: { findUnique: vi.fn() },
    studentBadge: { upsert: vi.fn() },
  },
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

vi.mock('@/lib/data/course', () => ({
  getCourseWithFullTree: vi.fn().mockResolvedValue({
    modules: [
      {
        units: [
          {
            lessons: [{ id: 'lesson-1' }, { id: 'lesson-2' }]
          }
        ]
      }
    ]
  }),
}));

describe('completeLessonAction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns UNAUTHORIZED if user is not logged in', async () => {
    // @ts-ignore
    vi.mocked(auth).mockResolvedValue(null);
    const result = await completeLessonAction('course-1', 'lesson-1');
    expect(result).toEqual({ error: 'UNAUTHORIZED' });
  });

  it('calculates streaks and XP correctly for a new completion', async () => {
    // Setup authenticated user
    // @ts-ignore
    vi.mocked(auth).mockResolvedValue({
      user: { id: 'user-1', email: 'test@example.com' },
      expires: '123'
    } as any);

    // Mock DB queries
    // @ts-ignore
    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      id: 'user-1',
      email: 'test@example.com',
      phone: null,
      hashedPassword: 'hash',
      role: 'STUDENT',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Yesterday for streak logic
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    // @ts-ignore
    vi.mocked(prisma.studentProfile.findUnique).mockResolvedValue({
      id: 'profile-1',
      userId: 'user-1',
      xp: 100,
      streakDays: 2, // Should become 3
      lastActiveDate: yesterday,
      dateOfBirth: null,
      gradeLevel: null,
      parentId: null
    });

    // No existing progress (New completion)
    // @ts-ignore
    vi.mocked(prisma.progress.findFirst).mockResolvedValue(null);
    
    // Execute
    const result = await completeLessonAction('course-1', 'lesson-1');

    // Assertions
    expect(result.success).toBe(true);
    expect(result.nextLessonId).toBe('lesson-2');
    
    // Check XP calculation (+50 for new completion) and Streak calculation (+1 for consecutive day)
    expect(prisma.studentProfile.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'profile-1' },
        data: expect.objectContaining({
          xp: 150,
          streakDays: 3
        })
      })
    );
  });

  it('resets streak if not active yesterday or today', async () => {
    // @ts-ignore
    vi.mocked(auth).mockResolvedValue({
      user: { id: 'user-1' },
      expires: '123'
    } as any);

    // @ts-ignore
    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      id: 'user-1', email: 'test@test', phone: null, hashedPassword: 'hash', role: 'STUDENT', createdAt: new Date(), updatedAt: new Date()
    });

    // 3 days ago
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 3);

    // @ts-ignore
    vi.mocked(prisma.studentProfile.findUnique).mockResolvedValue({
      id: 'profile-1',
      userId: 'user-1',
      xp: 100,
      streakDays: 5,
      lastActiveDate: oldDate,
      dateOfBirth: null,
      gradeLevel: null,
      parentId: null
    });

    // @ts-ignore
    vi.mocked(prisma.progress.findFirst).mockResolvedValue(null);

    await completeLessonAction('course-1', 'lesson-1');

    // Streak should reset to 1
    expect(prisma.studentProfile.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          streakDays: 1
        })
      })
    );
  });

  it('awards 0 XP if the lesson was already completed', async () => {
    // @ts-ignore
    vi.mocked(auth).mockResolvedValue({ user: { id: 'user-1' }, expires: '123' } as any);
    // @ts-ignore
    vi.mocked(prisma.user.findUnique).mockResolvedValue({ id: 'user-1', email: 'x', phone: null, hashedPassword: 'hash', role: 'STUDENT', createdAt: new Date(), updatedAt: new Date() });
    // @ts-ignore
    vi.mocked(prisma.studentProfile.findUnique).mockResolvedValue({ id: 'profile-1', userId: 'user-1', xp: 100, streakDays: 1, lastActiveDate: new Date(), dateOfBirth: null, gradeLevel: null, parentId: null });

    // Existing completed progress
    // @ts-ignore
    vi.mocked(prisma.progress.findFirst).mockResolvedValue({
      id: 'prog-1', studentId: 'profile-1', entityId: 'lesson-1', entityType: 'LESSON', status: 'COMPLETED', completedAt: new Date()
    });

    await completeLessonAction('course-1', 'lesson-1');

    // XP should stay 100 (not +50)
    expect(prisma.studentProfile.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ xp: 100 })
      })
    );
  });
});
