import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Info, Target, Lightbulb, User, Users, RefreshCw } from 'lucide-react';

interface MarkdownViewerProps {
  content: string;
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
  // Pre-process the raw MDX content
  const processedContent = useMemo(() => {
    let text = content;

    // 1. Strip YAML frontmatter (--- ... ---)
    text = text.replace(/^---\n[\s\S]*?\n---\n/, '');

    // 2. Strip sandbox comments
    text = text.replace(/<!--\s*sandbox:(html|css|js)\s*-->[\s\S]*?<!--\s*\/\s*sandbox:\1\s*-->/gi, '');

    // 3. Transform custom pedagogical tags into standard divs with data attributes
    const tags = ['Context', 'Objective', 'Concept', 'GuidedPractice', 'IndependentPractice', 'Reflection'];
    tags.forEach(tag => {
      const regex = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'gi');
      text = text.replace(regex, (match, innerContent) => {
        return `\n\n<div data-custom-type="${tag.toLowerCase()}">\n\n${innerContent}\n\n</div>\n\n`;
      });
    });

    return text;
  }, [content]);

  return (
    <div className="prose prose-invert max-w-none w-full pb-10">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({node, ...props}) => <h1 className="text-4xl font-black text-white mt-10 mb-6 tracking-tight leading-tight" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-3xl font-extrabold text-white mt-12 mb-6 border-b border-[#3C4044] pb-4 tracking-tight" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-2xl font-bold text-[#FD7B41] mt-8 mb-4 tracking-tight" {...props} />,
          h4: ({node, ...props}) => <h4 className="text-xl font-bold text-[#EDBF9B] mt-6 mb-3 tracking-tight" {...props} />,
          p: ({node, ...props}) => <p className="text-slate-300 leading-relaxed mb-6 text-lg font-medium" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc list-outside ml-6 text-slate-300 mb-6 space-y-2 text-lg font-medium" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-6 text-slate-300 mb-6 space-y-2 text-lg font-medium" {...props} />,
          li: ({node, ...props}) => <li className="text-lg pl-1" {...props} />,
          blockquote: ({node, ...props}) => (
            <blockquote className="border-l-4 border-[#FD7B41] pl-6 py-1 italic text-slate-400 my-8 bg-slate-900/50 rounded-r-xl shadow-inner" {...props} />
          ),
          code: ({node, className, children, ...props}) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;
            if (isInline) {
              return <code className="bg-[#2a2d32] text-[#EDBF9B] px-2 py-1 rounded-md text-[15px] font-mono border border-[#3C4044]/50 shadow-sm" {...props}>{children}</code>;
            }
            return (
              <div className="my-8 rounded-2xl overflow-hidden border border-[#3C4044] shadow-2xl shadow-black/50 bg-[#1e1e1e]">
                {/* Mac-like header */}
                <div className="bg-[#2a2d32] px-4 py-3 flex items-center gap-2 border-b border-[#3C4044]">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-4 text-xs font-mono text-slate-400 uppercase tracking-widest">{match[1]}</span>
                </div>
                <pre className="p-6 overflow-x-auto">
                  <code className={`${className} font-mono text-[15px] leading-relaxed text-slate-300`} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            );
          },
          a: ({node, ...props}) => <a className="text-[#FD7B41] hover:text-[#EDBF9B] font-bold underline decoration-2 decoration-[#FD7B41]/30 hover:decoration-[#EDBF9B] underline-offset-4 transition-all" {...props} />,
          table: ({node, ...props}) => (
            <div className="overflow-x-auto mb-8 rounded-xl border border-[#3C4044] shadow-lg">
              <table className="w-full text-left border-collapse bg-[#2c3034]/50" {...props} />
            </div>
          ),
          th: ({node, ...props}) => <th className="border-b border-[#3C4044] bg-[#2a2d32] p-4 text-white font-bold tracking-wide uppercase text-sm" {...props} />,
          td: ({node, ...props}) => <td className="border-b border-[#3C4044]/50 p-4 text-slate-300 text-[15px]" {...props} />,
          hr: ({node, ...props}) => <hr className="my-12 border-[#3C4044]" {...props} />,
          div: ({node, ...props}) => {
            const type = (props as any)['data-custom-type'] as string;
            
            if (!type) {
              return <div {...props} />;
            }
            
            const content = props.children;
            
            // Custom Pedagogical Blocks
            switch (type) {
              case 'context':
                return (
                  <div className="my-8 relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-700 p-6 md:p-8 shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] translate-x-1/2 -translate-y-1/2" />
                    <div className="flex items-start gap-4 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20 shadow-inner">
                        <Info className="w-6 h-6" />
                      </div>
                      <div className="flex-1 mt-1">{content}</div>
                    </div>
                  </div>
                );
              case 'objective':
                return (
                  <div className="my-8 relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-700 p-6 md:p-8 shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#FD7B41]/10 rounded-full blur-[40px] translate-x-1/2 -translate-y-1/2" />
                    <div className="flex items-start gap-4 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-[#FD7B41]/10 text-[#FD7B41] flex items-center justify-center shrink-0 border border-[#FD7B41]/20 shadow-inner">
                        <Target className="w-6 h-6" />
                      </div>
                      <div className="flex-1 mt-1">{content}</div>
                    </div>
                  </div>
                );
              case 'concept':
                return (
                  <div className="my-8 relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-700 p-6 md:p-8 shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] translate-x-1/2 -translate-y-1/2" />
                    <div className="flex items-start gap-4 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20 shadow-inner">
                        <Lightbulb className="w-6 h-6" />
                      </div>
                      <div className="flex-1 mt-1">{content}</div>
                    </div>
                  </div>
                );
              case 'guidedpractice':
                return (
                  <div className="my-10 relative overflow-hidden rounded-2xl bg-emerald-950/30 border border-emerald-900/50 p-6 md:p-8 shadow-2xl">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2" />
                    <div className="flex items-start gap-4 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30 shadow-inner">
                        <Users className="w-6 h-6" />
                      </div>
                      <div className="flex-1 mt-1">{content}</div>
                    </div>
                  </div>
                );
              case 'independentpractice':
                return (
                  <div className="my-10 relative overflow-hidden rounded-2xl bg-[#FD7B41]/5 border border-[#FD7B41]/20 p-6 md:p-8 shadow-2xl">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#FD7B41]/10 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2" />
                    <div className="flex items-start gap-4 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-[#FD7B41]/20 text-[#FD7B41] flex items-center justify-center shrink-0 border border-[#FD7B41]/30 shadow-inner">
                        <User className="w-6 h-6" />
                      </div>
                      <div className="flex-1 mt-1">{content}</div>
                    </div>
                  </div>
                );
              case 'reflection':
                return (
                  <div className="my-10 relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-700 p-6 md:p-8 shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-[40px] translate-x-1/2 -translate-y-1/2" />
                    <div className="flex items-start gap-4 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/20 shadow-inner">
                        <RefreshCw className="w-6 h-6" />
                      </div>
                      <div className="flex-1 mt-1">{content}</div>
                    </div>
                  </div>
                );
              default:
                return <div {...props} />;
            }
          }
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}
