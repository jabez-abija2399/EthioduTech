import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getNavItemsForRole } from "@/lib/permissions"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default async function DashboardRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  const role = (session.user as any)?.role || "STUDENT"
  const studentId = (session.user as any)?.sub // In a real app we might fetch the specific profile ID
  const navItems = getNavItemsForRole(role, studentId)

  return (
    <DashboardLayout navItems={navItems} user={session.user}>
      {children}
    </DashboardLayout>
  )
}
