import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getCourseWithFullTree } from "@/lib/data/course";
import { CurriculumStudio } from "@/components/curriculum/CurriculumStudio";

export default async function AdminCourseStudioPage({
  params
}: {
  params: Promise<{ courseId: string }>
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const role = ((session.user as any)?.role || "STUDENT").toUpperCase();
  if (role !== "ADMIN" && role !== "SUPER_ADMIN" && role !== "TEACHER") {
    redirect("/dashboard");
  }

  const { courseId } = await params;
  const course = await getCourseWithFullTree(courseId);

  if (!course) {
    redirect("/admin/courses");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="bg-white border-b border-[#DDDCDB]/40 p-4">
        <h1 className="text-xl font-bold text-[#3C4044]">Curriculum Studio</h1>
        <p className="text-sm text-slate-500">Editing: {course.title}</p>
      </div>
      
      {/* 
        We pass the course directly to the Client Component Studio.
        Note: Prisma relations are nested objects which work fine across the RSC boundary.
      */}
      <CurriculumStudio initialCourse={course} />
    </div>
  );
}
