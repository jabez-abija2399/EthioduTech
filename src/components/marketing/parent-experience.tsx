import { LineChart, LayoutList, Trophy } from "lucide-react";

export function ParentExperience() {
  return (
    <section id="parents" className="bg-[#f8f9fa] py-24 border-b border-[#DDDCDB]/20">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#3C4044] mb-4">
            See how your child is <span className="text-[#FD7B41]">growing.</span>
          </h2>
          <p className="text-lg text-[#3C4044]/80">
            Understand their progress without hovering over every lesson. Our parent dashboard gives you visibility into the skills they are actually mastering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-[#DDDCDB]/40 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#EDBF9B]/20 flex items-center justify-center mb-6">
              <Trophy className="w-6 h-6 text-[#EDBF9B]" />
            </div>
            <h3 className="text-xl font-bold text-[#3C4044] mb-2">Skills Mastered</h3>
            <p className="text-[#3C4044]/60">Track which programming languages and computer science concepts they have successfully demonstrated.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl border border-[#DDDCDB]/40 shadow-sm relative transform md:-translate-y-4">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#FD7B41] rounded-t-2xl"></div>
            <div className="w-12 h-12 rounded-full bg-[#FD7B41]/20 flex items-center justify-center mb-6">
              <LayoutList className="w-6 h-6 text-[#FD7B41]" />
            </div>
            <h3 className="text-xl font-bold text-[#3C4044] mb-2">Projects Built</h3>
            <p className="text-[#3C4044]/60">View their portfolio directly. See the actual applications, websites, and games they are creating.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl border border-[#DDDCDB]/40 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#DDDCDB]/20 flex items-center justify-center mb-6">
              <LineChart className="w-6 h-6 text-[#3C4044]" />
            </div>
            <h3 className="text-xl font-bold text-[#3C4044] mb-2">Learning Consistency</h3>
            <p className="text-[#3C4044]/60">Monitor their weekly activity and streaks to help them build long-term problem-solving habits.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
