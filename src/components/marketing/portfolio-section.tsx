import { Share2, Star } from "lucide-react";
import Link from "next/link";

export function PortfolioSection() {
  return (
    <section className="bg-[#3C4044] py-24 border-b border-[#DDDCDB]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Copy */}
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Build evidence of what you can <span className="text-[#EDBF9B]">do.</span>
          </h2>
          <p className="text-lg text-[#DDDCDB]/80 leading-relaxed mb-8">
            Don't just complete courses. Every milestone project you finish is automatically added to your public portfolio. Show parents, teachers, or future employers what you're capable of building.
          </p>
          <Link href="/register" className="inline-flex px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition items-center gap-2 border border-white/20">
            <Share2 className="w-5 h-5" /> Start your portfolio
          </Link>
        </div>

        {/* Right: Portfolio UI Mockup */}
        <div className="relative">
          {/* Abstract Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FD7B41]/20 rounded-full blur-[80px]" />

          <div className="relative bg-[#2a2d30] border border-[#DDDCDB]/10 rounded-2xl shadow-2xl p-6 md:p-8 transform rotate-2 hover:rotate-0 transition duration-500">
            {/* Header */}
            <div className="flex items-center gap-4 border-b border-white/10 pb-6 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FD7B41] to-[#EDBF9B] flex items-center justify-center text-white font-bold text-2xl">
                Y
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Yabets's Portfolio</h3>
                <p className="text-sm text-[#DDDCDB]/60">Full-Stack Learner • 12 Projects</p>
              </div>
            </div>

            {/* Project List */}
            <div className="space-y-4">
              {[
                { name: "Weather Dashboard", stars: 5, tech: "React, API" },
                { name: "AI Study Assistant", stars: 5, tech: "Python, OpenAI" },
                { name: "Personal Blog", stars: 4, tech: "HTML, CSS" }
              ].map((p, i) => (
                <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-4 flex justify-between items-center group hover:bg-white/10 transition">
                  <div>
                    <h4 className="font-bold text-white group-hover:text-[#FD7B41] transition">{p.name}</h4>
                    <span className="text-xs text-[#DDDCDB]/50">{p.tech}</span>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`w-4 h-4 ${j < p.stars ? 'text-[#EDBF9B] fill-current' : 'text-white/20'}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
