"use client"

import React, { useState } from 'react'
import { CreditCard, Smartphone, Ticket, CheckCircle, AlertCircle, X, ShieldCheck } from 'lucide-react'
import { PaymentProvider } from '@/lib/payments/checkout'
import { createPaymentCheckoutAction, verifyPaymentStatusAction } from '@/lib/actions/payment'

export interface PaymentCheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  itemTitle: string
  amountETB: number
  userId: string
  onPaymentSuccess?: () => void
}

export function PaymentCheckoutModal({
  isOpen,
  onClose,
  itemTitle,
  amountETB,
  userId,
  onPaymentSuccess,
}: PaymentCheckoutModalProps) {
  const [provider, setProvider] = useState<PaymentProvider>('TELEBIRR')
  const [phoneOrVoucher, setPhoneOrVoucher] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [resultMessage, setResultMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  if (!isOpen) return null

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setResultMessage(null)

    const res = await createPaymentCheckoutAction({
      userId,
      amountETB,
      itemTitle,
      provider,
      phoneOrAccount: phoneOrVoucher,
    })

    if (res.success && res.data) {
      if (res.data.status === 'COMPLETED') {
        setResultMessage({ type: 'success', text: res.data.message })
        if (onPaymentSuccess) onPaymentSuccess()
      } else {
        // Verify pending transaction
        const verifyRes = await verifyPaymentStatusAction(res.data.transactionId)
        if (verifyRes.success && verifyRes.data?.verified) {
          setResultMessage({ type: 'success', text: `Payment verified! ${res.data.message}` })
          if (onPaymentSuccess) onPaymentSuccess()
        } else {
          setResultMessage({ type: 'error', text: 'Payment verification failed. Please try again.' })
        }
      }
    } else {
      setResultMessage({ type: 'error', text: res.error || 'Checkout initiation failed.' })
    }

    setIsProcessing(false)
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-6 text-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-black rounded uppercase tracking-wider">
              Ethiopian Local Payments
            </span>
            <h3 className="text-lg font-bold text-white mt-1">Unlock Access: {itemTitle}</h3>
            <p className="text-xs text-slate-400 mt-0.5">Amount: <span className="text-emerald-400 font-extrabold">{amountETB} ETB</span></p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Provider Selection */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setProvider('TELEBIRR')}
            className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1.5 cursor-pointer ${
              provider === 'TELEBIRR'
                ? 'bg-blue-600/20 border-blue-500 text-blue-400 font-bold'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Smartphone className="w-5 h-5" />
            <span className="text-xs">Telebirr</span>
          </button>

          <button
            type="button"
            onClick={() => setProvider('CHAPA')}
            className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1.5 cursor-pointer ${
              provider === 'CHAPA'
                ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400 font-bold'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span className="text-xs">Chapa</span>
          </button>

          <button
            type="button"
            onClick={() => setProvider('VOUCHER')}
            className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1.5 cursor-pointer ${
              provider === 'VOUCHER'
                ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400 font-bold'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Ticket className="w-5 h-5" />
            <span className="text-xs">Voucher</span>
          </button>
        </div>

        {/* Form Input */}
        <form onSubmit={handleCheckout} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {provider === 'TELEBIRR' && 'Telebirr Phone Number (09... / 07...)'}
              {provider === 'CHAPA' && 'Debit / Mobile Banking Account Number'}
              {provider === 'VOUCHER' && 'School Voucher Code (8 Digits)'}
            </label>
            <input
              type="text"
              required
              value={phoneOrVoucher}
              onChange={(e) => setPhoneOrVoucher(e.target.value)}
              placeholder={
                provider === 'TELEBIRR'
                  ? '0911223344'
                  : provider === 'CHAPA'
                  ? 'Account Number / Phone'
                  : 'EDUTECH-2026'
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition font-mono"
            />
          </div>

          {resultMessage && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                resultMessage.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}
            >
              {resultMessage.type === 'success' ? (
                <CheckCircle className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{resultMessage.text}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1 text-[10px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Secure Ethiopian Payment Gateway
            </span>
            <button
              type="submit"
              disabled={isProcessing}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow transition disabled:opacity-50 cursor-pointer"
            >
              {isProcessing ? 'Verifying...' : `Pay ${amountETB} ETB`}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
