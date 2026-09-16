"use client";

import React, { useEffect, useRef } from 'react';
import { ConsoleEntry } from './sandbox-runtime';
import { Trash2 } from 'lucide-react';

interface ConsolePaneProps {
  logs: ConsoleEntry[];
  onClear: () => void;
}

export function ConsolePane({ logs, onClear }: ConsolePaneProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom on new logs
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getColor = (level?: string) => {
    switch (level) {
      case 'error': return 'text-red-400 bg-red-950/30';
      case 'warn': return 'text-yellow-400 bg-yellow-950/30';
      case 'info': return 'text-blue-400';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-t border-[#3C4044]">
      <div className="flex justify-between items-center p-2 bg-[#2c3034] border-b border-[#3C4044]">
        <span className="text-sm font-semibold text-gray-300">Console</span>
        <button 
          onClick={onClear}
          className="p-1 hover:bg-[#3C4044] rounded text-gray-400 hover:text-white transition-colors"
          title="Clear Console"
        >
          <Trash2 size={14} />
        </button>
      </div>
      <div className="flex-1 overflow-auto p-2 font-mono text-sm">
        {logs.length === 0 ? (
          <div className="text-gray-500 italic">No output...</div>
        ) : (
          logs.map((log) => (
            <div 
              key={log.id} 
              className={`py-1 px-2 border-b border-[#333] whitespace-pre-wrap ${getColor(log.level)}`}
            >
              {log.message}
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
