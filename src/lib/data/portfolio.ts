import { prisma } from "../prisma"

export async function getStudentPortfolio(userId: string) {
  if (!userId) return null
  try {
    let studentProfile = await prisma.studentProfile.findUnique({
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

    if (!studentProfile) {
      // Fallback matching by ID or Email
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { id: userId },
            { email: userId.toLowerCase().trim() }
          ]
        },
        include: {
          studentProfile: {
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
          }
        }
      })
      studentProfile = user?.studentProfile || null
    }

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
