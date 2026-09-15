import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || "NOT_SET"
  const maskedUrl = dbUrl.replace(/:[^:@]+@/, ":****@")

  try {
    const courseCount = await prisma.course.count()
    const userCount = await prisma.user.count()
    const courses = await prisma.course.findMany({
      take: 5,
      select: { id: true, title: true, isPublished: true }
    })

    return NextResponse.json({
      status: "ok",
      databaseUrl: maskedUrl,
      courseCount,
      userCount,
      courses
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        databaseUrl: maskedUrl,
        errorMessage: error?.message || String(error),
        errorStack: error?.stack || null
      },
      { status: 500 }
    )
  }
}
