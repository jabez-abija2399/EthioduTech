import { Folder, Layers, Rocket, ShieldCheck, Star } from "lucide-react";

export function ProjectJourney() {
  const steps = [
    {
      title: "First Code",
      desc: "Small interactive exercises.",
      icon: <Star className="w-5 h-5 text-white" />,
      color: "bg-[#DDDCDB]"
    },
    {
      title: "Mini Project",
      desc: "Putting concepts together.",
      icon: <Layers className="w-5 h-5 text-white" />,
      color: "bg-[#EDBF9B]"
    },
    {
      title: "Guided App",
      desc: "Building with step-by-step help.",
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
      color: "bg-[#FD7B41]"
    },
    {
      title: "Portfolio Project",
      desc: "Independent creation.",
      icon: <Rocket className="w-5 h-5 text-white" />,
      color: "bg-[#3C4044]"
    }
  ];

  return (
    <section className="bg-white py-24 border-b border-[#DDDCDB]/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#3C4044] mb-4">
            Not just a list of lessons.
            <br />A <span className="text-[#FD7B41]">journey.</span>
          </h2>
          <p className="text-lg text-[#3C4044]/70">
            You don't learn by completing isolated quizzes. You learn by progressing from basic exercises to full-scale independent projects.
          </p>
        </div>

        <div className="relative">
          {/* Path Line */}
          <div className="hidden md:block absolute top-10 left-0 w-full h-1 bg-gradient-to-r from-[#DDDCDB]/50 via-[#EDBF9B]/50 to-[#3C4044] -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center relative group">
                <div className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mb-6 shadow-xl transform group-hover:-translate-y-2 transition duration-300 relative z-10`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-[#3C4044] mb-2">{step.title}</h3>
                <p className="text-[#3C4044]/60 text-sm max-w-[200px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
