import { ArrowRight, Code, Laptop, Smartphone, TerminalSquare } from "lucide-react";
import Link from "next/link";

export function ProjectShowcase() {
  const projects = [
    {
      title: "Weather Dashboard",
      icon: <Laptop className="w-5 h-5 text-[#FD7B41]" />,
      tags: ["HTML", "CSS", "JavaScript"],
      level: "Intermediate",
      bg: "bg-slate-800"
    },
    {
      title: "Interactive Story",
      icon: <TerminalSquare className="w-5 h-5 text-[#EDBF9B]" />,
      tags: ["Python", "Logic"],
      level: "Beginner",
      bg: "bg-indigo-950"
    },
    {
      title: "Task Manager App",
      icon: <Smartphone className="w-5 h-5 text-emerald-400" />,
      tags: ["React", "State"],
      level: "Advanced",
      bg: "bg-teal-950"
    }
  ];

  return (
    <section id="projects" className="bg-[#3C4044] py-24 border-b border-[#DDDCDB]/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Look at what you can <span className="text-[#FD7B41]">create.</span>
            </h2>
            <p className="text-lg text-[#DDDCDB]/80">
              The platform is project-centered. You don't just learn syntax; you build real, functional applications that solve actual problems.
            </p>
          </div>
          <Link href="/register" className="inline-flex items-center gap-2 text-[#FD7B41] font-bold hover:text-[#EDBF9B] transition">
            Start building <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div key={i} className="group flex flex-col bg-white/5 border border-[#DDDCDB]/10 rounded-2xl overflow-hidden hover:border-[#FD7B41]/50 transition duration-300">
              {/* Project Preview Area */}
              <div className={`h-48 ${project.bg} p-6 flex flex-col justify-between border-b border-[#DDDCDB]/10 relative overflow-hidden`}>
                <div className="flex justify-between items-start relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-md">
                    {project.icon}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-black/30 text-white backdrop-blur-md">
                    {project.level}
                  </span>
                </div>
                {/* Abstract Preview */}
                <div className="absolute bottom-0 left-6 right-6 h-20 bg-white/5 border-t border-x border-white/10 rounded-t-xl overflow-hidden group-hover:h-24 transition-all duration-300">
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-black/20">
                    <div className="w-2 h-2 rounded-full bg-white/20"></div>
                    <div className="w-2 h-2 rounded-full bg-white/20"></div>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="w-1/3 h-2 bg-white/10 rounded"></div>
                    <div className="w-2/3 h-2 bg-white/10 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6 bg-[#3C4044]">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FD7B41] transition-colors">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="text-xs font-medium text-[#DDDCDB]/80 px-2 py-1 bg-[#DDDCDB]/10 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href="/register" className="inline-flex items-center gap-2 text-sm font-bold text-[#DDDCDB] hover:text-white transition">
                  Build this <ArrowRight className="w-4 h-4 transition transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
