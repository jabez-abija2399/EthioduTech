export type PaymentProvider = 'TELEBIRR' | 'CHAPA' | 'VOUCHER'

export interface CheckoutRequest {
  userId: string
  amountETB: number
  itemTitle: string
  provider: PaymentProvider
  phoneOrAccount?: string
}

export interface CheckoutResponse {
  success: boolean
  transactionId: string
  checkoutUrl?: string
  status: 'PENDING' | 'COMPLETED' | 'FAILED'
  provider: PaymentProvider
  message: string
}

export async function initiatePaymentCheckout(req: CheckoutRequest): Promise<CheckoutResponse> {
  const transactionId = `TX-${req.provider}-${Date.now()}`

  if (req.amountETB <= 0) {
    return {
      success: false,
      transactionId,
      status: 'FAILED',
      provider: req.provider,
      message: 'Invalid payment amount.',
    }
  }

  // Telebirr Integration Handler
  if (req.provider === 'TELEBIRR') {
    return {
      success: true,
      transactionId,
      checkoutUrl: `https://telebirr.et/pay?tx=${transactionId}`,
      status: 'PENDING',
      provider: 'TELEBIRR',
      message: 'Telebirr payment request initiated successfully.',
    }
  }

  // Chapa Payment Gateway Handler
  if (req.provider === 'CHAPA') {
    return {
      success: true,
      transactionId,
      checkoutUrl: `https://checkout.chapa.co/checkout/web/pay/${transactionId}`,
      status: 'PENDING',
      provider: 'CHAPA',
      message: 'Chapa checkout initialized.',
    }
  }

  // Local Offline Voucher Code Handler
  if (req.provider === 'VOUCHER') {
    return {
      success: true,
      transactionId,
      status: 'COMPLETED',
      provider: 'VOUCHER',
      message: 'School learning access voucher code redeemed successfully.',
    }
  }

  return {
    success: false,
    transactionId,
    status: 'FAILED',
    provider: req.provider,
    message: 'Unsupported payment provider.',
  }
}

export async function verifyPaymentStatus(transactionId: string): Promise<{
  verified: boolean
  transactionId: string
  status: 'COMPLETED' | 'FAILED'
}> {
  // Simulate instant local verification callback
  return {
    verified: true,
    transactionId,
    status: 'COMPLETED',
  }
}
