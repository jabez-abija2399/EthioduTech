"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

function checkAdmin() {
  return auth().then(session => {
    const role = (session?.user as any)?.role;
    if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
      throw new Error("Unauthorized");
    }
    return session!.user;
  });
}

export async function getAdminMetrics() {
  await checkAdmin();
  
  const [totalUsers, totalStudents, totalTeachers, totalCourses] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.user.count({ where: { role: "TEACHER" } }),
    prisma.course.count()
  ]);

  return {
    totalUsers,
    totalStudents,
    totalTeachers,
    totalCourses
  };
}

export async function getRecentAuditLogs(limit = 10) {
  await checkAdmin();
  return prisma.auditLog.findMany({
    take: limit,
    orderBy: { timestamp: "desc" },
    include: {
      user: {
        select: { email: true, role: true }
      }
    }
  });
}

export async function getAllUsers() {
  await checkAdmin();
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
      profile: {
        select: { firstName: true, lastName: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });
}
