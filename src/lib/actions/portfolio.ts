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
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized: You must be logged in to publish projects.")
  }

  const userId = session.user.id

  // 1. Ensure User and StudentProfile exist
  let studentProfile = await prisma.studentProfile.findUnique({
    where: { userId }
  })

  if (!studentProfile) {
    studentProfile = await prisma.studentProfile.create({
      data: { userId }
    })
  }

  // 2. Ensure Portfolio exists
  let portfolio = await prisma.portfolio.findUnique({
    where: { studentId: studentProfile.id }
  })

  if (!portfolio) {
    portfolio = await prisma.portfolio.create({
      data: {
        studentId: studentProfile.id,
        isPublic: true
      }
    })
  }

  // Combine HTML, CSS, JS into stored project bundle
  const bundledContent = JSON.stringify({ html: htmlCode, css: cssCode, js: jsCode })

  // 3. Create Project record
  const project = await prisma.project.create({
    data: {
      title,
      description: description || "Interactive Web Project built on Edutech."
    }
  })

  // 4. Create PortfolioProject link
  await prisma.portfolioProject.create({
    data: {
      portfolioId: portfolio.id,
      projectId: project.id,
      url: bundledContent, // Store code content in url JSON string for MVP
      reflection: reflection || "Built as part of interactive web development practice."
    }
  })

  revalidatePath("/dashboard")
  revalidatePath(`/portfolio/${studentProfile.id}`)

  return { success: true, studentId: studentProfile.id }
}
