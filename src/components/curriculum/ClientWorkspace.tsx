"use client";

import React, { useState } from 'react';
import { MarkdownViewer } from './MarkdownViewer';
import { CompleteLessonButton } from './CompleteLessonButton';
import { CodeSandbox } from '../sandbox/CodeSandbox';
import { TestCase } from '../sandbox/sandbox-types';
import { TerminalSquare, X } from 'lucide-react';

interface ClientWorkspaceProps {
  lessonId: string;
  courseId: string;
  content: string;
  initialSandboxFiles: any;
  tests: TestCase[];
}

export function ClientWorkspace({
  lessonId,
  courseId,
  content,
  initialSandboxFiles,
  tests
}: ClientWorkspaceProps) {
  const hasTests = tests.length > 0;
  // If there are no tests, the lesson is unlocked by default
  const [isUnlocked, setIsUnlocked] = useState(!hasTests);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);

  return (
    <main className="flex-1 flex flex-row h-full overflow-hidden relative">
      {/* Left: Markdown Viewer */}
      <div className="w-full md:w-1/2 h-full overflow-y-auto p-6 md:p-10 border-r border-[#3C4044] flex flex-col pb-24 md:pb-10">
        <div className="flex-1">
          <MarkdownViewer content={content} />
        </div>
        <div className="mt-8">
          <CompleteLessonButton 
            lessonId={lessonId} 
            courseId={courseId} 
            disabled={!isUnlocked} 
          />
          {hasTests && !isUnlocked && (
            <p className="text-xs text-[#FD7B41] mt-2 font-semibold">
              * Pass all tests in the sandbox to unlock this lesson.
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
        } transition-transform duration-300 ease-in-out fixed inset-0 z-50 md:relative md:z-0 w-full md:w-1/2 h-full bg-[#2d2d2d] flex flex-col shadow-2xl md:shadow-none`}
      >
        <div className="p-3 bg-[#2c3034] border-b border-[#3C4044] text-xs font-semibold text-gray-300 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <TerminalSquare size={16} className="text-[#FD7B41]" />
            <span>INTERACTIVE WORKSPACE</span>
          </div>
          <button 
            className="md:hidden p-1.5 bg-[#3C4044] text-gray-300 hover:text-white hover:bg-gray-600 rounded-md transition-colors"
            onClick={() => setIsWorkspaceOpen(false)}
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex-1 p-2 md:p-4 overflow-hidden relative">
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
