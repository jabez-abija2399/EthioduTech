import { prisma } from "../prisma"
import { getLocalCourseWithFullTree, getLocalLesson } from "./local-course"

const FALLBACK_COURSES: any[] = []

export async function getCourses(): Promise<any[]> {
  try {
    const courses = await prisma.course.findMany({
      where: { isPublished: true },
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

    if (courses && courses.length > 0) {
      return courses;
    }

    const allCourses = await prisma.course.findMany({
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

    if (allCourses && allCourses.length > 0) {
      return allCourses;
    }
  } catch (error) {
    console.error("Failed to fetch courses from database:", error)
    return []
  }
  
  return []
}

export async function getLesson(lessonId: string) {
  try {
    const lesson = await prisma.lesson.findUnique({
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
        challenges: true
      }
    })
    
    if (lesson) return lesson as any
  } catch (error) {
    console.error("Failed to fetch lesson from database:", error)
  }

  return null
}

export async function getCourseWithFullTree(courseId: string) {
  try {
    const course = await prisma.course.findUnique({
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
    
    if (course) return course as any
  } catch (error) {
    console.error("Failed to fetch course full tree:", error)
  }

  return null
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
