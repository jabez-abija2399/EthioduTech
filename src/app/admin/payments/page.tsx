import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAdminPayments } from "@/lib/data/admin";
import { CreditCard, Search, Download } from "lucide-react";

export default async function AdminPaymentsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const role = ((session.user as any)?.role || "STUDENT").toUpperCase();
  if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
    redirect("/dashboard");
  }

  const payments = await getAdminPayments();

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#DDDCDB]/20 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2.5 bg-[#3C4044] rounded-xl text-white shadow-sm border border-[#DDDCDB]/40">
              <CreditCard className="w-6 h-6" />
            </span>
            <h1 className="text-3xl font-extrabold text-[#3C4044] tracking-tight">Payments Ledger</h1>
          </div>
          <p className="text-[#3C4044]/60 text-sm">
            Monitor platform revenue, transactions, and Telebirr/Chapa sync.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#3C4044]/40" />
            <input
              type="text"
              placeholder="Search TXN ID..."
              className="pl-9 pr-4 py-2 border border-[#DDDCDB]/40 rounded-xl text-sm text-[#3C4044] focus:outline-none focus:border-[#FD7B41] bg-white w-full sm:w-64 shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#DDDCDB]/40 text-[#3C4044] hover:bg-[#f8f9fa] text-sm font-bold rounded-xl shadow-sm transition">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </header>

      <div className="bg-white border border-[#DDDCDB]/40 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f8f9fa] border-b border-[#DDDCDB]/20 text-[#3C4044]/60 font-bold uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Provider</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDDCDB]/20">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#3C4044]/50">
                    No transactions recorded yet.
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-[#f8f9fa] transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-[#3C4044]/70">
                      {payment.id.split('-')[0]}...
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#3C4044]">{payment.user?.email || "Unknown"}</div>
                      <div className="text-[10px] uppercase text-[#3C4044]/50">{payment.user?.role}</div>
                    </td>
                    <td className="px-6 py-4 font-bold text-[#3C4044]">
                      {payment.amount.toLocaleString()} {payment.currency}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${
                        payment.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" :
                        payment.status === "PENDING" ? "bg-amber-500/10 text-amber-600 border border-amber-500/20" :
                        "bg-rose-500/10 text-rose-600 border border-rose-500/20"
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-[#3C4044]/5 text-[#3C4044] text-[10px] font-bold rounded-md">
                        {payment.provider}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-[#3C4044]/70">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
