"use server";

import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/auth';

const prisma = new PrismaClient();

export async function completeLesson(formData: FormData) {
  const lessonId = formData.get('lessonId') as string;
  const courseId = formData.get('courseId') as string;
  
  if (!lessonId || !courseId) {
    throw new Error('Missing lessonId or courseId');
  }

  const session = await auth();
  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  // Get student profile
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { studentProfile: true }
  });

  if (!user || !user.studentProfile) {
    throw new Error('Student profile not found');
  }

  // Upsert Progress record
  await prisma.progress.upsert({
    where: { 
      id: `${user.studentProfile.id}-${lessonId}` // Temporary composite-like ID since we don't have a unique constraint on studentId+entityId in schema
    },
    update: {
      status: 'COMPLETED',
      completedAt: new Date()
    },
    create: {
      id: `${user.studentProfile.id}-${lessonId}`,
      studentId: user.studentProfile.id,
      entityId: lessonId,
      entityType: 'LESSON',
      status: 'COMPLETED',
      completedAt: new Date()
    }
  });

  // Calculate XP (e.g. +10 XP per lesson)
  await prisma.studentProfile.update({
    where: { id: user.studentProfile.id },
    data: {
      xp: { increment: 10 }
    }
  });

  // In a real app, we'd redirect to the next lesson instead of dashboard
  redirect('/dashboard');
}
