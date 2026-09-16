"use client";

import React from 'react';
import { Play, RotateCcw } from 'lucide-react';

interface RunControlsProps {
  onRun: () => void;
  onReset: () => void;
}

export function RunControls({ onRun, onReset }: RunControlsProps) {
  return (
    <div className="flex items-center gap-2 p-2 bg-[#2c3034] border-t border-[#3C4044]">
      <button
        onClick={onRun}
        className="flex items-center gap-2 px-4 py-1.5 bg-[#FD7B41] text-white text-sm font-semibold rounded hover:bg-[#e66a35] transition-colors"
      >
        <Play size={16} />
        Run
      </button>
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-4 py-1.5 bg-transparent border border-[#DDDCDB] text-[#DDDCDB] text-sm font-semibold rounded hover:bg-[#3C4044] transition-colors"
      >
        <RotateCcw size={16} />
        Reset
      </button>
    </div>
  );
}
