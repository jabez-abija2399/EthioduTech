"use client";

import React from 'react';
import { TestResult, TestCase } from './sandbox-types';
import { CheckCircle2, XCircle, Clock, FlaskConical } from 'lucide-react';

interface TestResultsPanelProps {
  tests: TestCase[];
  results: TestResult[];
}

export function TestResultsPanel({ tests, results }: TestResultsPanelProps) {
  if (tests.length === 0) return null;

  const passedCount = results.filter(r => r.passed).length;
  const allPassed = passedCount === tests.length && results.length > 0;
  const hasRun = results.length > 0;

  return (
    <div className="flex flex-col h-full bg-[#111113]">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#1a1a1c] border-b border-white/8 shrink-0">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
          <FlaskConical size={12} className="text-gray-500" />
          Tests
        </div>
        {/* Score badge */}
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
          !hasRun
            ? 'bg-white/8 text-gray-500'
            : allPassed
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/25'
              : 'bg-red-500/15 text-red-400 border border-red-500/20'
        }`}>
          {passedCount}/{tests.length}
        </span>
      </div>

      {/* Test list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        {tests.map((test, idx) => {
          const result = results.find(r => r.description === test.description);
          const isPassed = result?.passed;
          const ran = !!result;

          return (
            <div
              key={idx}
              className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-[12px] transition-colors ${
                !ran
                  ? 'bg-white/4 border-white/8 text-gray-500'
                  : isPassed
                    ? 'bg-emerald-950/30 border-emerald-700/30 text-emerald-300'
                    : 'bg-red-950/30 border-red-700/30 text-red-300'
              }`}
            >
              <span className="shrink-0 mt-0.5">
                {!ran
                  ? <Clock size={13} className="text-gray-600" />
                  : isPassed
                    ? <CheckCircle2 size={13} className="text-emerald-400" />
                    : <XCircle size={13} className="text-red-400" />
                }
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-medium leading-snug">{test.description}</p>
                {result?.error && (
                  <p className="text-[11px] mt-1 font-mono text-red-400/80 bg-red-950/30 px-2 py-1 rounded-md">
                    {result.error}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* All-pass celebration */}
      {allPassed && (
        <div className="px-3 py-2 bg-emerald-500/10 border-t border-emerald-500/20 text-center">
          <p className="text-[11px] font-bold text-emerald-400">🎉 All tests passed! Great work.</p>
        </div>
      )}
    </div>
  );
}
