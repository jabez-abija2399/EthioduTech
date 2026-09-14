import { auth } from "@/auth"
import Link from "next/link"
import { getStudentPortfolio } from "@/lib/data/portfolio"
import { getStudentGamificationStats } from "@/lib/data/gamification"
import { signOutUserAction } from "@/lib/actions/auth"
import { XPBadgeDisplay } from "@/components/xp-badge-display"

export default async function Navbar() {
  const session = await auth()
  const user = session?.user

  let gamificationStats = null
  if (user?.id) {
    const studentData = await getStudentPortfolio(user.id)
    if (studentData?.id) {
      gamificationStats = await getStudentGamificationStats(studentData.id)
    }
  }

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3.5 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Portal Links */}
        <div className="flex items-center space-x-6">
          <Link href={user ? "/dashboard" : "/"} className="flex items-center space-x-2">
            <span className="text-2xl font-black tracking-tight text-blue-600">Edutech</span>
            <span className="text-[10px] uppercase font-bold tracking-widest bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
              PWA
            </span>
          </Link>

          {user && (
            <nav className="hidden md:flex items-center space-x-2 text-xs font-bold text-slate-600">
              <Link href="/dashboard" className="px-3 py-1.5 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition">
                Student Dashboard
              </Link>
              <Link href="/teacher" className="px-3 py-1.5 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition">
                Teacher Portal
              </Link>
              <Link href="/parent" className="px-3 py-1.5 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition">
                Parent Portal
              </Link>
            </nav>
          )}
        </div>

        {/* User Navigation / Actions */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              {gamificationStats && (
                <div className="hidden sm:block">
                  <XPBadgeDisplay
                    xp={gamificationStats.xp}
                    streakDays={gamificationStats.streakDays}
                    badges={[]}
                    compact
                  />
                </div>
              )}
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold text-slate-800 leading-none">{user.name}</div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">{user.email}</div>
                </div>
              </div>

              {(user as any).role && (
                <span className="hidden md:inline-block px-2.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md border border-slate-200 uppercase">
                  {(user as any).role}
                </span>
              )}

              <form action={signOutUserAction}>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                >
                  Sign Out
                </button>
              </form>
            </div>
          ) : (
            <nav className="flex items-center space-x-3">
              <Link
                href="/login"
                className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-blue-600 transition"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition shadow-sm"
              >
                Get Started
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}
