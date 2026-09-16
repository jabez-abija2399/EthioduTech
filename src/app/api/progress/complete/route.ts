import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/auth';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lessonId, courseId } = body;
    
    if (!lessonId || !courseId) {
      return NextResponse.json({ error: 'Missing lessonId or courseId' }, { status: 400 });
    }

    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get student profile
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { studentProfile: true }
    });

    if (!user || !user.studentProfile) {
      return NextResponse.json({ error: 'Student profile not found' }, { status: 404 });
    }

    // Upsert Progress record
    await prisma.progress.upsert({
      where: { 
        id: `${user.studentProfile.id}-${lessonId}`
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

    // Calculate XP
    await prisma.studentProfile.update({
      where: { id: user.studentProfile.id },
      data: {
        xp: { increment: 10 }
      }
    });

    return NextResponse.json({ success: true, message: 'Progress saved' });
  } catch (error: any) {
    console.error('Error saving progress:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
