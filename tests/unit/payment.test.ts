import { describe, it, expect } from 'vitest'
import { initiatePaymentCheckout, verifyPaymentStatus } from '../../src/lib/payments/checkout'

describe('Local Ethiopian Payment Gateway Engine (PAY-001)', () => {
  it('should initiate Telebirr checkout successfully', async () => {
    const res = await initiatePaymentCheckout({
      userId: 'user-student-1',
      amountETB: 250,
      itemTitle: 'Advanced Web Creator Track',
      provider: 'TELEBIRR',
      phoneOrAccount: '0911223344',
    })

    expect(res.success).toBe(true)
    expect(res.status).toBe('PENDING')
    expect(res.checkoutUrl).toContain('telebirr.et')
    expect(res.provider).toBe('TELEBIRR')
  })

  it('should initiate Chapa payment checkout successfully', async () => {
    const res = await initiatePaymentCheckout({
      userId: 'user-student-1',
      amountETB: 250,
      itemTitle: 'Advanced Web Creator Track',
      provider: 'CHAPA',
      phoneOrAccount: '0988776655',
    })

    expect(res.success).toBe(true)
    expect(res.checkoutUrl).toContain('chapa.co')
    expect(res.provider).toBe('CHAPA')
  })

  it('should redeem offline learning voucher code instantly', async () => {
    const res = await initiatePaymentCheckout({
      userId: 'user-student-1',
      amountETB: 250,
      itemTitle: 'Advanced Web Creator Track',
      provider: 'VOUCHER',
      phoneOrAccount: 'EDUTECH-2026',
    })

    expect(res.success).toBe(true)
    expect(res.status).toBe('COMPLETED')
    expect(res.message).toContain('voucher code redeemed')
  })

  it('should verify payment transaction status', async () => {
    const verification = await verifyPaymentStatus('TX-TELEBIRR-12345')
    expect(verification.verified).toBe(true)
    expect(verification.status).toBe('COMPLETED')
  })
})
