export function getRedirectPath(role?: string | null, callbackUrl?: string | null): string {
  if (callbackUrl && typeof callbackUrl === "string" && callbackUrl.startsWith("/")) {
    // Prevent redirect loops back to authentication pages
    if (!callbackUrl.startsWith("/login") && !callbackUrl.startsWith("/register")) {
      return callbackUrl
    }
  }

  const normalizedRole = (role || "").toUpperCase()

  switch (normalizedRole) {
    case "TEACHER":
    case "ADMIN":
      return "/teacher"
    case "PARENT":
      return "/parent"
    case "STUDENT":
    default:
      return "/dashboard"
  }
}
