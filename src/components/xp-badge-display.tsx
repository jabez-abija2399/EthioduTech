"use client"

import React from 'react'

export interface BadgeItem {
  id: string
  code: string
  title: string
  description: string
  icon: string
  xpReward: number
  isEarned: boolean
}

interface XPBadgeDisplayProps {
  xp: number
  streakDays: number
  badges: BadgeItem[]
  compact?: boolean
}

export function XPBadgeDisplay({ xp, streakDays, badges, compact = false }: XPBadgeDisplayProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 rounded-full px-4 py-1.5 backdrop-blur-md shadow-inner">
        <div className="flex items-center gap-1 text-amber-400 font-semibold text-xs tracking-wide">
          <span className="text-sm">🔥</span>
          <span>{streakDays} {streakDays === 1 ? 'Day' : 'Days'}</span>
        </div>
        <div className="h-3.5 w-px bg-slate-800" />
        <div className="flex items-center gap-1 text-emerald-400 font-semibold text-xs tracking-wide">
          <span className="text-sm">⭐</span>
          <span>{xp} XP</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            🏆 Gamification & Rewards
          </h3>
          <p className="text-xs text-slate-400 mt-1">Earn XP by completing lessons & publishing web projects</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-2xl font-black text-amber-400 flex items-center gap-1">
              🔥 {streakDays}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Streak</span>
          </div>

          <div className="h-8 w-px bg-slate-800" />

          <div className="flex flex-col items-end">
            <span className="text-2xl font-black text-emerald-400 flex items-center gap-1">
              ⭐ {xp}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total XP</span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Badge Shelf</h4>
          <span className="text-xs text-slate-400 font-medium">
            {badges.filter(b => b.isEarned).length} of {badges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`relative group rounded-xl p-3.5 border transition-all duration-300 flex flex-col items-center text-center ${
                badge.isEarned
                  ? 'bg-gradient-to-b from-slate-800/90 to-slate-900/90 border-amber-500/40 shadow-lg shadow-amber-500/5 hover:border-amber-400/80'
                  : 'bg-slate-950/40 border-slate-800/50 opacity-50 grayscale hover:opacity-75'
              }`}
            >
              <span className="text-3xl mb-2 transform group-hover:scale-110 transition-transform">
                {badge.icon}
              </span>
              <span className="text-xs font-bold text-white mb-0.5 line-clamp-1">
                {badge.title}
              </span>
              <span className="text-[10px] text-slate-400 line-clamp-2 leading-snug">
                {badge.description}
              </span>

              {badge.isEarned && (
                <span className="mt-2 text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                  +{badge.xpReward} XP
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
