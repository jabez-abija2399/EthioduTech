import { prisma } from "../prisma"
import { getLocalCourseWithFullTree, getLocalLesson } from "./local-course"

const FALLBACK_COURSES: any[] = []

export async function getCourses() {
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
      courses.forEach(course => {
        if (course.modules.some((m: any) => m.id.includes('-phase-'))) {
          course.modules = course.modules.filter((m: any) => m.id.includes('-phase-'));
        }
      });
      return courses
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
      allCourses.forEach(course => {
        if (course.modules.some((m: any) => m.id.includes('-phase-'))) {
          course.modules = course.modules.filter((m: any) => m.id.includes('-phase-'));
        }
      });
      return allCourses
    }
  } catch (error) {
    console.error("Failed to fetch courses from database:", error)
  }

  // Resilient fallback course list
  const localCourse = getLocalCourseWithFullTree('web-development-foundations');
  if (localCourse) {
    return [localCourse] as any;
  }
  
  return FALLBACK_COURSES as any
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
        challenges: true,
      }
    })
    
    // Only return DB lesson if it has the module phase signature (if it's a real lesson)
    // Actually, seeded lessons have random UUIDs, real lessons have specific string IDs like "HTML-L01"
    if (lesson && (lessonId.includes('-') === false || lessonId.split('-').length <= 2)) {
      return lesson;
    }
  } catch (error) {
    console.error("Failed to fetch lesson from database:", error)
  }

  // Fallback to local filesystem lesson parsing
  const localLesson = getLocalLesson(lessonId);
  if (localLesson) return localLesson;

  // Fallback search in static course definition
  for (const course of FALLBACK_COURSES) {
    for (const mod of course.modules) {
      for (const unit of mod.units) {
        const found = unit.lessons.find((l: any) => l.id === lessonId || lessonId === "fff0b0cb-5eae-4a22-8631-5c3a63894efe")
        if (found) {
          return {
            ...found,
            unit: {
              title: unit.title,
              module: {
                title: mod.title,
                course: {
                  id: course.id,
                  title: course.title
                }
              }
            },
            exercises: [],
            challenges: []
          } as any
        }
      }
    }
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
    
    // Only return DB course if it actually has the real lessons synced
    if (course && course.modules.some((m: any) => m.id.includes('-phase-'))) {
      // Filter out seeded legacy modules
      course.modules = course.modules.filter((m: any) => m.id.includes('-phase-'));
      return course;
    }
  } catch (error) {
    console.error("Failed to fetch course full tree:", error)
  }

  // Fallback to local filesystem course parsing (Real Course)
  const localCourse = getLocalCourseWithFullTree(courseId)
  if (localCourse) return localCourse

  return FALLBACK_COURSES[0] as any
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
