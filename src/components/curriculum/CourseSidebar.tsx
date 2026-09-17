"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, CheckCircle2, Circle, Menu, PanelLeftClose } from 'lucide-react';

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
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    // Default expand all
    const state: Record<string, boolean> = {};
    modules.forEach(m => state[m.id] = true);
    return state;
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  return (
    <>
      {/* Floating Toggle Button (Visible when sidebar is closed) */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="absolute top-4 left-4 z-40 p-2 bg-[#2c3034] text-white rounded-md shadow-lg border border-[#3C4044] hover:bg-[#3C4044] transition-colors"
          title="Show curriculum"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Sidebar overlay for mobile */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`${
          isOpen ? 'translate-x-0 w-72 md:w-72 border-r' : '-translate-x-full w-0 md:w-0 border-r-0'
        } transition-all duration-300 ease-in-out fixed md:relative z-50 h-full bg-[#1e1e1e] border-[#3C4044] flex flex-col overflow-hidden shrink-0 shadow-2xl md:shadow-none`}
      >
        <div className="p-4 border-b border-[#3C4044] bg-[#2c3034] flex justify-between items-start shrink-0">
          <div className="pr-2">
            <h2 className="font-bold text-white text-lg line-clamp-2 leading-tight">{courseTitle}</h2>
            <Link href="/dashboard" className="text-xs text-[#FD7B41] hover:underline mt-2 inline-block font-medium">
              &larr; Back to Dashboard
            </Link>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-gray-400 hover:text-white rounded-md hover:bg-[#3C4044] transition-colors shrink-0"
            title="Hide curriculum"
          >
            <PanelLeftClose size={18} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-hide w-72">
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
                <div className="pl-6 space-y-1 pt-1">
                  {mod.lessons.map(lesson => {
                    const href = `/courses/${courseId}/lessons/${lesson.id}`;
                    const isActive = pathname === href;
                    
                    return (
                      <Link 
                        key={lesson.id} 
                        href={href}
                        onClick={() => isMobile && setIsOpen(false)}
                        className={`flex items-start py-2 px-2.5 rounded-md text-sm transition-colors ${
                          isActive 
                            ? 'bg-[#FD7B41]/20 text-[#FD7B41] font-bold' 
                            : 'text-gray-400 hover:text-white hover:bg-[#2c3034]'
                        }`}
                      >
                        <span className={`mt-0.5 mr-2.5 shrink-0 ${lesson.isCompleted ? 'text-green-500' : isActive ? 'text-[#FD7B41]' : 'text-gray-600'}`}>
                          {lesson.isCompleted ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                        </span>
                        <span className="line-clamp-2 leading-tight">{lesson.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
