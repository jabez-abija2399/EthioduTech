"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ActiveTab, SandboxFiles, TestCase, TestResult } from './sandbox-types';
import { EditorTabs } from './EditorTabs';
import { EditorPane } from './EditorPane';
import { RunControls } from './RunControls';
import { PreviewFrame } from './PreviewFrame';
import { ConsolePane } from './ConsolePane';
import { TestResultsPanel } from './TestResultsPanel';
import { buildSandboxDocument } from './sandbox-security';
import { useSandboxRuntime } from './sandbox-runtime';
import { TutorDrawer } from '../tutor/TutorDrawer';
import { Monitor, FlaskConical, Terminal, ChevronDown } from 'lucide-react';

interface CodeSandboxProps {
  initialFiles: SandboxFiles;
  tests?: TestCase[];
  onTestsPass?: () => void;
}

type BottomTab = 'console' | 'tests';

export function CodeSandbox({ initialFiles, tests = [], onTestsPass }: CodeSandboxProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('html');
  const [files, setFiles] = useState<SandboxFiles>(initialFiles);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [activeBottomTab, setActiveBottomTab] = useState<BottomTab>(
    tests.length > 0 ? 'tests' : 'console'
  );
  const [isBottomOpen, setIsBottomOpen] = useState(true);

  // Tutor state
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [tutorHint, setTutorHint] = useState('');
  const [tutorLoading, setTutorLoading] = useState(false);

  const [runningDoc, setRunningDoc] = useState<string>('');

  // ── Test handler ─────────────────────────────────────────────────────────
  const handleTestResults = useCallback((results: TestResult[]) => {
    setTestResults(results);
    if (results.length > 0) setActiveBottomTab('tests');
    const allPassed = results.length > 0 && results.every(r => r.passed);
    if (allPassed && onTestsPass) onTestsPass();
  }, [onTestsPass]);

  const { consoleLog, runKey, runCode, clearConsole, handleMessage } =
    useSandboxRuntime(handleTestResults);

  useEffect(() => {
    setRunningDoc(buildSandboxDocument(files, tests));
  }, [runKey]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleFileChange = (tab: keyof SandboxFiles, value: string) => {
    setFiles(prev => ({ ...prev, [tab]: value }));
  };

  const handleReset = () => {
    if (!window.confirm('Reset your code to the starter state?')) return;
    setFiles(initialFiles);
    setTestResults([]);
    runCode();
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
          lessonTitle: 'Current Sandbox'
        })
      });
      const data = await res.json();
      setTutorHint(data.hint ?? ('Error: ' + (data.error || 'Unknown')));
    } catch {
      setTutorHint('Network error while reaching AI Tutor.');
    } finally {
      setTutorLoading(false);
    }
  };

  const passedCount = testResults.filter(r => r.passed).length;
  const hasTests = tests.length > 0;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="relative flex flex-col w-full h-full bg-[#111113] overflow-hidden">

      {/* ── EDITOR SECTION ─────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 min-h-0 border-b border-white/8">
        {/* File tabs */}
        <EditorTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Code editor */}
        <div className="flex-1 overflow-hidden">
          <EditorPane activeTab={activeTab} files={files} onChange={handleFileChange} />
        </div>

        {/* Run controls toolbar */}
        <RunControls onRun={runCode} onReset={handleReset} onGetHint={handleGetHint} />
      </div>

      {/* ── PREVIEW + BOTTOM PANEL ─────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 min-h-0">

        {/* Preview frame with header bar */}
        <div className="flex flex-col flex-1 min-h-0">
          {/* Preview header bar */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1c] border-b border-white/8 shrink-0">
            {/* Traffic lights */}
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center gap-1.5 bg-white/6 px-3 py-0.5 rounded-md border border-white/8">
                <Monitor size={10} className="text-gray-500" />
                <span className="text-[11px] text-gray-500 font-mono">preview</span>
              </div>
            </div>
          </div>

          {/* Iframe preview */}
          <div className="flex-1 bg-white min-h-0">
            <PreviewFrame key={runKey} srcDoc={runningDoc} onMessage={handleMessage} />
          </div>
        </div>

        {/* ── Bottom panel (Console / Tests) ─────────────────────────────── */}
        <div className={`flex flex-col bg-[#111113] border-t border-white/8 transition-all duration-200 ${isBottomOpen ? 'h-[180px]' : 'h-9'}`}>
          {/* Bottom panel header tabs */}
          <div className="flex items-center bg-[#1a1a1c] border-b border-white/8 shrink-0">
            {/* Console tab */}
            <button
              onClick={() => { setActiveBottomTab('console'); setIsBottomOpen(true); }}
              className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-semibold uppercase tracking-widest transition-colors border-r border-white/6 ${
                activeBottomTab === 'console' && isBottomOpen
                  ? 'text-white bg-[#252528]'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/4'
              }`}
            >
              <Terminal size={12} />
              Console
              {consoleLog.length > 0 && (
                <span className="px-1 py-0 text-[10px] bg-white/10 rounded">{consoleLog.length}</span>
              )}
            </button>

            {/* Tests tab (only if tests exist) */}
            {hasTests && (
              <button
                onClick={() => { setActiveBottomTab('tests'); setIsBottomOpen(true); }}
                className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-semibold uppercase tracking-widest transition-colors border-r border-white/6 ${
                  activeBottomTab === 'tests' && isBottomOpen
                    ? 'text-white bg-[#252528]'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/4'
                }`}
              >
                <FlaskConical size={12} />
                Tests
                {testResults.length > 0 && (
                  <span className={`px-1 py-0 text-[10px] rounded font-bold ${
                    passedCount === tests.length
                      ? 'bg-emerald-500/25 text-emerald-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {passedCount}/{tests.length}
                  </span>
                )}
              </button>
            )}

            {/* Collapse/expand toggle */}
            <button
              onClick={() => setIsBottomOpen(p => !p)}
              className="ml-auto p-2 text-gray-600 hover:text-gray-300 hover:bg-white/6 transition-colors"
              title={isBottomOpen ? 'Collapse panel' : 'Expand panel'}
            >
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${isBottomOpen ? '' : 'rotate-180'}`}
              />
            </button>
          </div>

          {/* Active panel content */}
          {isBottomOpen && (
            <div className="flex-1 min-h-0 overflow-hidden">
              {activeBottomTab === 'console' && (
                <ConsolePane logs={consoleLog} onClear={clearConsole} />
              )}
              {activeBottomTab === 'tests' && hasTests && (
                <TestResultsPanel tests={tests} results={testResults} />
              )}
            </div>
          )}
        </div>
      </div>

      {/* AI Tutor Drawer */}
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
