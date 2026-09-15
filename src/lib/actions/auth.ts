"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function registerUserAction(formData: FormData) {
  const email = (formData.get("email") as string || "").toLowerCase().trim()
  const password = formData.get("password") as string
  const firstName = (formData.get("firstName") as string || "").trim()
  const lastName = (formData.get("lastName") as string || "").trim()
  const rawRole = (formData.get("role") as string || "STUDENT").toUpperCase()
  const validRoles = ["STUDENT", "TEACHER", "PARENT", "ADMIN"]
  const finalRole = validRoles.includes(rawRole) ? rawRole : "STUDENT"

  if (!email || !password || !firstName || !lastName) {
    return { error: "All fields are required." }
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long." }
  }

  try {
    // 1. Check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return { error: "An account with this email address already exists." }
    }

    // 2. Hash password
    const hashedPassword = bcrypt.hashSync(password, 10)

    // 3. Create User with Profile and Role Profile inside atomic transaction
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          hashedPassword,
          role: finalRole,
          profile: {
            create: {
              firstName,
              lastName
            }
          },
          ...(finalRole === "STUDENT" ? { studentProfile: { create: {} } } : {}),
          ...(finalRole === "TEACHER" ? { teacherProfile: { create: {} } } : {}),
          ...(finalRole === "PARENT" ? { parentProfile: { create: {} } } : {})
        },
        include: {
          studentProfile: true
        }
      })

      // 4. Provision Portfolio if Student
      if (finalRole === "STUDENT" && user.studentProfile) {
        await tx.portfolio.create({
          data: {
            studentId: user.studentProfile.id,
            isPublic: true
          }
        })
      }
    })

    return { success: true }
  } catch (error: any) {
    console.error("User registration error:", error)
    return { error: error?.message || "Failed to create account. Please try again." }
  }
}

export async function registerUserFormAction(formData: FormData) {
  const { redirect } = await import("next/navigation")
  const result = await registerUserAction(formData)
  if (result?.error) {
    redirect(`/register?error=${encodeURIComponent(result.error)}`)
  }
  redirect("/login?registered=true")
}

export async function loginUserFormAction(formData: FormData) {
  const { signIn } = await import("@/auth")
  const { redirect } = await import("next/navigation")
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    })
  } catch (err: any) {
    if (err?.message?.includes("NEXT_REDIRECT") || err?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err
    }
    redirect("/login?error=CredentialsSignin")
  }
}

export async function signOutUserAction() {
  const { signOut } = await import("@/auth")
  await signOut({ redirectTo: "/login" })
}
