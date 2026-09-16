"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface MarkdownViewerProps {
  content: string;
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <div className="prose prose-invert prose-brand max-w-none w-full">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-[#FD7B41] mt-8 mb-4" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-2xl font-semibold text-white mt-6 mb-4 border-b border-[#3C4044] pb-2" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-xl font-medium text-[#EDBF9B] mt-5 mb-3" {...props} />,
          p: ({node, ...props}) => <p className="text-[#DDDCDB] leading-relaxed mb-4 text-[15px]" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc list-outside ml-5 text-[#DDDCDB] mb-4 space-y-1" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-5 text-[#DDDCDB] mb-4 space-y-1" {...props} />,
          li: ({node, ...props}) => <li className="text-[15px]" {...props} />,
          blockquote: ({node, ...props}) => (
            <blockquote className="border-l-4 border-[#FD7B41] pl-4 italic text-[#DDDCDB] my-4 bg-[#2c3034] py-2 pr-2 rounded-r" {...props} />
          ),
          code: ({node, className, children, ...props}) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;
            if (isInline) {
              return <code className="bg-[#1e1e1e] text-[#EDBF9B] px-1.5 py-0.5 rounded text-sm font-mono" {...props}>{children}</code>;
            }
            return (
              <pre className="bg-[#1e1e1e] p-4 rounded-lg overflow-x-auto mb-4 border border-[#3C4044] shadow-md">
                <code className={`${className} font-mono text-[14px]`} {...props}>
                  {children}
                </code>
              </pre>
            );
          },
          a: ({node, ...props}) => <a className="text-[#FD7B41] hover:text-[#EDBF9B] underline transition-colors" {...props} />,
          table: ({node, ...props}) => <div className="overflow-x-auto mb-4"><table className="w-full text-left border-collapse" {...props} /></div>,
          th: ({node, ...props}) => <th className="border-b-2 border-[#3C4044] py-2 text-white font-semibold" {...props} />,
          td: ({node, ...props}) => <td className="border-b border-[#3C4044] py-2 text-[#DDDCDB]" {...props} />,
          hr: ({node, ...props}) => <hr className="my-8 border-[#3C4044]" {...props} />
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
