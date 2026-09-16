import { ShieldCheck, Lock, EyeOff } from "lucide-react";

export function SafetySection() {
  const items = [
    {
      icon: <EyeOff className="w-6 h-6 text-[#FD7B41]" />,
      title: "Privacy First",
      desc: "We don't sell student data or run third-party advertising trackers."
    },
    {
      icon: <Lock className="w-6 h-6 text-[#EDBF9B]" />,
      title: "Moderated AI",
      desc: "Our AI tutor operates within strict boundaries to prevent inappropriate interactions."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#DDDCDB]" />,
      title: "Safe Collaboration",
      desc: "Peer interactions are restricted to educational scopes without open social messaging."
    }
  ];

  return (
    <section className="bg-white py-24 border-b border-[#DDDCDB]/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#3C4044] mb-4">
            Built for learning. Designed with <span className="text-[#FD7B41]">safety</span> in mind.
          </h2>
          <p className="text-lg text-[#3C4044]/70">
            We take the responsibility of building software for young learners seriously. Security and privacy aren't afterthoughts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center p-8 rounded-2xl bg-[#f8f9fa] border border-[#DDDCDB]/30">
              <div className="w-14 h-14 rounded-xl bg-white border border-[#DDDCDB]/20 shadow-sm flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-[#3C4044] mb-3">{item.title}</h3>
              <p className="text-[#3C4044]/70 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
