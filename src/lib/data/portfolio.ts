import { prisma } from "../prisma"

export async function getStudentPortfolio(userId: string) {
  try {
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId },
      include: {
        user: {
          include: {
            profile: true
          }
        },
        portfolios: {
          include: {
            projects: {
              include: {
                project: true
              }
            }
          }
        }
      }
    })

    return studentProfile
  } catch (error) {
    console.error("Failed to fetch student portfolio:", error)
    return null
  }
}

export async function getPublicPortfolio(studentId: string) {
  try {
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { id: studentId },
      include: {
        user: {
          include: {
            profile: true
          }
        },
        portfolios: {
          include: {
            projects: {
              include: {
                project: true
              }
            }
          }
        }
      }
    })

    return studentProfile
  } catch (error) {
    console.error("Failed to fetch public portfolio:", error)
    return null
  }
}
