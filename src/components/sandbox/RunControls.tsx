"use client";

import React from 'react';
import { Play, RotateCcw, Sparkles } from 'lucide-react';

interface RunControlsProps {
  onRun: () => void;
  onReset: () => void;
  onGetHint?: () => void;
}

export function RunControls({ onRun, onReset, onGetHint }: RunControlsProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1c] border-t border-white/8 shrink-0">
      {/* Run — primary CTA */}
      <button
        onClick={onRun}
        className="flex items-center gap-1.5 px-4 py-1.5 bg-[#FD7B41] hover:bg-[#e86c34] active:scale-95 text-white text-[12px] font-bold rounded-md transition-all duration-150 shadow-[0_0_12px_rgba(253,123,65,0.25)]"
      >
        <Play size={13} className="fill-white" />
        Run
      </button>

      {/* Reset — secondary */}
      <button
        onClick={onReset}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/6 hover:bg-white/10 active:scale-95 text-gray-300 hover:text-white text-[12px] font-medium rounded-md border border-white/10 transition-all duration-150"
        title="Reset to starter code"
      >
        <RotateCcw size={13} />
        Reset
      </button>

      {/* AI Hint — tertiary, right-aligned */}
      {onGetHint && (
        <button
          onClick={onGetHint}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 active:scale-95 text-indigo-300 hover:text-indigo-200 text-[12px] font-medium rounded-md border border-indigo-500/25 transition-all duration-150"
          title="Ask AI Tutor for a hint"
        >
          <Sparkles size={13} />
          AI Hint
        </button>
      )}
    </div>
  );
}
