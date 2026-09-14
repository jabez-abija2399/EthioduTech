"use client"

import React, { useState, useEffect } from 'react'
import { Radio, Users, Copy, Check, Tv, Play } from 'lucide-react'
import { broadcastLiveCodeAction, fetchLiveRoomStateAction, joinLiveRoomAction } from '@/lib/actions/live'

export interface LiveCodeSharingProps {
  userRole: 'TEACHER' | 'STUDENT'
  userId: string
  userName: string
  currentCodeBundle: { html: string; css: string; js: string }
  onApplyRemoteCode?: (codeBundle: { html: string; css: string; js: string }) => void
}

export function LiveCodeSharing({
  userRole,
  userId,
  userName,
  currentCodeBundle,
  onApplyRemoteCode,
}: LiveCodeSharingProps) {
  const [roomId, setRoomId] = useState(`room-${userId.slice(0, 6)}`)
  const [isBroadcasting, setIsBroadcasting] = useState(false)
  const [connectedCount, setConnectedCount] = useState(1)
  const [copied, setCopied] = useState(false)
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null)

  // Teacher Broadcast interval
  useEffect(() => {
    if (userRole !== 'TEACHER' || !isBroadcasting) return

    const interval = setInterval(async () => {
      await broadcastLiveCodeAction(roomId, userId, userName, currentCodeBundle)
      setLastSyncTime(new Date().toLocaleTimeString())
    }, 3000)

    return () => clearInterval(interval)
  }, [isBroadcasting, userRole, roomId, userId, userName, currentCodeBundle])

  // Student Sync interval
  useEffect(() => {
    if (userRole !== 'STUDENT' || !isBroadcasting) return

    const interval = setInterval(async () => {
      const res = await fetchLiveRoomStateAction(roomId)
      if (res.success && res.room) {
        setConnectedCount(res.room.connectedParticipants.length)
        if (onApplyRemoteCode) {
          onApplyRemoteCode(res.room.codeBundle)
        }
        setLastSyncTime(new Date().toLocaleTimeString())
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isBroadcasting, userRole, roomId, onApplyRemoteCode])

  const toggleBroadcasting = async () => {
    if (!isBroadcasting) {
      if (userRole === 'TEACHER') {
        await broadcastLiveCodeAction(roomId, userId, userName, currentCodeBundle)
      } else {
        await joinLiveRoomAction(roomId, userId, userName, 'STUDENT')
      }
      setIsBroadcasting(true)
      setLastSyncTime(new Date().toLocaleTimeString())
    } else {
      setIsBroadcasting(false)
    }
  }

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white space-y-3 shadow-md">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-2.5">
          <div className={`p-2 rounded-xl ${isBroadcasting ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-slate-800 text-slate-400'}`}>
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>{userRole === 'TEACHER' ? 'Live Classroom Broadcast' : 'Join Teacher Stream'}</span>
              {isBroadcasting && (
                <span className="px-2 py-0.5 bg-red-500 text-white text-[9px] font-black rounded-full uppercase tracking-wider">
                  LIVE
                </span>
              )}
            </h4>
            <p className="text-[10px] text-slate-400">
              {userRole === 'TEACHER'
                ? 'Share live code edits directly to student screens'
                : 'Sync code edits in real-time from instructor'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isBroadcasting && (
            <div className="flex items-center space-x-1.5 bg-slate-800 px-2.5 py-1 rounded-lg text-xs font-mono text-slate-300 border border-slate-700">
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span>{connectedCount} Connected</span>
            </div>
          )}

          <button
            onClick={toggleBroadcasting}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition inline-flex items-center gap-1.5 cursor-pointer ${
              isBroadcasting
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-sm'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
            }`}
          >
            {isBroadcasting ? (
              <>
                <Tv className="w-3.5 h-3.5" />
                <span>Stop Stream</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>{userRole === 'TEACHER' ? 'Start Broadcast' : 'Connect Stream'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Room ID & Sync Status */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <span>Room Code:</span>
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            disabled={isBroadcasting}
            className="bg-slate-950 border border-slate-800 rounded px-2 py-0.5 font-mono text-blue-400 focus:outline-none text-xs w-28 disabled:opacity-60"
          />
          <button
            onClick={copyRoomId}
            className="p-1 hover:bg-slate-800 rounded text-slate-300 transition cursor-pointer"
            title="Copy Room ID"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {lastSyncTime && (
          <div className="text-[10px] text-slate-500 font-mono">
            Last sync: {lastSyncTime}
          </div>
        )}
      </div>
    </div>
  )
}
