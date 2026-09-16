"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AuthLayout } from "@/components/auth/auth-layout"
import { AuthCard } from "@/components/auth/auth-card"
import {
  AuthHeader,
  PasswordField,
  PrimaryButton,
  FormError,
  FormSuccess,
} from "@/components/auth/auth-components"

export function ResetPasswordForm() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      setIsSubmitting(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.")
      setIsSubmitting(false)
      return
    }

    // TODO: Implement actual password reset API call here
    setTimeout(() => {
      setSuccess("Your password has been successfully reset.")
      setIsSubmitting(false)
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    }, 1500)
  }

  return (
    <AuthLayout
      eyebrow="Account Recovery"
      title="Create New Password"
      subtitle="Enter your new password below to regain access to your account."
    >
      <AuthCard>
        <AuthHeader
          title="Reset Password"
          subtitle="Please enter your new secure password"
        />

        {success ? (
          <FormSuccess message={success} />
        ) : (
          <>
            <FormError message={error} />
            <form onSubmit={handleSubmit} className="space-y-4">
              <PasswordField
                label="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />

              <PasswordField
                label="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />

              <PrimaryButton isSubmitting={isSubmitting} loadingText="Resetting Password...">
                Reset Password &rarr;
              </PrimaryButton>
            </form>
          </>
        )}

        <div className="pt-6 mt-4 border-t border-[#3C4044]/15 text-center text-xs text-[#3C4044]/75">
          Remembered your password?{" "}
          <Link href="/login" className="font-bold text-[#FD7B41] hover:underline">
            Back to Sign In
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  )
}
