"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, CheckCircle2, Circle } from 'lucide-react';

type LessonSummary = {
  id: string;
  title: string;
  isCompleted?: boolean;
};

type ModuleSummary = {
  id: string;
  title: string;
  lessons: LessonSummary[];
};

interface CourseSidebarProps {
  courseId: string;
  courseTitle: string;
  modules: ModuleSummary[];
}

export function CourseSidebar({ courseId, courseTitle, modules }: CourseSidebarProps) {
  const pathname = usePathname();
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    // Default expand all
    const state: Record<string, boolean> = {};
    modules.forEach(m => state[m.id] = true);
    return state;
  });

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  return (
    <aside className="w-full md:w-72 h-full bg-[#1e1e1e] border-r border-[#3C4044] flex flex-col overflow-hidden shrink-0">
      <div className="p-4 border-b border-[#3C4044] bg-[#2c3034]">
        <h2 className="font-bold text-white text-lg line-clamp-2">{courseTitle}</h2>
        <Link href="/dashboard" className="text-xs text-[#FD7B41] hover:underline mt-1 inline-block">
          &larr; Back to Dashboard
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {modules.map((mod, index) => (
          <div key={mod.id} className="space-y-1">
            <button 
              onClick={() => toggleModule(mod.id)}
              className="flex items-center w-full text-left text-[#DDDCDB] hover:text-white font-semibold text-sm py-1 transition-colors group"
            >
              <span className="text-gray-500 mr-1 group-hover:text-gray-300 transition-colors">
                {expandedModules[mod.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </span>
              Module {index + 1}: {mod.title}
            </button>
            
            {expandedModules[mod.id] && (
              <div className="pl-6 space-y-1">
                {mod.lessons.map(lesson => {
                  const href = `/courses/${courseId}/lessons/${lesson.id}`;
                  const isActive = pathname === href;
                  
                  return (
                    <Link 
                      key={lesson.id} 
                      href={href}
                      className={`flex items-start py-1.5 px-2 rounded-md text-sm transition-colors ${
                        isActive 
                          ? 'bg-[#FD7B41]/20 text-[#FD7B41] font-medium' 
                          : 'text-gray-400 hover:text-white hover:bg-[#2c3034]'
                      }`}
                    >
                      <span className={`mt-0.5 mr-2 shrink-0 ${lesson.isCompleted ? 'text-green-500' : isActive ? 'text-[#FD7B41]' : 'text-gray-600'}`}>
                        {lesson.isCompleted ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                      </span>
                      <span className="line-clamp-2">{lesson.title}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
