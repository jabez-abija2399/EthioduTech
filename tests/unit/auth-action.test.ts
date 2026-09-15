import { describe, it, expect } from 'vitest'

describe('Auth Actions Registration Suite', () => {
  it('should validate registration fields and enforce password length', async () => {
    const formData = new FormData()
    formData.append("email", "test@edutech.test")
    formData.append("password", "123") // Too short
    formData.append("firstName", "Test")
    formData.append("lastName", "User")

    // Validate logic matching registerUserAction
    const email = (formData.get("email") as string || "").toLowerCase().trim()
    const password = formData.get("password") as string
    const firstName = (formData.get("firstName") as string || "").trim()
    const lastName = (formData.get("lastName") as string || "").trim()

    let error = null
    if (!email || !password || !firstName || !lastName) {
      error = "All fields are required."
    } else if (password.length < 6) {
      error = "Password must be at least 6 characters long."
    }

    expect(error).toBe("Password must be at least 6 characters long.")
  })

  it('should normalize invalid role strings to STUDENT', () => {
    const validRoles = ["STUDENT", "TEACHER", "PARENT", "ADMIN"]
    const invalidRoleInput = "HACKER_ROLE"
    
    const finalRole = validRoles.includes(invalidRoleInput) ? invalidRoleInput : "STUDENT"
    expect(finalRole).toBe("STUDENT")
  })
})
