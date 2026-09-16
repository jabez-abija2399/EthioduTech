"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, GraduationCap, School, Users2, Check } from "lucide-react"

// -----------------------------------------------------------------------------
// 1. AUTH HEADER
// -----------------------------------------------------------------------------
export function AuthHeader({
  title,
  subtitle
}: {
  title: string
  subtitle: string
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center space-x-2 mb-3 lg:hidden">
        <span className="text-2xl font-black tracking-tight text-[#3C4044]">Edutech</span>
        <span className="text-[10px] uppercase font-bold tracking-widest bg-[#FD7B41] text-[#3C4044] px-2.5 py-0.5 rounded-full font-sans shadow-xs">
          Official
        </span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3C4044] tracking-tight">{title}</h1>
      <p className="text-[#3C4044]/75 text-xs sm:text-sm mt-1">{subtitle}</p>
    </div>
  )
}

// -----------------------------------------------------------------------------
// 2. FORM FIELD (INPUT)
// -----------------------------------------------------------------------------
export function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = true,
  autoComplete,
  minLength,
  helperText
}: {
  label: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  autoComplete?: string
  minLength?: number
  helperText?: string
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-[#3C4044] mb-1.5">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        minLength={minLength}
        className="w-full px-4 py-3 bg-white border border-[#3C4044]/20 rounded-xl text-sm text-[#3C4044] placeholder-[#3C4044]/40 focus:outline-none focus:border-[#FD7B41] focus:ring-2 focus:ring-[#FD7B41]/20 transition"
      />
      {helperText && <p className="text-[11px] text-[#3C4044]/60 mt-1">{helperText}</p>}
    </div>
  )
}

// -----------------------------------------------------------------------------
// 3. PASSWORD FIELD WITH SHOW/HIDE TOGGLE
// -----------------------------------------------------------------------------
export function PasswordField({
  label = "Password",
  value,
  onChange,
  placeholder = "••••••••",
  required = true,
  autoComplete = "current-password",
  minLength = 6,
  forgotPasswordHref
}: {
  label?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  autoComplete?: string
  minLength?: number
  forgotPasswordHref?: string
}) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="block text-xs font-bold text-[#3C4044]">{label}</label>
        {forgotPasswordHref && (
          <Link href={forgotPasswordHref} className="text-xs font-bold text-[#FD7B41] hover:underline">
            Forgot password?
          </Link>
        )}
      </div>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          required={required}
          minLength={minLength}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full px-4 py-3 bg-white border border-[#3C4044]/20 rounded-xl text-sm text-[#3C4044] placeholder-[#3C4044]/40 focus:outline-none focus:border-[#FD7B41] focus:ring-2 focus:ring-[#FD7B41]/20 transition pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3C4044]/60 hover:text-[#3C4044] transition cursor-pointer"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}

// -----------------------------------------------------------------------------
// 4. PRIMARY CTA BUTTON (#FD7B41 CORAL ORANGE)
// -----------------------------------------------------------------------------
export function PrimaryButton({
  children,
  isSubmitting = false,
  loadingText = "Processing...",
  disabled = false,
  onClick,
  type = "submit"
}: {
  children: React.ReactNode
  isSubmitting?: boolean
  loadingText?: string
  disabled?: boolean
  onClick?: () => void
  type?: "submit" | "button"
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isSubmitting || disabled}
      className="w-full py-3.5 px-5 bg-[#FD7B41] hover:bg-[#FD7B41]/90 text-[#3C4044] font-black text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
    >
      {isSubmitting ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-[#3C4044]" />
          <span>{loadingText}</span>
        </>
      ) : (
        <span>{children}</span>
      )}
    </button>
  )
}

// -----------------------------------------------------------------------------
// 5. SECONDARY & SOCIAL AUTH BUTTONS
// -----------------------------------------------------------------------------
export function SocialAuthButton({
  provider = "Google",
  onClick
}: {
  provider?: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full py-3 px-4 bg-white border border-[#3C4044]/20 hover:bg-[#DDDCDB]/50 text-[#3C4044] font-bold text-xs rounded-xl transition flex items-center justify-center gap-2.5 cursor-pointer shadow-2xs"
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        />
      </svg>
      <span>Continue with {provider}</span>
    </button>
  )
}

// -----------------------------------------------------------------------------
// 6. ROLE SELECTOR (CARDS)
// -----------------------------------------------------------------------------
export function RoleSelector({
  selectedRole,
  onSelectRole
}: {
  selectedRole: string
  onSelectRole: (role: string) => void
}) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-bold text-[#3C4044] mb-2">I am joining as a:</label>
      <div className="grid grid-cols-3 gap-2">
        {/* Student Card */}
        <button
          type="button"
          onClick={() => onSelectRole("STUDENT")}
          className={`p-3 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
            selectedRole === "STUDENT"
              ? "bg-white border-[#FD7B41] ring-2 ring-[#FD7B41]/30 text-[#3C4044] shadow-sm"
              : "bg-white/60 border-[#3C4044]/15 text-[#3C4044]/70 hover:border-[#3C4044]/30"
          }`}
        >
          <div className="flex items-center justify-between">
            <GraduationCap className={`w-4 h-4 ${selectedRole === "STUDENT" ? "text-[#FD7B41]" : "text-[#3C4044]/50"}`} />
            {selectedRole === "STUDENT" && <Check className="w-3.5 h-3.5 text-[#FD7B41]" />}
          </div>
          <div className="mt-2">
            <div className="text-xs font-bold text-[#3C4044]">Student</div>
            <div className="text-[10px] text-[#3C4044]/60 line-clamp-1">Learner Builder</div>
          </div>
        </button>

        {/* Teacher Card */}
        <button
          type="button"
          onClick={() => onSelectRole("TEACHER")}
          className={`p-3 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
            selectedRole === "TEACHER"
              ? "bg-white border-[#FD7B41] ring-2 ring-[#FD7B41]/30 text-[#3C4044] shadow-sm"
              : "bg-white/60 border-[#3C4044]/15 text-[#3C4044]/70 hover:border-[#3C4044]/30"
          }`}
        >
          <div className="flex items-center justify-between">
            <School className={`w-4 h-4 ${selectedRole === "TEACHER" ? "text-[#FD7B41]" : "text-[#3C4044]/50"}`} />
            {selectedRole === "TEACHER" && <Check className="w-3.5 h-3.5 text-[#FD7B41]" />}
          </div>
          <div className="mt-2">
            <div className="text-xs font-bold text-[#3C4044]">Teacher</div>
            <div className="text-[10px] text-[#3C4044]/60 line-clamp-1">Educator Roster</div>
          </div>
        </button>

        {/* Parent Card */}
        <button
          type="button"
          onClick={() => onSelectRole("PARENT")}
          className={`p-3 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
            selectedRole === "PARENT"
              ? "bg-white border-[#FD7B41] ring-2 ring-[#FD7B41]/30 text-[#3C4044] shadow-sm"
              : "bg-white/60 border-[#3C4044]/15 text-[#3C4044]/70 hover:border-[#3C4044]/30"
          }`}
        >
          <div className="flex items-center justify-between">
            <Users2 className={`w-4 h-4 ${selectedRole === "PARENT" ? "text-[#FD7B41]" : "text-[#3C4044]/50"}`} />
            {selectedRole === "PARENT" && <Check className="w-3.5 h-3.5 text-[#FD7B41]" />}
          </div>
          <div className="mt-2">
            <div className="text-xs font-bold text-[#3C4044]">Parent</div>
            <div className="text-[10px] text-[#3C4044]/60 line-clamp-1">Family Guardian</div>
          </div>
        </button>
      </div>
    </div>
  )
}

// -----------------------------------------------------------------------------
// 7. FORM ALERTS (ERROR & SUCCESS)
// -----------------------------------------------------------------------------
export function FormError({ message }: { message: string | null }) {
  if (!message) return null
  return (
    <div className="mb-4 p-3.5 bg-red-500/10 border border-red-500/30 text-red-800 text-xs font-bold rounded-xl flex items-center gap-2">
      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
      <span>{message}</span>
    </div>
  )
}

export function FormSuccess({ message }: { message: string | null }) {
  if (!message) return null
  return (
    <div className="mb-4 p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
      <span>{message}</span>
    </div>
  )
}

// -----------------------------------------------------------------------------
// 8. AUTH DIVIDER
// -----------------------------------------------------------------------------
export function AuthDivider({ text = "or" }: { text?: string }) {
  return (
    <div className="my-5 flex items-center">
      <div className="flex-1 border-t border-[#3C4044]/15"></div>
      <span className="px-3 text-[11px] font-bold text-[#3C4044]/50 uppercase">{text}</span>
      <div className="flex-1 border-t border-[#3C4044]/15"></div>
    </div>
  )
}
