import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getParentOverview } from "@/lib/data/parent"
import Navbar from "@/components/navbar"
import Link from "next/link"
import { ParentClient } from "./parent-client"

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
    <>
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-extrabold rounded-md uppercase border border-emerald-500/30">
            Parent Portal
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Family Learning Overview</h1>
        <p className="text-[#DDDCDB]/70 text-sm mt-1">Welcome back, {parentName}. Track your children's coding progress and portfolio creations.</p>
      </header>

      {/* Children Progress Cards */}
      {children.length === 0 ? (
        <div className="bg-[#3C4044] p-12 rounded-2xl shadow-sm border border-[#DDDCDB]/10 text-center text-[#DDDCDB]/70">
          <p className="text-lg font-bold text-white">No linked children profiles found.</p>
          <p className="text-sm mt-2 text-[#DDDCDB]/50">Connect your child's student account to monitor their web learning journey.</p>
        </div>
      ) : (
        <ParentClient children={children as any} />
      )}
    </>
  )
}
