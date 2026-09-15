import { auth } from "@/auth"

export type Role = "STUDENT" | "TEACHER" | "PARENT" | "ADMIN"

export interface AuthenticatedUser {
  id: string
  name?: string | null
  email?: string | null
  role: Role
}

/**
 * Gets the current authenticated session user or returns null if unauthenticated.
 */
export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  const session = await auth()
  if (!session?.user?.id) return null

  const role = ((session.user as any)?.role || "STUDENT").toUpperCase() as Role
  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role
  }
}

/**
 * Enforces that the current request is from an authenticated user with one of the allowed roles.
 * Throws an error or returns an error object if unauthorized.
 */
export async function assertRole(allowedRoles: Role[]): Promise<AuthenticatedUser> {
  const user = await getAuthenticatedUser()
  
  if (!user) {
    throw new Error("Unauthorized: Authentication required.")
  }

  const normalizedAllowed = allowedRoles.map(r => r.toUpperCase())
  if (!normalizedAllowed.includes(user.role)) {
    throw new Error(`Forbidden: Insufficient permissions for role '${user.role}'. Required: ${allowedRoles.join(", ")}`)
  }

  return user
}

/**
 * Non-throwing check if the active session user possesses any of the specified roles.
 */
export async function hasRole(allowedRoles: Role[]): Promise<boolean> {
  const user = await getAuthenticatedUser()
  if (!user) return false

  const normalizedAllowed = allowedRoles.map(r => r.toUpperCase())
  return normalizedAllowed.includes(user.role)
}
