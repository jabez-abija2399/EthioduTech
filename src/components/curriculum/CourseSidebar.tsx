"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronDown, ChevronRight, CheckCircle2, Circle, Menu, 
  PanelLeftClose, BookOpen, ArrowLeft, Lock, PlayCircle
} from 'lucide-react';
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

  // Compute overall course progress
  const allLessons = modules.flatMap(m => m.units.flatMap(u => u.lessons));
  const totalLessons = allLessons.length;
  const completedLessons = allLessons.filter(l => l.isCompleted).length;
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Sequential unlock: lesson N unlocks only when lesson N-1 is completed
  const unlockedLessonIds = new Set<string>();
  for (let i = 0; i < allLessons.length; i++) {
    if (i === 0) {
      // First lesson always unlocked
      unlockedLessonIds.add(allLessons[i].id);
    } else if (allLessons[i - 1].isCompleted) {
      // Unlock this lesson only if the previous one is completed
      unlockedLessonIds.add(allLessons[i].id);
    } else {
      // Once we hit a locked lesson, all subsequent are locked too
      break;
    }
  }

  // By default expand the active module
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const state: Record<string, boolean> = {};
    if (modules.length > 0) state[modules[0].id] = true;
    return state;
  });
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({});

  // Auto-expand the active lesson's hierarchy
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

  const toggleModule = (moduleId: string) =>
    setExpandedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));

  const toggleUnit = (unitId: string) =>
    setExpandedUnits(prev => ({ ...prev, [unitId]: !prev[unitId] }));

  return (
    <>
      {/* Floating Hamburger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="absolute top-4 left-4 z-40 w-10 h-10 flex items-center justify-center bg-[#1e1e1e] border border-white/10 text-gray-400 hover:text-white hover:border-[#FD7B41]/50 hover:bg-[#FD7B41]/10 rounded-xl shadow-lg transition-all duration-200 group"
          title="Show curriculum"
        >
          <Menu size={18} className="group-hover:text-[#FD7B41] transition-colors" />
        </button>
      )}

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            key="sidebar"
            initial={{ x: -340, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -340, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed top-0 left-0 z-50 h-full w-[320px] bg-[#111113] border-r border-white/8 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="relative px-5 pt-5 pb-4 border-b border-white/8 shrink-0 bg-gradient-to-b from-[#1a1a1d] to-[#111113]">
              {/* Accent glow */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FD7B41]/60 to-transparent" />

              <div className="flex items-start justify-between mb-4">
                <Link
                  href={`/courses/${courseId}`}
                  className="flex items-center gap-1.5 text-xs text-[#FD7B41] hover:text-[#EDBF9B] font-semibold transition-colors group"
                  onClick={() => setIsOpen(false)}
                >
                  <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
                  Back to Course
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-gray-500 hover:text-white hover:bg-white/8 rounded-lg transition-colors"
                  title="Close"
                >
                  <PanelLeftClose size={16} />
                </button>
              </div>

              <h2 className="font-bold text-white text-base leading-snug line-clamp-2 mb-4 tracking-tight">
                {courseTitle}
              </h2>

              {/* Overall Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-gray-500 font-medium uppercase tracking-widest">Overall Progress</span>
                  <span className="text-[11px] font-bold text-[#FD7B41]">{overallProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/8 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${overallProgress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-[#FD7B41] to-[#EDBF9B] rounded-full"
                  />
                </div>
                <p className="text-[11px] text-gray-600">
                  {completedLessons} of {totalLessons} lessons completed
                </p>
              </div>
            </div>

            {/* Module List */}
            <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {modules.map((mod, modIndex) => {
                const modAllLessons = mod.units.flatMap(u => u.lessons);
                const modCompleted = modAllLessons.filter(l => l.isCompleted).length;
                const modTotal = modAllLessons.length;
                const modProgress = modTotal > 0 ? Math.round((modCompleted / modTotal) * 100) : 0;
                const isModFullyDone = modCompleted === modTotal && modTotal > 0;
                const isExpanded = expandedModules[mod.id];

                return (
                  <div key={mod.id} className="rounded-xl overflow-hidden">
                    {/* Module Header */}
                    <button
                      onClick={() => toggleModule(mod.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all duration-200 rounded-xl group ${
                        isExpanded ? 'bg-white/5' : 'hover:bg-white/4'
                      }`}
                    >
                      {/* Module number badge */}
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0 transition-all ${
                        isModFullyDone 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                          : isExpanded 
                            ? 'bg-[#FD7B41]/20 text-[#FD7B41] border border-[#FD7B41]/30'
                            : 'bg-white/8 text-gray-400 border border-white/10 group-hover:border-[#FD7B41]/20 group-hover:text-[#FD7B41]'
                      }`}>
                        {isModFullyDone ? <CheckCircle2 size={14} /> : String(modIndex + 1).padStart(2, '0')}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className={`text-[13px] font-semibold leading-tight truncate transition-colors ${
                          isModFullyDone ? 'text-emerald-400' : isExpanded ? 'text-white' : 'text-gray-300 group-hover:text-white'
                        }`}>
                          {mod.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1 bg-white/8 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${isModFullyDone ? 'bg-emerald-500' : 'bg-[#FD7B41]'}`}
                              style={{ width: `${modProgress}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-gray-600 shrink-0">{modCompleted}/{modTotal}</span>
                        </div>
                      </div>

                      <ChevronDown
                        size={14}
                        className={`text-gray-600 shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Units */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pl-2 pr-1 pt-1 pb-2 space-y-0.5">
                            {mod.units.map((unit) => {
                              const unitCompleted = unit.lessons.filter(l => l.isCompleted).length;
                              const unitTotal = unit.lessons.length;
                              const isUnitExpanded = expandedUnits[unit.id];

                              return (
                                <div key={unit.id}>
                                  {/* Unit Header */}
                                  <button
                                    onClick={() => toggleUnit(unit.id)}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-left rounded-lg hover:bg-white/4 transition-colors group"
                                  >
                                    <span className={`transition-colors shrink-0 ${isUnitExpanded ? 'text-[#EDBF9B]' : 'text-gray-600 group-hover:text-gray-400'}`}>
                                      <ChevronRight size={12} className={`transition-transform duration-150 ${isUnitExpanded ? 'rotate-90' : ''}`} />
                                    </span>
                                    <span className="text-[12px] font-semibold text-gray-400 group-hover:text-gray-200 transition-colors truncate flex-1">
                                      {unit.title}
                                    </span>
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0 ${
                                      unitCompleted === unitTotal && unitTotal > 0 
                                        ? 'bg-emerald-500/15 text-emerald-400' 
                                        : 'bg-white/6 text-gray-500'
                                    }`}>
                                      {unitCompleted}/{unitTotal}
                                    </span>
                                  </button>

                                  {/* Lessons */}
                                  <AnimatePresence initial={false}>
                                    {isUnitExpanded && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                        className="overflow-hidden"
                                      >
                                        <div className="pl-5 pr-1 py-1 space-y-0.5 border-l border-white/6 ml-4">
                                          {unit.lessons.map((lesson, lessonIdx) => {
                                            const href = `/courses/${courseId}/lessons/${lesson.id}`;
                                            const isActive = pathname === href;
                                            const isCompleted = lesson.isCompleted;
                                            const isUnlocked = unlockedLessonIds.has(lesson.id);
                                            const isLocked = !isUnlocked;

                                            // LOCKED: non-clickable div
                                            if (isLocked) {
                                              return (
                                                <div
                                                  key={lesson.id}
                                                  title="Complete the previous lesson to unlock"
                                                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[12px] cursor-not-allowed opacity-40 border border-transparent select-none"
                                                >
                                                  <span className="shrink-0 text-gray-600">
                                                    <Lock size={12} />
                                                  </span>
                                                  <span className="leading-tight line-clamp-2 flex-1 text-gray-600">
                                                    {lesson.title}
                                                  </span>
                                                </div>
                                              );
                                            }

                                            // UNLOCKED: clickable Link
                                            return (
                                              <Link
                                                key={lesson.id}
                                                href={href}
                                                onClick={() => setIsOpen(false)}
                                                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[12px] transition-all duration-150 relative group ${
                                                  isActive
                                                    ? 'bg-[#FD7B41]/15 text-[#FD7B41] font-semibold border border-[#FD7B41]/25'
                                                    : isCompleted
                                                      ? 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                                                      : 'text-gray-300 hover:text-white hover:bg-white/4 border border-transparent'
                                                }`}
                                              >
                                                {/* Active left accent bar */}
                                                {isActive && (
                                                  <motion.div
                                                    layoutId="active-pill"
                                                    className="absolute left-0 top-1 bottom-1 w-0.5 bg-[#FD7B41] rounded-full"
                                                  />
                                                )}

                                                {/* Status icon */}
                                                <span className="shrink-0">
                                                  {isCompleted ? (
                                                    <CheckCircle2 size={14} className="text-emerald-400" />
                                                  ) : isActive ? (
                                                    <PlayCircle size={14} className="text-[#FD7B41]" />
                                                  ) : (
                                                    <Circle size={14} className="text-gray-600 group-hover:text-gray-400 transition-colors" />
                                                  )}
                                                </span>

                                                <span className={`leading-tight line-clamp-2 flex-1 ${isCompleted && !isActive ? 'line-through decoration-gray-600 decoration-1' : ''}`}>
                                                  {lesson.title}
                                                </span>

                                                {/* Completed checkmark badge */}
                                                {isCompleted && !isActive && (
                                                  <span className="shrink-0 w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                                    <span className="text-emerald-400 text-[8px] font-bold">✓</span>
                                                  </span>
                                                )}
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
                );
              })}
            </div>

            {/* Footer Stats */}
            <div className="px-5 py-4 border-t border-white/8 shrink-0 bg-[#111113]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500">
                  <BookOpen size={14} />
                  <span className="text-[12px]">{totalLessons} lessons total</span>
                </div>
                {overallProgress === 100 && (
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    🎉 Course Complete!
                  </span>
                )}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
