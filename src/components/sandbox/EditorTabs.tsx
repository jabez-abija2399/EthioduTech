"use client";

import React from 'react';
import { ActiveTab } from './sandbox-types';

interface EditorTabsProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export function EditorTabs({ activeTab, onTabChange }: EditorTabsProps) {
  const tabs: { id: ActiveTab; label: string; color: string }[] = [
    { id: 'html', label: 'HTML', color: 'text-orange-500' },
    { id: 'css', label: 'CSS', color: 'text-blue-500' },
    { id: 'js', label: 'JS', color: 'text-yellow-500' }
  ];

  return (
    <div className="flex bg-[#2c3034] text-[#DDDCDB] border-b border-[#3C4044]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
            activeTab === tab.id
              ? 'border-[#FD7B41] text-white bg-[#3C4044]'
              : 'border-transparent hover:bg-[#3C4044] hover:text-white'
          }`}
          aria-selected={activeTab === tab.id}
          role="tab"
        >
          <span className={tab.color}>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
