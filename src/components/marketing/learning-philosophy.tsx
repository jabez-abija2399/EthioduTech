import { ArrowDown } from "lucide-react";

export function LearningPhilosophy() {
  return (
    <section className="bg-[#3C4044] py-24 border-b border-[#DDDCDB]/10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
          Learning should be something you <span className="text-[#EDBF9B]">do</span>.
        </h2>
        <p className="text-lg md:text-xl text-[#DDDCDB]/80 leading-relaxed mb-16 max-w-2xl mx-auto">
          We don't believe in endless video lectures. We believe in active practice, immediate feedback, and building real projects that matter.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 relative">
          
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1 bg-[#DDDCDB]/10 -z-10" />

          {/* Steps */}
          {[
            { step: "Understand", color: "bg-[#DDDCDB]/10 border-[#DDDCDB]/30 text-white" },
            { step: "Practice", color: "bg-[#FD7B41]/10 border-[#FD7B41]/30 text-[#FD7B41]" },
            { step: "Solve", color: "bg-[#DDDCDB]/10 border-[#DDDCDB]/30 text-white" },
            { step: "Build", color: "bg-[#EDBF9B]/10 border-[#EDBF9B]/30 text-[#EDBF9B]" },
            { step: "Reflect", color: "bg-[#DDDCDB]/10 border-[#DDDCDB]/30 text-white" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-32 h-12 flex items-center justify-center rounded-xl border-2 font-bold text-sm bg-[#3C4044] relative z-10 transition hover:scale-105 cursor-default ${item.color}`}>
                {item.step}
              </div>
              {i !== 4 && (
                <ArrowDown className="w-5 h-5 text-[#DDDCDB]/30 my-2 md:hidden" />
              )}
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}
