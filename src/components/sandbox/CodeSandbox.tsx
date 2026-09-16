"use client";

import React, { useState, useEffect } from 'react';
import { ActiveTab, SandboxFiles } from './sandbox-types';
import { EditorTabs } from './EditorTabs';
import { EditorPane } from './EditorPane';
import { RunControls } from './RunControls';
import { PreviewFrame } from './PreviewFrame';
import { ConsolePane } from './ConsolePane';
import { buildSandboxDocument } from './sandbox-security';
import { useSandboxRuntime } from './sandbox-runtime';

interface CodeSandboxProps {
  initialFiles: SandboxFiles;
}

export function CodeSandbox({ initialFiles }: CodeSandboxProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('html');
  const [files, setFiles] = useState<SandboxFiles>(initialFiles);
  
  // The document currently running in the iframe
  const [runningDoc, setRunningDoc] = useState<string>('');

  const {
    consoleLog,
    runKey,
    runCode,
    clearConsole,
    handleMessage
  } = useSandboxRuntime();

  // On mount and when runKey changes (which happens on Run or Timeout), we build the new srcDoc
  useEffect(() => {
    setRunningDoc(buildSandboxDocument(files));
  }, [runKey]); // purposely ignoring 'files' because we only want to update on Run

  const handleFileChange = (tab: keyof SandboxFiles, value: string) => {
    setFiles(prev => ({ ...prev, [tab]: value }));
  };

  const handleReset = () => {
    const confirmed = window.confirm('Are you sure you want to reset your code to the starter state?');
    if (confirmed) {
      setFiles(initialFiles);
      runCode(); // automatically run the reset code
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-[600px] border border-[#3C4044] rounded-lg overflow-hidden shadow-lg bg-[#2d2d2d]">
      
      {/* LEFT PANE: Editor (50% on desktop) */}
      <div className="flex flex-col w-full md:w-1/2 h-[300px] md:h-full border-b md:border-b-0 md:border-r border-[#3C4044]">
        <EditorTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* We keep all editors in DOM (or just the active one) for state preservation. 
            react-simple-code-editor is controlled so we can unmount inactive ones safely. */}
        <EditorPane 
          activeTab={activeTab} 
          files={files} 
          onChange={handleFileChange} 
        />
        
        <RunControls onRun={runCode} onReset={handleReset} />
      </div>

      {/* RIGHT PANE: Preview & Console (50% on desktop) */}
      <div className="flex flex-col w-full md:w-1/2 h-[300px] md:h-full bg-white">
        
        {/* Top half of right pane: Preview */}
        <div className="flex-1 relative border-b border-[#3C4044]">
          {/* Key forces complete iframe remount on run to ensure clean state */}
          <PreviewFrame key={runKey} srcDoc={runningDoc} onMessage={handleMessage} />
        </div>

        {/* Bottom half of right pane: Console (approx 1/3 height) */}
        <div className="h-1/3 min-h-[100px] bg-[#1e1e1e]">
          <ConsolePane logs={consoleLog} onClear={clearConsole} />
        </div>

      </div>
    </div>
  );
}
