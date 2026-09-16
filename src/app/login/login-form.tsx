"use client"

import React, { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { getRedirectPath } from "@/lib/auth-redirect"
import { AuthLayout } from "@/components/auth/auth-layout"
import { AuthCard } from "@/components/auth/auth-card"
import {
  AuthHeader,
  FormField,
  PasswordField,
  PrimaryButton,
  SocialAuthButton,
  FormError,
  FormSuccess,
  AuthDivider
} from "@/components/auth/auth-components"

export function LoginForm() {
  const searchParams = useSearchParams()
  const isRegisteredParam = searchParams.get("registered") === "true"

  const [email, setEmail] = useState("student@edutech.test")
  const [password, setPassword] = useState("password")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 1-Click quick demo persona fill
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
    <AuthLayout
      eyebrow="Interactive Web Education"
      title="Welcome Back"
      subtitle="Sign in to resume your learning journey and pick up right where you left off."
    >
      <AuthCard>
        <AuthHeader
          title="Sign in to Edutech"
          subtitle="Enter your credentials below to access your project courses"
        />

        {/* 1-Click Demo Persona Credentials Bar */}
        <div className="bg-white/80 border border-[#3C4044]/15 p-3 rounded-2xl shadow-2xs">
          <div className="text-[11px] font-bold text-[#3C4044]/70 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>⚡ 1-Click Demo Accounts:</span>
            <span className="text-[#FD7B41] text-[10px]">Click to fill</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickDemoFill("student@edutech.test")}
              className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer border ${
                email === "student@edutech.test"
                  ? "bg-[#3C4044] text-white border-[#3C4044] shadow-xs"
                  : "bg-white text-[#3C4044] border-[#3C4044]/20 hover:border-[#FD7B41]"
              }`}
            >
              🎓 Student
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoFill("teacher@edutech.test")}
              className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer border ${
                email === "teacher@edutech.test"
                  ? "bg-[#3C4044] text-white border-[#3C4044] shadow-xs"
                  : "bg-white text-[#3C4044] border-[#3C4044]/20 hover:border-[#FD7B41]"
              }`}
            >
              👩‍🏫 Teacher
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoFill("parent@edutech.test")}
              className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer border ${
                email === "parent@edutech.test"
                  ? "bg-[#3C4044] text-white border-[#3C4044] shadow-xs"
                  : "bg-white text-[#3C4044] border-[#3C4044]/20 hover:border-[#FD7B41]"
              }`}
            >
              👨‍👩‍👧 Parent
            </button>
          </div>
        </div>

        {isRegisteredParam && !error && (
          <FormSuccess message="🎉 Account created successfully! Please sign in below." />
        )}

        <FormError message={error} />

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="student@edutech.test"
            autoComplete="email"
          />

          <PasswordField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            forgotPasswordHref="/forgot-password"
          />

          <PrimaryButton isSubmitting={isSubmitting} loadingText="Signing in...">
            Sign In &rarr;
          </PrimaryButton>
        </form>

        <AuthDivider text="or" />

        <SocialAuthButton
          provider="Google"
          onClick={() => alert("Google Single Sign-On demo. Please use credentials login above.")}
        />

        <div className="pt-4 border-t border-[#3C4044]/15 text-center text-xs text-[#3C4044]/75">
          Don't have an account yet?{" "}
          <Link href="/register" className="font-bold text-[#FD7B41] hover:underline">
            Create an Account
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  )
}
