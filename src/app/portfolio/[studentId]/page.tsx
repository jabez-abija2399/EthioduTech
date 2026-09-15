import { getPublicPortfolio } from "@/lib/data/portfolio"
import { notFound } from "next/navigation"
import Link from "next/link"

export default async function PublicPortfolioPage({
  params
}: {
  params: Promise<{ studentId: string }>
}) {
  const { studentId } = await params
  const student = await getPublicPortfolio(studentId)

  if (!student) {
    notFound()
  }

  const firstName = student.user?.profile?.firstName || "Student"
  const lastName = student.user?.profile?.lastName || ""
  const fullName = `${firstName} ${lastName}`.trim()
  const projects = student.portfolios?.flatMap((p: any) => p.projects || []) || []

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Portfolio Header */}
      <header className="bg-slate-900 border-b border-slate-800 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-3xl font-extrabold text-white shadow-lg shadow-blue-500/20">
              {firstName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-extrabold text-white tracking-tight">{fullName}</h1>
                <span className="px-2.5 py-0.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold rounded-full">
                  Verified Builder ✓
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-1">
                Student & Project Creator • Edutech Community
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="text-center px-4 border-r border-slate-800">
              <div className="text-2xl font-bold text-white">{projects.length}</div>
              <div className="text-xs text-slate-500 font-medium">Projects</div>
            </div>
            <div className="text-center px-4">
              <div className="text-2xl font-bold text-emerald-400">HTML / CSS</div>
              <div className="text-xs text-slate-500 font-medium">Core Stack</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Portfolio Project Grid */}
      <main className="max-w-5xl mx-auto py-12 px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>🚀 Featured Projects</span>
          </h2>
          <Link
            href="/dashboard"
            className="text-xs font-semibold text-slate-400 hover:text-white transition bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800"
          >
            &larr; Back to Dashboard
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center text-slate-500">
            <p className="text-lg">No public projects published yet.</p>
            <p className="text-sm mt-2">Projects created in the code editor will appear here once published!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((item: any) => {
              let parsedCode = { html: "", css: "", js: "" }
              try {
                if (item.url && item.url.startsWith("{")) {
                  parsedCode = JSON.parse(item.url)
                }
              } catch (e) {
                console.warn("Failed to parse project code bundle:", e)
              }

              const iframeSrcDoc = `
                <!DOCTYPE html>
                <html>
                <head>
                  <meta charset="UTF-8" />
                  <style>${parsedCode.css || ""}</style>
                </head>
                <body>
                  ${parsedCode.html || "<p>No code preview available.</p>"}
                  <script>${parsedCode.js || ""}</script>
                </body>
                </html>
              `

              return (
                <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
                  {/* Card Header */}
                  <div className="p-6 border-b border-slate-800">
                    <h3 className="text-xl font-bold text-white mb-2">{item.project.title}</h3>
                    <p className="text-slate-400 text-sm">{item.project.description}</p>
                  </div>

                  {/* Sandboxed Live Project Preview */}
                  <div className="h-64 bg-white relative overflow-hidden border-b border-slate-800">
                    <iframe
                      srcDoc={iframeSrcDoc}
                      title={item.project.title}
                      sandbox="allow-scripts"
                      className="w-full h-full border-none"
                    />
                  </div>

                  {/* Student Reflection & Footer */}
                  <div className="p-6 bg-slate-950/50 flex-1 flex flex-col justify-between space-y-4">
                    {item.reflection && (
                      <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300">
                        <span className="font-bold text-blue-400 block mb-1">💡 Creator's Reflection:</span>
                        "{item.reflection}"
                      </div>
                    )}
                    
                    <div className="text-[11px] text-slate-500 font-mono flex items-center justify-between">
                      <span>Published via Edutech Editor</span>
                      <span>Verified ✓</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* Public Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-600">
        Edutech Student Portfolio Showcase • Empowering Builders Across Ethiopia & the World
      </footer>
    </div>
  )
}
