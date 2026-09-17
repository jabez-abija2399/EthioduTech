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
  
  if (courses.length > 0) {
    const course = courses[0]
    console.log(`Course 0 ID: ${course.id}`)
    console.log(`Modules: ${course.modules.length}`)
    if (course.modules.length > 0) {
       console.log(`Units in Mod 0: ${course.modules[0].units.length}`)
       if (course.modules[0].units.length > 0) {
          console.log(`Lessons in Unit 0: ${course.modules[0].units[0].lessons.length}`)
       }
    }
  }
}
main().catch(console.error).finally(() => prisma.$disconnect())
