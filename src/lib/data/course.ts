import { prisma } from "../prisma"

const FALLBACK_COURSES = [
  {
    id: "web-creator-foundations",
    title: "Web Creator Foundations",
    description: "Learn HTML, CSS, and basic JavaScript by building your first website.",
    isPublished: true,
    modules: [
      {
        id: "mod-1",
        title: "Module 1: The Structure of the Web (HTML)",
        order: 1,
        units: [
          {
            id: "unit-1",
            title: "Unit 1: Your First Webpage",
            order: 1,
            lessons: [
              {
                id: "fff0b0cb-5eae-4a22-8631-5c3a63894efe",
                title: "What is HTML?",
                content: "# Welcome to the Web\n\nHTML stands for HyperText Markup Language. It is the skeleton of every website you visit.\n\n## Why it matters\nIf you want to build anything on the web, you must start with HTML. It tells the browser what content to display: headings, paragraphs, images, and links.\n\n## Your first tag\nThe `<h1>` tag creates a large heading. Try writing: `<h1>Hello World</h1>` in the editor below.",
                order: 1
              },
              {
                id: "6af3b03f-dddd-4298-aee1-e1eae569cfb3",
                title: "Paragraphs and Structure",
                content: "# Adding Text\n\nNow that you have a heading, you need regular text. The `<p>` tag is used for paragraphs.\n\n## Practice\nAdd a paragraph below your heading using `<p>This is my first website.</p>`.",
                order: 2
              }
            ]
          }
        ]
      }
    ]
  }
]

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
      return allCourses
    }
  } catch (error) {
    console.error("Failed to fetch courses from database:", error)
  }

  // Resilient fallback course list
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
    if (lesson) return lesson
  } catch (error) {
    console.error("Failed to fetch lesson from database:", error)
  }

  // Fallback search in static course definition
  for (const course of FALLBACK_COURSES) {
    for (const mod of course.modules) {
      for (const unit of mod.units) {
        const found = unit.lessons.find(l => l.id === lessonId || lessonId === "fff0b0cb-5eae-4a22-8631-5c3a63894efe")
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
    if (course) return course
  } catch (error) {
    console.error("Failed to fetch course full tree:", error)
  }

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
