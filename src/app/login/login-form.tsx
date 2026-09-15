"use client"

import React, { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import { getRedirectPath } from "@/lib/auth-redirect"

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")
  const isRegisteredParam = searchParams.get("registered") === "true"

  const [email, setEmail] = useState("student@edutech.test")
  const [password, setPassword] = useState("password")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

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
        const targetPath = getRedirectPath(userRole, callbackUrl)
        
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
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
      <div className="text-center mb-6">
        <span className="text-2xl font-black text-blue-600 tracking-tight">Edutech</span>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">Sign in to Edutech</h1>
        <p className="text-slate-500 text-xs mt-1">Enter your credentials to access your project courses</p>
      </div>

      {isRegisteredParam && !error && (
        <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>🎉 Account created successfully! Please sign in below.</span>
        </div>
      )}

      {error && (
        <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="student@edutech.test"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow transition flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <span>Sign in &rarr;</span>
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-slate-500">
        Don't have an account yet?{" "}
        <Link href="/register" className="font-bold text-blue-600 hover:text-blue-700">
          Create an Account
        </Link>
      </div>
    </div>
  )
}
