"use client";

import React from 'react';
import { ActiveTab } from './sandbox-types';

const TABS = [
  {
    id: 'html' as ActiveTab,
    label: 'index.html',
    dot: '#e44d26',   // HTML orange
    icon: '⬡',
  },
  {
    id: 'css' as ActiveTab,
    label: 'style.css',
    dot: '#264de4',   // CSS blue
    icon: '⬡',
  },
  {
    id: 'js' as ActiveTab,
    label: 'script.js',
    dot: '#f7df1e',   // JS yellow
    icon: '⬡',
  },
] as const;

interface EditorTabsProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export function EditorTabs({ activeTab, onTabChange }: EditorTabsProps) {
  return (
    <div className="flex items-end bg-[#1a1a1c] border-b border-white/8 shrink-0 overflow-x-auto scrollbar-none">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            role="tab"
            aria-selected={isActive}
            className={`
              group relative flex items-center gap-2 px-4 py-2.5 text-[12px] font-medium
              whitespace-nowrap transition-all duration-150 border-r border-white/6
              ${isActive
                ? 'bg-[#252528] text-white'
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/4 bg-[#111113]'
              }
            `}
          >
            {/* Active top accent bar */}
            {isActive && (
              <span
                className="absolute top-0 left-0 right-0 h-[2px] rounded-b-sm"
                style={{ backgroundColor: tab.dot }}
              />
            )}
            {/* Language dot */}
            <span
              className="w-2 h-2 rounded-full shrink-0 transition-opacity"
              style={{ backgroundColor: tab.dot, opacity: isActive ? 1 : 0.4 }}
            />
            {tab.label}
          </button>
        );
      })}
      {/* Spacer */}
      <div className="flex-1 bg-[#111113] border-b border-white/8" />
    </div>
  );
}
