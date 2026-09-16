"use client"

import React, { useState } from "react"
import Link from "next/link"
import { AuthLayout } from "@/components/auth/auth-layout"
import { AuthCard } from "@/components/auth/auth-card"
import {
  AuthHeader,
  FormField,
  PrimaryButton,
  FormError,
  FormSuccess,
} from "@/components/auth/auth-components"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    // TODO: Implement actual password reset logic here
    setTimeout(() => {
      setSuccess("If an account exists with this email, you will receive password reset instructions.")
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <AuthLayout
      eyebrow="Account Recovery"
      title="Forgot Password?"
      subtitle="Enter your email address and we'll send you a link to reset your password."
    >
      <AuthCard>
        <AuthHeader
          title="Reset Password"
          subtitle="We'll email you instructions to reset your password"
        />

        {success ? (
          <FormSuccess message={success} />
        ) : (
          <>
            <FormError message={error} />
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@edutech.test"
                required
                autoComplete="email"
              />

              <PrimaryButton isSubmitting={isSubmitting} loadingText="Sending link...">
                Send Reset Link &rarr;
              </PrimaryButton>
            </form>
          </>
        )}

        <div className="pt-6 mt-4 border-t border-[#3C4044]/15 text-center text-xs text-[#3C4044]/75">
          Remember your password?{" "}
          <Link href="/login" className="font-bold text-[#FD7B41] hover:underline">
            Back to Sign In
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  )
}
