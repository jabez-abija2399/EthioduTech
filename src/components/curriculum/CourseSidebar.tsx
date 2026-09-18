"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, CheckCircle2, Circle, Menu, PanelLeftClose, Folder, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type LessonSummary = {
  id: string;
  title: string;
  isCompleted?: boolean;
};

type UnitSummary = {
  id: string;
  title: string;
  lessons: LessonSummary[];
};

type ModuleSummary = {
  id: string;
  title: string;
  units: UnitSummary[];
};

interface CourseSidebarProps {
  courseId: string;
  courseTitle: string;
  modules: ModuleSummary[];
}

export function CourseSidebar({ courseId, courseTitle, modules }: CourseSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  // By default expand the first module, or whatever is active
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const state: Record<string, boolean> = {};
    if (modules.length > 0) state[modules[0].id] = true;
    return state;
  });

  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({});

  // On mount or path change, auto-expand the hierarchy containing the active lesson
  useEffect(() => {
    let activeModId: string | null = null;
    let activeUnitId: string | null = null;
    
    modules.forEach(mod => {
      mod.units.forEach(unit => {
        if (unit.lessons.some(l => pathname.includes(l.id))) {
          activeModId = mod.id;
          activeUnitId = unit.id;
        }
      });
    });

    if (activeModId) setExpandedModules(prev => ({ ...prev, [activeModId!]: true }));
    if (activeUnitId) setExpandedUnits(prev => ({ ...prev, [activeUnitId!]: true }));
  }, [pathname, modules]);



  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const toggleUnit = (unitId: string) => {
    setExpandedUnits(prev => ({
      ...prev,
      [unitId]: !prev[unitId]
    }));
  };

  return (
    <>
      {/* Floating Toggle Button (Visible when sidebar is closed) */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="absolute top-4 left-4 z-40 p-2 bg-white/5 backdrop-blur-md text-white rounded-xl shadow-lg border border-white/10 hover:bg-white/10 transition-colors group"
          title="Show curriculum"
        >
          <Menu size={20} className="group-hover:text-[#FD7B41] transition-colors" />
        </button>
      )}

      {/* Backdrop overlay — always shown when sidebar is open */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar — always fixed/overlay, never pushes content */}
      <aside 
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed top-0 left-0 z-50 h-full w-[320px] bg-[#161618] border-r border-[#2A2A2D] flex flex-col overflow-hidden shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]`}
      >
        <div className="p-5 border-b border-[#2A2A2D] bg-[#161618]/80 backdrop-blur-xl flex justify-between items-start shrink-0 relative z-10">
          <div className="pr-2">
            <h2 className="font-extrabold text-white text-lg line-clamp-2 leading-tight tracking-tight">{courseTitle}</h2>
            <Link href={`/courses/${courseId}`} className="text-xs text-[#FD7B41] hover:text-[#EDBF9B] transition-colors mt-2 inline-flex items-center gap-1 font-medium bg-[#FD7B41]/10 px-2 py-1 rounded-md">
              &larr; Back to Syllabus
            </Link>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-gray-400 hover:text-white rounded-md hover:bg-white/5 transition-colors shrink-0"
            title="Hide curriculum"
          >
            <PanelLeftClose size={18} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 w-full scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {modules.map((mod, index) => (
            <div key={mod.id} className="space-y-1">
              {/* Module Header */}
              <button 
                onClick={() => toggleModule(mod.id)}
                className="flex items-center w-full text-left text-gray-200 hover:text-white font-bold text-[15px] py-1.5 transition-colors group"
              >
                <span className="text-gray-500 mr-2 group-hover:text-[#FD7B41] transition-colors flex-shrink-0">
                  {expandedModules[mod.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </span>
                <span className="flex-1 leading-tight tracking-tight">{mod.title}</span>
              </button>
              
              {/* Units */}
              <AnimatePresence initial={false}>
                {expandedModules[mod.id] && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-6 space-y-3 pt-2 pb-3 border-l border-white/5 ml-[7px]">
                      {mod.units.map((unit) => {
                        const totalLessons = unit.lessons.length;
                        const completedLessons = unit.lessons.filter(l => l.isCompleted).length;
                        
                        return (
                          <div key={unit.id} className="space-y-1">
                            <button 
                              onClick={() => toggleUnit(unit.id)}
                              className="flex items-center justify-between w-full text-left text-gray-400 hover:text-gray-200 text-sm font-semibold transition-colors group"
                            >
                              <div className="flex items-center gap-2 overflow-hidden">
                                <span className="group-hover:text-[#FD7B41] transition-colors shrink-0">
                                  {expandedUnits[unit.id] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                </span>
                                <Folder size={14} className="shrink-0 text-slate-500" />
                                <span className="truncate">{unit.title}</span>
                              </div>
                              <div className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-white/5 text-slate-400 shrink-0 ml-2">
                                {completedLessons}/{totalLessons}
                              </div>
                            </button>
                            
                            {/* Lessons */}
                            <AnimatePresence initial={false}>
                              {expandedUnits[unit.id] && (
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pl-7 space-y-1 mt-1.5">
                                    {unit.lessons.map(lesson => {
                                      const href = `/courses/${courseId}/lessons/${lesson.id}`;
                                      const isActive = pathname === href;
                                      
                                      return (
                                        <Link 
                                          key={lesson.id} 
                                          href={href}
                                          onClick={() => setIsOpen(false)}
                                          className={`flex items-start py-2 px-3 rounded-xl text-[13px] transition-all relative overflow-hidden group ${
                                            isActive 
                                              ? 'bg-gradient-to-r from-[#FD7B41]/20 to-[#FD7B41]/5 text-[#FD7B41] font-bold border border-[#FD7B41]/20' 
                                              : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
                                          }`}
                                        >
                                          {isActive && (
                                            <motion.div layoutId="active-lesson-indicator" className="absolute left-0 top-0 bottom-0 w-1 bg-[#FD7B41]" />
                                          )}
                                          <span className={`mt-0.5 mr-2.5 shrink-0 transition-colors ${lesson.isCompleted ? 'text-emerald-500' : isActive ? 'text-[#FD7B41]' : 'text-gray-600 group-hover:text-gray-400'}`}>
                                            {lesson.isCompleted ? <CheckCircle2 size={14} /> : isActive ? <FileText size={14} /> : <Circle size={14} />}
                                          </span>
                                          <span className="line-clamp-2 leading-tight">{lesson.title}</span>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
