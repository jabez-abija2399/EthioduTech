import Link from "next/link";
import { BookOpen, Rocket } from "lucide-react";

interface CourseCardProps {
  courseId: string;
  title: string;
  description: string;
  firstLessonId: string | null;
  progressPercent?: number;
}

export function CourseCard({ courseId, title, description, firstLessonId, progressPercent = 0 }: CourseCardProps) {
  return (
    <div className="flex flex-col h-full p-6 border border-[#DDDCDB]/10 rounded-2xl bg-slate-900/50 shadow-sm hover:border-[#FD7B41]/50 transition group">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#FD7B41]/10 flex items-center justify-center text-[#FD7B41] group-hover:scale-110 transition">
          <BookOpen className="w-5 h-5" />
        </div>
        <h3 className="font-extrabold text-xl text-white group-hover:text-[#FD7B41] transition">{title}</h3>
      </div>
      
      <p className="text-[#DDDCDB]/70 text-sm mb-6 flex-1 leading-relaxed">{description}</p>
      
      <div className="w-full bg-[#3C4044] rounded-full h-2.5 mb-6 border border-[#DDDCDB]/5 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-[#FD7B41] to-[#EDBF9B] h-full rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${Math.max(5, progressPercent)}%` }} 
        />
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#DDDCDB]/60">{progressPercent}% Completed</span>
        {firstLessonId ? (
          <Link 
            href={`/courses/${courseId}/lessons/${firstLessonId}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EDBF9B] hover:bg-[#EDBF9B]/90 text-[#3C4044] text-sm font-bold rounded-xl transition shadow-md hover:-translate-y-0.5"
          >
            <Rocket className="w-4 h-4" />
            <span>Continue</span>
          </Link>
        ) : (
          <button disabled className="px-5 py-2.5 bg-[#3C4044] text-[#DDDCDB]/50 text-sm font-bold rounded-xl cursor-not-allowed border border-[#DDDCDB]/10">
            Coming Soon
          </button>
        )}
      </div>
    </div>
  );
}
