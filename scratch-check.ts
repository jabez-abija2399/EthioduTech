import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const courses = await prisma.course.findMany({
    include: {
      modules: {
        include: {
          units: {
            include: {
              lessons: true
            }
          }
        }
      }
    }
  })
  console.log(`Found ${courses.length} courses in DB.`)
  if (courses.length > 0) {
    console.log(`Course 0 ID: ${courses[0].id}`)
    console.log(`Course 0 Title: ${courses[0].title}`)
    console.log(`Course 0 Published: ${courses[0].isPublished}`)
  }
}
main().catch(console.error).finally(() => prisma.$disconnect())
