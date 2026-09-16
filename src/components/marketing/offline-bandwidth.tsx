import { WifiOff, Download, Database } from "lucide-react";

export function OfflineBandwidth() {
  return (
    <section className="bg-[#3C4044] py-24 border-b border-[#DDDCDB]/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left: Copy */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#DDDCDB]/10 border border-[#DDDCDB]/20 text-[#DDDCDB] text-xs font-bold uppercase tracking-wider mb-6">
            Ethiopia First
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Learning shouldn't stop because the connection <span className="text-[#EDBF9B]">does.</span>
          </h2>
          <p className="text-lg text-[#DDDCDB]/80 leading-relaxed mb-8">
            We built this platform for real-world connectivity. The integrated coding editor and lesson progression automatically cache locally.
          </p>
          <ul className="space-y-4">
            <li className="flex gap-3 text-[#DDDCDB]">
              <Database className="w-6 h-6 text-[#FD7B41] flex-shrink-0" />
              <div>
                <strong className="block text-white">Local Auto-Save</strong>
                <span className="text-sm opacity-70">Code is saved directly to your device (IndexedDB). Never lose progress when the wifi drops.</span>
              </div>
            </li>
            <li className="flex gap-3 text-[#DDDCDB]">
              <Download className="w-6 h-6 text-[#EDBF9B] flex-shrink-0" />
              <div>
                <strong className="block text-white">Lightweight Pages</strong>
                <span className="text-sm opacity-70">No bloated 4K videos required. Code is lightweight and text-based by default.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Right: Visual */}
        <div className="relative flex justify-center">
          <div className="w-full max-w-sm bg-white/5 border border-[#DDDCDB]/20 rounded-2xl p-8 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#FD7B41]" />
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-[#3C4044] border-4 border-[#FD7B41]/20 flex items-center justify-center relative">
                <WifiOff className="w-8 h-8 text-[#FD7B41]" />
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-6 h-6 rounded-full border-2 border-[#3C4044] flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">OK</span>
                </div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <h4 className="text-white font-bold text-lg">Connection Lost</h4>
              <p className="text-[#DDDCDB]/60 text-sm">Don't worry, you can keep coding. We'll sync your progress when you're back online.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
