export function LearningLoop() {
  const steps = [
    { num: "01", title: "Learn", desc: "Understand the core concept.", color: "text-[#DDDCDB]" },
    { num: "02", title: "Practice", desc: "Write small snippets of code.", color: "text-[#EDBF9B]" },
    { num: "03", title: "Solve", desc: "Fix a broken interactive example.", color: "text-[#FD7B41]" },
    { num: "04", title: "Build", desc: "Create a micro-project from scratch.", color: "text-[#EDBF9B]" },
    { num: "05", title: "Get feedback", desc: "The system reviews your work.", color: "text-[#DDDCDB]" },
    { num: "06", title: "Improve", desc: "Refine based on suggestions.", color: "text-[#FD7B41]" },
    { num: "07", title: "Explain", desc: "Answer a quick check to prove mastery.", color: "text-[#EDBF9B]" },
    { num: "08", title: "Master", desc: "Unlock the next progression level.", color: "text-[#DDDCDB]" },
  ];

  return (
    <section className="bg-white py-24 border-b border-[#DDDCDB]/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#3C4044] mb-4">
            The Active Learning Loop
          </h2>
          <p className="text-lg text-[#3C4044]/70 max-w-2xl">
            This is how every concept on our platform is mastered. No shortcuts, just solid pedagogy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 relative">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col gap-3 group relative">
              <div className="text-4xl md:text-5xl font-black text-[#DDDCDB]/40 group-hover:text-[#FD7B41]/20 transition-colors">
                {step.num}
              </div>
              <h3 className={`text-xl font-bold ${step.color === 'text-[#DDDCDB]' ? 'text-[#3C4044]' : step.color}`}>
                {step.title}
              </h3>
              <p className="text-sm font-medium text-[#3C4044]/60">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
