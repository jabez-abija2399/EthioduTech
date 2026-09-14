"use server"

import { createOrUpdateLiveRoom, getLiveRoomState, joinLiveRoom } from "@/lib/collaboration/live-room"

export async function broadcastLiveCodeAction(
  roomId: string,
  teacherId: string,
  teacherName: string,
  codeBundle: { html: string; css: string; js: string },
  activeLessonId?: string
) {
  const room = createOrUpdateLiveRoom(roomId, teacherId, teacherName, codeBundle, activeLessonId)
  return { success: true, room }
}

export async function joinLiveRoomAction(
  roomId: string,
  participantId: string,
  participantName: string,
  role: 'STUDENT' | 'TEACHER'
) {
  const room = joinLiveRoom(roomId, participantId, participantName, role)
  if (!room) {
    return { success: false, error: "Live broadcast room not found." }
  }
  return { success: true, room }
}

export async function fetchLiveRoomStateAction(roomId: string) {
  const room = getLiveRoomState(roomId)
  return { success: true, room }
}
