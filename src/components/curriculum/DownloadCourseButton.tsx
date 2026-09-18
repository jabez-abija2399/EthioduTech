"use client";

import React, { useState } from 'react';
import { DownloadCloud, CheckCircle2, Loader2 } from 'lucide-react';

interface DownloadCourseButtonProps {
  courseId: string;
  lessonUrls: string[];
}

export function DownloadCourseButton({ courseId, lessonUrls }: DownloadCourseButtonProps) {
  const [status, setStatus] = useState<'idle' | 'downloading' | 'completed' | 'error'>('idle');
  const [progress, setProgress] = useState(0);

  const handleDownload = async () => {
    if (status === 'downloading') return;
    
    setStatus('downloading');
    setProgress(0);

    try {
      // We also want to cache the course landing page itself
      const urlsToCache = [`/courses/${courseId}`, ...lessonUrls];
      
      for (let i = 0; i < urlsToCache.length; i++) {
        const url = urlsToCache[i];
        try {
          // Fetch the page. The Service Worker will intercept and cache it.
          // We use no-cache to ensure it hits the network and the SW intercepts it to put in the cache.
          await fetch(url, { cache: 'no-cache' });
          
          // Also fetch the RSC payload so client-side navigation works seamlessly offline
          // We can approximate the RSC payload by adding the header Next-Router-Prefetch
          await fetch(url, { 
            headers: { 
              'RSC': '1',
              'Next-Router-Prefetch': '1'
            } 
          });
        } catch (e) {
          console.warn(`Failed to pre-cache ${url}`, e);
        }
        
        setProgress(Math.round(((i + 1) / urlsToCache.length) * 100));
        
        // Small delay to prevent network saturation
        await new Promise(r => setTimeout(r, 100));
      }
      
      setStatus('completed');
    } catch (error) {
      console.error("Failed to download course", error);
      setStatus('error');
    }
  };

  if (status === 'completed') {
    return (
      <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 text-emerald-500 font-bold rounded-2xl border border-emerald-500/20 backdrop-blur-md shadow-inner">
        <CheckCircle2 className="w-5 h-5" />
        Course Downloaded for Offline Use
      </div>
    );
  }

  return (
    <button
      onClick={handleDownload}
      disabled={status === 'downloading'}
      className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/10 backdrop-blur-md shadow-xl disabled:opacity-70 disabled:cursor-not-allowed group"
    >
      {status === 'downloading' ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin text-[#FD7B41]" />
          <span>Downloading... {progress}%</span>
          <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden ml-2">
            <div 
              className="h-full bg-gradient-to-r from-[#FD7B41] to-[#EDBF9B] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      ) : (
        <>
          <DownloadCloud className="w-5 h-5 text-slate-400 group-hover:text-[#FD7B41] transition-colors" />
          <span>Download for Offline Use</span>
        </>
      )}
    </button>
  );
}
