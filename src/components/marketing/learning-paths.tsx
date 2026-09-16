import { Code, Server, Brain, Gamepad2, LayoutTemplate } from "lucide-react";
import Link from "next/link";

export function LearningPaths() {
  const paths = [
    {
      icon: <LayoutTemplate className="w-6 h-6 text-[#FD7B41]" />,
      title: "Web Development",
      desc: "Build modern websites from scratch.",
      projects: "Portfolios, Interactive Stories",
      level: "Beginner Friendly",
      accent: "border-[#FD7B41]"
    },
    {
      icon: <Code className="w-6 h-6 text-[#EDBF9B]" />,
      title: "Core Programming",
      desc: "Learn logic, variables, and algorithms with Python or JavaScript.",
      projects: "CLI Tools, Data Parsers",
      level: "Intermediate",
      accent: "border-[#EDBF9B]"
    },
    {
      icon: <Brain className="w-6 h-6 text-[#DDDCDB]" />,
      title: "AI & Data",
      desc: "Understand how data models work and build simple AI integrations.",
      projects: "Smart Chatbots, Data Visuals",
      level: "Advanced",
      accent: "border-[#DDDCDB]"
    }
  ];

  return (
    <section id="paths" className="bg-[#3C4044] py-24 border-b border-[#DDDCDB]/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Clear paths to mastery.
          </h2>
          <p className="text-lg text-[#DDDCDB]/80">
            Tell us what you know, choose your interests, and get a recommended starting point. No more guessing what to learn next.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paths.map((path, i) => (
            <div key={i} className={`bg-white/5 border-t-4 border-l border-r border-b ${path.accent} border-x-[#DDDCDB]/10 border-b-[#DDDCDB]/10 rounded-b-2xl p-6 hover:bg-white/10 transition flex flex-col`}>
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6">
                {path.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{path.title}</h3>
              <p className="text-[#DDDCDB]/70 mb-6 flex-1">
                {path.desc}
              </p>
              
              <div className="space-y-3 pt-6 border-t border-[#DDDCDB]/10">
                <div>
                  <div className="text-xs text-[#DDDCDB]/40 font-bold uppercase tracking-wider mb-1">Projects include</div>
                  <div className="text-sm text-white font-medium">{path.projects}</div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs bg-[#3C4044] px-2 py-1 rounded text-[#DDDCDB]/70">{path.level}</span>
                  <Link href="/register" className="text-sm font-bold text-[#FD7B41] hover:text-[#EDBF9B] transition">Explore path &rarr;</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
