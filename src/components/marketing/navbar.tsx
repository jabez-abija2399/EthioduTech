import Link from "next/link";
import { Menu } from "lucide-react";

export function Navbar() {
  return (
    <header className="flex justify-between items-center px-4 md:px-8 py-4 bg-[#3C4044]/90 backdrop-blur-md border-b border-[#DDDCDB]/10 sticky top-0 z-50 transition-all w-full">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FD7B41] to-[#EDBF9B] flex items-center justify-center text-[#3C4044] font-black text-xl shadow-md group-hover:shadow-[#FD7B41]/20 transition-all">
            E
          </div>
          <div className="text-xl md:text-2xl font-extrabold tracking-tight text-white group-hover:text-[#DDDCDB] transition-colors">
            Edutech
          </div>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-8">
        <div className="flex gap-6 text-sm font-bold text-[#DDDCDB]/80">
          <Link href="#learn" className="hover:text-white transition-colors">Learn</Link>
          <Link href="#paths" className="hover:text-white transition-colors">Paths</Link>
          <Link href="#projects" className="hover:text-white transition-colors">Projects</Link>
          <Link href="#parents" className="hover:text-white transition-colors">For Parents</Link>
          <Link href="#teachers" className="hover:text-white transition-colors">For Teachers</Link>
        </div>
      </nav>

      {/* Desktop Actions */}
      <div className="hidden lg:flex items-center gap-4">
        <Link href="/login" className="px-4 py-2 text-sm font-bold text-[#DDDCDB] hover:text-white transition">
          Sign in
        </Link>
        <Link href="/register" className="px-5 py-2.5 bg-[#FD7B41] text-white text-sm font-bold rounded-xl hover:bg-[#FD7B41]/90 transition shadow-sm hover:shadow-[#FD7B41]/20">
          Start Learning
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="lg:hidden p-2 text-[#DDDCDB] hover:text-white hover:bg-white/5 rounded-lg transition">
        <Menu className="w-6 h-6" />
      </button>
    </header>
  );
}
