import { prisma } from '../prisma'

export interface StudentGamificationStats {
  xp: number
  streakDays: number
  lastActiveDate: Date | null
  earnedBadges: {
    id: string
    code: string
    title: string
    description: string
    icon: string
    xpReward: number
    earnedAt: Date
  }[]
  allBadges: {
    id: string
    code: string
    title: string
    description: string
    icon: string
    xpReward: number
    isEarned: boolean
  }[]
}

export async function getStudentGamificationStats(studentId: string): Promise<StudentGamificationStats | null> {
  const student = await prisma.studentProfile.findUnique({
    where: { id: studentId },
    include: {
      studentBadges: {
        include: {
          badge: true
        }
      }
    }
  })

  if (!student) return null

  const allBadges = await prisma.badge.findMany()
  const earnedBadgeIds = new Set(student.studentBadges.map((sb) => sb.badgeId))

  return {
    xp: student.xp,
    streakDays: student.streakDays,
    lastActiveDate: student.lastActiveDate,
    earnedBadges: student.studentBadges.map((sb) => ({
      id: sb.badge.id,
      code: sb.badge.code,
      title: sb.badge.title,
      description: sb.badge.description,
      icon: sb.badge.icon,
      xpReward: sb.badge.xpReward,
      earnedAt: sb.earnedAt
    })),
    allBadges: allBadges.map((b) => ({
      id: b.id,
      code: b.code,
      title: b.title,
      description: b.description,
      icon: b.icon,
      xpReward: b.xpReward,
      isEarned: earnedBadgeIds.has(b.id)
    }))
  }
}
