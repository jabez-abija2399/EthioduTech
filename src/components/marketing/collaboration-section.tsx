import { Users, UsersRound } from "lucide-react";

export function CollaborationSection() {
  return (
    <section className="bg-[#3C4044] py-24 border-b border-[#DDDCDB]/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left: Copy */}
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Build together. <span className="text-[#EDBF9B]">Safely.</span>
          </h2>
          <p className="text-lg text-[#DDDCDB]/80 leading-relaxed mb-6">
            Learning shouldn't be lonely, but social features for minors must be strictly moderated. We provide safe, purposeful collaboration environments.
          </p>
          <ul className="space-y-4">
            <li className="flex gap-3 text-[#DDDCDB]">
              <Users className="w-6 h-6 text-[#FD7B41] flex-shrink-0" />
              <div>
                <strong className="block text-white">Team Projects</strong>
                <span className="text-sm opacity-70">Work on codebases together in real-time within trusted classroom groups.</span>
              </div>
            </li>
            <li className="flex gap-3 text-[#DDDCDB]">
              <UsersRound className="w-6 h-6 text-[#EDBF9B] flex-shrink-0" />
              <div>
                <strong className="block text-white">Peer Feedback</strong>
                <span className="text-sm opacity-70">Structured project showcases where students can review and inspire each other safely.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Right: Collaboration Visual */}
        <div className="relative h-64 md:h-80 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-center items-center shadow-2xl">
          <div className="flex -space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full border-4 border-[#3C4044] bg-emerald-500 flex items-center justify-center text-white font-bold text-xl z-30">A</div>
            <div className="w-16 h-16 rounded-full border-4 border-[#3C4044] bg-indigo-500 flex items-center justify-center text-white font-bold text-xl z-20">M</div>
            <div className="w-16 h-16 rounded-full border-4 border-[#3C4044] bg-pink-500 flex items-center justify-center text-white font-bold text-xl z-10">K</div>
          </div>
          <div className="text-center">
            <div className="text-white font-bold mb-1">Editing index.html...</div>
            <div className="text-xs text-[#DDDCDB]/50">3 users currently active in session</div>
          </div>
        </div>

      </div>
    </section>
  );
}
