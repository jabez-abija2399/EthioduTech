import { Video, CalendarDays } from "lucide-react";

export function LiveLearningSection() {
  return (
    <section className="bg-white py-24 border-b border-[#DDDCDB]/20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left: Video Visual */}
        <div className="order-2 md:order-1 relative h-64 md:h-80 bg-[#3C4044] rounded-2xl p-4 flex flex-col justify-between shadow-2xl border border-[#DDDCDB]/30 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FD7B41]/10 to-transparent"></div>
          <div className="flex justify-between items-start relative z-10">
            <div className="px-3 py-1 bg-red-500 rounded-full text-white text-xs font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> LIVE
            </div>
            <div className="px-3 py-1 bg-black/40 rounded-full text-white text-xs font-bold">
              12 Participants
            </div>
          </div>
          <div className="flex justify-center relative z-10">
            <div className="w-24 h-24 rounded-full bg-[#DDDCDB]/10 flex items-center justify-center border-4 border-white/10 backdrop-blur-sm">
              <Video className="w-8 h-8 text-white/50" />
            </div>
          </div>
          <div className="relative z-10 text-center text-white">
            <div className="font-bold">Weekly Code Review</div>
            <div className="text-xs text-white/50">Instructor: Sarah M.</div>
          </div>
        </div>

        {/* Right: Copy */}
        <div className="order-1 md:order-2">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#3C4044] mb-6">
            Optional <span className="text-[#FD7B41]">live sessions.</span>
          </h2>
          <p className="text-lg text-[#3C4044]/70 leading-relaxed mb-6">
            While the core curriculum is entirely self-paced, students can optionally join live workshops, office hours, and project code reviews.
          </p>
          <div className="flex items-center gap-4 p-4 bg-[#f8f9fa] border border-[#DDDCDB]/40 rounded-xl">
            <div className="w-12 h-12 rounded-lg bg-[#FD7B41]/10 flex items-center justify-center text-[#FD7B41]">
              <CalendarDays className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#3C4044]">Next Session</h4>
              <p className="text-sm text-[#3C4044]/60">Intro to Game Design • Friday 4:00 PM</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
