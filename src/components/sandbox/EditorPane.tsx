"use client";

import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
// Light/Dark themes can be loaded here. For now we use the basic prism CSS or import one from prismjs/themes
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup'; // HTML

import { ActiveTab, SandboxFiles } from './sandbox-types';

interface EditorPaneProps {
  files: SandboxFiles;
  activeTab: ActiveTab;
  onChange: (tab: keyof SandboxFiles, value: string) => void;
}

export function EditorPane({ files, activeTab, onChange }: EditorPaneProps) {
  // We only render the editor for the active tab to save memory/DOM nodes
  if (activeTab === 'console') return null;

  const code = files[activeTab];
  
  const highlight = (code: string) => {
    let grammar = Prism.languages.markup;
    if (activeTab === 'css') grammar = Prism.languages.css;
    if (activeTab === 'js') grammar = Prism.languages.javascript;
    
    return Prism.highlight(code, grammar, activeTab);
  };

  return (
    <div className="flex-1 overflow-auto bg-[#2d2d2d] relative group">
      {/* react-simple-code-editor handles the textarea and pre/code sync */}
      <Editor
        value={code}
        onValueChange={(code) => onChange(activeTab, code)}
        highlight={highlight}
        padding={16}
        className="font-mono text-[14px] min-h-full"
        style={{
          fontFamily: '"Fira Code", "Consolas", monospace',
          backgroundColor: '#2d2d2d',
          color: '#f8f8f2'
        }}
        textareaClassName="focus:outline-none"
      />
    </div>
  );
}
