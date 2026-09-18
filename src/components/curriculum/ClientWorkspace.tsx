"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { MarkdownViewer } from './MarkdownViewer';
import { CompleteLessonButton } from './CompleteLessonButton';
import { CodeSandbox } from '../sandbox/CodeSandbox';
import { TestCase } from '../sandbox/sandbox-types';
import { TerminalSquare, X, BookOpen, GripVertical } from 'lucide-react';

interface ClientWorkspaceProps {
  lessonId: string;
  courseId: string;
  content: string;
  initialSandboxFiles: any;
  tests: TestCase[];
  hasSandbox?: boolean;
}

const MIN_LEFT_PERCENT = 20;  // left pane minimum: 20%
const MAX_LEFT_PERCENT = 80;  // left pane maximum: 80%
const DEFAULT_LEFT_PERCENT = 45;

export function ClientWorkspace({
  lessonId,
  courseId,
  content,
  initialSandboxFiles,
  tests,
  hasSandbox = false
}: ClientWorkspaceProps) {
  const hasTests = tests.length > 0;
  const [isUnlocked, setIsUnlocked] = useState(!hasTests);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(hasSandbox);

  // Resizable split state
  const [leftPercent, setLeftPercent] = useState(DEFAULT_LEFT_PERCENT);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const sandboxFiles = initialSandboxFiles || {
    html: '<h1>Hello World</h1>',
    css: 'h1 { color: #FD7B41; font-family: system-ui; }',
    js: 'console.log("Welcome to the Sandbox!");'
  };

  // ── Drag logic ──────────────────────────────────────────────────────────────
  const startDrag = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.min(MAX_LEFT_PERCENT, Math.max(MIN_LEFT_PERCENT, (x / rect.width) * 100));
    setLeftPercent(pct);
  }, [isDragging]);

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const pct = Math.min(MAX_LEFT_PERCENT, Math.max(MIN_LEFT_PERCENT, (x / rect.width) * 100));
    setLeftPercent(pct);
  }, [isDragging]);

  const stopDrag = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', stopDrag);
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', stopDrag);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', stopDrag);
    };
  }, [isDragging, onMouseMove, onTouchMove, stopDrag]);

  // Double-click on divider resets to default split
  const resetSplit = useCallback(() => setLeftPercent(DEFAULT_LEFT_PERCENT), []);

  return (
    <main
      ref={containerRef}
      className="flex-1 flex flex-row h-full overflow-hidden relative bg-[#1a1a1a]"
      style={{ cursor: isDragging ? 'col-resize' : 'auto' }}
    >
      {/* ── Left: Reading Panel ─────────────────────────────────────────────── */}
      <div
        className="h-full overflow-y-auto p-6 md:p-10 flex flex-col pb-24 md:pb-10 custom-scrollbar relative z-10 shrink-0 hidden md:flex"
        style={{ width: `${leftPercent}%` }}
      >
        <div className="flex-1">
          <MarkdownViewer content={content} />
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="bg-[#2a2d32] rounded-2xl p-6 border border-[#3C4044]/50 flex flex-col items-center text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FD7B41]/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="w-10 h-10 bg-[#FD7B41]/10 rounded-full flex items-center justify-center mb-3 text-[#FD7B41] border border-[#FD7B41]/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Ready to move on?</h3>
            <p className="text-sm text-slate-400 mb-5 max-w-[250px]">Mark this lesson as complete to track your progress.</p>
            <CompleteLessonButton lessonId={lessonId} courseId={courseId} disabled={!isUnlocked} />
            {hasTests && !isUnlocked && (
              <p className="text-xs text-[#FD7B41] mt-4 font-semibold flex items-center gap-2 bg-[#FD7B41]/10 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FD7B41] animate-pulse" />
                Pass sandbox tests to unlock
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Drag Divider (Desktop only) ─────────────────────────────────────── */}
      <div
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        onDoubleClick={resetSplit}
        title="Drag to resize · Double-click to reset"
        className={`hidden md:flex shrink-0 w-[5px] h-full items-center justify-center group relative z-20 transition-colors duration-150 ${
          isDragging ? 'bg-[#FD7B41]/30' : 'bg-[#2a2a2a] hover:bg-[#FD7B41]/20'
        }`}
        style={{ cursor: 'col-resize' }}
      >
        {/* Grip dots */}
        <div className={`flex flex-col gap-1 transition-opacity duration-150 ${isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          <GripVertical size={14} className="text-[#FD7B41]" />
        </div>
        {/* Highlight line */}
        <div className={`absolute inset-y-0 left-[2px] w-[1px] transition-opacity ${isDragging ? 'bg-[#FD7B41] opacity-100' : 'bg-[#FD7B41]/40 opacity-0 group-hover:opacity-100'}`} />
      </div>

      {/* ── Mobile Reading Panel ─────────────────────────────────────────────── */}
      <div className={`md:hidden h-full w-full overflow-y-auto p-6 flex flex-col pb-24 custom-scrollbar ${isWorkspaceOpen ? 'hidden' : 'flex'}`}>
        <div className="flex-1">
          <MarkdownViewer content={content} />
        </div>
        <div className="mt-12 pt-8 border-t border-white/10">
          <CompleteLessonButton lessonId={lessonId} courseId={courseId} disabled={!isUnlocked} />
        </div>
      </div>

      {/* ── Mobile FAB to open sandbox ──────────────────────────────────────── */}
      {!isWorkspaceOpen && (
        <button
          onClick={() => setIsWorkspaceOpen(true)}
          className="md:hidden fixed bottom-6 right-6 z-30 flex items-center justify-center gap-2 px-5 h-14 bg-[#FD7B41] text-white font-bold rounded-full shadow-[0_8px_30px_rgb(253,123,65,0.4)] hover:bg-[#FD7B41]/90 transition-transform hover:scale-105 active:scale-95"
        >
          <TerminalSquare size={20} />
          <span>Open Sandbox</span>
        </button>
      )}

      {/* ── Right: Code Sandbox ─────────────────────────────────────────────── */}
      <div
        className={`${
          isWorkspaceOpen ? 'translate-y-0' : 'translate-y-full'
        } transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] fixed inset-0 z-50 md:relative md:z-0 md:translate-y-0 md:flex-1 h-full bg-[#1e1e1e] flex flex-col shadow-2xl md:shadow-none`}
        <div className="p-3 bg-[#252526] border-b border-[#3C4044] text-xs font-semibold text-gray-400 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <TerminalSquare size={16} className="text-[#FD7B41]" />
            <span className="tracking-widest uppercase">Interactive Workspace</span>
          </div>
          <button
            className="md:hidden p-1.5 bg-[#3C4044] text-gray-300 hover:text-white hover:bg-gray-600 rounded-md transition-colors"
            onClick={() => setIsWorkspaceOpen(false)}
            title="Close Sandbox"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-hidden relative">
          <CodeSandbox
            initialFiles={sandboxFiles}
            tests={tests}
            onTestsPass={() => setIsUnlocked(true)}
          />
        </div>
      </div>
    </main>
  );
}
