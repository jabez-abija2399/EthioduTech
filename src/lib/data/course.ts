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
        }
      }
    })
  } catch (error) {
    console.error("Failed to fetch lesson:", error)
    return null
  }
}
