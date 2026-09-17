import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAdminUsers } from "@/lib/data/admin";
import { Users, Search, MoreVertical, Shield } from "lucide-react";

export default async function AdminUsersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const role = ((session.user as any)?.role || "STUDENT").toUpperCase();
  if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
    redirect("/dashboard");
  }

  const users = await getAdminUsers();

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#DDDCDB]/20 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2.5 bg-[#3C4044] rounded-xl text-white shadow-sm border border-[#DDDCDB]/40">
              <Users className="w-6 h-6" />
            </span>
            <h1 className="text-3xl font-extrabold text-[#3C4044] tracking-tight">User Management</h1>
          </div>
          <p className="text-[#3C4044]/60 text-sm">
            Manage all platform users, roles, and profiles.
          </p>
        </div>

        <div className="flex items-center gap-3 relative">
          <Search className="w-4 h-4 absolute left-3 text-[#3C4044]/40" />
          <input
            type="text"
            placeholder="Search users..."
            className="pl-9 pr-4 py-2 border border-[#DDDCDB]/40 rounded-xl text-sm text-[#3C4044] focus:outline-none focus:border-[#FD7B41] bg-white w-full sm:w-64 shadow-sm"
          />
        </div>
      </header>

      <div className="bg-white border border-[#DDDCDB]/40 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f8f9fa] border-b border-[#DDDCDB]/20 text-[#3C4044]/60 font-bold uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDDCDB]/20">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-[#f8f9fa] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FD7B41]/10 flex items-center justify-center font-bold text-[#FD7B41]">
                        {user.profile?.firstName?.[0] || user.email?.[0]?.toUpperCase() || "?"}
                      </div>
                      <div>
                        <div className="font-bold text-[#3C4044]">
                          {user.profile?.firstName} {user.profile?.lastName}
                          {!user.profile && <span className="text-gray-400 italic">No Profile</span>}
                        </div>
                        <div className="text-xs text-[#3C4044]/60">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${
                      user.role === "STUDENT" ? "bg-blue-50 text-blue-600 border border-blue-200" :
                      user.role === "TEACHER" ? "bg-purple-50 text-purple-600 border border-purple-200" :
                      user.role === "PARENT" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" :
                      "bg-rose-50 text-rose-600 border border-rose-200"
                    }`}>
                      {(user.role === "ADMIN" || user.role === "SUPER_ADMIN") && <Shield className="w-3 h-3" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#3C4044]/70">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-[#3C4044]/40 hover:text-[#3C4044] hover:bg-[#DDDCDB]/30 rounded-lg transition">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
