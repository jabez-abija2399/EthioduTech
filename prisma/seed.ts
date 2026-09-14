import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')
  
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
