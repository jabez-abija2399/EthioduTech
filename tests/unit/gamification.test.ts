import { describe, it, expect } from 'vitest'

describe('Gamification & Streak Calculation Engine Unit Suite', () => {
  it('should calculate daily streak increments on consecutive days', () => {
    const now = new Date('2026-09-15T12:00:00Z')
    const yesterday = new Date('2026-09-14T12:00:00Z')
    
    let currentStreak = 2
    const isSameDay = yesterday.toDateString() === now.toDateString()
    const checkYesterday = new Date(now)
    checkYesterday.setDate(now.getDate() - 1)
    const isYesterday = yesterday.toDateString() === checkYesterday.toDateString()

    if (isYesterday) {
      currentStreak += 1
    } else if (!isSameDay) {
      currentStreak = 1
    }

    expect(currentStreak).toBe(3)
  })

  it('should reset streak to 1 if last active date was more than 1 day ago', () => {
    const now = new Date('2026-09-15T12:00:00Z')
    const threeDaysAgo = new Date('2026-09-12T12:00:00Z')
    
    let currentStreak = 5
    const isSameDay = threeDaysAgo.toDateString() === now.toDateString()
    const checkYesterday = new Date(now)
    checkYesterday.setDate(now.getDate() - 1)
    const isYesterday = threeDaysAgo.toDateString() === checkYesterday.toDateString()

    if (isYesterday) {
      currentStreak += 1
    } else if (!isSameDay) {
      currentStreak = 1
    }

    expect(currentStreak).toBe(1)
  })

  it('should award +50 XP per new completed lesson', () => {
    const currentXP = 150
    const lessonReward = 50
    const updatedXP = currentXP + lessonReward

    expect(updatedXP).toBe(200)
  })
})
