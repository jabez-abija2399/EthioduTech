export interface LiveRoomState {
  roomId: string
  teacherId: string
  teacherName: string
  activeLessonId?: string
  codeBundle: {
    html: string
    css: string
    js: string
  }
  connectedParticipants: Array<{
    id: string
    name: string
    role: 'STUDENT' | 'TEACHER'
    lastActive: number
  }>
  updatedAt: number
}

// In-memory live room store for development / local broadcast
const globalLiveRooms = new Map<string, LiveRoomState>()

export function createOrUpdateLiveRoom(
  roomId: string,
  teacherId: string,
  teacherName: string,
  codeBundle: { html: string; css: string; js: string },
  activeLessonId?: string
): LiveRoomState {
  const existing = globalLiveRooms.get(roomId)
  const now = Date.now()

  const state: LiveRoomState = {
    roomId,
    teacherId,
    teacherName,
    activeLessonId,
    codeBundle,
    connectedParticipants: existing?.connectedParticipants || [
      { id: teacherId, name: teacherName, role: 'TEACHER', lastActive: now }
    ],
    updatedAt: now,
  }

  globalLiveRooms.set(roomId, state)
  return state
}

export function getLiveRoomState(roomId: string): LiveRoomState | null {
  return globalLiveRooms.get(roomId) || null
}

export function joinLiveRoom(
  roomId: string,
  participantId: string,
  participantName: string,
  role: 'STUDENT' | 'TEACHER'
): LiveRoomState | null {
  const room = globalLiveRooms.get(roomId)
  if (!room) return null

  const now = Date.now()
  const existingIndex = room.connectedParticipants.findIndex((p) => p.id === participantId)

  if (existingIndex >= 0) {
    room.connectedParticipants[existingIndex].lastActive = now
  } else {
    room.connectedParticipants.push({
      id: participantId,
      name: participantName,
      role,
      lastActive: now,
    })
  }

  room.updatedAt = now
  return room
}
