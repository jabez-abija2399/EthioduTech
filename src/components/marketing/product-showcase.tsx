import { Play, Sparkles, Terminal } from "lucide-react";

export function ProductShowcase() {
  return (
    <section id="learn" className="bg-[#DDDCDB] py-24 border-b border-[#3C4044]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#3C4044] mb-4">
            Don't just watch. <span className="text-[#FD7B41]">Code it.</span>
          </h2>
          <p className="text-lg text-[#3C4044]/80">
            Learn the concept. Write the code. See it work instantly. Our integrated environment removes the barrier between learning and building.
          </p>
        </div>

        {/* Browser / Editor Mockup */}
        <div className="max-w-5xl mx-auto bg-[#3C4044] rounded-2xl shadow-2xl overflow-hidden border border-[#3C4044]/20 flex flex-col">
          {/* Editor Header */}
          <div className="bg-[#2a2d30] px-4 py-3 flex items-center gap-4 border-b border-black/20">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-1 text-center">
              <div className="inline-block px-4 py-1 bg-black/20 rounded-md text-xs font-mono text-[#DDDCDB]/60">
                lesson-1-basics.html
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row h-auto lg:h-[500px]">
            {/* Left: Lesson Concept */}
            <div className="w-full lg:w-1/3 bg-[#3C4044] p-6 border-b lg:border-b-0 lg:border-r border-white/5 overflow-y-auto">
              <div className="text-xs font-bold text-[#EDBF9B] tracking-wider mb-2">CONCEPT</div>
              <h3 className="text-xl font-bold text-white mb-4">Building a Button</h3>
              <p className="text-[#DDDCDB]/80 text-sm mb-6 leading-relaxed">
                A button is one of the most important interactive elements on a webpage. To create one, you use the HTML <code>&lt;button&gt;</code> tag.
              </p>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="text-xs font-bold text-white mb-2">CHALLENGE</div>
                <p className="text-sm text-[#DDDCDB]/70 mb-4">Create a button that says "Click me!".</p>
                <button className="w-full py-2 bg-[#FD7B41]/20 text-[#FD7B41] rounded-lg text-sm font-bold flex justify-center items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Get Hint
                </button>
              </div>
            </div>

            {/* Middle: Code Editor */}
            <div className="w-full lg:w-1/3 bg-[#1e2022] p-6 font-mono text-sm border-b lg:border-b-0 lg:border-r border-white/5 relative">
              <div className="absolute top-2 right-4 text-[10px] text-white/30">HTML</div>
              <div className="flex text-white/40 mb-1"><span className="w-6 text-right mr-4 text-white/20">1</span>{'<!-- Write your code below -->'}</div>
              <div className="flex text-white/90 mb-1"><span className="w-6 text-right mr-4 text-[#FD7B41]">2</span><span>&lt;<span className="text-[#EDBF9B]">button</span>&gt;Click me!&lt;/<span className="text-[#EDBF9B]">button</span>&gt;</span></div>
              <div className="flex text-white/40 mb-1"><span className="w-6 text-right mr-4 text-white/20">3</span></div>
              
              <div className="absolute bottom-6 right-6">
                <button className="px-4 py-2 bg-[#FD7B41] text-white rounded-lg text-sm font-bold shadow-lg shadow-[#FD7B41]/20 flex items-center gap-2 hover:bg-[#FD7B41]/90 transition">
                  <Play className="w-4 h-4 fill-current" /> Run Code
                </button>
              </div>
            </div>

            {/* Right: Live Preview */}
            <div className="w-full lg:w-1/3 bg-white p-6 relative flex items-center justify-center min-h-[200px]">
              <div className="absolute top-2 left-4 text-[10px] font-bold text-[#3C4044]/30 uppercase">Live Preview</div>
              <button className="px-6 py-3 bg-[#3C4044] text-white rounded font-bold shadow-md hover:bg-black transition active:scale-95">
                Click me!
              </button>
              
              {/* Success overlay */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 animate-bounce">
                🎉 Challenge Complete!
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
