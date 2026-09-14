"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function registerUserAction(formData: FormData) {
  const email = (formData.get("email") as string || "").toLowerCase().trim()
  const password = formData.get("password") as string
  const firstName = (formData.get("firstName") as string || "").trim()
  const lastName = (formData.get("lastName") as string || "").trim()
  const role = (formData.get("role") as string || "STUDENT").toUpperCase()

  if (!email || !password || !firstName || !lastName) {
    return { error: "All fields are required." }
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long." }
  }

  // 1. Check existing user
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    return { error: "An account with this email address already exists." }
  }

  // 2. Hash password
  const hashedPassword = bcrypt.hashSync(password, 10)

  // 3. Create User with Profile and Role Profile
  const user = await prisma.user.create({
    data: {
      email,
      hashedPassword,
      role,
      profile: {
        create: {
          firstName,
          lastName
        }
      },
      ...(role === "STUDENT" ? { studentProfile: { create: {} } } : {}),
      ...(role === "TEACHER" ? { teacherProfile: { create: {} } } : {}),
      ...(role === "PARENT" ? { parentProfile: { create: {} } } : {})
    },
    include: {
      studentProfile: true
    }
  })

  // 4. Provision Portfolio if Student
  if (role === "STUDENT" && user.studentProfile) {
    await prisma.portfolio.create({
      data: {
        studentId: user.studentProfile.id,
        isPublic: true
      }
    })
  }

  return { success: true }
}

export async function signOutUserAction() {
  const { signOut } = await import("@/auth")
  await signOut({ redirectTo: "/login" })
}
