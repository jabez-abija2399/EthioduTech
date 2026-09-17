import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getLocalCourseWithFullTree(courseId: string) {
  try {
    const COURSES_DIR = path.join(process.cwd(), 'courses');
    const coursePath = path.join(COURSES_DIR, courseId);
    
    if (!fs.existsSync(coursePath)) return null;

    const course = {
      id: courseId,
      title: 'Web Development Foundations',
      description: 'Learn the core technologies of the web: HTML, CSS, and JavaScript.',
      modules: [] as any[]
    };

    const lessonsDir = path.join(coursePath, '06-lessons');
    if (!fs.existsSync(lessonsDir)) return course;
    
    const phases = fs.readdirSync(lessonsDir);
    phases.sort();
    
    for (let phaseIndex = 0; phaseIndex < phases.length; phaseIndex++) {
      const phaseName = phases[phaseIndex];
      const phasePath = path.join(lessonsDir, phaseName);
      
      const stat = fs.statSync(phasePath);
      if (!stat.isDirectory()) continue;
      
      const module = {
        id: `${courseId}-${phaseName}`,
        title: phaseName.replace(/-/g, ' ').toUpperCase(),
        order: phaseIndex,
        units: [] as any[]
      };
      
      const unit = {
        id: `${module.id}-unit-1`,
        title: 'Core Concepts',
        order: 1,
        lessons: [] as any[]
      };
      
      const lessonFiles = fs.readdirSync(phasePath);
      lessonFiles.sort();
      
      for (let lessonIndex = 0; lessonIndex < lessonFiles.length; lessonIndex++) {
        const fileName = lessonFiles[lessonIndex];
        if (!fileName.endsWith('.md')) continue;
        
        const filePath = path.join(phasePath, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data: frontmatter, content } = matter(fileContent);
        
        const lessonId = fileName.replace('.md', '');
        const title = frontmatter.title || fileName.replace('.md', '').replace(/-/g, ' ');
        
        let tests = [];
        if (frontmatter.tests && Array.isArray(frontmatter.tests)) {
          tests = frontmatter.tests;
        }
        
        unit.lessons.push({
          id: lessonId,
          title,
          content,
          order: lessonIndex,
          challenges: tests.length > 0 ? [{ tests: JSON.stringify(tests) }] : []
        });
      }
      
      module.units.push(unit);
      course.modules.push(module);
    }
    
    return course;
  } catch (err) {
    console.error("Failed to parse local course:", err);
    return null;
  }
}

export function getLocalLesson(lessonId: string) {
  try {
    const course = getLocalCourseWithFullTree('web-development-foundations');
    if (!course) return null;
    
    for (const mod of course.modules) {
      for (const unit of mod.units) {
        const found = unit.lessons.find((l: any) => l.id === lessonId);
        if (found) {
          return {
            ...found,
            unit: {
              title: unit.title,
              module: {
                title: mod.title,
                course: {
                  id: course.id,
                  title: course.title
                }
              }
            },
            exercises: [],
            challenges: found.challenges || []
          };
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
  return null;
}
