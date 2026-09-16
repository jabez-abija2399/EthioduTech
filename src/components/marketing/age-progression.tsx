export function AgeProgression() {
  const bands = [
    {
      age: "AGES 10–12",
      title: "Explore",
      desc: "Creative coding, logic, and digital foundations.",
      color: "border-[#DDDCDB]/30 bg-[#DDDCDB]/5",
      titleColor: "text-[#DDDCDB]"
    },
    {
      age: "AGES 13–15",
      title: "Create",
      desc: "Web development, programming fundamentals, and projects.",
      color: "border-[#EDBF9B]/30 bg-[#EDBF9B]/5",
      titleColor: "text-[#EDBF9B]"
    },
    {
      age: "AGES 16–18",
      title: "Build",
      desc: "Advanced engineering, AI logic, and real-world tools.",
      color: "border-[#FD7B41]/30 bg-[#FD7B41]/5",
      titleColor: "text-[#FD7B41]"
    }
  ];

  return (
    <section className="bg-white py-24 border-b border-[#DDDCDB]/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#3C4044] mb-4">
            A platform that grows with them.
          </h2>
          <p className="text-lg text-[#3C4044]/70">
            From their first line of code to building full-stack applications. The curriculum evolves as your child's capabilities expand.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-[#DDDCDB]/30 via-[#EDBF9B]/30 to-[#FD7B41]/30 -z-10" />

          {bands.map((band, i) => (
            <div key={i} className={`flex-1 flex flex-col p-8 rounded-2xl border ${band.color} relative bg-white`}>
              <div className="text-xs font-bold tracking-widest text-[#3C4044]/40 uppercase mb-2">
                {band.age}
              </div>
              <h3 className={`text-2xl font-black ${band.titleColor} mb-4`}>
                {band.title}
              </h3>
              <p className="text-[#3C4044]/70 font-medium">
                {band.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
