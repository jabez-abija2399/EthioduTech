"use client"

import React, { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Loader2, AlertCircle } from "lucide-react"
import { registerUserAction } from "@/lib/actions/auth"
import { getRedirectPath } from "@/lib/auth-redirect"

export function RegisterForm() {
  const router = useRouter()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
        router.push(targetPath)
        router.refresh()
      } else {
        router.push("/login?registered=true")
      }
    } catch (err: any) {
      setError(err?.message || "Registration failed. Please check your network connection.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
      <div className="text-center mb-6">
        <span className="text-2xl font-black text-blue-600 tracking-tight">Edutech</span>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">Create your Account</h1>
        <p className="text-slate-500 text-xs mt-1">Start building real web development skills today</p>
      </div>

      {error && (
        <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">First Name</label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Abebe"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Last Name</label>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Bikila"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="builder@edutech.test"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">I am joining as a:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition cursor-pointer font-medium"
          >
            <option value="STUDENT">Student / Learner</option>
            <option value="TEACHER">Teacher / Educator</option>
            <option value="PARENT">Parent / Guardian</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow transition flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Creating Account...</span>
            </>
          ) : (
            <span>Create Account &rarr;</span>
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-blue-600 hover:text-blue-700">
          Sign in
        </Link>
      </div>
    </div>
  )
}
