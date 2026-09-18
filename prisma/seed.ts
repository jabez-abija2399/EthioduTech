import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

function getOrderFromName(name: string): number {
  const match = name.match(/^(\d+)-/);
  if (match) return parseInt(match[1], 10);
  
  if (name.includes('topic-')) {
    const topicMatch = name.match(/topic-(\d+)/);
    if (topicMatch) return parseInt(topicMatch[1], 10);
  }
  
  if (name.includes('practice')) return 90;
  if (name.includes('checkpoint')) return 95;
  if (name.includes('mastery')) return 100;
  if (name.includes('overview') || name === 'introduction.mdx') return 0;
  
  return 50; // Default order
}

function cleanTitle(name: string): string {
  let title = name.replace(/\.mdx?$/, '');
  title = title.replace(/^\d+-/, ''); // Remove leading numbers
  title = title.replace(/^topic-\d+-/, ''); // Remove topic-xx-
  title = title.replace(/-/g, ' '); // Replace hyphens with spaces
  
  // Capitalize words
  return title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

async function main() {
  console.log('Start seeding and wiping database...')

  // 1. Wipe database cleanly
  console.log("Wiping existing data...")
  await prisma.portfolioProject.deleteMany({})
  await prisma.project.deleteMany({})
  await prisma.portfolio.deleteMany({})
  await prisma.studentProfile.deleteMany({})
  await prisma.teacherProfile.deleteMany({})
  await prisma.parentProfile.deleteMany({})
  await prisma.profile.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.badge.deleteMany({})
  
  await prisma.lesson.deleteMany({});
  await prisma.unit.deleteMany({});
  await prisma.module.deleteMany({});
  await prisma.course.deleteMany({});

  const defaultPasswordHash = bcrypt.hashSync('password', 10)

  // 2. Seed Users (Student, Teacher, Admin)
  const student = await prisma.user.create({
    data: {
      email: 'student@edutech.test',
      hashedPassword: defaultPasswordHash,
      role: 'STUDENT',
      profile: {
        create: {
          firstName: 'Test',
          lastName: 'Student'
        }
      },
      studentProfile: {
        create: {}
      }
    }
  })
  console.log(`Seeded Student: ${student.email}`)

  const teacher = await prisma.user.create({
    data: {
      email: 'teacher@edutech.test',
      hashedPassword: defaultPasswordHash,
      role: 'TEACHER',
      profile: {
        create: {
          firstName: 'Abebe',
          lastName: 'Educator'
        }
      },
      teacherProfile: {
        create: {
          school: 'Addis STEM Academy'
        }
      }
    }
  })
  console.log(`Seeded Teacher: ${teacher.email}`)

  const admin = await prisma.user.create({
    data: {
      email: 'admin@edutech.test',
      hashedPassword: defaultPasswordHash,
      role: 'ADMIN',
      profile: {
        create: {
          firstName: 'System',
          lastName: 'Admin'
        }
      }
    }
  })
  console.log(`Seeded Admin: ${admin.email}`)

  // Create Student Portfolio
  const studentProfile = await prisma.studentProfile.findUnique({
    where: { userId: student.id }
  })
  
  if (studentProfile) {
    const portfolio = await prisma.portfolio.create({
      data: {
        studentId: studentProfile.id,
        isPublic: true
      }
    })
    
    const sampleProject = await prisma.project.create({
      data: {
        title: "Personal Web Business Card",
        description: "An interactive digital business card built with HTML & CSS."
      }
    })

    const sampleCodeBundle = JSON.stringify({
      html: `<div class="card">\n  <h2>Jabez Tech</h2>\n  <p>Web Builder & Student</p>\n  <button onclick="alert('Hello from my Edutech Portfolio!')">Contact Me</button>\n</div>`,
      css: `body { background: #0f172a; color: white; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: system-ui; }\n.card { background: #1e293b; padding: 2rem; border-radius: 1rem; border: 1px solid #334155; text-align: center; }\nbutton { background: #2563eb; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.5rem; cursor: margin-top: 1rem; }`,
      js: `console.log('Portfolio card loaded!');`
    })

    await prisma.portfolioProject.create({
      data: {
        portfolioId: portfolio.id,
        projectId: sampleProject.id,
        url: sampleCodeBundle,
        reflection: "My very first interactive web project created during Module 1!"
      }
    })
    console.log("Seeded sample portfolio project for student.")
  }

  // 3. Seed Badges
  const badges = [
    { code: 'FIRST_CODE', title: 'First Code', description: 'Completed your first interactive lesson.', icon: '⚡', xpReward: 50 },
    { code: 'STREAK_3', title: '3-Day Streak', description: 'Learned 3 days in a row.', icon: '🔥', xpReward: 100 },
    { code: 'PORTFOLIO_PRO', title: 'Portfolio Master', description: 'Published your first live project to your portfolio.', icon: '🚀', xpReward: 150 },
    { code: 'COURSE_PIONEER', title: 'Course Pioneer', description: 'Enrolled in a course and started your learning journey.', icon: '🎓', xpReward: 50 }
  ]
  for (const b of badges) {
    await prisma.badge.create({ data: b })
  }
  console.log('Seeded Gamification Badges')

  // 4. Import Curriculum
  console.log("Creating Web Development Fundamentals Course...");
  const course = await prisma.course.create({
    data: {
      title: "Web Development Fundamentals",
      description: "A comprehensive journey from computer basics to professional web development.",
      isPublished: true
    }
  });

  const courseDir = path.join(__dirname, '../courses/web-development-fundamentals');
  
  if (!fs.existsSync(courseDir)) {
    console.error(`Course directory not found: ${courseDir}`);
    process.exit(1);
  }

  const rootItems = fs.readdirSync(courseDir);
  
  // Handle root MDX files
  const rootFiles = rootItems.filter(item => item.endsWith('.mdx') || item.endsWith('.md'));
  if (rootFiles.length > 0) {
    const introModule = await prisma.module.create({
      data: { courseId: course.id, title: "Course Overview", order: 0 }
    });
    
    const introUnit = await prisma.unit.create({
      data: { moduleId: introModule.id, title: "Getting Started", order: 0 }
    });

    for (const file of rootFiles) {
      const content = fs.readFileSync(path.join(courseDir, file), 'utf-8');
      await prisma.lesson.create({
        data: {
          unitId: introUnit.id,
          title: cleanTitle(file),
          content: content,
          order: getOrderFromName(file)
        }
      });
    }
    console.log(`  Added root lessons.`);
  }

  // Handle Module Directories
  const moduleDirs = rootItems.filter(item => {
    const stat = fs.statSync(path.join(courseDir, item));
    return stat.isDirectory() && !item.startsWith('.');
  });

  for (const modDirName of moduleDirs) {
    const modOrder = getOrderFromName(modDirName) === 50 && modDirName.match(/^\d+/) 
      ? parseInt(modDirName.match(/^\d+/)![0], 10) 
      : getOrderFromName(modDirName);
      
    const modTitle = cleanTitle(modDirName);
    
    const moduleRecord = await prisma.module.create({
      data: {
        courseId: course.id,
        title: modTitle,
        order: modOrder === 50 ? 99 : modOrder
      }
    });
    
    console.log(`Created Module: ${modTitle}`);
    
    const modPath = path.join(courseDir, modDirName);
    const modItems = fs.readdirSync(modPath);
    
    // root MDX files inside the Module folder
    const modRootFiles = modItems.filter(item => item.endsWith('.mdx') || item.endsWith('.md'));
    if (modRootFiles.length > 0) {
      const overviewUnit = await prisma.unit.create({
        data: { moduleId: moduleRecord.id, title: `${modTitle} Overview`, order: 0 }
      });
      
      for (const file of modRootFiles) {
        const content = fs.readFileSync(path.join(modPath, file), 'utf-8');
        await prisma.lesson.create({
          data: {
            unitId: overviewUnit.id,
            title: cleanTitle(file),
            content: content,
            order: getOrderFromName(file)
          }
        });
      }
    }
    
    // Unit Directories
    const unitDirs = modItems.filter(item => {
      const stat = fs.statSync(path.join(modPath, item));
      return stat.isDirectory() && !item.startsWith('.');
    });
    
    for (const unitDirName of unitDirs) {
      const unitOrder = getOrderFromName(unitDirName);
      const unitTitle = cleanTitle(unitDirName);
      
      const unitRecord = await prisma.unit.create({
        data: {
          moduleId: moduleRecord.id,
          title: unitTitle,
          order: unitOrder === 50 ? 99 : unitOrder
        }
      });
      
      const unitPath = path.join(modPath, unitDirName);
      const unitItems = fs.readdirSync(unitPath).filter(item => item.endsWith('.mdx') || item.endsWith('.md'));
      
      for (const lessonFile of unitItems) {
        const content = fs.readFileSync(path.join(unitPath, lessonFile), 'utf-8');
        await prisma.lesson.create({
          data: {
            unitId: unitRecord.id,
            title: cleanTitle(lessonFile),
            content: content,
            order: getOrderFromName(lessonFile)
          }
        });
      }
    }
  }
  
  console.log("\nCurriculum successfully imported!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
