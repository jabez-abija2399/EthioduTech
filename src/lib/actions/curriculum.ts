"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// Utility to check if user has Curriculum Author privileges (ADMIN or TEACHER)
async function requireAuthorPrivileges() {
  const session = await auth()
  const role = (session?.user as any)?.role?.toUpperCase()

  if (!session?.user || (role !== "ADMIN" && role !== "SUPER_ADMIN" && role !== "TEACHER")) {
    throw new Error("Unauthorized: You do not have permission to author curriculum.")
  }
  
  return session.user
}

export async function createCourseAction(title: string, description: string) {
  await requireAuthorPrivileges()
  
  const course = await prisma.course.create({
    data: {
      title,
      description,
      isPublished: false
    }
  })
  
  revalidatePath('/admin/courses')
  return course
}

export async function updateCourseAction(id: string, data: { title?: string, description?: string, isPublished?: boolean }) {
  await requireAuthorPrivileges()
  
  const course = await prisma.course.update({
    where: { id },
    data
  })
  
  revalidatePath('/admin/courses')
  revalidatePath(`/admin/courses/${id}`)
  return course
}

export async function createModuleAction(courseId: string, title: string, order: number) {
  await requireAuthorPrivileges()
  
  const module = await prisma.module.create({
    data: {
      courseId,
      title,
      order
    }
  })
  
  revalidatePath(`/admin/courses/${courseId}`)
  return module
}

export async function createUnitAction(moduleId: string, title: string, order: number, courseId: string) {
  await requireAuthorPrivileges()
  
  const unit = await prisma.unit.create({
    data: {
      moduleId,
      title,
      order
    }
  })
  
  revalidatePath(`/admin/courses/${courseId}`)
  return unit
}

export async function createLessonAction(unitId: string, title: string, order: number, courseId: string) {
  await requireAuthorPrivileges()
  
  const lesson = await prisma.lesson.create({
    data: {
      unitId,
      title,
      order,
      content: "# New Lesson\n\nWrite your content here."
    }
  })
  
  revalidatePath(`/admin/courses/${courseId}`)
  return lesson
}

export async function saveLessonContentAction(lessonId: string, content: string, courseId: string) {
  await requireAuthorPrivileges()
  
  const lesson = await prisma.lesson.update({
    where: { id: lessonId },
    data: { content }
  })
  
  revalidatePath(`/admin/courses/${courseId}`)
  revalidatePath(`/courses/${courseId}`)
  return lesson
}

export async function deleteEntityAction(type: 'module' | 'unit' | 'lesson', id: string, courseId: string) {
  await requireAuthorPrivileges()
  
  if (type === 'module') {
    await prisma.module.delete({ where: { id } })
  } else if (type === 'unit') {
    await prisma.unit.delete({ where: { id } })
  } else if (type === 'lesson') {
    await prisma.lesson.delete({ where: { id } })
  }
  
  revalidatePath(`/admin/courses/${courseId}`)
  return true
}
