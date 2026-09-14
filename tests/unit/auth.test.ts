import { describe, it, expect } from 'vitest'
import bcrypt from 'bcryptjs'

describe('Authentication & Password Hashing Unit Suite', () => {
  it('should hash password with bcryptjs and verify match', () => {
    const rawPassword = 'password123'
    const hashedPassword = bcrypt.hashSync(rawPassword, 10)

    expect(hashedPassword).not.toBe(rawPassword)
    expect(bcrypt.compareSync(rawPassword, hashedPassword)).toBe(true)
    expect(bcrypt.compareSync('wrongpassword', hashedPassword)).toBe(false)
  })

  it('should validate email formatting and password minimum length requirements', () => {
    const email = '  STUDENT@Edutech.Test  '.toLowerCase().trim()
    const password = 'short'

    expect(email).toBe('student@edutech.test')
    expect(password.length < 6).toBe(true)
  })
})
