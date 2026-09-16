import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/auth';
import { CourseSidebar } from '@/components/curriculum/CourseSidebar';
import { MarkdownViewer } from '@/components/curriculum/MarkdownViewer';
import { CodeSandbox } from '@/components/sandbox/CodeSandbox';
import { CompleteLessonButton } from '@/components/curriculum/CompleteLessonButton';

const prisma = new PrismaClient();

export default async function LessonPage({ 
  params 
}: { 
  params: Promise<{ courseId: string; lessonId: string }> 
}) {
  const { courseId, lessonId } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  // 1. Fetch Course and Modules for Sidebar
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        orderBy: { order: 'asc' },
        include: {
          units: {
            orderBy: { order: 'asc' },
            include: {
              lessons: {
                orderBy: { order: 'asc' }
              }
            }
          }
        }
      }
    }
  });

  if (!course) {
    notFound();
  }

  // Flatten the hierarchy to match Sidebar props
  // We assume 1 Unit per Module right now based on our sync script
  const sidebarModules = course.modules.map(mod => {
    const lessons = mod.units.flatMap(u => u.lessons).map(l => ({
      id: l.id,
      title: l.title,
      isCompleted: false // To be filled with real Progress tracking later
    }));
    return {
      id: mod.id,
      title: mod.title,
      lessons
    };
  });

  // 2. Fetch Current Lesson Content
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId }
  });

  if (!lesson) {
    notFound();
  }

  // 3. Extract starter code from Markdown comments
  // We look for: <!-- sandbox:html --> ... <!-- /sandbox:html -->
  const extractCode = (content: string, language: string) => {
    const regex = new RegExp(`<!--\\s*sandbox:${language}\\s*-->([\\s\\S]*?)<!--\\s*\\/sandbox:${language}\\s*-->`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : '';
  };

  const initialSandboxFiles = {
    html: extractCode(lesson.content, 'html'),
    css: extractCode(lesson.content, 'css'),
    js: extractCode(lesson.content, 'js')
  };

  return (
    <div className="flex h-screen bg-[#1a1a1a] text-white overflow-hidden selection:bg-[#FD7B41]/30">
      
      <CourseSidebar 
        courseId={courseId}
        courseTitle={course.title}
        modules={sidebarModules}
      />
      
      <main className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
        
        {/* Left: Markdown Viewer */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-y-auto p-6 md:p-10 border-b md:border-b-0 md:border-r border-[#3C4044]">
          <MarkdownViewer content={lesson.content} />
          <CompleteLessonButton lessonId={lesson.id} courseId={courseId} />
        </div>

        {/* Right: Code Sandbox */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#2d2d2d] flex flex-col">
          <div className="p-3 bg-[#2c3034] border-b border-[#3C4044] text-xs font-semibold text-gray-300 flex justify-between items-center">
            <span>INTERACTIVE WORKSPACE</span>
          </div>
          <div className="flex-1 p-4 overflow-hidden">
            <CodeSandbox initialFiles={initialSandboxFiles} />
          </div>
        </div>

      </main>
      
    </div>
  );
}
