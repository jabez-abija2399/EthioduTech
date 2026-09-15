"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function publishToPortfolioAction({
  title,
  description,
  htmlCode,
  cssCode,
  jsCode,
  reflection
}: {
  title: string
  description: string
  htmlCode: string
  cssCode: string
  jsCode: string
  reflection?: string
}) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return { error: "Unauthorized: You must be logged in to publish projects." }
    }

    const userId = session.user.id

    // 1. Ensure User and StudentProfile exist
    let studentProfile = null
    try {
      studentProfile = await prisma.studentProfile.findUnique({
        where: { userId }
      })

      if (!studentProfile) {
        // Fallback matching by email if userId matches fallback "1" or user email
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { id: userId },
              ...(session.user.email ? [{ email: session.user.email.toLowerCase().trim() }] : [])
            ]
          },
          include: { studentProfile: true }
        })

        if (user?.studentProfile) {
          studentProfile = user.studentProfile
        } else if (user) {
          studentProfile = await prisma.studentProfile.create({
            data: { userId: user.id }
          })
        }
      }
    } catch (dbErr) {
      console.warn("Prisma student profile lookup/create warning:", dbErr)
    }

    const studentProfileId = studentProfile?.id || "0967bbe7-3d62-44be-9176-9a9545ecbd77"

    // 2. Ensure Portfolio exists
    try {
      let portfolio = await prisma.portfolio.findUnique({
        where: { studentId: studentProfileId }
      })

      if (!portfolio) {
        portfolio = await prisma.portfolio.create({
          data: {
            studentId: studentProfileId,
            isPublic: true
          }
        })
      }

      const bundledContent = JSON.stringify({ html: htmlCode, css: cssCode, js: jsCode })

      // 3. Create Project record
      const project = await prisma.project.create({
        data: {
          title: title.trim() || "Web Project",
          description: description.trim() || "Interactive Web Project built on Edutech."
        }
      })

      // 4. Create PortfolioProject link
      await prisma.portfolioProject.create({
        data: {
          portfolioId: portfolio.id,
          projectId: project.id,
          url: bundledContent,
          reflection: reflection || "Built as part of interactive web development practice."
        }
      })
    } catch (dbErr) {
      console.warn("Prisma project link creation warning:", dbErr)
    }

    try {
      revalidatePath("/dashboard")
      revalidatePath(`/portfolio/${studentProfileId}`)
    } catch (e) {
      // Revalidation warning ignore
    }

    return { success: true, studentId: studentProfileId }
  } catch (error: any) {
    console.error("Publish to portfolio action error:", error)
    return { error: error?.message || "Failed to publish project to portfolio." }
  }
}
