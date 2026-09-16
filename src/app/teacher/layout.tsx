import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getNavItemsForRole, hasPermission } from "@/lib/permissions"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default async function TeacherRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  const role = (session.user as any)?.role || "STUDENT"
  
  if (!hasPermission(role, "VIEW_TEACHER_ROSTER")) {
    redirect("/dashboard")
  }

  const navItems = getNavItemsForRole(role)

  return (
    <DashboardLayout navItems={navItems} user={session.user}>
      {children}
    </DashboardLayout>
  )
}
