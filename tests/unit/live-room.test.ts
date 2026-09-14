import { describe, it, expect } from 'vitest'
import { createOrUpdateLiveRoom, getLiveRoomState, joinLiveRoom } from '../../src/lib/collaboration/live-room'

describe('Live Room Collaboration Manager (LIVE-001)', () => {
  it('should create and retrieve a live broadcast room', () => {
    const room = createOrUpdateLiveRoom(
      'room-test-101',
      'teacher-1',
      'Mr. Abebe',
      { html: '<h1>Hello Class</h1>', css: 'h1 { color: blue; }', js: '' },
      'lesson-1'
    )

    expect(room.roomId).toBe('room-test-101')
    expect(room.teacherName).toBe('Mr. Abebe')
    expect(room.codeBundle.html).toBe('<h1>Hello Class</h1>')

    const fetched = getLiveRoomState('room-test-101')
    expect(fetched).not.toBeNull()
    expect(fetched?.codeBundle.css).toBe('h1 { color: blue; }')
  })

  it('should allow student to join a live broadcast room', () => {
    joinLiveRoom('room-test-101', 'student-5', 'Bethlehem', 'STUDENT')

    const room = getLiveRoomState('room-test-101')
    expect(room?.connectedParticipants.length).toBe(2)
    const student = room?.connectedParticipants.find((p) => p.id === 'student-5')
    expect(student?.name).toBe('Bethlehem')
    expect(student?.role).toBe('STUDENT')
  })
})
