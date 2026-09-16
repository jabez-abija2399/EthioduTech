import { Code2, Compass, ShieldCheck, Sparkles, BookOpen } from "lucide-react";

export function TrustStrip() {
  const values = [
    {
      icon: <Code2 className="w-5 h-5 text-[#FD7B41]" />,
      title: "Hands-on learning",
      desc: "Code in the browser"
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#EDBF9B]" />,
      title: "Real projects",
      desc: "Build actual apps"
    },
    {
      icon: <Compass className="w-5 h-5 text-[#FD7B41]" />,
      title: "Personalized path",
      desc: "Learn at your pace"
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: "Safe environment",
      desc: "Designed for young learners"
    },
  ];

  return (
    <section className="bg-white/5 border-b border-[#DDDCDB]/10 py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-4">
        {values.map((v, i) => (
          <div key={i} className="flex items-center gap-3 bg-[#3C4044] px-4 py-2 rounded-lg border border-[#DDDCDB]/10 min-w-[200px]">
            <div className="flex-shrink-0 bg-white/5 p-2 rounded-md">
              {v.icon}
            </div>
            <div>
              <div className="text-sm font-bold text-white">{v.title}</div>
              <div className="text-xs text-[#DDDCDB]/70">{v.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
