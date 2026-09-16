"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { Menu, X, LogOut, Search, Bell, HelpCircle, ChevronDown } from "lucide-react"
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
  
  // Format role for display
  const rawRole = user?.role || "STUDENT"
  const roleDisplay = rawRole.replace("_", " ")

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-sans">
      
      {/* Desktop Sidebar (Structure: #3C4044) */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#3C4044] text-[#DDDCDB] fixed inset-y-0 left-0 z-50 shadow-xl">
        <div className="flex items-center h-16 px-6 border-b border-[#DDDCDB]/10 shrink-0">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FD7B41] to-[#EDBF9B] flex items-center justify-center text-[#3C4044] font-black text-lg shadow-sm">
              E
            </div>
            <span className="text-xl font-black tracking-tight text-white">Edutech</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-hide">
          <div className="mb-4 px-2 text-[10px] font-bold uppercase tracking-widest text-[#EDBF9B]">
            {roleDisplay}
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-bold transition-all group ${
                  isActive
                    ? "bg-[#FD7B41]/10 text-[#FD7B41]"
                    : "text-[#DDDCDB]/80 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className={`mr-3 text-lg ${isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="p-4 border-t border-[#DDDCDB]/10 shrink-0">
          <button 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-[#DDDCDB]/70 hover:text-white hover:bg-white/5 transition-colors group"
          >
            <LogOut className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:text-[#FD7B41]" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header & Navigation */}
      <div className="lg:hidden fixed top-0 inset-x-0 h-16 border-b border-[#DDDCDB]/20 bg-white z-50 flex items-center justify-between px-4 shadow-sm">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#FD7B41] to-[#EDBF9B] flex items-center justify-center text-[#3C4044] font-black text-sm">E</div>
          <span className="text-lg font-black tracking-tight text-[#3C4044]">Edutech</span>
        </Link>
        <div className="flex items-center gap-2">
          <button className="p-2 text-[#3C4044]/60 hover:text-[#3C4044] relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#FD7B41] rounded-full"></span>
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#3C4044]/60 hover:text-[#3C4044]"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-40 bg-[#3C4044] text-[#DDDCDB] overflow-y-auto">
          <div className="p-4 space-y-1">
            <div className="mb-2 px-4 text-[10px] font-black uppercase tracking-widest text-[#EDBF9B]">
              {roleDisplay}
            </div>
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? "bg-[#FD7B41]/10 text-[#FD7B41]"
                      : "text-[#DDDCDB]/80 hover:bg-white/5 hover:text-white"
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
        <header className="hidden lg:flex h-16 border-b border-[#DDDCDB]/30 bg-white items-center justify-between px-8 sticky top-0 z-30 shrink-0">
          {/* Role-aware Search */}
          <div className="relative w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-[#3C4044]/40" />
            </div>
            <input 
              type="text" 
              placeholder={`Search ${roleDisplay.toLowerCase()} resources...`}
              className="block w-full pl-10 pr-3 py-2 border border-[#DDDCDB]/40 rounded-xl leading-5 bg-[#f8f9fa] placeholder-[#3C4044]/40 focus:outline-none focus:bg-white focus:border-[#FD7B41] focus:ring-1 focus:ring-[#FD7B41] text-sm text-[#3C4044] transition-colors"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="text-[#3C4044]/60 hover:text-[#3C4044] flex items-center gap-1.5 text-sm font-medium transition-colors">
              <HelpCircle className="w-4 h-4" />
              <span>Help</span>
            </button>
            
            <button className="p-2 text-[#3C4044]/60 hover:text-[#3C4044] transition-colors relative">
              <Bell className="w-5 h-5" />
              {/* Notification dot */}
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#FD7B41] rounded-full border-2 border-white"></span>
            </button>

            <div className="h-6 w-px bg-[#DDDCDB]/50 mx-2"></div>

            <button className="flex items-center gap-3 hover:bg-[#f8f9fa] p-1.5 rounded-xl transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#FD7B41]/10 flex items-center justify-center text-[#FD7B41] font-bold text-sm border border-[#FD7B41]/20 shrink-0">
                {user?.name?.[0] || user?.email?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="text-left hidden md:block">
                <div className="text-sm font-bold text-[#3C4044] leading-tight truncate max-w-[120px]">{user?.name || user?.email?.split("@")[0]}</div>
                <div className="text-[10px] text-[#3C4044]/60 leading-tight truncate max-w-[120px]">{user?.email}</div>
              </div>
              <ChevronDown className="w-4 h-4 text-[#3C4044]/40 hidden md:block" />
            </button>
          </div>
        </header>

        <div className="flex-1 p-4 lg:p-8 pt-24 lg:pt-8 w-full text-[#3C4044]">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </div>
      </main>

    </div>
  )
}
