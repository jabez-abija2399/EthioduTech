import Link from "next/link";
import { ArrowRight, Code2, Layout, CheckCircle, Terminal } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#3C4044] text-white pt-20 pb-24 md:pt-32 md:pb-32 border-b border-[#DDDCDB]/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
        
        {/* Left: Copy & CTAs */}
        <div className="flex flex-col items-start max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#DDDCDB]/10 border border-[#DDDCDB]/20 text-[#DDDCDB] text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FD7B41]" />
            Learn deeply. Build boldly.
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white mb-6">
            From curious learner to <span className="text-[#FD7B41]">confident creator.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#DDDCDB]/90 mb-10 leading-relaxed max-w-xl">
            A modern learning platform where students learn through practice, solve real problems, build projects, and develop skills that grow with them.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link 
              href="/register" 
              className="w-full sm:w-auto px-8 py-4 bg-[#FD7B41] hover:bg-[#FD7B41]/90 text-white text-lg font-bold rounded-xl transition flex items-center justify-center gap-2"
            >
              Start learning
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="#paths" 
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/5 text-[#DDDCDB] border border-[#DDDCDB]/30 hover:text-white text-lg font-bold rounded-xl transition flex items-center justify-center gap-2"
            >
              Explore learning paths
            </Link>
          </div>
        </div>

        {/* Right: Product Composition */}
        <div className="relative w-full h-[450px] md:h-[550px] flex items-center justify-center">
          {/* Abstract Nodes/Lines Background */}
          <div className="absolute inset-0 z-0">
            <svg className="w-full h-full opacity-20" viewBox="0 0 400 400" preserveAspectRatio="none">
              <path d="M 50,50 L 200,100 L 350,200 L 200,300 Z" fill="none" stroke="#DDDCDB" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 200,100 L 300,50" fill="none" stroke="#FD7B41" strokeWidth="2" />
            </svg>
          </div>

          {/* Floating UI Elements */}
          <div className="relative z-10 w-full max-w-[500px] aspect-square">
            {/* Top Left: Lesson Context */}
            <div className="absolute top-0 left-0 w-48 bg-white/5 backdrop-blur-xl border border-[#DDDCDB]/20 rounded-xl p-4 shadow-2xl transform -translate-y-4 -rotate-2">
              <div className="flex items-center gap-2 mb-3">
                <Layout className="w-4 h-4 text-[#EDBF9B]" />
                <span className="text-xs font-bold text-[#DDDCDB]">LESSON</span>
              </div>
              <div className="h-2 w-3/4 bg-[#DDDCDB]/20 rounded mb-2"></div>
              <div className="h-2 w-full bg-[#DDDCDB]/20 rounded mb-2"></div>
              <div className="h-2 w-1/2 bg-[#DDDCDB]/20 rounded"></div>
            </div>

            {/* Center: Practice Editor */}
            <div className="absolute top-[20%] left-[10%] w-[80%] bg-[#3C4044] border border-[#DDDCDB]/20 rounded-xl overflow-hidden shadow-2xl z-20">
              <div className="flex items-center gap-2 px-4 py-2 bg-black/20 border-b border-[#DDDCDB]/10">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
                <div className="text-[10px] text-[#DDDCDB]/50 ml-2 font-mono">PRACTICE</div>
              </div>
              <div className="p-4 font-mono text-xs md:text-sm text-[#EDBF9B]">
                <div className="flex"><span className="text-[#FD7B41] mr-2">1</span> <span>function solve() {'{'}</span></div>
                <div className="flex"><span className="text-[#FD7B41] mr-2">2</span> <span className="ml-4 text-white">return "Built it!";</span></div>
                <div className="flex"><span className="text-[#FD7B41] mr-2">3</span> <span>{'}'}</span></div>
                
                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FD7B41]/20 text-[#FD7B41] rounded-lg">
                  <Terminal className="w-3 h-3" /> Run Code
                </div>
              </div>
            </div>

            {/* Bottom Right: Project Outcome */}
            <div className="absolute bottom-[10%] right-0 w-56 bg-white/10 backdrop-blur-xl border border-[#FD7B41]/30 rounded-xl p-4 shadow-2xl z-30 transform rotate-2">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#FD7B41]" />
                  <span className="text-xs font-bold text-white">PROJECT</span>
                </div>
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="aspect-video bg-black/30 rounded-lg flex items-center justify-center border border-[#DDDCDB]/10">
                <div className="text-[#DDDCDB] font-bold text-sm">Weather App</div>
              </div>
            </div>

            {/* Floating Connection Badge */}
            <div className="absolute top-[45%] -right-[5%] bg-[#EDBF9B] text-[#3C4044] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-40 transform rotate-12">
              Progress Saved
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
