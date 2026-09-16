import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getRedirectPath } from "@/lib/auth-redirect";
import { HeroSection } from "@/components/marketing/hero-section";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    const role = (session.user as any).role
    redirect(getRedirectPath(role));
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#3C4044] text-[#DDDCDB] font-sans">
      <header className="flex justify-between items-center p-6 bg-[#3C4044]/80 backdrop-blur-md border-b border-[#DDDCDB]/10 sticky top-0 z-50 transition-all">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FD7B41] to-[#EDBF9B] flex items-center justify-center text-[#3C4044] font-black text-xl shadow-lg shadow-[#FD7B41]/20">
            E
          </div>
          <div className="text-2xl font-extrabold tracking-tight text-white">Edutech</div>
        </div>
        <nav className="flex items-center gap-2 md:gap-4">
          <Link href="/login" className="px-4 py-2 text-[#DDDCDB] font-bold hover:text-white transition">Log in</Link>
          <Link href="/register" className="hidden sm:inline-flex px-5 py-2.5 bg-[#FD7B41] text-white font-bold rounded-xl hover:bg-[#FD7B41]/90 transition shadow-md shadow-[#FD7B41]/20">
            Get Started
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col">
        <HeroSection />
      </main>

      <footer className="p-8 text-center text-[#DDDCDB]/50 text-sm bg-[#3C4044] border-t border-[#DDDCDB]/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>&copy; {new Date().getFullYear()} Edutech. Designed for Ethiopia, Built for the World.</div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition">Terms</Link>
            <Link href="#" className="hover:text-white transition">Privacy</Link>
            <Link href="#" className="hover:text-white transition">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
