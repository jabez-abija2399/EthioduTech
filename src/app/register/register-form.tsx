"use client"

import React, { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getRedirectPath } from "@/lib/auth-redirect"
import { registerUserAction } from "@/lib/actions/auth"
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
  AuthDivider,
  RoleSelector
} from "@/components/auth/auth-components"

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
    <AuthLayout
      eyebrow="Join The Platform"
      title="Create Your Account"
      subtitle="Start building real web development projects today with our interactive sandbox."
    >
      <AuthCard>
        <AuthHeader
          title="Sign up for Edutech"
          subtitle="Fill in the details below to create your account"
        />

        <FormError message={error} />

        <form onSubmit={handleSubmit} className="space-y-4">
          <RoleSelector selectedRole={role} onSelectRole={setRole} />

          <div className="grid grid-cols-2 gap-3">
            <FormField
              label="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Abebe"
              required
            />
            <FormField
              label="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Bikila"
              required
            />
          </div>

          <FormField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="builder@edutech.test"
            required
            autoComplete="email"
          />

          <PasswordField
            label="Password (min. 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            autoComplete="new-password"
          />

          <PrimaryButton isSubmitting={isSubmitting} loadingText="Creating Account...">
            Complete Account Registration &rarr;
          </PrimaryButton>
        </form>

        <AuthDivider text="or" />

        <SocialAuthButton
          provider="Google"
          onClick={() => alert("Google Single Sign-On demo. Please use credentials registration above.")}
        />

        <div className="pt-4 border-t border-[#3C4044]/15 text-center text-xs text-[#3C4044]/75">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-[#FD7B41] hover:underline">
            Sign In &rarr;
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  )
}
