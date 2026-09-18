"use client";

import React, { useState, useEffect } from 'react';
import { BookOpen, Folder, FileText, Plus, Save, ChevronRight, ChevronDown, CheckCircle2 } from 'lucide-react';
import { MarkdownViewer } from './MarkdownViewer';
import { 
  createModuleAction, 
  createUnitAction, 
  createLessonAction, 
  saveLessonContentAction 
} from '@/lib/actions/curriculum';

interface Lesson {
  id: string;
  title: string;
  content: string;
  order: number;
}

interface Unit {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

interface Module {
  id: string;
  title: string;
  order: number;
  units: Unit[];
}

interface Course {
  id: string;
  title: string;
  modules: Module[];
}

export function CurriculumStudio({ initialCourse }: { initialCourse: Course }) {
  const [course, setCourse] = useState<Course>(initialCourse);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [mdxContent, setMdxContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (selectedLesson) {
      setMdxContent(selectedLesson.content);
    }
  }, [selectedLesson?.id]);

  const toggleModule = (id: string) => setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleUnit = (id: string) => setExpandedUnits(prev => ({ ...prev, [id]: !prev[id] }));

  const handleSave = async () => {
    if (!selectedLesson) return;
    setIsSaving(true);
    try {
      await saveLessonContentAction(selectedLesson.id, mdxContent, course.id);
      
      // Update local state
      setCourse(prev => {
        const newCourse = { ...prev };
        for (const mod of newCourse.modules) {
          for (const unit of mod.units) {
            const lIndex = unit.lessons.findIndex(l => l.id === selectedLesson.id);
            if (lIndex !== -1) {
              unit.lessons[lIndex].content = mdxContent;
            }
          }
        }
        return newCourse;
      });
      
    } catch (err) {
      console.error("Save failed", err);
    } finally {
      setIsSaving(false);
    }
  };

  const addModule = async () => {
    const title = prompt("Enter Module Title:");
    if (!title) return;
    const order = course.modules.length + 1;
    const newModule = await createModuleAction(course.id, title, order);
    setCourse(prev => ({
      ...prev,
      modules: [...prev.modules, { ...newModule, units: [] }]
    }));
  };

  const addUnit = async (moduleId: string, moduleUnitsLength: number) => {
    const title = prompt("Enter Unit Title:");
    if (!title) return;
    const order = moduleUnitsLength + 1;
    const newUnit = await createUnitAction(moduleId, title, order, course.id);
    
    setCourse(prev => {
      const newCourse = { ...prev };
      const mod = newCourse.modules.find(m => m.id === moduleId);
      if (mod) mod.units.push({ ...newUnit, lessons: [] });
      return newCourse;
    });
    setExpandedModules(prev => ({ ...prev, [moduleId]: true }));
  };

  const addLesson = async (unitId: string, unitLessonsLength: number, moduleId: string) => {
    const title = prompt("Enter Lesson Title:");
    if (!title) return;
    const order = unitLessonsLength + 1;
    const newLesson = await createLessonAction(unitId, title, order, course.id);
    
    setCourse(prev => {
      const newCourse = { ...prev };
      const mod = newCourse.modules.find(m => m.id === moduleId);
      const unit = mod?.units.find(u => u.id === unitId);
      if (unit) unit.lessons.push(newLesson);
      return newCourse;
    });
    setExpandedUnits(prev => ({ ...prev, [unitId]: true }));
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-slate-50 border-t border-[#DDDCDB]/30 font-sans">
      
      {/* LEFT SIDEBAR: Tree View */}
      <div className="w-80 bg-white border-r border-[#DDDCDB]/40 flex flex-col h-full shadow-sm z-10">
        <div className="p-4 border-b border-[#DDDCDB]/40 bg-[#f8f9fa] flex justify-between items-center">
          <div className="font-extrabold text-[#3C4044] text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#FD7B41]" />
            Curriculum
          </div>
          <button onClick={addModule} className="p-1.5 hover:bg-[#DDDCDB]/30 rounded-md text-[#3C4044]/60 transition" title="Add Module">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {course.modules.sort((a, b) => a.order - b.order).map((mod) => (
            <div key={mod.id} className="text-sm">
              <div className="group flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                <div className="flex items-center gap-2" onClick={() => toggleModule(mod.id)}>
                  {expandedModules[mod.id] ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                  <Folder className="w-4 h-4 text-slate-400" />
                  <span className="font-bold text-[#3C4044] truncate w-40">{mod.title}</span>
                </div>
                <button onClick={() => addUnit(mod.id, mod.units.length)} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 rounded text-slate-500">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              
              {expandedModules[mod.id] && (
                <div className="pl-6 space-y-1 mt-1">
                  {mod.units.sort((a, b) => a.order - b.order).map(unit => (
                    <div key={unit.id}>
                      <div className="group flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer">
                        <div className="flex items-center gap-2" onClick={() => toggleUnit(unit.id)}>
                          {expandedUnits[unit.id] ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                          <Folder className="w-3.5 h-3.5 text-slate-300" />
                          <span className="font-semibold text-slate-600 truncate w-36 text-[13px]">{unit.title}</span>
                        </div>
                        <button onClick={() => addLesson(unit.id, unit.lessons.length, mod.id)} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 rounded text-slate-500">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      
                      {expandedUnits[unit.id] && (
                        <div className="pl-7 space-y-1 mt-1">
                          {unit.lessons.sort((a, b) => a.order - b.order).map(lesson => (
                            <div 
                              key={lesson.id} 
                              onClick={() => setSelectedLesson(lesson)}
                              className={`flex items-center gap-2 p-1.5 rounded-md cursor-pointer text-[13px] transition-colors ${selectedLesson?.id === lesson.id ? 'bg-[#FD7B41]/10 text-[#FD7B41] font-bold' : 'text-slate-500 hover:bg-slate-100'}`}
                            >
                              <FileText className="w-3 h-3" />
                              <span className="truncate w-36">{lesson.title}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL: Editor Split */}
      {selectedLesson ? (
        <div className="flex-1 flex flex-col h-full bg-white">
          <div className="h-14 border-b border-[#DDDCDB]/40 flex items-center justify-between px-6 bg-[#f8f9fa]">
            <div className="font-bold text-[#3C4044] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#FD7B41]" />
              {selectedLesson.title}
              <span className="text-xs font-normal text-slate-400 ml-2">(Auto-preview active)</span>
            </div>
            
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-1.5 bg-[#FD7B41] hover:bg-[#FD7B41]/90 text-white text-sm font-bold rounded-lg shadow-sm transition disabled:opacity-50"
            >
              {isSaving ? <CheckCircle2 className="w-4 h-4 animate-pulse" /> : <Save className="w-4 h-4" />}
              {isSaving ? "Saving..." : "Save Content"}
            </button>
          </div>
          
          <div className="flex-1 flex h-[calc(100%-56px)]">
            {/* Raw MDX Textarea */}
            <div className="w-1/2 h-full border-r border-[#DDDCDB]/40 p-0">
              <textarea 
                value={mdxContent}
                onChange={(e) => setMdxContent(e.target.value)}
                className="w-full h-full resize-none p-6 outline-none font-mono text-[13px] leading-relaxed text-slate-700 bg-[#f8f9fa]"
                placeholder="Write your MDX content here..."
                spellCheck={false}
              />
            </div>
            
            {/* Live Preview Pane */}
            <div className="w-1/2 h-full overflow-y-auto bg-white p-8">
              <div className="prose prose-slate max-w-none">
                <MarkdownViewer content={mdxContent} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-slate-50 text-slate-400 flex-col gap-4">
          <FileText className="w-16 h-16 text-slate-200" />
          <p className="text-lg font-medium">Select a lesson from the sidebar to edit.</p>
        </div>
      )}
      
    </div>
  );
}
