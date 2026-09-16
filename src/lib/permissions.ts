export type Role = "STUDENT" | "TEACHER" | "PARENT" | "ADMIN" | "SUPER_ADMIN"

export type Permission =
  | "VIEW_DASHBOARD"
  | "VIEW_COURSES"
  | "SUBMIT_LESSON"
  | "PUBLISH_PORTFOLIO"
  | "VIEW_TEACHER_ROSTER"
  | "VIEW_PARENT_CHILDREN"
  | "ACCESS_ADMIN_PORTAL"
  | "MANAGE_USERS"
  | "VIEW_AUDIT_LOGS"

export interface NavItem {
  label: string
  href: string
  icon?: string
}

// -----------------------------------------------------------------------------
// 1. ROLE LANDING PAGES (SINGLE SOURCE OF TRUTH)
// -----------------------------------------------------------------------------
export const ROLE_LANDING_PAGES: Record<Role, string> = {
  STUDENT: "/dashboard",
  TEACHER: "/teacher",
  PARENT: "/parent",
  ADMIN: "/admin",
  SUPER_ADMIN: "/admin"
}

// -----------------------------------------------------------------------------
// 2. ATOMIC PERMISSIONS MAP
// -----------------------------------------------------------------------------
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  STUDENT: [
    "VIEW_DASHBOARD",
    "VIEW_COURSES",
    "SUBMIT_LESSON",
    "PUBLISH_PORTFOLIO"
  ],
  TEACHER: [
    "VIEW_DASHBOARD",
    "VIEW_COURSES",
    "VIEW_TEACHER_ROSTER"
  ],
  PARENT: [
    "VIEW_PARENT_CHILDREN"
  ],
  ADMIN: [
    "VIEW_DASHBOARD",
    "VIEW_COURSES",
    "SUBMIT_LESSON",
    "PUBLISH_PORTFOLIO",
    "VIEW_TEACHER_ROSTER",
    "VIEW_PARENT_CHILDREN",
    "ACCESS_ADMIN_PORTAL",
    "MANAGE_USERS",
    "VIEW_AUDIT_LOGS"
  ],
  SUPER_ADMIN: [
    "VIEW_DASHBOARD",
    "VIEW_COURSES",
    "SUBMIT_LESSON",
    "PUBLISH_PORTFOLIO",
    "VIEW_TEACHER_ROSTER",
    "VIEW_PARENT_CHILDREN",
    "ACCESS_ADMIN_PORTAL",
    "MANAGE_USERS",
    "VIEW_AUDIT_LOGS"
  ]
}

// -----------------------------------------------------------------------------
// 3. ALLOWED ROUTE PREFIXES PER ROLE (STRICT BOUNDARIES)
// -----------------------------------------------------------------------------
export const ROLE_ALLOWED_ROUTES: Record<Role, string[]> = {
  STUDENT: ["/dashboard", "/courses", "/portfolio", "/offline"],
  TEACHER: ["/teacher", "/courses", "/portfolio", "/offline"],
  PARENT: ["/parent", "/portfolio", "/offline"],
  ADMIN: ["/admin", "/teacher", "/parent", "/dashboard", "/courses", "/portfolio", "/offline"],
  SUPER_ADMIN: ["/admin", "/teacher", "/parent", "/dashboard", "/courses", "/portfolio", "/offline"]
}

// -----------------------------------------------------------------------------
// 4. ROLE-ISOLATED NAVIGATION MENU ITEMS
// -----------------------------------------------------------------------------
export function getNavItemsForRole(roleStr?: string | null, studentId?: string | null): NavItem[] {
  const role = ((roleStr || "STUDENT").toUpperCase()) as Role

  switch (role) {
    case "STUDENT":
      return [
        { label: "Dashboard", href: "/dashboard", icon: "📊" },
        ...(studentId ? [{ label: "My Showcase", href: `/portfolio/${studentId}`, icon: "🌐" }] : [])
      ]

    case "TEACHER":
      return [
        { label: "Teacher Portal", href: "/teacher", icon: "👩‍🏫" },
        { label: "Curriculum Overview", href: "/dashboard", icon: "📚" }
      ]

    case "PARENT":
      return [
        { label: "Family Progress", href: "/parent", icon: "👨‍👩‍👧" }
      ]

    case "ADMIN":
    case "SUPER_ADMIN":
      return [
        { label: "⚡ Admin Portal", href: "/admin", icon: "🛡️" },
        { label: "👩‍🏫 Teacher View", href: "/teacher", icon: "👩‍🏫" },
        { label: "👨‍👩‍👧 Parent View", href: "/parent", icon: "👨‍👩‍👧" },
        { label: "🎓 Student View", href: "/dashboard", icon: "🎓" }
      ]

    default:
      return [
        { label: "Dashboard", href: "/dashboard", icon: "📊" }
      ]
  }
}

// -----------------------------------------------------------------------------
// 5. HELPER FUNCTIONS
// -----------------------------------------------------------------------------
export function hasPermission(roleStr?: string | null, permission?: Permission): boolean {
  if (!permission) return false
  const role = ((roleStr || "STUDENT").toUpperCase()) as Role
  const permissions = ROLE_PERMISSIONS[role] || []
  return permissions.includes(permission)
}

export function isRouteAllowedForRole(pathname: string, roleStr?: string | null): boolean {
  const role = ((roleStr || "STUDENT").toUpperCase()) as Role
  const allowedPrefixes = ROLE_ALLOWED_ROUTES[role] || ["/dashboard"]
  
  // Public pages accessible to all
  if (pathname === "/" || pathname.startsWith("/login") || pathname.startsWith("/register") || pathname.startsWith("/api")) {
    return true
  }

  return allowedPrefixes.some(prefix => pathname.startsWith(prefix))
}

export function getRoleLandingPage(roleStr?: string | null): string {
  const role = ((roleStr || "STUDENT").toUpperCase()) as Role
  return ROLE_LANDING_PAGES[role] || "/dashboard"
}
