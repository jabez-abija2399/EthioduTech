"use server"

import { CheckoutRequest, initiatePaymentCheckout, verifyPaymentStatus } from "@/lib/payments/checkout"

export async function createPaymentCheckoutAction(req: CheckoutRequest) {
  try {
    const response = await initiatePaymentCheckout(req)
    return { success: response.success, data: response }
  } catch (error: any) {
    return { success: false, error: error?.message || 'Payment initiation failed.' }
  }
}

export async function verifyPaymentStatusAction(transactionId: string) {
  try {
    const verification = await verifyPaymentStatus(transactionId)
    return { success: true, data: verification }
  } catch (error: any) {
    return { success: false, error: error?.message || 'Verification failed.' }
  }
}
