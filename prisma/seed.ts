import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Seed test user with id "1"
  const user = await prisma.user.upsert({
    where: { email: 'student@edutech.test' },
    update: { id: '1' },
    create: {
      id: '1',
      email: 'student@edutech.test',
      hashedPassword: 'password',
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
    update: {},
    create: {
      email: 'teacher@edutech.test',
      hashedPassword: 'password',
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
    update: {},
    create: {
      email: 'parent@edutech.test',
      hashedPassword: 'password',
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
  
  // Create an initial Web Creator Foundations Course
  const course = await prisma.course.create({
    data: {
      title: 'Web Creator Foundations',
      description: 'Learn HTML, CSS, and basic JavaScript by building your first website.',
      isPublished: true,
      modules: {
        create: [
          {
            title: 'Module 1: The Structure of the Web (HTML)',
            order: 1,
            units: {
              create: [
                {
                  title: 'Unit 1: Your First Webpage',
                  order: 1,
                  lessons: {
                    create: [
                      {
                        title: 'What is HTML?',
                        content: '# Welcome to the Web\n\nHTML stands for HyperText Markup Language. It is the skeleton of every website you visit.\n\n## Why it matters\nIf you want to build anything on the web, you must start with HTML. It tells the browser what content to display: headings, paragraphs, images, and links.\n\n## Your first tag\nThe `<h1>` tag creates a large heading. Try writing: `<h1>Hello World</h1>` in the editor below.',
                        order: 1,
                      },
                      {
                        title: 'Paragraphs and Structure',
                        content: '# Adding Text\n\nNow that you have a heading, you need regular text. The `<p>` tag is used for paragraphs.\n\n## Practice\nAdd a paragraph below your heading using `<p>This is my first website.</p>`.',
                        order: 2,
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  })

  console.log(`Seeded Course: ${course.title}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
