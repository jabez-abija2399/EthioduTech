import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const COURSES_DIR = path.join(process.cwd(), 'courses');

export async function syncCurriculum() {
  console.log('Starting curriculum sync...');
  
  // Hardcode the single course for now
  const courseId = 'web-development-foundations';
  const coursePath = path.join(COURSES_DIR, courseId);
  
  // Upsert Course
  const course = await prisma.course.upsert({
    where: { id: courseId },
    update: {
      title: 'Web Development Foundations',
      description: 'Learn the core technologies of the web: HTML, CSS, and JavaScript.',
      isPublished: true,
    },
    create: {
      id: courseId,
      title: 'Web Development Foundations',
      description: 'Learn the core technologies of the web: HTML, CSS, and JavaScript.',
      isPublished: true,
    }
  });

  const lessonsDir = path.join(coursePath, '06-lessons');
  const phases = await fs.readdir(lessonsDir);
  
  for (let phaseIndex = 0; phaseIndex < phases.length; phaseIndex++) {
    const phaseName = phases[phaseIndex];
    const phasePath = path.join(lessonsDir, phaseName);
    
    // Skip if not a directory (like .DS_Store)
    const stat = await fs.stat(phasePath);
    if (!stat.isDirectory()) continue;
    
    // Upsert Module (Phase)
    // Generate a determinist ID
    const moduleId = `${courseId}-${phaseName}`;
    
    const module = await prisma.module.upsert({
      where: { id: moduleId },
      update: {
        title: phaseName.replace(/-/g, ' ').toUpperCase(),
        order: phaseIndex,
      },
      create: {
        id: moduleId,
        courseId: course.id,
        title: phaseName.replace(/-/g, ' ').toUpperCase(),
        order: phaseIndex,
      }
    });

    // Create a default Unit for the module
    const unitId = `${moduleId}-unit-1`;
    const unit = await prisma.unit.upsert({
      where: { id: unitId },
      update: {
        title: 'Core Concepts',
        order: 1,
      },
      create: {
        id: unitId,
        moduleId: module.id,
        title: 'Core Concepts',
        order: 1,
      }
    });

    // Parse lessons inside the phase
    const lessonFiles = await fs.readdir(phasePath);
    
    for (let lessonIndex = 0; lessonIndex < lessonFiles.length; lessonIndex++) {
      const fileName = lessonFiles[lessonIndex];
      if (!fileName.endsWith('.md')) continue;
      
      const filePath = path.join(phasePath, fileName);
      const fileContent = await fs.readFile(filePath, 'utf8');
      
      // Parse frontmatter
      const { data: frontmatter, content } = matter(fileContent);
      
      const lessonId = fileName.replace('.md', '');
      const title = frontmatter.title || fileName.replace('.md', '').replace(/-/g, ' ');
      
      // Upsert Lesson
      await prisma.lesson.upsert({
        where: { id: lessonId },
        update: {
          title: title,
          content: content,
          order: lessonIndex,
        },
        create: {
          id: lessonId,
          unitId: unit.id,
          title: title,
          content: content,
          order: lessonIndex,
        }
      });
      
      console.log(`Synced Lesson: ${title}`);
    }
  }
  
  console.log('Curriculum sync completed successfully.');
}
