import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { auth } from '@/auth';
import { getCourseWithFullTree, getLesson } from '@/lib/data/course';
import { CourseSidebar } from '@/components/curriculum/CourseSidebar';
import { ClientWorkspace } from '@/components/curriculum/ClientWorkspace';

export const dynamic = 'force-dynamic'

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
  const course = await getCourseWithFullTree(courseId);

  if (!course) {
    notFound();
  }

  // Flatten the hierarchy to match Sidebar props (3-tier deeply nested)
  const sidebarModules = course.modules.map((mod: any) => {
    return {
      id: mod.id,
      title: mod.title,
      units: mod.units.map((unit: any) => ({
        id: unit.id,
        title: unit.title,
        lessons: unit.lessons.map((l: any) => ({
          id: l.id,
          title: l.title,
          isCompleted: false // To be filled with real Progress tracking later
        }))
      }))
    };
  });

  // 2. Fetch Current Lesson Content
  const lesson = await getLesson(lessonId);

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

  const hasSandbox = Boolean(initialSandboxFiles.html || initialSandboxFiles.css || initialSandboxFiles.js);

  // 4. Extract Tests from Challenges
  let tests = [];
  if (lesson.challenges && lesson.challenges.length > 0) {
    try {
      // We stored tests as JSON in the first challenge
      const challenge = lesson.challenges[0];
      if (challenge.tests) {
        tests = JSON.parse(challenge.tests);
      }
    } catch (e) {
      console.error("Failed to parse tests for lesson:", e);
    }
  }

  return (
    <div className="flex h-screen bg-[#1a1a1a] text-white overflow-hidden selection:bg-[#FD7B41]/30">
      
      <CourseSidebar 
        courseId={courseId}
        courseTitle={course.title}
        modules={sidebarModules}
      />
      
      <ClientWorkspace 
        lessonId={lesson.id}
        courseId={courseId}
        content={lesson.content}
        initialSandboxFiles={initialSandboxFiles}
        tests={tests}
        hasSandbox={hasSandbox}
      />
      
    </div>
  );
}
