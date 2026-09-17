import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
  console.log("Verifying Curriculum Ingestion...")

  const coursesPath = path.resolve(__dirname, '../courses/web-development-foundations')
  const idRegistry = JSON.parse(fs.readFileSync(path.join(coursesPath, '01-curriculum/ID_REGISTRY.json'), 'utf8'))
  const moduleRegistry = JSON.parse(fs.readFileSync(path.join(coursesPath, '01-curriculum/MODULE_REGISTRY.json'), 'utf8'))
  const lessonRegistry = JSON.parse(fs.readFileSync(path.join(coursesPath, '02-lesson-architecture/LESSON_REGISTRY.json'), 'utf8'))

  // Verify Courses
  const dbCourses = await prisma.course.count()
  if (dbCourses !== idRegistry.courses.length) {
    throw new Error(`Expected ${idRegistry.courses.length} courses, but found ${dbCourses} in database.`)
  }
  console.log(`✅ Courses: verified ${dbCourses} records.`)

  // Verify Modules
  const dbModules = await prisma.module.count()
  if (dbModules !== moduleRegistry.length) {
    throw new Error(`Expected ${moduleRegistry.length} modules, but found ${dbModules} in database.`)
  }
  console.log(`✅ Modules: verified ${dbModules} records.`)

  // Verify Units (Adapter units)
  const dbUnits = await prisma.unit.count()
  if (dbUnits !== moduleRegistry.length) {
    throw new Error(`Expected ${moduleRegistry.length} adapter units, but found ${dbUnits} in database.`)
  }
  console.log(`✅ Units: verified ${dbUnits} adapter units.`)

  // Verify Lessons
  const dbLessons = await prisma.lesson.count()
  if (dbLessons !== lessonRegistry.length) {
    throw new Error(`Expected ${lessonRegistry.length} lessons, but found ${dbLessons} in database.`)
  }
  console.log(`✅ Lessons: verified ${dbLessons} records.`)

  // Check some representative queries
  const repCourses = ['course-web-foundations', 'course-html-foundations', 'course-css-foundations', 'course-js-foundations', 'course-git-github', 'course-web-capstone']
  
  for (const cId of repCourses) {
    const course = await prisma.course.findUnique({
      where: { id: cId },
      include: { modules: { include: { units: { include: { lessons: true } } } } }
    })
    
    if (!course) {
      throw new Error(`Representative check failed: Course ${cId} not found in database.`)
    }
    
    const lessonsInCourse = course.modules.flatMap(m => m.units.flatMap(u => u.lessons))
    if (lessonsInCourse.length === 0) {
      throw new Error(`Representative check failed: Course ${cId} has no lessons in database.`)
    }
    console.log(`✅ Checked course: ${cId} (${lessonsInCourse.length} lessons found)`)
  }

  console.log("All verifications passed successfully.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
