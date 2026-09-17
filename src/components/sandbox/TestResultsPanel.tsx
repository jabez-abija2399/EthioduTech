import React from 'react';
import { TestResult, TestCase } from './sandbox-types';

interface TestResultsPanelProps {
  tests: TestCase[];
  results: TestResult[];
}

export function TestResultsPanel({ tests, results }: TestResultsPanelProps) {
  if (tests.length === 0) return null;

  return (
    <div className="flex flex-col h-full bg-[#252526] border-b border-[#3C4044]">
      <div className="p-2 bg-[#2c3034] text-xs font-semibold text-gray-300 flex justify-between items-center shadow-sm">
        <span>TESTS ({results.filter(r => r.passed).length}/{tests.length})</span>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {tests.map((test, idx) => {
          const result = results.find(r => r.description === test.description);
          const isPassed = result?.passed;
          const hasRun = !!result;
          
          return (
            <div key={idx} className={`p-2 rounded border text-sm ${hasRun ? (isPassed ? 'bg-green-900/20 border-green-700/50 text-green-400' : 'bg-red-900/20 border-red-700/50 text-red-400') : 'bg-[#1e1e1e] border-[#3C4044] text-gray-400'}`}>
              <div className="flex items-start">
                <span className="mr-2 mt-0.5">
                  {!hasRun ? '⏳' : isPassed ? '✅' : '❌'}
                </span>
                <div>
                  <span className="block font-medium">{test.description}</span>
                  {result?.error && (
                    <span className="block text-xs mt-1 text-red-300/80 font-mono">
                      Error: {result.error}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
