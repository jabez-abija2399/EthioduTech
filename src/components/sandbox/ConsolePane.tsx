"use client";

import React, { useEffect, useRef } from 'react';
import { ConsoleEntry } from './sandbox-runtime';
import { Trash2, Terminal } from 'lucide-react';

interface ConsolePaneProps {
  logs: ConsoleEntry[];
  onClear: () => void;
}

function getEntryStyle(level?: string) {
  switch (level) {
    case 'error': return { row: 'border-red-900/30 bg-red-950/20', text: 'text-red-400', prefix: '✖' };
    case 'warn':  return { row: 'border-yellow-900/30 bg-yellow-950/15', text: 'text-yellow-300', prefix: '⚠' };
    case 'info':  return { row: 'border-blue-900/30 bg-blue-950/10', text: 'text-blue-400', prefix: 'ℹ' };
    default:      return { row: 'border-white/5', text: 'text-emerald-300', prefix: '›' };
  }
}

export function ConsolePane({ logs, onClear }: ConsolePaneProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="flex flex-col h-full bg-[#111113]">
      {/* Header */}
      <div className="flex justify-between items-center px-3 py-1.5 bg-[#1a1a1c] border-b border-white/8 shrink-0">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
          <Terminal size={12} className="text-gray-500" />
          Console
          {logs.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-white/8 rounded-full text-gray-400">
              {logs.length}
            </span>
          )}
        </div>
        <button
          onClick={onClear}
          className="p-1 rounded hover:bg-white/8 text-gray-600 hover:text-gray-300 transition-colors"
          title="Clear console"
        >
          <Trash2 size={12} />
        </button>
      </div>

      {/* Log Entries */}
      <div className="flex-1 overflow-auto font-mono text-[12px] leading-relaxed">
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-700">
            <Terminal size={24} className="opacity-30" />
            <span className="text-[11px]">No output yet. Click Run to execute.</span>
          </div>
        ) : (
          logs.map((log) => {
            const style = getEntryStyle(log.level);
            return (
              <div
                key={log.id}
                className={`flex items-start gap-2 px-3 py-1.5 border-b ${style.row} whitespace-pre-wrap`}
              >
                <span className={`shrink-0 select-none mt-0.5 ${style.text}`}>{style.prefix}</span>
                <span className={style.text}>{log.message}</span>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
