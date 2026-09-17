import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Protect specific routes
  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isTeacherRoute = pathname.startsWith('/teacher');
  const isParentRoute = pathname.startsWith('/parent');
  const isCoursesRoute = pathname.startsWith('/courses');
  const isAdminRoute = pathname.startsWith('/admin');

  if (isDashboardRoute || isTeacherRoute || isParentRoute || isCoursesRoute || isAdminRoute) {
    const session = await auth();

    // 1. If not authenticated, redirect to /auth
    if (!session?.user) {
      return NextResponse.redirect(new URL('/auth', request.url));
    }

    const role = (session.user as any).role;

    // 2. If student tries to access teacher or parent portal, redirect to dashboard
    if (role === 'STUDENT' && (isTeacherRoute || isParentRoute)) {
      const url = new URL('/dashboard', request.url);
      url.searchParams.set('error', 'unauthorized');
      return NextResponse.redirect(url);
    }
    
    // 3. Similarly for parents trying to access teacher routes
    if (role === 'PARENT' && isTeacherRoute) {
      const url = new URL('/parent', request.url);
      url.searchParams.set('error', 'unauthorized');
      return NextResponse.redirect(url);
    }

    // 4. Teachers trying to access parent routes
    if (role === 'TEACHER' && isParentRoute) {
      const url = new URL('/teacher', request.url);
      url.searchParams.set('error', 'unauthorized');
      return NextResponse.redirect(url);
    }

    // 5. Non-admins trying to access admin routes
    if (role !== 'SUPER_ADMIN' && isAdminRoute) {
      const url = new URL('/dashboard', request.url);
      url.searchParams.set('error', 'unauthorized');
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Exclude static files, API routes, and auth page from proxy
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|auth|assets|portfolio).*)',
  ],
};
