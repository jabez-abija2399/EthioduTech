"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ActiveTab, SandboxFiles } from './sandbox-types';
import { EditorTabs } from './EditorTabs';
import { EditorPane } from './EditorPane';
import { RunControls } from './RunControls';
import { PreviewFrame } from './PreviewFrame';
import { ConsolePane } from './ConsolePane';
import { TestResultsPanel } from './TestResultsPanel';
import { buildSandboxDocument } from './sandbox-security';
import { useSandboxRuntime } from './sandbox-runtime';

import { TestCase, TestResult } from './sandbox-types';

interface CodeSandboxProps {
  initialFiles: SandboxFiles;
  tests?: TestCase[];
  onTestsPass?: () => void;
}import { TutorDrawer } from '../tutor/TutorDrawer';

export function CodeSandbox({ initialFiles, tests = [], onTestsPass }: CodeSandboxProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('html');
  const [files, setFiles] = useState<SandboxFiles>(initialFiles);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  
  // Tutor State
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [tutorHint, setTutorHint] = useState("");
  const [tutorLoading, setTutorLoading] = useState(false);
  
  // The document currently running in the iframe
  const [runningDoc, setRunningDoc] = useState<string>('');

  const handleTestResults = useCallback((results: TestResult[]) => {
    setTestResults(results);
    const allPassed = results.length > 0 && results.every(r => r.passed);
    if (allPassed && onTestsPass) {
      onTestsPass();
    }
  }, [onTestsPass]);

  const {
    consoleLog,
    runKey,
    runCode,
    clearConsole,
    handleMessage
  } = useSandboxRuntime(handleTestResults);

  // On mount and when runKey changes (which happens on Run or Timeout), we build the new srcDoc
  useEffect(() => {
    setRunningDoc(buildSandboxDocument(files, tests));
  }, [runKey]); // purposely ignoring 'files' because we only want to update on Run

  const handleFileChange = (tab: keyof SandboxFiles, value: string) => {
    setFiles(prev => ({ ...prev, [tab]: value }));
  };

  const handleReset = () => {
    const confirmed = window.confirm('Are you sure you want to reset your code to the starter state?');
    if (confirmed) {
      setFiles(initialFiles);
      setTestResults([]);
      runCode(); // automatically run the reset code
    }
  };

  const handleGetHint = async () => {
    setIsTutorOpen(true);
    setTutorLoading(true);
    
    try {
      const res = await fetch('/api/tutor/hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          html: files.html,
          css: files.css,
          js: files.js,
          failingTests: testResults.filter(t => !t.passed).map(t => t.description),
          // We can just grab the lesson title from the page if we want, or pass it down. 
          // For now, we'll just send "Current Sandbox" since we didn't pass title down to CodeSandbox.
          lessonTitle: "Current Sandbox" 
        })
      });
      const data = await res.json();
      if (data.hint) {
        setTutorHint(data.hint);
      } else {
        setTutorHint("Sorry, I encountered an error: " + (data.error || "Unknown"));
      }
    } catch (e) {
      setTutorHint("Network error while trying to reach the AI Tutor.");
    } finally {
      setTutorLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row w-full h-full border border-[#3C4044] rounded-lg overflow-hidden shadow-lg bg-[#2d2d2d]">
      
      {/* LEFT PANE: Editor (50% on desktop) */}
      <div className="flex flex-col w-full md:w-1/2 h-1/2 md:h-full border-b md:border-b-0 md:border-r border-[#3C4044]">
        <EditorTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* We keep all editors in DOM (or just the active one) for state preservation. 
            react-simple-code-editor is controlled so we can unmount inactive ones safely. */}
        <EditorPane 
          activeTab={activeTab} 
          files={files} 
          onChange={handleFileChange} 
        />
        
        <RunControls onRun={runCode} onReset={handleReset} onGetHint={handleGetHint} />
      </div>

      {/* RIGHT PANE: Preview & Console (50% on desktop) */}
      <div className="flex flex-col w-full md:w-1/2 h-1/2 md:h-full bg-white">
        
        {/* Top half of right pane: Preview */}
        <div className="flex-1 relative border-b border-[#3C4044]">
          {/* Key forces complete iframe remount on run to ensure clean state */}
          <PreviewFrame key={runKey} srcDoc={runningDoc} onMessage={handleMessage} />
        </div>

        {/* Bottom half of right pane: Console & Tests */}
        <div className="flex h-1/3 min-h-[150px] bg-[#1e1e1e]">
          <div className={`${tests.length > 0 ? 'w-1/2 border-r border-[#3C4044]' : 'w-full'} flex flex-col h-full`}>
            <ConsolePane logs={consoleLog} onClear={clearConsole} />
          </div>
          {tests.length > 0 && (
            <div className="w-1/2 flex flex-col h-full bg-[#252526]">
              <TestResultsPanel tests={tests} results={testResults} />
            </div>
          )}
        </div>

      </div>

      {/* OVERLAY: Tutor Drawer */}
      <TutorDrawer 
        isOpen={isTutorOpen} 
        onClose={() => setIsTutorOpen(false)} 
        hint={tutorHint} 
        loading={tutorLoading} 
        onGetHint={handleGetHint} 
      />
    </div>
  );
}
