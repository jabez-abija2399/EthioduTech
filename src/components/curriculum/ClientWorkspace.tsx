"use client";

import React, { useState } from 'react';
import { MarkdownViewer } from './MarkdownViewer';
import { CompleteLessonButton } from './CompleteLessonButton';
import { CodeSandbox } from '../sandbox/CodeSandbox';
import { TestCase } from '../sandbox/sandbox-types';
import { TerminalSquare, X, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface ClientWorkspaceProps {
  lessonId: string;
  courseId: string;
  content: string;
  initialSandboxFiles: any;
  tests: TestCase[];
  hasSandbox?: boolean;
}

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

  // Default blank sandbox if none provided
  const sandboxFiles = initialSandboxFiles || {
    html: '<h1>Hello World</h1>',
    css: 'h1 { color: #FD7B41; }',
    js: 'console.log("Welcome to the Sandbox!");'
  };

  return (
    <main className="flex-1 flex flex-row h-full overflow-hidden relative bg-[#1a1a1a]">
      {/* Left: Markdown Viewer (Always 45% on Desktop, 100% on Mobile) */}
      <div 
        className="h-full w-full md:w-[45%] overflow-y-auto p-6 md:p-10 border-r border-[#3C4044] flex flex-col pb-24 md:pb-10 custom-scrollbar relative z-10"
      >
        <div className="flex-1">
          <MarkdownViewer content={content} />
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10">
          <CompleteLessonButton 
            lessonId={lessonId} 
            courseId={courseId} 
            disabled={!isUnlocked} 
          />
          {hasTests && !isUnlocked && (
            <p className="text-xs text-[#FD7B41] mt-3 font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FD7B41] animate-pulse" />
              Pass all tests in the sandbox to unlock this lesson.
            </p>
          )}
        </div>
      </div>

      {/* Floating Toggle Button to Open Workspace (MOBILE ONLY) */}
      {!isWorkspaceOpen && (
        <button
          onClick={() => setIsWorkspaceOpen(true)}
          className="md:hidden fixed bottom-6 right-6 z-30 flex items-center justify-center gap-2 px-5 h-14 bg-[#FD7B41] text-white font-bold rounded-full shadow-[0_8px_30px_rgb(253,123,65,0.4)] hover:bg-[#FD7B41]/90 transition-transform hover:scale-105 active:scale-95"
        >
          <TerminalSquare size={20} />
          <span>Open Sandbox</span>
        </button>
      )}

      {/* Right: Code Sandbox (Always 55% on Desktop, Overlay on Mobile when open) */}
      <div 
        className={`${
          isWorkspaceOpen ? 'translate-y-0' : 'translate-y-full'
        } transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] fixed inset-0 z-50 md:relative md:z-0 md:translate-y-0 w-full md:w-[55%] h-full bg-[#1e1e1e] flex flex-col shadow-2xl md:shadow-none`}
      >
        <div className="p-3 bg-[#252526] border-b border-[#3C4044] text-xs font-semibold text-gray-400 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <TerminalSquare size={16} className="text-[#FD7B41]" />
            <span className="tracking-widest uppercase">Interactive Workspace</span>
          </div>
          {/* Close button (MOBILE ONLY) */}
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
