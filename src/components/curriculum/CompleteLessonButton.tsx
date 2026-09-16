"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addPendingSync } from '@/lib/offline/db';
import { completeLessonAction } from '@/lib/actions/progress';

interface Props {
  lessonId: string;
  courseId: string;
}

export function CompleteLessonButton({ lessonId, courseId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    setLoading(true);
    let nextLessonRoute = '/dashboard';

    if (navigator.onLine) {
      try {
        const result = await completeLessonAction(courseId, lessonId);
        if (result?.success && result.nextLessonId) {
          nextLessonRoute = `/courses/${courseId}/lessons/${result.nextLessonId}`;
        }
      } catch (e) {
        console.error('Failed to save progress online, queuing for offline sync');
        await addPendingSync({
          courseId,
          lessonId,
          timestamp: Date.now(),
          status: "pending"
        });
      }
    } else {
      await addPendingSync({
        courseId,
        lessonId,
        timestamp: Date.now(),
        status: "pending"
      });
    }

    setLoading(false);
    router.push(nextLessonRoute);
  };

  return (
    <div className="mt-12 pt-8 border-t border-[#3C4044]">
      <button 
        onClick={handleComplete}
        disabled={loading}
        className="w-full py-3 bg-[#FD7B41] hover:bg-[#e66a35] text-white font-bold rounded transition-colors shadow-lg disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Mark Complete & Continue'}
      </button>
    </div>
  );
}
