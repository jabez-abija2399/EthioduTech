"use client"

import React, { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { Loader2, AlertCircle, CheckCircle2, Eye, EyeOff, Sparkles, Code2, ShieldCheck, ArrowRight } from "lucide-react"
import { getRedirectPath } from "@/lib/auth-redirect"

export function LoginForm() {
  const [email, setEmail] = useState("student@edutech.test")
  const [password, setPassword] = useState("password")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Quick 1-click demo persona selector
  const handleQuickDemoFill = (demoEmail: string) => {
    setEmail(demoEmail)
    setPassword("password")
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password. Please check your credentials and try again.")
        setIsSubmitting(false)
      } else if (result?.ok) {
        const session = await getSession()
        const userRole = (session?.user as any)?.role || "STUDENT"
        const targetPath = getRedirectPath(userRole)
        
        window.location.href = targetPath
      } else {
        setError("An unexpected error occurred. Please try again.")
        setIsSubmitting(false)
      }
    } catch (err: any) {
      setError(err?.message || "Failed to sign in. Please check your internet connection.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12">
      {/* Left Column: Interactive Authentication Form */}
      <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-6">
        <div>
          {/* Brand & Header */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-black tracking-tight text-blue-500">Edutech</span>
              <span className="text-[10px] uppercase font-bold tracking-widest bg-blue-500/10 text-blue-400 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                PWA Platform
              </span>
            </Link>
            <span className="text-xs text-slate-400 font-medium">Grades 5–12</span>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Welcome Back</h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">Sign in to resume your interactive web development journey</p>
          </div>

          {/* 1-Click Quick Demo Credentials Pill Bar */}
          <div className="mb-6 bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>⚡ 1-Click Demo Accounts:</span>
              <span className="text-blue-400 text-[10px]">Click to auto-fill</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickDemoFill("student@edutech.test")}
                className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer border ${
                  email === "student@edutech.test"
                    ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/20"
                    : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
                }`}
              >
                🎓 Student
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoFill("teacher@edutech.test")}
                className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer border ${
                  email === "teacher@edutech.test"
                    ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20"
                    : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
                }`}
              >
                👩‍🏫 Teacher
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoFill("parent@edutech.test")}
                className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer border ${
                  email === "parent@edutech.test"
                    ? "bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/20"
                    : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
                }`}
              >
                👨‍👩‍👧 Parent
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form Controls */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@edutech.test"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">Password</label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <div className="pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400">
          Don't have an account yet?{" "}
          <Link href="/register" className="font-bold text-blue-400 hover:text-blue-300 transition">
            Create an Account &rarr;
          </Link>
        </div>
      </div>

      {/* Right Column: High-Impact Visual Hero Showcase (Desktop) */}
      <div className="hidden lg:flex lg:col-span-6 bg-slate-950 p-8 sm:p-12 flex-col justify-between relative overflow-hidden border-l border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-transparent pointer-events-none"></div>

        {/* Hero Illustration */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl mb-8 group">
          <Image
            src="/auth_hero_illustration.jpg"
            alt="Interactive Coding Sandbox Preview"
            width={700}
            height={400}
            className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-xl border border-slate-800 text-xs">
            <span className="font-bold text-blue-400 block mb-0.5">🚀 Build Real Web Applications</span>
            <span className="text-slate-300">HTML, CSS, JS sandbox with instant live preview & 1-click portfolio showcase.</span>
          </div>
        </div>

        {/* Feature Badges Grid */}
        <div className="grid grid-cols-2 gap-3 relative z-10">
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 flex items-center space-x-3">
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg shrink-0">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Live Sandbox</div>
              <div className="text-[10px] text-slate-400">Multi-tab editor</div>
            </div>
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 flex items-center space-x-3">
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Socratic AI Tutor</div>
              <div className="text-[10px] text-slate-400">Guided assistance</div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 relative z-10">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Low-Bandwidth Resilient</span>
          </div>
          <span className="text-slate-500">Offline PWA Enabled ✓</span>
        </div>
      </div>
    </div>
  )
}
