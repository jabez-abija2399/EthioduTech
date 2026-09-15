export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-12 font-sans animate-pulse">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="h-10 w-64 bg-slate-800 rounded-xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="h-28 bg-slate-900 border border-slate-800 rounded-2xl"></div>
          <div className="h-28 bg-slate-900 border border-slate-800 rounded-2xl"></div>
          <div className="h-28 bg-slate-900 border border-slate-800 rounded-2xl"></div>
          <div className="h-28 bg-slate-900 border border-slate-800 rounded-2xl"></div>
        </div>
        <div className="h-96 bg-slate-900 border border-slate-800 rounded-2xl"></div>
      </div>
    </div>
  )
}
