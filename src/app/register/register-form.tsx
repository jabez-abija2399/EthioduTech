"use client"

import React, { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Loader2, AlertCircle, Eye, EyeOff, GraduationCap, School, Users2, ArrowRight, ShieldCheck, Check } from "lucide-react"
import { registerUserAction } from "@/lib/actions/auth"
import { getRedirectPath } from "@/lib/auth-redirect"

export function RegisterForm() {
  const router = useRouter()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState("STUDENT")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData()
    formData.append("firstName", firstName)
    formData.append("lastName", lastName)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("role", role)

    try {
      const result = await registerUserAction(formData)

      if (result?.error) {
        setError(result.error)
        setIsSubmitting(false)
        return
      }

      // Automatically sign in upon successful registration
      const signInRes = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      })

      if (signInRes?.ok) {
        const targetPath = getRedirectPath(role)
        window.location.href = targetPath
      } else {
        router.push("/login?registered=true")
      }
    } catch (err: any) {
      setError(err?.message || "Registration failed. Please check your network connection.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12">
      {/* Left Column: Interactive Registration Form */}
      <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
        <div>
          {/* Brand Header */}
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
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Create your Account</h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">Start building real web development projects today</p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Interactive Role Selection Cards */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">I am joining as a:</label>
              <div className="grid grid-cols-3 gap-2.5">
                {/* Student Card */}
                <button
                  type="button"
                  onClick={() => setRole("STUDENT")}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between cursor-pointer ${
                    role === "STUDENT"
                      ? "bg-blue-600/10 border-blue-500 text-white ring-1 ring-blue-500/50 shadow-md shadow-blue-500/10"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <GraduationCap className={`w-5 h-5 ${role === "STUDENT" ? "text-blue-400" : "text-slate-500"}`} />
                    {role === "STUDENT" && <Check className="w-3.5 h-3.5 text-blue-400" />}
                  </div>
                  <div className="mt-2">
                    <div className="text-xs font-bold text-slate-100">Student</div>
                    <div className="text-[10px] text-slate-400 line-clamp-1">Learner & Builder</div>
                  </div>
                </button>

                {/* Teacher Card */}
                <button
                  type="button"
                  onClick={() => setRole("TEACHER")}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between cursor-pointer ${
                    role === "TEACHER"
                      ? "bg-indigo-600/10 border-indigo-500 text-white ring-1 ring-indigo-500/50 shadow-md shadow-indigo-500/10"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <School className={`w-5 h-5 ${role === "TEACHER" ? "text-indigo-400" : "text-slate-500"}`} />
                    {role === "TEACHER" && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                  </div>
                  <div className="mt-2">
                    <div className="text-xs font-bold text-slate-100">Teacher</div>
                    <div className="text-[10px] text-slate-400 line-clamp-1">Educator Roster</div>
                  </div>
                </button>

                {/* Parent Card */}
                <button
                  type="button"
                  onClick={() => setRole("PARENT")}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between cursor-pointer ${
                    role === "PARENT"
                      ? "bg-emerald-600/10 border-emerald-500 text-white ring-1 ring-emerald-500/50 shadow-md shadow-emerald-500/10"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Users2 className={`w-5 h-5 ${role === "PARENT" ? "text-emerald-400" : "text-slate-500"}`} />
                    {role === "PARENT" && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <div className="mt-2">
                    <div className="text-xs font-bold text-slate-100">Parent</div>
                    <div className="text-[10px] text-slate-400 line-clamp-1">Family Guardian</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">First Name</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Abebe"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Bikila"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="builder@edutech.test"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password (min. 6 characters)</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition pr-10"
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
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Complete Account Registration</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <div className="pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-blue-400 hover:text-blue-300 transition">
            Sign In &rarr;
          </Link>
        </div>
      </div>

      {/* Right Column: High-Impact Visual Hero Showcase (Desktop) */}
      <div className="hidden lg:flex lg:col-span-5 bg-slate-950 p-8 sm:p-12 flex-col justify-between relative overflow-hidden border-l border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-transparent pointer-events-none"></div>

        {/* Hero Illustration */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl mb-8 group">
          <Image
            src="/auth_hero_illustration.jpg"
            alt="Interactive Web Platform Workspace"
            width={700}
            height={400}
            className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-xl border border-slate-800 text-xs">
            <span className="font-bold text-blue-400 block mb-0.5">🌟 Start Your Learning Journey</span>
            <span className="text-slate-300">Join thousands of students building real HTML/CSS projects with instant live sandbox execution.</span>
          </div>
        </div>

        {/* Value Highlights */}
        <div className="space-y-3 relative z-10 text-xs">
          <div className="flex items-center space-x-3 text-slate-300">
            <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold flex items-center justify-center shrink-0 border border-emerald-500/20">✓</span>
            <span>+50 XP per completed lesson with daily streaks</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-300">
            <span className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-400 font-bold flex items-center justify-center shrink-0 border border-blue-500/20">✓</span>
            <span>1-click portfolio showcase for parents & teachers</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-300">
            <span className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-400 font-bold flex items-center justify-center shrink-0 border border-indigo-500/20">✓</span>
            <span>Offline-first IndexedDB auto-saving</span>
          </div>
        </div>

        {/* Social Proof Footer */}
        <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 relative z-10">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted Hashed Passwords</span>
          </div>
          <span className="text-slate-500">Edutech Verified ✓</span>
        </div>
      </div>
    </div>
  )
}
