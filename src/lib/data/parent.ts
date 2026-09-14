import { prisma } from "../prisma"

export async function getParentOverview(userId: string) {
  try {
    const parentProfile = await prisma.parentProfile.findUnique({
      where: { userId },
      include: {
        user: {
          include: {
            profile: true
          }
        },
        children: {
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
            }
          }
        }
      }
    })

    // If no children linked directly via parentId, fallback to student profile with email student@edutech.test
    if (parentProfile && parentProfile.children.length === 0) {
      const defaultStudent = await prisma.studentProfile.findFirst({
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
          }
        }
      })
      if (defaultStudent) {
        return {
          parentProfile,
          children: [defaultStudent]
        }
      }
    }

    return {
      parentProfile,
      children: parentProfile?.children || []
    }
  } catch (error) {
    console.error("Failed to fetch parent overview:", error)
    return null
  }
}
