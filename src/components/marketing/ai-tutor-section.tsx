import { Bot, HelpCircle } from "lucide-react";

export function AiTutorSection() {
  return (
    <section className="bg-white py-24 border-b border-[#DDDCDB]/20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Chat Mockup */}
        <div className="bg-[#f8f9fa] border border-[#DDDCDB]/30 rounded-2xl p-6 shadow-xl relative order-2 lg:order-1">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-[#DDDCDB]/20 pb-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#FD7B41]/10 flex items-center justify-center">
              <Bot className="w-5 h-5 text-[#FD7B41]" />
            </div>
            <div>
              <h3 className="font-bold text-[#3C4044]">AI Teaching Assistant</h3>
              <p className="text-xs text-[#3C4044]/50">Always there to help you think.</p>
            </div>
          </div>

          {/* Chat bubbles */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#3C4044]/10 flex items-center justify-center flex-shrink-0 mt-1">
                <HelpCircle className="w-4 h-4 text-[#3C4044]/60" />
              </div>
              <div className="bg-white border border-[#DDDCDB]/30 rounded-2xl rounded-tl-sm p-4 text-sm text-[#3C4044] shadow-sm">
                Why isn't my loop working? It keeps running forever.
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#FD7B41]/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 text-[#FD7B41]" />
              </div>
              <div className="bg-[#FD7B41]/5 border border-[#FD7B41]/20 rounded-2xl rounded-tl-sm p-4 text-sm text-[#3C4044] shadow-sm">
                Good question! Take a look at line 4. What happens to the value of `i` inside the loop body? Is it ever increasing?
              </div>
            </div>
          </div>
        </div>

        {/* Right: Copy */}
        <div className="order-1 lg:order-2">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#3C4044] mb-6">
            Get help without giving up the <span className="text-[#FD7B41]">thinking.</span>
          </h2>
          <p className="text-lg text-[#3C4044]/70 leading-relaxed mb-6">
            Our AI Tutor doesn't just hand out answers. It acts like a real teacher—asking guiding questions, clarifying concepts, and helping students debug their own logic so they actually learn.
          </p>
          <ul className="space-y-3">
            {[
              "Explains tricky concepts simply.",
              "Provides hints without spoiling the answer.",
              "Reviews logic instead of writing code for you.",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-[#3C4044]/80 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FD7B41]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
