import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAdminCourses } from "@/lib/data/admin";
import { BookOpen, Search, MoreVertical, Plus } from "lucide-react";

export default async function AdminCoursesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const role = ((session.user as any)?.role || "STUDENT").toUpperCase();
  if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
    redirect("/dashboard");
  }

  const courses = await getAdminCourses();

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#DDDCDB]/20 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2.5 bg-[#3C4044] rounded-xl text-white shadow-sm border border-[#DDDCDB]/40">
              <BookOpen className="w-6 h-6" />
            </span>
            <h1 className="text-3xl font-extrabold text-[#3C4044] tracking-tight">Curriculum Sync</h1>
          </div>
          <p className="text-[#3C4044]/60 text-sm">
            Manage course content, modules, and database synchronization.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#3C4044]/40" />
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-9 pr-4 py-2 border border-[#DDDCDB]/40 rounded-xl text-sm text-[#3C4044] focus:outline-none focus:border-[#FD7B41] bg-white w-full sm:w-64 shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#FD7B41] hover:bg-[#FD7B41]/90 text-white text-sm font-bold rounded-xl shadow transition">
            <Plus className="w-4 h-4" />
            New Course
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white border border-[#DDDCDB]/40 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-[#3C4044]">{course.title}</h3>
                <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${
                  course.isPublished ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                }`}>
                  {course.isPublished ? "Published" : "Draft"}
                </span>
              </div>
              <p className="text-sm text-[#3C4044]/70 line-clamp-2 mb-4">{course.description}</p>
              
              <div className="flex items-center gap-6 text-sm text-[#3C4044]/50 font-medium">
                <div>{course._count.modules} Modules</div>
                <div>{course._count.enrollments} Active Students</div>
                <div>Last updated {new Date(course.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-[#f8f9fa] border border-[#DDDCDB]/40 text-[#3C4044] text-sm font-bold rounded-xl hover:bg-[#DDDCDB]/20 transition">
                Edit Curriculum
              </button>
              <button className="p-2 text-[#3C4044]/40 hover:text-[#3C4044] hover:bg-[#f8f9fa] border border-transparent hover:border-[#DDDCDB]/40 rounded-xl transition">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {courses.length === 0 && (
          <div className="p-12 text-center bg-[#f8f9fa] rounded-2xl border border-dashed border-[#DDDCDB]/50">
            <BookOpen className="w-12 h-12 text-[#DDDCDB] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[#3C4044] mb-2">No Courses Found</h3>
            <p className="text-[#3C4044]/60 mb-6">You haven't synced or created any courses yet.</p>
            <button className="px-6 py-2 bg-[#FD7B41] text-white font-bold rounded-xl shadow-md hover:bg-[#FD7B41]/90 transition">
              Run Sync Script
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
