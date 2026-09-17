"use client";

import React, { useState } from 'react';
import { MarkdownViewer } from './MarkdownViewer';
import { CompleteLessonButton } from './CompleteLessonButton';
import { CodeSandbox } from '../sandbox/CodeSandbox';
import { TestCase } from '../sandbox/sandbox-types';

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

  return (
    <main className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
      {/* Left: Markdown Viewer */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-y-auto p-6 md:p-10 border-b md:border-b-0 md:border-r border-[#3C4044] flex flex-col">
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

      {/* Right: Code Sandbox */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#2d2d2d] flex flex-col">
        <div className="p-3 bg-[#2c3034] border-b border-[#3C4044] text-xs font-semibold text-gray-300 flex justify-between items-center">
          <span>INTERACTIVE WORKSPACE</span>
        </div>
        <div className="flex-1 p-4 overflow-hidden">
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
