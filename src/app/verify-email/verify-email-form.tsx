"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { AuthLayout } from "@/components/auth/auth-layout"
import { AuthCard } from "@/components/auth/auth-card"
import { AuthHeader, PrimaryButton, FormError, FormSuccess } from "@/components/auth/auth-components"

export function VerifyEmailForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(true)

  useEffect(() => {
    if (!token) {
      setError("Missing verification token.")
      setIsVerifying(false)
      return
    }

    // TODO: Implement actual token verification logic
    setTimeout(() => {
      setSuccess("Your email has been successfully verified! You can now access all features.")
      setIsVerifying(false)
    }, 1500)
  }, [token])

  return (
    <AuthLayout
      eyebrow="Account Security"
      title="Verify Your Email"
      subtitle="Securing your account and activating all platform features."
    >
      <AuthCard>
        <AuthHeader
          title="Email Verification"
          subtitle={isVerifying ? "Verifying your token..." : (success ? "Verification Complete" : "Verification Failed")}
        />

        {isVerifying ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-8 h-8 border-4 border-[#FD7B41]/20 border-t-[#FD7B41] rounded-full animate-spin mb-4"></div>
            <p className="text-sm font-medium text-[#3C4044]">Please wait while we verify your email address...</p>
          </div>
        ) : (
          <>
            <FormError message={error} />
            <FormSuccess message={success} />
            
            <div className="mt-6">
              <PrimaryButton onClick={() => router.push("/login")}>
                Continue to Sign In &rarr;
              </PrimaryButton>
            </div>
          </>
        )}

        <div className="pt-6 mt-4 border-t border-[#3C4044]/15 text-center text-xs text-[#3C4044]/75">
          Having trouble?{" "}
          <Link href="/contact" className="font-bold text-[#FD7B41] hover:underline">
            Contact Support
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  )
}
