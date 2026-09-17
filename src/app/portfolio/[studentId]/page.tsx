import { getPublicPortfolio } from "@/lib/data/portfolio"
import { notFound } from "next/navigation"
import Link from "next/link"
import { auth } from "@/auth"

export default async function PublicPortfolioPage({
  params
}: {
  params: Promise<{ studentId: string }>
}) {
  const { studentId } = await params
  const student = await getPublicPortfolio(studentId)
  const session = await auth()

  if (!student) {
    notFound()
  }

  const firstName = student.user?.profile?.firstName || "Student"
  const lastName = student.user?.profile?.lastName || ""
  const fullName = `${firstName} ${lastName}`.trim()
  const projects = student.portfolios?.flatMap((p: any) => p.projects || []) || []

  const isOwner = session?.user?.id === studentId

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-slate-100 font-sans selection:bg-[#FD7B41]/30">
      {/* Premium Hero Section */}
      <header className="relative pt-24 pb-32 px-6 overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FD7B41]/15 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Top Nav for Owner */}
          {isOwner && (
            <div className="flex justify-end mb-12">
              <Link
                href="/dashboard"
                className="text-sm font-bold text-slate-300 hover:text-white transition bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-xl border border-white/10 backdrop-blur-md shadow-lg"
              >
                &larr; Back to Dashboard
              </Link>
            </div>
          )}

          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] bg-gradient-to-br from-[#FD7B41] to-[#EDBF9B] p-1 shadow-2xl shadow-[#FD7B41]/20 transform rotate-3 hover:rotate-0 transition-transform duration-500 group">
              <div className="w-full h-full bg-[#1a1a1a] rounded-[1.8rem] flex items-center justify-center relative overflow-hidden group-hover:bg-[#FD7B41]/10 transition-colors duration-500">
                <span className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#FD7B41] to-[#EDBF9B]">
                  {firstName.charAt(0)}
                </span>
              </div>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4 backdrop-blur-sm shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for Hire
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
                I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD7B41] to-[#EDBF9B]">{fullName}</span>.
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-8">
                A passionate web developer from Ethiopia building interactive, beautiful, and accessible web experiences.
              </p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <a href="#projects" className="px-8 py-4 bg-[#FD7B41] hover:bg-[#FD7B41]/90 text-white font-black rounded-xl transition shadow-lg shadow-[#FD7B41]/20 transform hover:-translate-y-1">
                  View My Work
                </a>
                <a href="mailto:contact@edutech.test" className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition backdrop-blur-sm">
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats / Skills Strip */}
      <div className="border-y border-white/5 bg-white/[0.02] backdrop-blur-sm relative z-20">
        <div className="max-w-5xl mx-auto py-8 px-6 flex flex-wrap justify-center md:justify-between items-center gap-8 text-center md:text-left">
          <div>
            <p className="text-3xl font-black text-white">{projects.length}</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Projects Built</p>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div>
            <p className="text-3xl font-black text-white">HTML5</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Structure</p>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div>
            <p className="text-3xl font-black text-white">CSS3</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Styling</p>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div>
            <p className="text-3xl font-black text-white">JS</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Logic</p>
          </div>
        </div>
      </div>

      {/* Main Portfolio Project Grid */}
      <main id="projects" className="max-w-6xl mx-auto py-24 px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Selected Works</h2>
          <p className="text-slate-400 max-w-xl mx-auto">A showcase of my recent web development projects built from scratch using pure code.</p>
        </div>

        {projects.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-16 text-center shadow-xl backdrop-blur-sm">
            <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🚧</span>
            </div>
            <p className="text-xl font-bold text-white mb-2">Portfolio under construction</p>
            <p className="text-slate-400">Projects will appear here once they are published.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
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
                <div key={item.id} className="bg-[#242629] border border-white/5 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 group hover:-translate-y-2 transition-transform duration-500 flex flex-col">
                  {/* Sandboxed Live Project Preview */}
                  <div className="h-[300px] bg-white relative overflow-hidden border-b border-white/5">
                    <iframe
                      srcDoc={iframeSrcDoc}
                      title={item.project.title}
                      sandbox="allow-scripts"
                      className="w-full h-full border-none pointer-events-none group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
                       <span className="opacity-0 group-hover:opacity-100 px-6 py-3 bg-[#FD7B41] text-white font-black text-sm rounded-xl transition duration-500 transform translate-y-4 group-hover:translate-y-0 shadow-xl pointer-events-auto cursor-pointer">
                         Live Demo
                       </span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#FD7B41] transition-colors">{item.project.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6">{item.project.description}</p>
                    </div>

                    {item.reflection && (
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-sm text-slate-300 relative mt-auto">
                        <span className="absolute -top-3 left-4 px-2 bg-[#242629] font-bold text-[#FD7B41] text-xs uppercase tracking-wider">
                          Creator's Note
                        </span>
                        <p className="italic mt-1">"{item.reflection}"</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* Public Footer */}
      <footer className="border-t border-white/5 bg-[#141517] py-12 px-6 text-center relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-32 bg-[#FD7B41]/5 rounded-[100%] blur-[50px] pointer-events-none" />
        <h2 className="text-2xl font-black text-white mb-2">{fullName}</h2>
        <p className="text-slate-500 text-sm mb-8">Powered by Edutech • Empowering Builders Across Ethiopia</p>
        <div className="flex justify-center gap-4">
           <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#FD7B41] transition cursor-pointer">GH</span>
           <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#FD7B41] transition cursor-pointer">LI</span>
        </div>
      </footer>
    </div>
  )
}
