import { getRoleLandingPage } from "./permissions"

export function getRedirectPath(role?: string | null, callbackUrl?: string | null): string {
  if (callbackUrl && typeof callbackUrl === "string" && callbackUrl.startsWith("/")) {
    // Prevent redirect loops back to authentication pages
    if (!callbackUrl.startsWith("/login") && !callbackUrl.startsWith("/register")) {
      return callbackUrl
    }
  }

  return getRoleLandingPage(role)
}
