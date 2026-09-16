import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="bg-[#3C4044] py-32 border-b border-[#DDDCDB]/10 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#FD7B41]/10 to-[#EDBF9B]/10 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
          Your next project starts <span className="text-[#FD7B41]">here.</span>
        </h2>
        <p className="text-xl text-[#DDDCDB]/80 mb-12 max-w-2xl mx-auto leading-relaxed">
          Learn the skills. Build the project. Discover what you can create.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link 
            href="/register" 
            className="w-full sm:w-auto px-10 py-5 bg-[#FD7B41] hover:bg-[#FD7B41]/90 text-white text-xl font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-[#FD7B41]/20 hover:-translate-y-1"
          >
            Start learning <ArrowRight className="w-6 h-6" />
          </Link>
          <Link 
            href="#paths" 
            className="w-full sm:w-auto px-10 py-5 bg-transparent border border-[#DDDCDB]/30 hover:bg-white/5 text-[#DDDCDB] hover:text-white text-xl font-bold rounded-xl transition flex items-center justify-center"
          >
            Explore learning paths
          </Link>
        </div>
      </div>
    </section>
  );
}
