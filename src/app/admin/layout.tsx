import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getNavItemsForRole, hasPermission } from "@/lib/permissions"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default async function AdminRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  const role = ((session.user as any)?.role || "STUDENT").toUpperCase()
  
  if (!hasPermission(role, "ACCESS_ADMIN_PORTAL")) {
    redirect("/dashboard")
  }

  const navItems = getNavItemsForRole(role)

  return (
    <DashboardLayout navItems={navItems} user={session.user}>
      {children}
    </DashboardLayout>
  )
}
