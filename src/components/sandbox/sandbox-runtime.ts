"use client";

import { useState, useCallback, useRef } from 'react';
import { SandboxMessage } from './sandbox-message';
import { TestResult } from './sandbox-types';

const EXECUTION_TIMEOUT_MS = 2000; // 2 seconds

export type ConsoleEntry = {
  id: string;
  type: SandboxMessage['type'];
  level?: 'log' | 'info' | 'warn' | 'error';
  message: string;
};

export function useSandboxRuntime(onTestsPass?: (results: TestResult[]) => void) {
  const [consoleLog, setConsoleLog] = useState<ConsoleEntry[]>([]);
  const [runKey, setRunKey] = useState(0); // Changing this forces PreviewFrame to remount
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearConsole = useCallback(() => {
    setConsoleLog([]);
  }, []);

  const addLog = useCallback((entry: Omit<ConsoleEntry, 'id'>) => {
    setConsoleLog(prev => [...prev, { ...entry, id: crypto.randomUUID() }]);
  }, []);

  const runCode = useCallback(() => {
    clearConsole();
    setRunKey(prev => prev + 1);

    // Start watchdog timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      // If we haven't received a 'ready' message (which we could track) or if the iframe is hung
      addLog({
        type: 'runtime-error',
        message: 'Execution Timeout: Your code took too long to finish. Check for an infinite loop.'
      });
      // Force kill by remounting to a blank or reset state
      setRunKey(prev => prev + 1);
    }, EXECUTION_TIMEOUT_MS);
  }, [clearConsole, addLog]);

  const handleMessage = useCallback((msg: SandboxMessage) => {
    if (msg.type === 'ready') {
      // Script executed successfully without hanging
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    if (msg.type === 'TEST_RESULTS') {
      if (onTestsPass) {
        onTestsPass(msg.results);
      }
      return;
    }

    if (msg.type === 'console') {
      addLog({
        type: 'console',
        level: msg.level,
        message: msg.args.join(' ')
      });
    }

    if (msg.type === 'runtime-error') {
      addLog({
        type: 'runtime-error',
        level: 'error',
        message: msg.message
      });
    }
  }, [addLog, onTestsPass]);

  return {
    consoleLog,
    runKey,
    runCode,
    clearConsole,
    handleMessage
  };
}
