import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, X, Loader2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  hint: string;
  loading: boolean;
  onGetHint: () => void;
}

export function TutorDrawer({ isOpen, onClose, hint, loading, onGetHint }: Props) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-0 right-0 w-full md:w-96 h-full bg-[#1e1e1e] border-l border-[#3C4044] shadow-2xl flex flex-col z-50 transform transition-transform duration-300 ease-in-out">
      
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-[#3C4044] bg-[#252526]">
        <div className="flex items-center space-x-2 text-[#FD7B41]">
          <Bot size={20} />
          <h3 className="font-bold text-sm tracking-wide">AI TUTOR</h3>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#1a1a1a]">
        
        {/* Welcome / Empty State */}
        {!hint && !loading && (
          <div className="text-center text-gray-400 mt-10">
            <Bot size={48} className="mx-auto mb-4 text-[#FD7B41] opacity-50" />
            <p className="text-sm">
              Stuck on this lesson? I can analyze your code and tests to give you a personalized hint without giving away the answer.
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
            <Loader2 size={32} className="animate-spin text-[#FD7B41] mb-4" />
            <p className="text-sm animate-pulse">Analyzing your code...</p>
          </div>
        )}

        {/* Hint Result */}
        {hint && !loading && (
          <div className="bg-[#252526] p-4 rounded-lg border border-[#3C4044] text-sm text-gray-200">
            <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-[#1e1e1e] prose-pre:border prose-pre:border-[#3C4044]">
              <ReactMarkdown>
                {hint}
              </ReactMarkdown>
            </div>
          </div>
        )}

      </div>

      {/* Footer / Action */}
      <div className="p-4 border-t border-[#3C4044] bg-[#252526]">
        <button
          onClick={onGetHint}
          disabled={loading}
          className="w-full py-3 bg-[#FD7B41] hover:bg-[#e66a35] text-white font-bold rounded flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Thinking...</span>
            </>
          ) : (
            <>
              <Bot size={16} />
              <span>{hint ? 'Get Another Hint' : 'Get a Hint'}</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
