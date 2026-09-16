import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function GET() {
  try {
    const email = 'superadmin@edutech.com'
    const hashedPassword = await bcrypt.hash('password123', 10)
    
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        role: 'SUPER_ADMIN',
        hashedPassword,
      },
      create: {
        email,
        hashedPassword,
        role: 'SUPER_ADMIN',
        profile: {
          create: {
            firstName: 'Super',
            lastName: 'Admin Demo'
          }
        }
      }
    })
    
    return NextResponse.json({
      success: true,
      message: 'Super Admin user created successfully. You can now login.',
      user: {
        email: user.email,
        password: 'password123',
        role: user.role
      }
    })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
