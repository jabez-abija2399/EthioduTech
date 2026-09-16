import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#3C4044] pt-20 pb-10 border-t border-[#DDDCDB]/10 text-[#DDDCDB]/70">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FD7B41] to-[#EDBF9B] flex items-center justify-center text-[#3C4044] font-black text-xl">
                E
              </div>
              <div className="text-2xl font-extrabold tracking-tight text-white">Edutech</div>
            </div>
            <p className="text-sm max-w-xs leading-relaxed mb-6">
              Designed for Ethiopia. Built for the world. A project-based learning platform where students learn deeply and build boldly.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Learn</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#courses" className="hover:text-white transition">Courses</Link></li>
              <li><Link href="#paths" className="hover:text-white transition">Learning Paths</Link></li>
              <li><Link href="#projects" className="hover:text-white transition">Projects</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">For Families</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#parents" className="hover:text-white transition">Parents</Link></li>
              <li><Link href="#safety" className="hover:text-white transition">Safety</Link></li>
              <li><Link href="#progress" className="hover:text-white transition">Progress</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#about" className="hover:text-white transition">About</Link></li>
              <li><Link href="#contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link href="#terms" className="hover:text-white transition">Terms & Privacy</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-[#DDDCDB]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div>&copy; {new Date().getFullYear()} Edutech. All rights reserved.</div>
          <div className="flex gap-4">
            <span>English (US)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
