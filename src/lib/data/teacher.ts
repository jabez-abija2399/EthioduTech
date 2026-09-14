import { prisma } from "../prisma"

export async function getTeacherOverview(userId: string) {
  try {
    const teacherProfile = await prisma.teacherProfile.findUnique({
      where: { userId },
      include: {
        user: {
          include: {
            profile: true
          }
        }
      }
    })

    // Fetch all student profiles with user details, progress, and portfolio
    const students = await prisma.studentProfile.findMany({
      include: {
        user: {
          include: {
            profile: true
          }
        },
        progress: true,
        portfolios: {
          include: {
            projects: {
              include: {
                project: true
              }
            }
          }
        },
        submissions: {
          orderBy: { submittedAt: 'desc' }
        }
      }
    })

    const totalLessonsCompleted = students.reduce((acc, s) => acc + s.progress.length, 0)
    const totalSubmissions = students.reduce((acc, s) => acc + s.submissions.length, 0)

    return {
      teacherProfile,
      students,
      stats: {
        totalStudents: students.length,
        totalLessonsCompleted,
        totalSubmissions
      }
    }
  } catch (error) {
    console.error("Failed to fetch teacher overview:", error)
    return null
  }
}
