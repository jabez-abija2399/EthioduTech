"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export async function completeLessonAction(courseId: string, lessonId: string) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return { error: "UNAUTHORIZED" }
  }

  try {
    const userId = session.user.id

    // 1. Ensure User exists and get or create student profile
    let userRecord = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!userRecord && session.user.email) {
      userRecord = await prisma.user.findUnique({
        where: { email: session.user.email }
      })
    }

    if (!userRecord) {
      const emailToUse = session.user.email || `user_${userId}@edutech.test`
      userRecord = await prisma.user.findUnique({ where: { email: emailToUse } })
      
      if (!userRecord) {
        userRecord = await prisma.user.create({
          data: {
            id: userId,
            email: emailToUse,
            hashedPassword: "password",
            role: "STUDENT"
          }
        })
      }
    }

    let studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: userRecord.id }
    })

    if (!studentProfile) {
      studentProfile = await prisma.studentProfile.create({
        data: {
          userId: userRecord.id
        }
      })
    }

    // 2. Upsert progress record
    const existingProgress = await prisma.progress.findFirst({
      where: {
        studentId: studentProfile.id,
        entityId: lessonId,
        entityType: "LESSON"
      }
    })

    const isNewCompletion = !existingProgress || existingProgress.status !== "COMPLETED"

    if (!existingProgress) {
      await prisma.progress.create({
        data: {
          studentId: studentProfile.id,
          entityId: lessonId,
          entityType: "LESSON",
          status: "COMPLETED",
          completedAt: new Date()
        }
      })
    } else {
      await prisma.progress.update({
        where: { id: existingProgress.id },
        data: {
          status: "COMPLETED",
          completedAt: new Date()
        }
      })
    }

    // 3. Update Gamification (XP, Streak, Badges)
    const now = new Date()
    const lastActive = studentProfile.lastActiveDate ? new Date(studentProfile.lastActiveDate) : null
    
    let newStreak = studentProfile.streakDays || 1
    if (lastActive) {
      const isSameDay = lastActive.toDateString() === now.toDateString()
      const yesterday = new Date(now)
      yesterday.setDate(now.getDate() - 1)
      const isYesterday = lastActive.toDateString() === yesterday.toDateString()

      if (isYesterday) {
        newStreak += 1
      } else if (!isSameDay) {
        newStreak = 1
      }
    }

    const addedXP = isNewCompletion ? 50 : 0
    const newXP = studentProfile.xp + addedXP

    await prisma.studentProfile.update({
      where: { id: studentProfile.id },
      data: {
        xp: newXP,
        streakDays: newStreak,
        lastActiveDate: now
      }
    })

    // Award First Code badge
    const firstCodeBadge = await prisma.badge.findUnique({ where: { code: 'FIRST_CODE' } })
    if (firstCodeBadge) {
      await prisma.studentBadge.upsert({
        where: {
          studentId_badgeId: {
            studentId: studentProfile.id,
            badgeId: firstCodeBadge.id
          }
        },
        update: {},
        create: {
          studentId: studentProfile.id,
          badgeId: firstCodeBadge.id
        }
      })
    }

    // Award 3-Day Streak badge if streak >= 3
    if (newStreak >= 3) {
      const streakBadge = await prisma.badge.findUnique({ where: { code: 'STREAK_3' } })
      if (streakBadge) {
        await prisma.studentBadge.upsert({
          where: {
            studentId_badgeId: {
              studentId: studentProfile.id,
              badgeId: streakBadge.id
            }
          },
          update: {},
          create: {
            studentId: studentProfile.id,
            badgeId: streakBadge.id
          }
        })
      }
    }

    // 4. Find next lesson in the course
    // Handle fallback courses without crashing if courseId is not a UUID
    let course = null;
    try {
      course = await prisma.course.findUnique({
        where: { id: courseId },
        include: {
          modules: {
            orderBy: { order: "asc" },
            include: {
              units: {
                orderBy: { order: "asc" },
                include: {
                  lessons: {
                    orderBy: { order: "asc" }
                  }
                }
              }
            }
          }
        }
      })
    } catch (dbErr) {
      console.warn("Course lookup warning (likely fallback course):", dbErr);
    }

    if (!course) {
      return { success: true, nextLessonId: null }
    }

    // Flatten all lessons into a single ordered array
    const allLessons: string[] = []
    course.modules.forEach(mod => {
      mod.units.forEach(unit => {
        unit.lessons.forEach(l => {
          allLessons.push(l.id)
        })
      })
    })

    const currentIndex = allLessons.indexOf(lessonId)
    if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
      const nextLessonId = allLessons[currentIndex + 1]
      return { success: true, nextLessonId }
    } else {
      // Course finished or last lesson
      return { success: true, nextLessonId: null }
    }
  } catch (error: any) {
    console.error("completeLessonAction ERROR:", error)
    return { error: error?.message || "An unexpected error occurred" }
  }
}
