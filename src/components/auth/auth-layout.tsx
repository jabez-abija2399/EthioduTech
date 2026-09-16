import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ShieldCheck, Code2, Sparkles, Trophy } from "lucide-react"

interface AuthLayoutProps {
  children: React.ReactNode
  eyebrow?: string
  title?: string
  subtitle?: string
}

export function AuthLayout({
  children,
  eyebrow = "Project-Based Learning",
  title = "Learn. Build. Create. Grow.",
  subtitle = "Build real-world web projects with interactive live sandbox execution and Socratic AI guidance."
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#3C4044] text-[#3C4044] font-sans flex flex-col justify-center relative overflow-hidden p-4 sm:p-6 lg:p-8">
      {/* Subtle Background Accent Canvas */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#FD7B41]/10 via-[#EDBF9B]/5 to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="bg-[#DDDCDB] border border-[#DDDCDB]/80 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column (Desktop): Brand Hero & Visual Identity */}
          <div className="hidden lg:flex lg:col-span-6 bg-[#3C4044] p-8 sm:p-12 flex-col justify-between relative overflow-hidden border-r border-[#3C4044]/80 text-[#DDDCDB]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FD7B41]/15 via-[#EDBF9B]/10 to-transparent pointer-events-none"></div>

            {/* Header Brand Identity */}
            <div className="relative z-10">
              <Link href="/" className="inline-flex items-center space-x-2">
                <span className="text-3xl font-black tracking-tight text-white">Edutech</span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-[#FD7B41] text-[#3C4044] px-2.5 py-0.5 rounded-full font-sans shadow-xs">
                  Official
                </span>
              </Link>
              
              <div className="mt-8">
                <span className="text-xs font-bold text-[#EDBF9B] uppercase tracking-wider">{eyebrow}</span>
                <h2 className="text-3xl font-extrabold text-white mt-1 leading-tight tracking-tight">{title}</h2>
                <p className="text-[#DDDCDB]/80 text-xs sm:text-sm mt-2 leading-relaxed">{subtitle}</p>
              </div>
            </div>

            {/* Custom Brand Illustration Visual */}
            <div className="relative my-6 rounded-2xl overflow-hidden border border-[#DDDCDB]/20 shadow-xl group">
              <Image
                src="/brand_education_illustration.jpg"
                alt="Edutech Project-Based Learning Platform"
                width={700}
                height={400}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3C4044] via-[#3C4044]/30 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 bg-[#3C4044]/90 backdrop-blur-sm p-3 rounded-xl border border-[#EDBF9B]/30 text-xs">
                <span className="font-bold text-[#FD7B41] block mb-0.5">🚀 Interactive Sandbox & Portfolio Showcase</span>
                <span className="text-[#DDDCDB]/90 text-[11px]">Empowering Ethiopian students Grades 5–12 to master modern web skills.</span>
              </div>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 gap-3 relative z-10 text-xs">
              <div className="bg-[#3C4044]/80 p-3 rounded-xl border border-[#DDDCDB]/10 flex items-center space-x-2.5">
                <div className="p-1.5 bg-[#FD7B41]/20 text-[#FD7B41] rounded-lg">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">Interactive Sandbox</div>
                  <div className="text-[10px] text-[#DDDCDB]/70">HTML / CSS / JS</div>
                </div>
              </div>

              <div className="bg-[#3C4044]/80 p-3 rounded-xl border border-[#DDDCDB]/10 flex items-center space-x-2.5">
                <div className="p-1.5 bg-[#EDBF9B]/20 text-[#EDBF9B] rounded-lg">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">+50 XP & Streaks</div>
                  <div className="text-[10px] text-[#DDDCDB]/70">Gamified rewards</div>
                </div>
              </div>
            </div>

            {/* Security Guarantee Footer */}
            <div className="pt-6 border-t border-[#DDDCDB]/10 flex items-center justify-between text-xs text-[#DDDCDB]/70 relative z-10">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#FD7B41]" />
                <span>Safe Educational Environment</span>
              </div>
              <span>Offline PWA Ready ✓</span>
            </div>
          </div>

          {/* Right Column: Authentication Form Container */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-center bg-[#DDDCDB] relative">
            {children}
          </div>

        </div>
      </div>
    </div>
  )
}
