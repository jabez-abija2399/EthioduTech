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
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);

  // PREMIUM READING MODE (No Code Sandbox)
  if (!hasSandbox) {
    return (
      <main className="flex-1 overflow-y-auto bg-white relative">
        {/* Subtle premium background gradient */}
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-slate-50 to-white pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-orange-50/50 rounded-full blur-[80px] -translate-x-1/2 pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col min-h-full">
          <div className="flex-1">
            <MarkdownViewer content={content} />
          </div>
          
          <div className="mt-20 pt-10 border-t border-slate-200">
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col items-center text-center shadow-sm">
              <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-[#FD7B41]">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Ready to move on?</h3>
              <p className="text-slate-500 mb-6 max-w-sm">Mark this lesson as complete to track your progress and continue your journey.</p>
              <CompleteLessonButton 
                lessonId={lessonId} 
                courseId={courseId} 
                disabled={!isUnlocked} 
              />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // INTERACTIVE SPLIT-PANE MODE (With Code Sandbox)
  return (
    <main className="flex-1 flex flex-row h-full overflow-hidden relative">
      {/* Left: Markdown Viewer */}
      <div className="w-full md:w-[45%] h-full overflow-y-auto p-6 md:p-10 border-r border-[#3C4044] bg-[#1a1a1a] flex flex-col pb-24 md:pb-10 custom-scrollbar">
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

      {/* Floating Toggle Button for Mobile Workspace */}
      <button
        onClick={() => setIsWorkspaceOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-30 flex items-center justify-center gap-2 px-5 h-14 bg-[#FD7B41] text-white font-bold rounded-full shadow-[0_8px_30px_rgb(253,123,65,0.4)] hover:bg-[#FD7B41]/90 transition-transform hover:scale-105 active:scale-95"
      >
        <TerminalSquare size={20} />
        <span>Workspace</span>
      </button>

      {/* Right: Code Sandbox */}
      <div 
        className={`${
          isWorkspaceOpen ? 'translate-y-0' : 'translate-y-full md:translate-y-0'
        } transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] fixed inset-0 z-50 md:relative md:z-0 w-full md:w-[55%] h-full bg-[#1e1e1e] flex flex-col shadow-2xl md:shadow-none`}
      >
        <div className="p-3 bg-[#252526] border-b border-[#3C4044] text-xs font-semibold text-gray-400 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <TerminalSquare size={16} className="text-[#FD7B41]" />
            <span className="tracking-widest uppercase">Interactive Workspace</span>
          </div>
          <button 
            className="md:hidden p-1.5 bg-[#3C4044] text-gray-300 hover:text-white hover:bg-gray-600 rounded-md transition-colors"
            onClick={() => setIsWorkspaceOpen(false)}
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-hidden relative">
          <CodeSandbox 
            initialFiles={initialSandboxFiles} 
            tests={tests}
            onTestsPass={() => setIsUnlocked(true)}
          />
        </div>
      </div>
    </main>
  );
}
