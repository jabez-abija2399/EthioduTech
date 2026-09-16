"use client";

import React, { useEffect, useRef } from 'react';
import { isSandboxMessage, SandboxMessage } from './sandbox-message';

interface PreviewFrameProps {
  srcDoc: string;
  onMessage: (msg: SandboxMessage) => void;
}

export function PreviewFrame({ srcDoc, onMessage }: PreviewFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      // 1. Validate Source (Must come from our exact iframe window)
      if (!iframeRef.current || event.source !== iframeRef.current.contentWindow) {
        return;
      }

      // 2. Validate Schema
      if (!isSandboxMessage(event.data)) {
        console.warn('Sandbox rejected malformed message:', event.data);
        return;
      }

      // 3. Forward to parent handler
      onMessage(event.data);
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onMessage]);

  return (
    <div className="w-full h-full bg-white relative">
      <iframe
        ref={iframeRef}
        srcDoc={srcDoc}
        sandbox="allow-scripts" // Extremely restrictive. No allow-same-origin.
        title="Preview Sandbox"
        className="w-full h-full border-none absolute inset-0"
      />
    </div>
  );
}
