// @ts-nocheck
/* eslint-disable */
'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { signUpAction } from '../server/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export function SignUpForm() {
  const t = useTranslations('Auth')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string
    const role = formData.get('role') as 'student' | 'parent'
    const joinCode = formData.get('joinCode') as string

    const result = await signUpAction({ email, password, name, role, joinCode })

    if (!result.ok) {
      // Use i18n key for invalid join code, else literal message
      setError(result.code === 'invalid_join_code' ? t('invalidJoinCode') : result.message)
    } else {
      setSuccess(true)
    }
    
    setIsLoading(false)
  }

  if (success) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6 text-center">
          <p className="text-[var(--success)] font-medium mb-4">{t('success')}</p>
          <Button variant="primary" className="w-full" onClick={() => window.location.href = '/login'}>
            Go to Login
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{t('signUp')}</CardTitle>
        <CardDescription>Join the Ethio EduTech platform</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-[var(--on-error-container)] bg-[var(--error-container)] rounded-md">
              {error}
            </div>
          )}
          
          <div className="flex gap-4 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="role" value="student" defaultChecked className="accent-[var(--primary)] w-4 h-4" />
              <span>{t('roleStudent')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="role" value="parent" className="accent-[var(--primary)] w-4 h-4" />
              <span>{t('roleParent')}</span>
            </label>
          </div>

          <Input name="name" label={t('name')} required minLength={2} />
          <Input name="email" type="email" label={t('email')} required />
          <Input name="password" type="password" label={t('password')} required minLength={6} />
          <Input name="joinCode" label={t('joinCode')} placeholder="e.g. ABC-123" />
        </CardContent>
        <CardFooter>
          <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
            {isLoading ? t('creating') : t('submit')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
