import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getRedirectPath } from "@/lib/auth-redirect";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    const role = (session.user as any).role
    redirect(getRedirectPath(role));
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="flex justify-between items-center p-6 bg-white shadow-sm sticky top-0 z-10">
        <div className="text-2xl font-extrabold tracking-tight text-blue-600">Edutech</div>
        <nav>
          <Link href="/login" className="px-4 py-2 text-slate-600 font-medium hover:text-blue-600 transition">Log in</Link>
          <Link href="/register" className="ml-2 px-5 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition shadow-sm">
            Get Started
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center sm:p-20">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 text-slate-900">
          Build real skills,<br className="hidden sm:block" /> not just watch videos.
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mb-10">
          The project-based learning platform for the next generation of builders. 
          Start coding directly in your browser today—even on low bandwidth.
        </p>
        <Link 
          href="/register" 
          className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Start Learning Now
        </Link>
      </main>

      <footer className="p-8 text-center text-slate-500 text-sm bg-white border-t border-slate-100">
        &copy; {new Date().getFullYear()} Edutech. Designed for Ethiopia, Built for the World.
      </footer>
    </div>
  );
}
