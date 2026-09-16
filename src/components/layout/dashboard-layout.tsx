"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { Menu, X, LogOut, User, Bell } from "lucide-react"
import { NavItem } from "@/lib/permissions"

interface DashboardLayoutProps {
  children: React.ReactNode
  navItems: NavItem[]
  user: {
    name?: string | null
    email?: string | null
    role?: string
    image?: string | null
  }
}

export function DashboardLayout({ children, navItems, user }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)

  const roleDisplay = user?.role ? user.role.replace("_", " ") : "STUDENT"

  return (
    <div className="min-h-screen bg-slate-950 flex font-sans">
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-[#3C4044]/80 bg-[#3C4044] text-[#DDDCDB] fixed inset-y-0 left-0 z-50">
        <div className="flex items-center justify-between h-16 px-6 border-b border-[#3C4044]/80 bg-[#3C4044]/50 backdrop-blur-md">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-black tracking-tight text-white">Edutech</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <div className="mb-4 px-3 text-[10px] font-black uppercase tracking-widest text-[#EDBF9B]/70">
            {roleDisplay} PORTAL
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                  isActive
                    ? "bg-[#FD7B41]/10 text-[#FD7B41] shadow-xs shadow-[#FD7B41]/5"
                    : "text-[#DDDCDB]/70 hover:bg-[#DDDCDB]/5 hover:text-[#DDDCDB]"
                }`}
              >
                <span className="mr-3 text-lg opacity-80 group-hover:opacity-100">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="p-4 border-t border-[#3C4044]/80 bg-[#3C4044]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FD7B41]/20 flex items-center justify-center text-[#FD7B41] font-bold border border-[#FD7B41]/30">
              {user?.name?.[0] || user?.email?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white truncate">{user?.name || user?.email?.split("@")[0]}</div>
              <div className="text-[10px] text-[#DDDCDB]/60 truncate">{user?.email}</div>
            </div>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors border border-red-500/20"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header & Navigation */}
      <div className="lg:hidden fixed top-0 inset-x-0 h-16 border-b border-[#3C4044]/80 bg-[#3C4044] text-white z-50 flex items-center justify-between px-4">
        <Link href="/" className="text-lg font-black tracking-tight">Edutech</Link>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-[#DDDCDB] hover:text-white"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-40 bg-[#3C4044] text-[#DDDCDB] overflow-y-auto">
          <div className="p-4 space-y-1">
            <div className="mb-2 px-3 text-[10px] font-black uppercase tracking-widest text-[#EDBF9B]/70">
              {roleDisplay} PORTAL
            </div>
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#FD7B41]/10 text-[#FD7B41]"
                      : "text-[#DDDCDB]/80 hover:bg-[#DDDCDB]/10"
                  }`}
                >
                  <span className="mr-3 text-xl">{item.icon}</span>
                  {item.label}
                </Link>
              )
            })}

            <div className="mt-8 pt-4 border-t border-[#DDDCDB]/10">
              <button 
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Desktop Top Header */}
        <header className="hidden lg:flex h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm items-center justify-end px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FD7B41] rounded-full border border-slate-900"></span>
            </button>
          </div>
        </header>

        <div className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8 bg-slate-950 text-slate-100">
          <div className="max-w-6xl mx-auto w-full h-full">
            {children}
          </div>
        </div>
      </main>

    </div>
  )
}
