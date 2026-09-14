import { prisma } from "../prisma"

export async function getCourses() {
  try {
    return await prisma.course.findMany({
      where: { isPublished: true },
      include: {
        modules: {
          include: {
            units: {
              include: {
                lessons: true
              }
            }
          }
        }
      }
    })
  } catch (error) {
    console.error("Failed to fetch courses:", error)
    return []
  }
}

export async function getLesson(lessonId: string) {
  try {
    return await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        unit: {
          include: {
            module: {
              include: {
                course: true
              }
            }
          }
        },
        exercises: true,
        challenges: true,
      }
    })
  } catch (error) {
    console.error("Failed to fetch lesson:", error)
    return null
  }
}

export async function getCourseWithFullTree(courseId: string) {
  try {
    return await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            units: {
              orderBy: { order: 'asc' },
              include: {
                lessons: {
                  orderBy: { order: 'asc' }
                }
              }
            }
          }
        }
      }
    })
  } catch (error) {
    console.error("Failed to fetch course full tree:", error)
    return null
  }
}

export async function getUserProgress(userId: string) {
  if (!userId) return []
  try {
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId }
    })
    if (!studentProfile) return []

    return await prisma.progress.findMany({
      where: { studentId: studentProfile.id }
    })
  } catch (error) {
    console.error("Failed to fetch user progress:", error)
    return []
  }
}

