import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getParentOverview } from "@/lib/data/parent"
import { ParentClient } from "./parent-client"
import { EmptyState } from "@/components/dashboard/shared/empty-state"
import { Users } from "lucide-react"

export default async function ParentDashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const userId = session.user.id || (session.user as any)?.sub || ""
  const parentData = await getParentOverview(userId)

  const parentName = session.user.name || "Parent"
  const children = parentData?.children || []

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#3C4044] tracking-tight mb-2">
          Good evening, {parentName.split(" ")[0]}
        </h1>
        <p className="text-[#3C4044]/70 text-lg">
          Here is how your family is learning and progressing this week.
        </p>
      </header>

      {/* Children Progress Client Router */}
      {children.length === 0 ? (
        <EmptyState 
          title="No linked children found"
          description="Connect your child's student account to monitor their web learning journey and portfolio creations."
          icon={Users}
          action={
            <button className="px-6 py-2.5 bg-[#FD7B41] text-white font-bold text-sm rounded-xl shadow hover:bg-[#FD7B41]/90 transition">
              Link a Student Account
            </button>
          }
        />
      ) : (
        <ParentClient children={children as any} />
      )}
    </div>
  )
}
