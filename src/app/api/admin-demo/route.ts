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
        name: 'Super Admin Demo'
      },
      create: {
        email,
        name: 'Super Admin Demo',
        hashedPassword,
        role: 'SUPER_ADMIN'
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
