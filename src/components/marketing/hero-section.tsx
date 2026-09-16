import Link from "next/link";
import { Rocket, Code, Laptop, Shield } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#3C4044] text-white py-20 lg:py-32 border-b border-[#DDDCDB]/10">
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[70%] rounded-full bg-[#FD7B41]/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-[#EDBF9B]/10 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#DDDCDB]/10 border border-[#DDDCDB]/20 text-[#DDDCDB] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FD7B41] animate-pulse" />
            Designed for Ethiopia. Built for the World.
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-white">
            Build real skills, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD7B41] to-[#EDBF9B]">
              not just watch videos.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#DDDCDB]/80 max-w-2xl mx-auto font-medium">
            The project-based learning platform for the next generation of builders. 
            Start coding directly in your browser today—even on low bandwidth.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/register" 
              className="w-full sm:w-auto px-8 py-4 bg-[#FD7B41] hover:bg-[#FD7B41]/90 text-white text-lg font-bold rounded-xl shadow-[0_0_40px_-10px_rgba(253,123,65,0.5)] transition transform hover:-translate-y-1 hover:shadow-[0_0_60px_-15px_rgba(253,123,65,0.6)] flex items-center justify-center gap-2"
            >
              <Rocket className="w-5 h-5" />
              <span>Start Learning Now</span>
            </Link>
            <Link 
              href="/login" 
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-[#DDDCDB]/20 text-lg font-bold rounded-xl transition flex items-center justify-center gap-2"
            >
              <span>Sign In to Continue</span>
            </Link>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
          <div className="p-6 rounded-2xl bg-white/5 border border-[#DDDCDB]/10 backdrop-blur-sm flex flex-col items-center text-center gap-4 hover:border-[#FD7B41]/30 transition group">
            <div className="w-12 h-12 rounded-xl bg-[#FD7B41]/10 flex items-center justify-center text-[#FD7B41] group-hover:scale-110 transition">
              <Code className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">In-Browser Sandbox</h3>
            <p className="text-sm text-[#DDDCDB]/60">Write HTML, CSS, and JS directly in your browser with real-time live preview.</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/5 border border-[#DDDCDB]/10 backdrop-blur-sm flex flex-col items-center text-center gap-4 hover:border-[#EDBF9B]/30 transition group">
            <div className="w-12 h-12 rounded-xl bg-[#EDBF9B]/10 flex items-center justify-center text-[#EDBF9B] group-hover:scale-110 transition">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Offline Resilient</h3>
            <p className="text-sm text-[#DDDCDB]/60">Auto-saves to IndexedDB so you never lose your progress, even when disconnected.</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/5 border border-[#DDDCDB]/10 backdrop-blur-sm flex flex-col items-center text-center gap-4 hover:border-[#DDDCDB]/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-[#DDDCDB]/10 flex items-center justify-center text-[#DDDCDB] group-hover:scale-110 transition">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Project Based</h3>
            <p className="text-sm text-[#DDDCDB]/60">Learn by building real portfolios that you can publish and share instantly.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
