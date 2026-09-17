import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  const defaultPasswordHash = bcrypt.hashSync('password', 10)

  // Seed test user with id "1"
  const user = await prisma.user.upsert({
    where: { email: 'student@edutech.test' },
    update: { hashedPassword: defaultPasswordHash },
    create: {
      id: '1',
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
  console.log(`Seeded User: ${user.email} (ID: ${user.id})`)

  // Seed Teacher user
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@edutech.test' },
    update: { hashedPassword: defaultPasswordHash },
    create: {
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

  // Seed Parent user
  const parent = await prisma.user.upsert({
    where: { email: 'parent@edutech.test' },
    update: { hashedPassword: defaultPasswordHash },
    create: {
      email: 'parent@edutech.test',
      hashedPassword: defaultPasswordHash,
      role: 'PARENT',
      profile: {
        create: {
          firstName: 'Tigist',
          lastName: 'Guardian'
        }
      },
      parentProfile: {
        create: {}
      }
    }
  })
  console.log(`Seeded Parent: ${parent.email}`)

  // Get student profile
  const studentProfile = await prisma.studentProfile.findUnique({
    where: { userId: user.id }
  })

  if (studentProfile) {
    // Upsert portfolio
    const portfolio = await prisma.portfolio.upsert({
      where: { studentId: studentProfile.id },
      update: {},
      create: {
        studentId: studentProfile.id,
        isPublic: true
      }
    })

    // Create sample project if portfolio has no projects
    const existingProjects = await prisma.portfolioProject.findMany({
      where: { portfolioId: portfolio.id }
    })

    if (existingProjects.length === 0) {
      const sampleProject = await prisma.project.create({
        data: {
          title: "Personal Web Business Card",
          description: "An interactive digital business card built with HTML & CSS."
        }
      })

      const sampleCodeBundle = JSON.stringify({
        html: `<div class="card">\n  <h2>Jabez Tech</h2>\n  <p>Web Builder & Student</p>\n  <button onclick="alert('Hello from my Edutech Portfolio!')">Contact Me</button>\n</div>`,
        css: `body { background: #0f172a; color: white; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: system-ui; }\n.card { background: #1e293b; padding: 2rem; border-radius: 1rem; border: 1px solid #334155; text-align: center; }\nbutton { background: #2563eb; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.5rem; cursor: pointer; margin-top: 1rem; }`,
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
      console.log("Seeded sample portfolio project for test user.")
    }
  }
  
  // ---------------------------------------------------------
  // INGEST CURRICULUM FROM REGISTRIES & MDX
  // ---------------------------------------------------------
  console.log('Ingesting deterministic curriculum...')
  
  // 1. Resolve paths
  const coursesPath = path.resolve(process.cwd(), 'courses/web-development-foundations')
  const idRegistryPath = path.join(coursesPath, '01-curriculum/ID_REGISTRY.json')
  const moduleRegistryPath = path.join(coursesPath, '01-curriculum/MODULE_REGISTRY.json')
  const lessonRegistryPath = path.join(coursesPath, '02-lesson-architecture/LESSON_REGISTRY.json')
  const lessonsDir = path.join(coursesPath, '03-lessons')
  
  // 2. Read Registries
  const idRegistry = JSON.parse(fs.readFileSync(idRegistryPath, 'utf8'))
  const moduleRegistry = JSON.parse(fs.readFileSync(moduleRegistryPath, 'utf8'))
  const lessonRegistry = JSON.parse(fs.readFileSync(lessonRegistryPath, 'utf8'))

  // 3. Upsert Courses
  for (const c of idRegistry.courses) {
    await prisma.course.upsert({
      where: { id: c.id },
      update: {
        title: c.title,
        description: c.title,
        isPublished: true,
      },
      create: {
        id: c.id,
        title: c.title,
        description: c.title,
        isPublished: true,
      }
    })
  }
  console.log(`Ingested ${idRegistry.courses.length} courses.`)

  // 4. Upsert Modules & Adapter Units
  for (const m of moduleRegistry) {
    await prisma.module.upsert({
      where: { id: m.moduleId },
      update: {
        title: m.title,
        courseId: m.courseId,
        order: m.sequence
      },
      create: {
        id: m.moduleId,
        title: m.title,
        courseId: m.courseId,
        order: m.sequence
      }
    })
    
    const unitId = `unit-${m.moduleId}`
    await prisma.unit.upsert({
      where: { id: unitId },
      update: {
        moduleId: m.moduleId,
        title: m.title,
        order: 1
      },
      create: {
        id: unitId,
        moduleId: m.moduleId,
        title: m.title,
        order: 1
      }
    })
  }
  console.log(`Ingested ${moduleRegistry.length} modules & adapter units.`)

  // 5. Upsert Lessons
  const allDirs = fs.readdirSync(lessonsDir)
  let mdxCount = 0
  
  for (const l of lessonRegistry) {
    const filename = `${l.lessonId}.mdx`
    const matches = []
    
    for (const d of allDirs) {
      const dirPath = path.join(lessonsDir, d)
      if (fs.statSync(dirPath).isDirectory()) {
        const checkPath = path.join(dirPath, filename)
        if (fs.existsSync(checkPath)) {
          matches.push(checkPath)
        }
      }
    }
    
    if (matches.length === 0) {
      throw new Error(`Missing MDX file for lesson ${l.lessonId}`)
    }
    if (matches.length > 1) {
      throw new Error(`Duplicate MDX files found for lesson ${l.lessonId}`)
    }
    const mdxPath = matches[0]
    const mdxContent = fs.readFileSync(mdxPath, 'utf8')
    
    // Strict Frontmatter Validation
    const extractFrontmatter = (key: string) => {
      const match = mdxContent.match(new RegExp(`${key}:\\s*"([^"]+)"|${key}:\\s*(\\d+)`))
      return match ? (match[1] || match[2]) : null
    }

    const mdxLessonId = extractFrontmatter('lessonId')
    const mdxCourseId = extractFrontmatter('courseId')
    const mdxModuleId = extractFrontmatter('moduleId')
    const mdxSequence = extractFrontmatter('sequence')
    const mdxTitle = extractFrontmatter('title')

    if (mdxLessonId !== l.lessonId) throw new Error(`Validation failed for ${l.lessonId}: MDX lessonId '${mdxLessonId}' != Registry '${l.lessonId}'`)
    if (mdxCourseId !== l.courseId) throw new Error(`Validation failed for ${l.lessonId}: MDX courseId '${mdxCourseId}' != Registry '${l.courseId}'`)
    if (mdxModuleId !== l.moduleId) throw new Error(`Validation failed for ${l.lessonId}: MDX moduleId '${mdxModuleId}' != Registry '${l.moduleId}'`)
    if (mdxSequence !== String(l.sequence)) throw new Error(`Validation failed for ${l.lessonId}: MDX sequence '${mdxSequence}' != Registry '${l.sequence}'`)
    if (mdxTitle !== l.title) throw new Error(`Validation failed for ${l.lessonId}: MDX title '${mdxTitle}' != Registry '${l.title}'`)

    
    const unitId = `unit-${l.moduleId}`
    
    await prisma.lesson.upsert({
      where: { id: l.lessonId },
      update: {
        title: l.title,
        unitId: unitId,
        order: l.sequence,
        content: mdxContent
      },
      create: {
        id: l.lessonId,
        title: l.title,
        unitId: unitId,
        order: l.sequence,
        content: mdxContent
      }
    })
    mdxCount++
  }
  console.log(`Ingested ${mdxCount} lessons from MDX source.`)

  // Seed Badges
  const badges = [
    {
      code: 'FIRST_CODE',
      title: 'First Code',
      description: 'Completed your first interactive lesson.',
      icon: '⚡',
      xpReward: 50
    },
    {
      code: 'STREAK_3',
      title: '3-Day Streak',
      description: 'Learned 3 days in a row.',
      icon: '🔥',
      xpReward: 100
    },
    {
      code: 'PORTFOLIO_PRO',
      title: 'Portfolio Master',
      description: 'Published your first live project to your portfolio.',
      icon: '🚀',
      xpReward: 150
    },
    {
      code: 'COURSE_PIONEER',
      title: 'Course Pioneer',
      description: 'Enrolled in a course and started your learning journey.',
      icon: '🎓',
      xpReward: 50
    }
  ]

  for (const b of badges) {
    await prisma.badge.upsert({
      where: { code: b.code },
      update: b,
      create: b
    })
  }
  console.log('Seeded Gamification Badges')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
